import type { VercelRequest, VercelResponse } from '@vercel/node';

const OR_BASE = 'https://app.ownerrez.com/api';
const PROPERTY_ID = 485328;

function getAuthHeader() {
  const username = process.env.OWNERREZ_USERNAME || '';
  const token = process.env.OWNERREZ_API_KEY || '';
  return 'Basic ' + Buffer.from(`${username}:${token}`).toString('base64');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const from = new Date().toISOString().split('T')[0];
    const to = new Date(Date.now() + 18 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // Try the propertycalendar endpoint
    const response = await fetch(
      `${OR_BASE}/v2/propertycalendars?ids=${PROPERTY_ID}&startdate=${from}&enddate=${to}`,
      {
        headers: {
          'Authorization': getAuthHeader(),
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'RockyHillsRetreat/1.0',
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error('OwnerRez availability error:', response.status, text);
      return res.status(200).json({ days: [] });
    }

    const data = await response.json();
    console.log('Availability raw:', JSON.stringify(data).substring(0, 500));

    // Normalize to array of { date, available } objects
    const days: { date: string; available: boolean }[] = [];
    const items = data.items || data.Items || data || [];

    if (Array.isArray(items)) {
      items.forEach((property: any) => {
        const slots = property.available_slots || property.AvailableSlots || property.days || property.Days || [];
        if (Array.isArray(slots)) {
          slots.forEach((slot: any) => {
            days.push({
              date: slot.date || slot.Date,
              available: slot.available !== false && slot.Available !== false && slot.status !== 'booked',
            });
          });
        }
      });
    }

    return res.status(200).json({ days });
  } catch (err: any) {
    console.error('Availability handler error:', err);
    return res.status(200).json({ days: [] });
  }
}
