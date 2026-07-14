import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// Server-only. Never import this from a "use client" file — it holds a
// service-account private key and must not reach the browser bundle.
//
// Writing contact-form submissions through the Admin SDK (instead of the
// old approach of the browser calling Firestore directly with an open
// "allow write" rule) means:
//   1. Firestore security rules can lock the "contacts" / "ba_consultations"
//      collections to server-only writes.
//   2. Every write is validated with zod and rate-limited before it touches
//      the database, so the form can't be scripted into a spam vector.
function getAdminApp() {
  if (getApps().length) return getApps()[0];

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    return null; // not configured yet — routes fail soft, see route handlers
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

export function getAdminDb() {
  const app = getAdminApp();
  return app ? getFirestore(app) : null;
}

export function getAdminAuth() {
  const app = getAdminApp();
  return app ? getAuth(app) : null;
}
