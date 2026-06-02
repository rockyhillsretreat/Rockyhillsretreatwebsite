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

    // Use the bookings endpoint to get blocked dates
    const response = await fetch(
      `${OR_BASE}/bookings?property_id=${PROPERTY_ID}&arrival=${from}&departure=${to}&include_blocks=true`,
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
      console.error('OwnerRez bookings error:', response.status, text.substring(0, 200));
      return res.status(200).json({ days: [] });
    }

    const data = await response.json();
    console.log('Bookings response sample:', JSON.stringify(data).substring(0, 500));

    // Build set of blocked dates from bookings and blocks
    const days: { date: string; available: boolean }[] = [];
    const items = data.items || data.Items || (Array.isArray(data) ? data : []);

    items.forEach((booking: any) => {
      const arrival = (booking.arrival || booking.Arrival || '').split('T')[0];
      const departure = (booking.departure || booking.Departure || '').split('T')[0];
      if (!arrival || !departure) return;

      // Block all dates from arrival up to (not including) departure
      const start = new Date(arrival);
      const end = new Date(departure);
      const current = new Date(start);
      while (current < end) {
        days.push({
          date: current.toISOString().split('T')[0],
          available: false,
        });
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
