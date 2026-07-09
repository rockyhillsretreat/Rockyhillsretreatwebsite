import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Courtenay's people.id , all add-on tasks are assigned to her for review
const COURTENAY_ID = 'd095ebea-cf06-48dc-8847-1a40afe4f4de';

function supabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

function parseArrivalDate(arrival?: string): string | null {
  if (!arrival) return null;
  const isoMatch = arrival.match(/(\d{4}-\d{2}-\d{2})/);
  if (isoMatch) return isoMatch[1];
  const d = new Date(arrival);
  if (!isNaN(d.getTime())) return d.toISOString().split('T')[0];
  return null;
}

// GET-based handler , designed to be hit directly from a link/button in an
// OwnerRez email template, since email HTML can only fire GET requests.
// Example link built into a template:
//   https://rockyhillsretreat.com.au/api/addon-click?package=Beach+Picnic+Setup&type=Celebration&booking_id={BID}&guest={CFIRST}&arrival={BCHECKIN}
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const {
      package: packageName,
      type,       // Package | Experience | Provision | Celebration
      booking_id, // OwnerRez {BID}
      guest,      // OwnerRez {GFNAME}
      arrival,    // OwnerRez {GCHECKIN}, format YYYY-MM-DD
    } = req.query as Record<string, string>;

    if (!packageName || !type) {
      res.setHeader('Content-Type', 'text/html');
      return res.status(400).send(errorPage());
    }

    const db = supabase();
    const title = `${type}: ${packageName}`;
    const notes = [
      guest      ? `Guest: ${guest}` : null,
      booking_id ? `OR Booking ID: ${booking_id}` : null,
      'Requested via pre-arrival email button',
    ].filter(Boolean).join('\n');

    const { data: task, error } = await db.from('tasks').insert({
      title,
      category:    'Guest add-ons',
      assigned_to: COURTENAY_ID,
      status:      'Not Started',
      priority:    'High',
      due_date:    parseArrivalDate(arrival),
      notes,
    }).select('id').single();

    if (error) {
      console.error('addon-click task creation error:', error.message);
    } else if (task?.id) {
      // Same notify webhook used by the main booking flow
      fetch('https://rhr-management.vercel.app/api/tasks/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_id: task.id }),
      }).catch(e => console.error('Notify error:', e.message));
    }

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(confirmPage(packageName));
  } catch (err: any) {
    console.error('addon-click handler error:', err);
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(confirmPage());
  }
}

function confirmPage(item?: string) {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Request received , Rocky Hills Retreat</title></head>
<body style="margin:0; padding:0; background:#F5F2ED; font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:60px 20px;">
    <table width="480" cellpadding="0" cellspacing="0" style="background:#FAF8F4; border-radius:4px; overflow:hidden;">
      <tr><td style="background:#1E2E38; padding:32px 40px; text-align:center;">
        <p style="margin:0; font-size:10px; letter-spacing:3px; color:#8FA9B3; text-transform:uppercase;">Rocky Hills Retreat</p>
      </td></tr>
      <tr><td style="padding:40px; text-align:center;">
        <p style="margin:0 0 12px 0; font-size:20px; color:#1A1A18;">Thank you</p>
        <p style="margin:0; font-size:14px; color:#3A3830; line-height:1.6;">
          ${item ? `We've received your request for <strong>${item}</strong>.` : `We've received your request.`}
          We'll be in touch shortly to confirm details.
        </p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

function errorPage() {
  return `<!DOCTYPE html><html><body style="font-family:Georgia,serif; text-align:center; padding:60px 20px; color:#3A3830;">
    <p>Something went wrong with that link. Please contact us directly on +61 499 645 344.</p>
  </body></html>`;
}
