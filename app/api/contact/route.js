import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { rateLimit, clientIpFrom } from "@/lib/rateLimit";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { sendNotificationEmail } from "@/lib/mailer";

export async function POST(request) {
  const ip = clientIpFrom(request);
  const limited = rateLimit(`contact:${ip}`);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    // Honeypot tripped -> pretend success so bots don't learn anything,
    // but don't actually save/send.
    //
    // NOTE: if this fires for a real user, it's almost always browser
    // autofill silently filling the hidden company_website field, not an
    // actual bot. See the fix in ContactSection.jsx (honeypot moved
    // off-screen + renamed away from "company"/"website"). This log line
    // is here so you can confirm in your server logs whether that's what's
    // happening — remove it once you've verified the fix works.
    if (parsed.error.issues.some((i) => i.path[0] === "company_website")) {
      console.warn(
        "[contact] Honeypot tripped — likely autofill, not a bot. company_website value:",
        body?.company_website
      );
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { error: "Please check the form.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, message, stage, need } = parsed.data;

  let savedToDb = false;
  let emailSent = false;

  try {
    const db = getAdminDb();
    if (db) {
      await db.collection("contacts").add({
        name,
        email,
        message,
        stage,
        need,
        formType: "contact",
        ip,
        timestamp: new Date(),
      });
      savedToDb = true;
    }
  } catch (err) {
    console.error("Firestore save failed:", err);
  }

  try {
    const result = await sendNotificationEmail({
      subject: `Contact Form — ${need || "General Enquiry"}`,
      replyTo: email,
      text: `From: ${name}\nEmail: ${email}\nStage: ${stage || "Not specified"}\nNeed: ${
        need || "Not specified"
      }\n\nMessage:\n${message}`,
    });
    emailSent = result.sent;
  } catch (err) {
    console.error("Email send failed:", err);
  }

  if (!savedToDb && !emailSent) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again, or email us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, firstName: name.split(" ")[0] });
}