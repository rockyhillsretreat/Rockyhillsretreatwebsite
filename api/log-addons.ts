import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Courtenay's people.id — all add-on tasks are assigned to her for review
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
    const {
      firstName, lastName, email, phone,
      street, city, state, postcode, country,
      arrival, departure, nights, quoteId,
      selectedPackage, selectedProvisions, selectedExperiences, selectedCelebrations,
      voucher, notes,
    } = req.body;

    const db = supabase();
    const fullName = `${firstName} ${lastName}`.trim();

    // 1. Upsert guest by email — captures contact details from the booking form
    let guestId: string | null = null;
    if (email) {
      const { data: guest, error: guestErr } = await db
        .from('guests')
        .upsert(
          { full_name: fullName, email: email.toLowerCase(), phone: phone || null },
          { onConflict: 'email', ignoreDuplicates: false }
        )
        .select('id')
        .single();

      if (guestErr) {
        console.error('Guest upsert error:', guestErr.message);
      } else {
        guestId = guest.id;
      }
    }

    const address = [street, city, state, postcode, country].filter(Boolean).join(', ');

    // 2. Create parent task — booking info in notes
    const parentNotes = [
      `Guest: ${fullName}`,
      email    ? `Email: ${email}` : null,
      phone    ? `Phone: ${phone}` : null,
      address  ? `Address: ${address}` : null,
      `Arrival: ${arrival}`,
      `Departure: ${departure}`,
      nights   ? `Nights: ${nights}` : null,
      quoteId  ? `OR Quote ID: ${quoteId}` : null,
      voucher  ? `Voucher: ${voucher}` : null,
      notes    ? `Guest notes: ${notes}` : null,
    ].filter(Boolean).join('\n');

    const { data: parentTask, error: taskErr } = await db.from('tasks').insert({
      title:       `Booking enquiry — ${fullName}, arriving ${arrival}`,
      category:    'Guest add-ons',
      assigned_to: COURTENAY_ID,
      status:      'Not Started',
      priority:    'High',
      due_date:    arrival,
      notes:       parentNotes,
    }).select('id').single();

    if (taskErr) console.error('Task creation error:', taskErr.message);

    // 3. Create subtasks — one per add-on
    if (parentTask?.id) {
      const addons: string[] = [
        selectedPackage ? `Package: ${selectedPackage}` : null,
        ...(selectedExperiences ?? []).map((e: string) => `Experience: ${e}`),
        ...(selectedProvisions ?? []).map((p: string) => `Provision: ${p}`),
        ...(selectedCelebrations ?? []).map((c: string) => `Celebration: ${c}`),
      ].filter(Boolean) as string[];

      for (const title of addons) {
        const { error: subErr } = await db.from('tasks').insert({
          title,
          category:       'Guest add-ons',
          assigned_to:    COURTENAY_ID,
          status:         'Not Started',
          priority:       'High',
          due_date:       arrival,
          parent_task_id: parentTask.id,
        });
        if (subErr) console.error('Subtask error:', subErr.message);
      }

      // Trigger email notification
      fetch('https://rhr-management.vercel.app/api/tasks/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_id: parentTask.id }),
      }).catch(e => console.error('Notify error:', e.message));
    }

    return res.status(200).json({ success: true, guest_id: guestId });

  } catch (err: any) {
    console.error('Add-ons handler error:', err);
    // Never block the booking flow
    return res.status(200).json({ success: false, warning: err.message });
  }
}
