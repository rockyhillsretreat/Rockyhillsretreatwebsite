import type { VercelRequest, VercelResponse } from '@vercel/node';

const OR_BASE = 'https://app.ownerrez.com/api/v2';
const PROPERTY_ID = 'b607a4fc675641f4a6737795d38edc74';

function getAuthHeader() {
  const username = process.env.OWNERREZ_USERNAME || '';
  const token = process.env.OWNERREZ_API_KEY || '';
  return 'Basic ' + Buffer.from(`${username}:${token}`).toString('base64');
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

    // Step 1: Create or find guest
    const guestPayload = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phone || '',
    };

    const guestRes = await fetch(`${OR_BASE}/guests`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'RockyHillsRetreat/1.0',
      },
      body: JSON.stringify(guestPayload),
    });

    let guestId: string;
    if (guestRes.ok) {
      const guest = await guestRes.json();
      guestId = guest.id;
    } else {
      const errText = await guestRes.text();
      console.error('Guest creation error:', guestRes.status, errText);
      return res.status(guestRes.status).json({ error: 'Failed to create guest', detail: errText });
    }

    // Step 2: Create quote
    const quotePayload: any = {
      property_id: PROPERTY_ID,
      guest_id: guestId,
      arrival,
      departure,
      adults: adults || 2,
      children: 0,
      pets: 0,
    };

    if (voucher) quotePayload.discount_code = voucher;
    if (notes) quotePayload.host_notes = notes;

    const quoteRes = await fetch(`${OR_BASE}/quotes`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'RockyHillsRetreat/1.0',
      },
      body: JSON.stringify(quotePayload),
    });

    if (!quoteRes.ok) {
      const errText = await quoteRes.text();
      console.error('Quote creation error:', quoteRes.status, errText);
      return res.status(quoteRes.status).json({ error: 'Failed to create quote', detail: errText });
    }

    const quote = await quoteRes.json();

    // The quote will have a booking_url or payment_url for the guest to complete payment
    return res.status(200).json({
      quoteId: quote.id,
      paymentUrl: quote.booking_url || quote.payment_url || null,
      total: quote.total_amount,
      currency: quote.currency || 'AUD',
      nights: quote.nights,
      charges: quote.charges || [],
    });

  } catch (err: any) {
    console.error('Quote handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
