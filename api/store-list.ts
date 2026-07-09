import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

function supabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

const CATEGORY_LABELS: Record<string, string> = {
  Food: 'Food',
  Beverage: 'Drinks',
  Amenity: 'Bathroom Cabinet & Extras',
  Other: 'Keepsakes',
};

const CATEGORY_ORDER = ['Food', 'Beverage', 'Amenity', 'Other'];

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
  // Cache for 5 minutes at the edge, refresh quietly after that, so the page stays fast
  // but never drifts far from what's actually in the app.
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

  try {
    const db = supabase();
    const { data, error } = await db
      .from('stock_items')
      .select('item_name, category, notes, suppliers(supplier_name)')
      .eq('active', true)
      .order('category')
      .order('item_name');

    if (error) throw error;

    type Row = { item_name: string; category: string; notes: string | null; suppliers: { supplier_name: string } | null };
    const rows = (data || []) as unknown as Row[];

    // Group: category -> supplier -> items
    const grouped: Record<string, Record<string, { name: string; description: string; price: string }[]>> = {};

    for (const row of rows) {
      const cat = row.category || 'Other';
      const supplier = row.suppliers?.supplier_name || 'Rocky Hills Retreat';
      const { description, price } = parseNotes(row.notes);

      grouped[cat] = grouped[cat] || {};
      grouped[cat][supplier] = grouped[cat][supplier] || [];
      grouped[cat][supplier].push({ name: row.item_name, description, price });
    }

    const sections = CATEGORY_ORDER
      .filter(cat => grouped[cat])
      .map(cat => ({
        category: CATEGORY_LABELS[cat] || cat,
        suppliers: Object.entries(grouped[cat])
          .sort(([a], [b]) => (a === 'Rocky Hills Retreat' ? 1 : b === 'Rocky Hills Retreat' ? -1 : a.localeCompare(b)))
          .map(([supplier, items]) => ({ supplier, items })),
      }));

    return res.status(200).json({ sections });

  } catch (err: any) {
    console.error('store-list handler error:', err);
    return res.status(500).json({ error: 'Could not load the store list right now.' });
  }
}
