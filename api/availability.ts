import type { VercelRequest, VercelResponse } from '@vercel/node';

const OR_V2_BASE = 'https://api.ownerrez.com/v2';
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
    const today = new Date();
    today.setHours(0,0,0,0);
    const maxDate = new Date(Date.now() + 18 * 30 * 24 * 60 * 60 * 1000);

    const response = await fetch(
      `${OR_V2_BASE}/bookings?property_id=${PROPERTY_ID}&since_utc=2020-01-01T00:00:00Z&page_size=200`,
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
      console.error('OwnerRez v2 bookings error:', response.status, text.substring(0, 200));
      return res.status(200).json({ days: [] });
    }

    const data = await response.json();
    const items = data.items || data.Items || (Array.isArray(data) ? data : []);

    const days: { date: string; available: boolean }[] = [];

    items.forEach((booking: any) => {
      const arrivalStr = (booking.arrival || '').split('T')[0];
      const departureStr = (booking.departure || '').split('T')[0];
      if (!arrivalStr || !departureStr) return;

      const arrival = new Date(arrivalStr);
      const departure = new Date(departureStr);

      // Skip if departure is in the past
      if (departure <= today) return;
      // Skip if arrival is beyond our 18 month window
      if (arrival > maxDate) return;
      // Safety check -- skip if range is more than 60 days (data error)
      const rangeDays = (departure.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24);
      if (rangeDays > 60) {
        console.warn(`Skipping suspicious booking ${booking.id}: ${arrivalStr} to ${departureStr} (${rangeDays} days)`);
        return;
      }

      // Block arrival date through day before departure (checkout day is available)
      const current = new Date(arrival);
      while (current < departure) {
        const dateStr = current.toISOString().split('T')[0];
        days.push({ date: dateStr, available: false });
        current.setDate(current.getDate() + 1);
      }
    });

    console.log(`Blocked ${days.length} dates from ${items.length} bookings/blocks`);
    return res.status(200).json({ days });

  } catch (err: any) {
    console.error('Availability handler error:', err);
    return res.status(200).json({ days: [] });
  }
}
