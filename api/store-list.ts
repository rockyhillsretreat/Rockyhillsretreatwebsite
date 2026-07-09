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

function parseNotes(notes: string | null): { description: string; price: string } {
  if (!notes) return { description: '', price: '' };

  const priceMatch = notes.match(/Sell \$([0-9.]+)/);
  const price = priceMatch ? `$${priceMatch[1]}` : (notes.includes('Complimentary') ? 'Complimentary' : '');

  const description = notes
    .split('.')
    .map(s => s.trim())
    .filter(s => s && !/^Sell \$/.test(s) && s !== 'Complimentary' && s !== 'Also complimentary')
    .join(', ');

  return { description, price };
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
      const { description, price } = parseNotes(row.notes);

      grouped[section] = grouped[section] || {};
      grouped[section][supplier] = grouped[section][supplier] || [];
      grouped[section][supplier].push({ name: row.item_name, description, price });
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
