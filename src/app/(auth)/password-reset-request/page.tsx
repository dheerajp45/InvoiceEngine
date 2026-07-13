"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { authClient } from "../../../../lib/auth-client";
import {
  AuthPageShell,
  authPrimaryButtonClass,
} from "@/app/components/auth/AuthPageShell";

export default function PasswordResetRequestPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function sendRequest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "");

    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/password-reset",
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Failed to request a password reset.");
      return;
    }

    setMessage(
      "If an account exists for that email, a password reset link has been sent."
    );
  }

  return (
    <AuthPageShell
      title="Reset your password"
      subtitle="Enter your account email and we'll send a reset link if the account exists."
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
      <form onSubmit={sendRequest} className="space-y-4">
        <div>
          <label className="field-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="input"
            type="email"
            name="email"
            placeholder="you@email.com"
            required
            disabled={loading}
            autoComplete="email"
          />
        </div>

        <button
          type="submit"
          className={authPrimaryButtonClass}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>
    </AuthPageShell>
  );
}