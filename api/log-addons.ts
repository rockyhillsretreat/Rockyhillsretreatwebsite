import type { VercelRequest, VercelResponse } from '@vercel/node';

const MAKE_WEBHOOK = 'https://hook.eu1.make.com/dcgwi8f68a3uah5oq9t0uolfb68drk94';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const {
      // Guest details
      firstName,
      lastName,
      email,
      phone,
      // Booking details
      arrival,
      departure,
      nights,
      quoteId,
      // Add-on selections
      selectedPackage,
      selectedProvisions,
      selectedExperiences,
      selectedCelebrations,
      voucher,
      notes,
    } = req.body;

    // Format add-ons as readable strings for Airtable
    const addOnsSummary = [
      selectedPackage ? `Package: ${selectedPackage}` : null,
      selectedProvisions?.length ? `Provisions: ${selectedProvisions.join(', ')}` : null,
      selectedExperiences?.length ? `Experiences: ${selectedExperiences.join(', ')}` : null,
      selectedCelebrations?.length ? `Celebrations: ${selectedCelebrations.join(', ')}` : null,
    ].filter(Boolean).join(' | ');

    const payload = {
      // Source identifier for Make routing
      source: 'rhr_booking_addons',
      // Guest
      guest_name: `${firstName} ${lastName}`,
      guest_email: email,
      guest_phone: phone || '',
      // Booking
      arrival,
      departure,
      nights: nights || '',
      quote_id: quoteId || '',
      voucher: voucher || '',
      // Add-ons
      package_selected: selectedPackage || '',
      provisions: selectedProvisions?.join(', ') || '',
      experiences: selectedExperiences?.join(', ') || '',
      celebrations: selectedCelebrations?.join(', ') || '',
      addons_summary: addOnsSummary || 'No add-ons selected',
      // Notes
      notes: notes || '',
      // Timestamp
      submitted_at: new Date().toISOString(),
    };

    const makeRes = await fetch(MAKE_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!makeRes.ok) {
      const errText = await makeRes.text();
      console.error('Make webhook error:', makeRes.status, errText);
      // Don't fail the booking flow if Airtable logging fails
      return res.status(200).json({ success: false, warning: 'Add-ons logged but Airtable sync failed' });
    }

    return res.status(200).json({ success: true });

  } catch (err: any) {
    console.error('Add-ons handler error:', err);
    // Don't block the booking flow
    return res.status(200).json({ success: false, warning: err.message });
  }
}
