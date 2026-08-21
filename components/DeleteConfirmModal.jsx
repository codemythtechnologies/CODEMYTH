"use client";

import { useState } from "react";
import { useModals } from "@/context/ModalsContext";
import { useAuth } from "@/context/AuthContext";

export default function DeleteConfirmModal() {
  const { deleteConfirmOpen, closeDeleteConfirm } = useModals();
  const { deleteAccount } = useAuth();
  const [busy, setBusy] = useState(false);

  if (!deleteConfirmOpen) return null;

  async function confirm() {
    setBusy(true);
    const result = await deleteAccount();
    setBusy(false);
    if (result.ok) closeDeleteConfirm();
  }

  return (
    <div className="confirm-overlay open" role="alertdialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) closeDeleteConfirm(); }}>
      <div className="confirm-box">
        <div className="confirm-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
        </div>
        <h3>Delete your account?</h3>
        <p>This will permanently delete your account and all associated data from our database. This action cannot be undone. Your project history and profile will be removed immediately.</p>
        <div className="confirm-btns">
          <button className="confirm-cancel" onClick={closeDeleteConfirm} disabled={busy}>Cancel</button>
          <button className="confirm-delete" onClick={confirm} disabled={busy}>{busy ? "Deleting…" : "Delete account"}</button>
        </div>
      </div>
    </div>
  );
}
