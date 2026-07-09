import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

function supabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

const SECTION_ORDER = [
  'Complimentary In Your Suite',
  'Pantry Staples & Breakfast',
  'Pantry & Fresh',
  'Freezer & Ready Meals',
  'Seafood',
  'Sweet',
  'Cheese & Honey',
  'Drinks',
  'Keepsakes',
  'Bathroom Cabinet & Extras',
];

// Strip weight/volume/count suffixes from item names for complimentary items
// e.g. "Bedtime Balm Tea 200g" → "Bedtime Balm Tea", "Coffee Pods 60pk" → "Coffee Pods"
function cleanItemName(name: string, isComplimentary: boolean): string {
  if (!isComplimentary) return name;
  return name.replace(/\s+\d+(\.\d+)?\s*(g|kg|ml|L|oz|lb|pk)\s*$/i, '').trim();
}

function parseNotes(notes: string | null): { description: string; price: string; isComplimentary: boolean } {
  if (!notes) return { description: '', price: '', isComplimentary: false };

  const priceMatch = notes.match(/Sell \$([0-9.]+)/);
  const isComplimentary = notes.includes('Complimentary') || notes.includes('Also complimentary');
  const price = priceMatch ? `$${priceMatch[1]}` : (isComplimentary ? 'Complimentary' : '');

  let description = notes
    .split('.')
    .map(s => s.trim())
    .filter(s => s && !/^Sell \$/.test(s) && s !== 'Complimentary' && s !== 'Also complimentary')
    .join(', ');

  // Also strip any weight/volume patterns that crept into the description
  if (isComplimentary) {
    description = description.replace(/\b\d+(\.\d+)?\s*(g|kg|ml|L|oz|lb|pk)\b/gi, '').replace(/,\s*,/g, ',').replace(/^,\s*|,\s*$/g, '').trim();
  }

  return { description, price, isComplimentary };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Cache for 5 minutes at the edge, refresh quietly after that
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

  try {
    const db = supabase();
    const { data, error } = await db
      .from('stock_items')
      .select('item_name, store_section, notes, suppliers(supplier_name)')
      .eq('active', true)
      .order('store_section')
      .order('item_name');

    if (error) throw error;

    type Row = {
      item_name: string;
      store_section: string | null;
      notes: string | null;
      suppliers: { supplier_name: string } | null;
    };
    const rows = (data || []) as unknown as Row[];

    // Group: store_section -> supplier -> items
    const grouped: Record<string, Record<string, { name: string; description: string; price: string }[]>> = {};

    for (const row of rows) {
      const section = row.store_section || 'Other';
      const supplier = row.suppliers?.supplier_name || 'Rocky Hills Retreat';
      const { description, price, isComplimentary } = parseNotes(row.notes);
      const name = cleanItemName(row.item_name, isComplimentary);

      grouped[section] = grouped[section] || {};
      grouped[section][supplier] = grouped[section][supplier] || [];
      grouped[section][supplier].push({ name, description, price });
    }

    // Use defined order, then any remaining sections alphabetically
    const orderedSections = [
      ...SECTION_ORDER.filter(s => grouped[s]),
      ...Object.keys(grouped).filter(s => !SECTION_ORDER.includes(s)).sort(),
    ];

    const sections = orderedSections.map(section => ({
      category: section,
      suppliers: Object.entries(grouped[section])
        .sort(([a], [b]) => (a === 'Rocky Hills Retreat' ? 1 : b === 'Rocky Hills Retreat' ? -1 : a.localeCompare(b)))
        .map(([supplier, items]) => ({ supplier, items })),
    }));

    return res.status(200).json({ sections });

  } catch (err: any) {
    console.error('store-list handler error:', err);
    return res.status(500).json({ error: 'Could not load the store list right now.' });
  }
}
