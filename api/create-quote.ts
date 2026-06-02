import type { VercelRequest, VercelResponse } from '@vercel/node';

const OR_BASE = 'https://app.ownerrez.com/api';
const PROPERTY_ID = 485328;

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
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Phone: phone || '',
    });

    if (!guestResult.ok) {
      console.error('Guest creation failed:', guestResult.status, guestResult.raw);
      return res.status(500).json({ error: 'Failed to create guest', detail: guestResult.raw });
    }

    const guestId = guestResult.data.Id || guestResult.data.id;
    console.log('Guest created, ID:', guestId, 'Response:', JSON.stringify(guestResult.data));

    if (!guestId) {
      return res.status(500).json({ error: 'Guest created but no ID returned', detail: JSON.stringify(guestResult.data) });
    }

    // Step 2: Create quote using PascalCase as per OwnerRez docs
    const quoteBody: any = {
      GuestId: guestId,
      PropertyId: PROPERTY_ID,
      Arrival: arrival,
      Departure: departure,
      Adults: adults || 2,
      Children: 0,
      Pets: 0,
    };
    if (voucher) quoteBody.DiscountCode = voucher;
    if (notes) quoteBody.Notes = notes;

    console.log('Creating quote with:', JSON.stringify(quoteBody));
    const quoteResult = await orPost('/quotes', quoteBody);
    console.log('Quote result:', quoteResult.status, quoteResult.raw.substring(0, 500));

    if (!quoteResult.ok) {
      return res.status(500).json({ error: 'Failed to create quote', detail: quoteResult.raw });
    }

    const quote = quoteResult.data;
    const paymentUrl = quote.PaymentForm || quote.payment_form_url || quote.paymentForm || null;

    return res.status(200).json({
      quoteId: quote.Id || quote.id,
      paymentUrl,
      total: quote.TotalAmount || quote.total_amount,
      currency: 'AUD',
      nights: quote.Nights || quote.nights,
      charges: quote.Charges || quote.charges || [],
    });

  } catch (err: any) {
    console.error('Quote handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}