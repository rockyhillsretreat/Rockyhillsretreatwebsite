import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { firstName, lastName, email, phone, inquiryType, message } = req.body;

    if (!firstName || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required.' });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Rocky Hills Retreat" <${process.env.SMTP_USER}>`,
      to: 'stay@rockyhillsretreat.com.au',
      replyTo: email,
      subject: `Website enquiry — ${inquiryType || 'General'} — ${firstName} ${lastName || ''}`.trim(),
      text: [
        `From: ${firstName} ${lastName || ''}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        `Type: ${inquiryType || 'General Inquiry'}`,
        '',
        message,
      ].filter(Boolean).join('\n'),
      html: `
        <p><strong>From:</strong> ${firstName} ${lastName || ''}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Type:</strong> ${inquiryType || 'General Inquiry'}</p>
        <hr/>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Failed to send message. Please email us directly at stay@rockyhillsretreat.com.au' });
  }
}
