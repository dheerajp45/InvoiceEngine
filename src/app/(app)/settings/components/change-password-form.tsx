"use client";

import { FormEvent, useState } from "react";
import { authClient } from "../../../../../lib/auth-client";

export default function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);
    setMessage(null);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const currentPassword = String(formData.get("currentPassword") || "");
    const newPassword = String(formData.get("newPassword") || "");
    const confirmNewPassword = String(formData.get("confirmNewPassword") || "");

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New password and confirm password do not match.");
      setLoading(false);
      return;
    }

    const { error } = await authClient.changePassword({
      currentPassword,
      newPassword,
      revokeOtherSessions: true,
    });

    if (error) {
      setError(error.message || "Failed to change password.");
      setLoading(false);
      return;
    }

    setMessage("Password changed successfully.");
    setLoading(false);
    form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {message && (
        <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-800">
          {message}
        </p>
      )}
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800">
          {error}
        </p>
      )}

      <div>
        <label className="field-label" htmlFor="currentPassword">
          Current password
        </label>
        <input
          id="currentPassword"
          className="input"
          type="password"
          name="currentPassword"
          required
        />
      </div>

      <div>
        <label className="field-label" htmlFor="newPassword">
          New password
        </label>
        <input
          id="newPassword"
          className="input"
          type="password"
          name="newPassword"
          required
          minLength={8}
        />
      </div>

      <div>
        <label className="field-label" htmlFor="confirmNewPassword">
          Confirm new password
        </label>
        <input
          id="confirmNewPassword"
          className="input"
          type="password"
          name="confirmNewPassword"
          required
          minLength={8}
        />
      </div>

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? "Updating..." : "Change password"}
      </button>
    </form>
  );
}