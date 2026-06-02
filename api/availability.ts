import type { VercelRequest, VercelResponse } from '@vercel/node';

const OR_BASE = 'https://app.ownerrez.com/api/v2';
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

    const response = await fetch(
      `${OR_BASE}/availability?property_id=${PROPERTY_ID}&start_date=${from}&end_date=${to}`,
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
      // Return empty availability so the calendar still renders
      return res.status(200).json({ days: [] });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err: any) {
    console.error('Availability handler error:', err);
    return res.status(200).json({ days: [] });
  }
}
