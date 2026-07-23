import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

function supabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
}

const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_KEY;
const KLAVIYO_REVISION = '2024-10-15';

async function klaviyoUpsertProfile(email: string, firstName?: string, lastName?: string, phone?: string, properties: Record<string, any> = {}) {
  if (!KLAVIYO_API_KEY) return;
  try {
    await fetch('https://a.klaviyo.com/api/profiles/', {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        'Content-Type': 'application/vnd.api+json',
        'revision': KLAVIYO_REVISION,
      },
      body: JSON.stringify({
        data: {
          type: 'profile',
          attributes: {
            email,
            first_name: firstName || undefined,
            last_name: lastName || undefined,
            phone_number: phone || undefined,
            properties,
          },
        },
      }),
    });
  } catch (e: any) {
    console.error('Klaviyo profile upsert error:', e.message);
  }
}

async function klaviyoTrackEvent(email: string, metricName: string, properties: Record<string, any> = {}) {
  if (!KLAVIYO_API_KEY) return;
  try {
    await fetch('https://a.klaviyo.com/api/events/', {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        'Content-Type': 'application/vnd.api+json',
        'revision': KLAVIYO_REVISION,
      },
      body: JSON.stringify({
        data: {
          type: 'event',
          attributes: {
            properties,
            metric: { data: { type: 'metric', attributes: { name: metricName } } },
            profile: { data: { type: 'profile', attributes: { email } } },
          },
        },
      }),
    });
  } catch (e: any) {
    console.error('Klaviyo event track error:', e.message);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

try {
  const { firstName, lastName, email, phone, checkIn, checkOut, nights, guests } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(200).json({ success: false, warning: 'Invalid or missing email' });
  }

  const normalizedEmail = String(email).toLowerCase();
  const fullName = `${firstName || ''} ${lastName || ''}`.trim();

  // 1. Supabase — same guests table log-addons.ts writes to on a completed booking,
  // so a partial lead shows up in RHR-Management right away instead of only on payment.
  const db = supabase();
  const { error: guestErr } = await db
  .from('guests')
  .upsert(
    { full_name: fullName || null, email: normalizedEmail, phone: phone || null },
    { onConflict: 'email', ignoreDuplicates: false }
    );
  if (guestErr) console.error('Guest upsert error:', guestErr.message);

  // 2. Klaviyo — identify the profile server-side (redundant with the client-side
  // klaviyo.identify() call in case of ad blockers/timing) and log a 'Started Booking'
  // event carrying the partial booking context, so a flow can trigger off it.
  // NOTE for Courtenay: confirm the abandoned-booking flow's trigger matches this —
  // I couldn't check the Klaviyo account directly, so verify the trigger is either
  // this 'Started Booking' metric or a segment based on the profile properties below.
  const bookingProps = {
    booking_lead_status: 'started',
    inquiry_check_in: checkIn || null,
    inquiry_check_out: checkOut || null,
    inquiry_nights: nights || null,
    inquiry_guests: guests || null,
    last_booking_inquiry_date: new Date().toISOString(),
  };
  await klaviyoUpsertProfile(normalizedEmail, firstName, lastName, phone, bookingProps);
  await klaviyoTrackEvent(normalizedEmail, 'Started Booking', {
    check_in: checkIn, check_out: checkOut, nights, guests,
  });

  return res.status(200).json({ success: true });

} catch (err: any) {
  console.error('Capture-lead handler error:', err);
  // Never block the booking flow
  return res.status(200).json({ success: false, warning: err.message });
}
}
