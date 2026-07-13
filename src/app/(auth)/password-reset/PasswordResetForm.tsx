"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "../../../../lib/auth-client";
import {
  AuthPageShell,
  authPrimaryButtonClass,
} from "@/app/components/auth/AuthPageShell";

export default function PasswordResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!token) {
      setError("This reset link is invalid or expired.");
      return;
    }

    setLoading(true);
    setMessage(null);
    setError(null);

    const formData = new FormData(e.currentTarget);
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

    const { error } = await authClient.resetPassword({
      newPassword,
      token,
    });

    if (error) {
      setError(error.message || "Failed to reset password.");
      setLoading(false);
      return;
    }

    setMessage("Password reset successfully. Redirecting to sign in...");
    setLoading(false);
    setTimeout(() => router.push("/signin"), 2000);
  }

  return (
    <AuthPageShell
      title="Reset password"
      subtitle="Enter a new password for your Invoice Engine account."
      error={error}
      message={message}
      showGoogle={false}
      footer={
        <>
          Remember your password?{" "}
          <Link href="/signin" className="font-medium text-gray-900 underline">
            Sign in
          </Link>
        </>
      }
    >
      {!token ? (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-800">
          This reset link is invalid or expired.{" "}
          <Link
            href="/password-reset-request"
            className="font-medium text-red-900 underline"
          >
            Request a new link
          </Link>
          .
        </p>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="field-label" htmlFor="newPassword">
            New password
          </label>
          <input
            id="newPassword"
            className="input"
            type="password"
            name="newPassword"
            placeholder="Min. 8 characters"
            minLength={8}
            required
            disabled={!token || loading}
            autoComplete="new-password"
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
            placeholder="Re-enter your password"
            minLength={8}
            required
            disabled={!token || loading}
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          className={authPrimaryButtonClass}
          disabled={!token || loading}
        >
          {loading ? "Resetting..." : "Reset password"}
        </button>
      </form>
    </AuthPageShell>
  );
}