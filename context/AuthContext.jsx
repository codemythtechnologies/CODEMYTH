"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb } from "@/lib/firebaseClient";
import { useToast } from "./ToastContext";

const AuthContext = createContext(null);

export function initialsFor(nameOrEmail) {
  if (!nameOrEmail) return "?";
  const trimmed = nameOrEmail.trim();
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2 && parts[0][0] && parts[1][0]) return (parts[0][0] + parts[1][0]).toUpperCase();
  return trimmed.slice(0, 2).toUpperCase();
}

function friendlyAuthError(error) {
  const map = {
    "auth/invalid-email": "That email address doesn't look right.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/email-already-in-use": "An account with that email already exists.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/popup-closed-by-user": "Sign-in popup was closed before finishing.",
    "auth/account-exists-with-different-credential":
      "That email is already linked to a different sign-in method.",
    "auth/api-key-not-valid": "Firebase isn't configured yet — check your environment variables.",
    "auth/configuration-not-found": "This sign-in provider isn't enabled for this Firebase project yet.",
  };
  return map[error?.code] || error?.message || "Something went wrong. Please try again.";
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const showToast = useToast();

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setReady(true);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setReady(true);
    });
    return unsub;
  }, []);

  function requireAuth() {
    const auth = getFirebaseAuth();
    if (!auth) {
      showToast("Sign-in not configured", "Firebase environment variables aren't set for this deployment yet.", "info");
      return null;
    }
    return auth;
  }

  async function saveProfile(u, name) {
    try {
      const db = getFirebaseDb();
      if (!db) return;
      await setDoc(
        doc(db, "users", u.uid),
        {
          name: name || u.displayName || "",
          email: u.email || "",
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (err) {
      console.error("Could not save profile doc:", err);
    }
  }

  async function signInWithGoogle() {
    const auth = requireAuth();
    if (!auth) return { ok: false };
    try {
      const cred = await signInWithPopup(auth, new GoogleAuthProvider());
      await saveProfile(cred.user);
      return { ok: true };
    } catch (error) {
      const message = friendlyAuthError(error);
      showToast("Couldn't sign in", message, "info");
      return { ok: false, error: message };
    }
  }

  async function signInWithGithub() {
    const auth = requireAuth();
    if (!auth) return { ok: false };
    try {
      const cred = await signInWithPopup(auth, new GithubAuthProvider());
      await saveProfile(cred.user);
      return { ok: true };
    } catch (error) {
      const message = friendlyAuthError(error);
      showToast("Couldn't sign in", message, "info");
      return { ok: false, error: message };
    }
  }

  async function signInWithEmail(email, password) {
    const auth = requireAuth();
    if (!auth) return { ok: false, error: "Sign-in not configured." };
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: friendlyAuthError(error) };
    }
  }

  async function signUpWithEmail(name, email, password) {
    const auth = requireAuth();
    if (!auth) return { ok: false, error: "Sign-in not configured." };
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) await updateProfile(cred.user, { displayName: name });
      await saveProfile(cred.user, name);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: friendlyAuthError(error) };
    }
  }

  async function sendReset(email) {
    const auth = requireAuth();
    if (!auth) return;
    try {
      await sendPasswordResetEmail(auth, email);
      showToast("Check your email", `We've sent a password reset link to ${email}.`, "success");
    } catch (error) {
      showToast("Couldn't send reset link", friendlyAuthError(error), "info");
    }
  }

  async function signOutUser() {
    const auth = getFirebaseAuth();
    if (!auth) return;
    try {
      await signOut(auth);
      showToast("Signed out", "Come back soon.", "success");
    } catch (error) {
      showToast("Error", error.message, "info");
    }
  }

  async function deleteAccount() {
    if (!user) return { ok: false };
    try {
      const idToken = await user.getIdToken();
      const res = await fetch("/api/account/delete", {
        method: "POST",
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not delete account.");
      }
      showToast("Account deleted", "Your account and all associated data have been removed from our database.", "success");
      return { ok: true };
    } catch (error) {
      showToast("Error", error.message, "info");
      return { ok: false };
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        ready,
        signInWithGoogle,
        signInWithGithub,
        signInWithEmail,
        signUpWithEmail,
        sendReset,
        signOutUser,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}