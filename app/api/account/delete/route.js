import { NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "@/lib/firebaseAdmin";
import { rateLimit, clientIpFrom } from "@/lib/rateLimit";

// The original site called the client-side `deleteUser(auth.currentUser)`
// straight from the browser, which only works if Firebase considers the
// sign-in "recent" and otherwise throws `auth/requires-recent-login`.
//
// Here the browser sends its Firebase ID token in the Authorization header;
// the server verifies that token with the Admin SDK (so it can't be forged),
// then deletes the Firestore profile doc and the Auth user itself. This
// also means account deletion can be audited/rate-limited server-side.
export async function POST(request) {
  const ip = clientIpFrom(request);
  const limited = rateLimit(`account-delete:${ip}`, { max: 5, windowMs: 60 * 60 * 1000 });
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }

  const authHeader = request.headers.get("authorization") || "";
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!idToken) {
    return NextResponse.json({ error: "Missing authentication token." }, { status: 401 });
  }

  const adminAuth = getAdminAuth();
  if (!adminAuth) {
    return NextResponse.json(
      { error: "Account deletion isn't configured on the server yet." },
      { status: 501 }
    );
  }

  try {
    const decoded = await adminAuth.verifyIdToken(idToken);
    const uid = decoded.uid;

    const db = getAdminDb();
    if (db) {
      await db.collection("users").doc(uid).delete().catch(() => {});
    }
    await adminAuth.deleteUser(uid);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Account deletion failed:", err);
    return NextResponse.json({ error: "Could not verify your session. Please sign in again." }, { status: 401 });
  }
}
