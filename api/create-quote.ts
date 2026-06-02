import type { VercelRequest, VercelResponse } from '@vercel/node';

const OR_BASE = 'https://app.ownerrez.com/api/v2';
const PROPERTY_ID = 485328;
const CONFIRMATION_URL = 'https://rockyhillsretreatwebsite.vercel.app/confirmation';

function getAuthHeader() {
  const username = process.env.OWNERREZ_USERNAME || '';
  const token = process.env.OWNERREZ_API_KEY || '';
  return 'Basic ' + Buffer.from(`${username}:${token}`).toString('base64');
}

async function orPost(path: string, body: any) {
  const res = await fetch(`${OR_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Authorization': getAuthHeader(),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'RockyHillsRetreat/1.0',
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json: any = {};
  try { json = JSON.parse(text); } catch {}
  return { ok: res.ok, status: res.status, data: json, raw: text };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { arrival, departure, adults, firstName, lastName, email, phone, notes, voucher } = req.body;

    if (!arrival || !departure || !firstName || !lastName || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Step 1: Create guest
    const guestResult = await orPost('/guests', {
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phone || '',
    });

    if (!guestResult.ok) {
      console.error('Guest creation failed:', guestResult.status, guestResult.raw);
      return res.status(500).json({ error: 'Failed to create guest', detail: guestResult.raw });
    }

    const guestId = guestResult.data.id;
    console.log('Guest created:', guestId);

    // Step 2: Create quote
    const quoteBody: any = {
      property_id: PROPERTY_ID,
      guest_id: guestId,
      arrival,
      departure,
      adults: adults || 2,
      children: 0,
      pets: 0,
    };
    if (voucher) quoteBody.discount_code = voucher;
    if (notes) quoteBody.notes = notes;

    const quoteResult = await orPost('/quotes', quoteBody);

    if (!quoteResult.ok) {
      console.error('Quote creation failed:', quoteResult.status, quoteResult.raw);
      return res.status(500).json({ error: 'Failed to create quote', detail: quoteResult.raw });
    }

    const quote = quoteResult.data;
    console.log('Quote created:', quote.id, 'PaymentForm:', quote.payment_form_url || quote.PaymentForm);

    // payment_form_url or PaymentForm depending on API version
    const paymentUrl = quote.payment_form_url || quote.PaymentForm || null;

    return res.status(200).json({
      quoteId: quote.id,
      paymentUrl,
      total: quote.total_amount || quote.TotalAmount,
      currency: 'AUD',
      nights: quote.nights || quote.Nights,
      charges: quote.charges || quote.Charges || [],
    });

  } catch (err: any) {
    console.error('Quote handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
