import type { VercelRequest, VercelResponse } from '@vercel/node';

const OR_BASE = 'https://app.ownerrez.com/api';
const PROPERTY_ID = 485328;
const REDIRECT_URL = 'https://rockyhillsretreatwebsite.vercel.app/confirmation';

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
    const { arrival, departure, adults, firstName, lastName, email, phone, street, city, state, postcode, country, notes, voucher } = req.body;

    if (!arrival || !departure || !firstName || !lastName || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Step 1: Create guest
    const guestBody: any = {
      first_name: firstName,
      last_name: lastName,
      email_addresses: [{ address: email, is_default: true }],
    };
    if (phone) guestBody.phones = [{ number: phone, is_default: true }];
    if (street || city) guestBody.addresses = [{
      street1: street || '',
      city: city || '',
      state: state || '',
      postal_code: postcode || '',
      country: country || 'Australia',
      is_default: true,
    }];

    const guestResult = await orPost('/guests', guestBody);

    if (!guestResult.ok) {
      return res.status(500).json({ error: 'Failed to create guest', detail: guestResult.raw });
    }

    const guestId = guestResult.data.id || guestResult.data.Id;
    if (!guestId) {
      return res.status(500).json({ error: 'Guest created but no ID returned' });
    }

    // Step 2: Create quote
    const quoteBody: any = {
      GuestId: guestId,
      PropertyId: PROPERTY_ID,
      Arrival: arrival,
      Departure: departure,
      Adults: adults || 2,
      Children: 0,
      Pets: 0,
      RedirectAfterBookingUrl: REDIRECT_URL,
    };
    if (voucher) quoteBody.DiscountCode = voucher;
    if (notes) quoteBody.Notes = notes;

    const quoteResult = await orPost('/quotes', quoteBody);

    if (!quoteResult.ok) {
      return res.status(500).json({ error: 'Failed to create quote', detail: quoteResult.raw });
    }

    const quote = quoteResult.data;
    const quoteKey = quote.Key || quote.key;

    // Build payment URL -- append guest details as URL params for pre-population
    let paymentUrl = quote.PaymentForm
      || quote.payment_form_url
      || (quoteKey ? `https://orez.io/v1/q/${quoteKey.replace(/-/g, '')}` : null);

    // Append guest details to pre-populate the OwnerRez form
    if (paymentUrl) {
      const params = new URLSearchParams({
        firstname: firstName,
        lastname: lastName,
        email: email,
        ...(phone ? { phone } : {}),
      });
      paymentUrl = `${paymentUrl}?${params.toString()}`;
    }

    // Normalize charges -- filter out tax lines for display, keep rent lines
    const rawCharges = quote.Charges || quote.charges || [];
    const charges = rawCharges.map((c: any) => ({
      description: c.Description || c.description,
      amount: c.Amount || c.amount,
      isTax: (c.Type || c.type) === 3,
    }));

    const total = rawCharges.reduce((sum: number, c: any) => sum + (c.Amount || c.amount || 0), 0);

    return res.status(200).json({
      quoteId: quote.Id || quote.id,
      quoteKey,
      paymentUrl,
      total,
      currency: 'AUD',
      nights: quote.Nights || quote.nights,
      charges,
    });

  } catch (err: any) {
    console.error('Quote handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
