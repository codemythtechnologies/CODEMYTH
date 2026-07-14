import { NextResponse } from "next/server";
import { baConsultSchema } from "@/lib/schemas";
import { rateLimit, clientIpFrom } from "@/lib/rateLimit";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { sendNotificationEmail } from "@/lib/mailer";

export async function POST(request) {
  const ip = clientIpFrom(request);
  const limited = rateLimit(`ba-consult:${ip}`);
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

  const parsed = baConsultSchema.safeParse(body);
  if (!parsed.success) {
    if (parsed.error.issues.some((i) => i.path[0] === "company_website")) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { error: "Please check the form.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, company, phone, need, message } = parsed.data;

  let savedToDb = false;
  let emailSent = false;

  try {
    const db = getAdminDb();
    if (db) {
      await db.collection("ba_consultations").add({
        name,
        email,
        company,
        phone,
        need,
        message,
        formType: "ba_consultation",
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
      subject: `BA Consultation Request — ${need || "General"}`,
      replyTo: email,
      text: `From: ${name}\nEmail: ${email}\nCompany: ${company || "Not provided"}\nPhone: ${
        phone || "Not provided"
      }\nService needed: ${need || "Not specified"}\n\nMessage:\n${message}`,
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
