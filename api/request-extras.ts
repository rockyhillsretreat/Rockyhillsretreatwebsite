import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

// Courtenay's people.id, all add-on tasks are assigned to her for review
const COURTENAY_ID = 'd095ebea-cf06-48dc-8847-1a40afe4f4de';

function supabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

// Try to extract a YYYY-MM-DD date from whatever OwnerRez sends (e.g. "Check-in is 2 - 8 PM", "2025-11-15", etc.)
function parseArrivalDate(arrival?: string): string | null {
  if (!arrival) return null;
  // Direct ISO date
  const isoMatch = arrival.match(/(\d{4}-\d{2}-\d{2})/);
  if (isoMatch) return isoMatch[1];
  // Try parsing as a date (handles "November 15, 2025" etc.)
  const d = new Date(arrival);
  if (!isNaN(d.getTime())) return d.toISOString().split('T')[0];
  return null;
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
      due_date:    parseArrivalDate(arrival),
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
          due_date:       parseArrivalDate(arrival),
          parent_task_id: parentTask.id,
        });
        if (subErr) console.error('Subtask error:', subErr.message);
      }

      fetch('https://rhr-management.vercel.app/api/tasks/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_id: parentTask.id }),
      }).catch(e => console.error('Notify error:', e.message));

      // Look up guest email from Supabase, then send both emails
      let guestEmail: string | null = null;
      if (bookingId) {
        const { data: booking } = await db
          .from('bookings')
          .select('guest:guest_id(email)')
          .eq('ownerrez_id', bookingId)
          .single();
        guestEmail = (booking?.guest as { email?: string } | null)?.email ?? null;
      }

      sendAlertEmail({ guest, arrival, bookingId, selections }).catch(e =>
        console.error('Alert email error:', e.message)
      );

      if (guestEmail) {
        sendGuestConfirmation({ guestEmail, guest, arrival, selections }).catch(e =>
          console.error('Guest confirmation email error:', e.message)
        );
      }
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('request-extras handler error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}

async function sendAlertEmail({
  guest, arrival, bookingId, selections,
}: {
  guest?: string; arrival?: string; bookingId?: string;
  selections?: { type: string; name: string }[];
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

  // Flag imminent arrivals (within 5 days)
  let daysUntilArrival: number | null = null;
  if (arrival) {
    const arrivalDate = new Date(arrival);
    if (!isNaN(arrivalDate.getTime())) {
      daysUntilArrival = Math.ceil((arrivalDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    }
  }
  const isImminent = daysUntilArrival !== null && daysUntilArrival <= 5;

  const itemList = (selections ?? [])
    .map(s => `<li style="margin-bottom:4px;">${s.type}: <strong>${s.name}</strong></li>`)
    .join('');

  const urgencyBanner = isImminent ? `
    <div style="background:#7A2A2A;color:#fff;padding:12px 20px;border-radius:6px;margin-bottom:20px;">
      ⚠️ <strong>Imminent arrival${daysUntilArrival === 0 ? ' — today' : ` in ${daysUntilArrival} day${daysUntilArrival === 1 ? '' : 's'}`}.</strong> Action required urgently.
    </div>` : '';

  const html = `
    <div style="font-family:sans-serif;max-width:560px;color:#333;">
      ${urgencyBanner}
      <h2 style="margin-bottom:4px;">Add-on request received</h2>
      <p style="color:#666;margin-top:0;">
        ${guest ? `<strong>${guest}</strong>` : 'A guest'} has selected extras via the pre-arrival page.
        ${arrival ? `Arrival: <strong>${arrival}</strong>.` : ''}
        ${bookingId ? `Booking: ${bookingId}.` : ''}
      </p>
      <ul style="padding-left:20px;line-height:1.8;">${itemList}</ul>
      <p style="color:#555;margin-top:16px;">Please review and confirm with the guest. All items are subject to availability — allow at least 5 days to arrange.</p>
      <a href="https://rhr-management.vercel.app/tasks" style="display:inline-block;background:#8FA9B3;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:500;margin-top:8px;">View in Management App</a>
    </div>`;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"Rocky Hills Retreat" <${process.env.SMTP_USER}>`,
    to: 'rockyhillsretreat@gmail.com',
    subject: isImminent
      ? `⚠️ URGENT add-on request — ${guest ?? 'Guest'} arriving ${arrival ?? 'soon'}`
      : `Add-on request — ${guest ?? 'Guest'}${arrival ? `, arriving ${arrival}` : ''}`,
    html,
  });
}

async function sendGuestConfirmation({
  guestEmail, guest, arrival, selections,
}: {
  guestEmail: string; guest?: string; arrival?: string;
  selections?: { type: string; name: string }[];
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

  const firstName = guest ?? 'there';
  const itemList = (selections ?? [])
    .map(s => `<li style="margin-bottom:6px;">${s.name}</li>`)
    .join('');

  const html = `
    <div style="font-family:Georgia,serif;max-width:560px;color:#3A3830;background:#FAF8F4;padding:40px;">
      <p style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#8FA9B3;margin:0 0 24px;">Rocky Hills Retreat</p>
      <h2 style="font-size:24px;font-weight:normal;margin:0 0 20px;color:#1A1A18;">Thank you, ${firstName}.</h2>
      <p style="line-height:1.8;margin:0 0 16px;">We've received your requests and will be in touch as soon as we can to confirm everything.</p>
      <p style="line-height:1.8;margin:0 0 24px;">Here's what you selected:</p>
      <ul style="padding-left:20px;line-height:2;color:#3A3830;margin:0 0 24px;">${itemList}</ul>
      <p style="line-height:1.8;margin:0 0 16px;">All items are subject to availability. If anything isn't possible, we'll let you know and suggest alternatives where we can.</p>
      <p style="line-height:1.8;margin:0;">We look forward to welcoming you${arrival ? ` on ${arrival}` : ''}.</p>
      <p style="margin:32px 0 0;color:#8FA9B3;font-size:14px;">Courtenay<br>Rocky Hills Retreat</p>
    </div>`;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: '"Rocky Hills Retreat" <stay@rockyhillsretreat.com.au>',
    replyTo: 'stay@rockyhillsretreat.com.au',
    to: guestEmail,
    subject: `Your requests for Rocky Hills Retreat`,
    html,
  });
}
