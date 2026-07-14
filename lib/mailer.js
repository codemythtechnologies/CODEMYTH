import nodemailer from "nodemailer";

// The original site called EmailJS directly from the browser with a public
// key + service/template IDs baked into the JS bundle. That's how EmailJS's
// free tier is designed to work, but it does mean anyone who reads the
// page source can call your EmailJS service/template with arbitrary data.
//
// Here, the browser only ever talks to our own /api/* routes. Those routes
// validate + rate-limit the request, THEN send mail server-side over SMTP
// with credentials that never reach the client. Swap the transport below
// for your real provider (Gmail app password, SendGrid, Postmark, Resend,
// your company SMTP, etc.) via environment variables.
let transporter;

function getTransporter() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

export async function sendNotificationEmail({ subject, text, replyTo }) {
  const t = getTransporter();
  if (!t) {
    console.warn("SMTP not configured — skipping email send. Set SMTP_HOST/SMTP_USER/SMTP_PASS.");
    return { sent: false, reason: "not_configured" };
  }
  const to = process.env.CONTACT_INBOX || "codemyth.technologies@gmail.com";
  await t.sendMail({
    from: process.env.SMTP_FROM || `"Code Myth Website" <${process.env.SMTP_USER}>`,
    to,
    replyTo,
    subject,
    text,
  });
  return { sent: true };
}
