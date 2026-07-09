import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Courtenay's people.id, all add-on tasks are assigned to her for review
const COURTENAY_ID = 'd095ebea-cf06-48dc-8847-1a40afe4f4de';

function supabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { bookingId, guest, arrival, selections } = req.body as {
      bookingId?: string;
      guest?: string;
      arrival?: string;
      selections?: { type: string; name: string }[];
    };

    if (!selections || selections.length === 0) {
      return res.status(400).json({ error: 'No selections provided' });
    }

    const db = supabase();
    const parentNotes = [
      guest      ? `Guest: ${guest}` : null,
      bookingId  ? `OR Booking ID: ${bookingId}` : null,
      'Requested via post-booking extras page',
    ].filter(Boolean).join('\n');

    const { data: parentTask, error: taskErr } = await db.from('tasks').insert({
      title:       `Add-on request${guest ? `: ${guest}` : ''}${arrival ? `, arriving ${arrival}` : ''}`,
      category:    'Guest add-ons',
      assigned_to: COURTENAY_ID,
      status:      'Not Started',
      priority:    'High',
      due_date:    arrival || null,
      notes:       parentNotes,
    }).select('id').single();

    if (taskErr) {
      console.error('Parent task creation error:', taskErr.message);
      return res.status(200).json({ success: false, warning: taskErr.message });
    }

    if (parentTask?.id) {
      for (const s of selections) {
        const { error: subErr } = await db.from('tasks').insert({
          title:          `${s.type}: ${s.name}`,
          category:       'Guest add-ons',
          assigned_to:    COURTENAY_ID,
          status:         'Not Started',
          priority:       'High',
          due_date:       arrival || null,
          parent_task_id: parentTask.id,
        });
        if (subErr) console.error('Subtask error:', subErr.message);
      }

      fetch('https://rhr-management.vercel.app/api/tasks/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_id: parentTask.id }),
      }).catch(e => console.error('Notify error:', e.message));
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('request-extras handler error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
