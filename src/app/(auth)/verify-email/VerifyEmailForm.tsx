"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "../../../../lib/auth-client";
import {
  AuthPageShell,
  authPrimaryButtonClass,
  authSecondaryButtonClass,
} from "@/app/components/auth/AuthPageShell";

export default function VerifyEmailForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      router.replace("/signin");
    }
  }, [email, router]);

  async function resendVerificationEmail() {
    if (!email) {
      setError("Email address is missing.");
      return;
    }

    setMessage(null);
    setError(null);
    setLoading(true);

    const { error: sendError } = await authClient.sendVerificationEmail({
      email,
      callbackURL: "/signin",
    });

    if (sendError) {
      setError(sendError.message || "Failed to send verification email.");
      setLoading(false);
      return;
    }

    setMessage("Verification email sent. Check your inbox.");
    setLoading(false);
  }

  if (!email) {
    return null;
  }

  return (
    <AuthPageShell
      title="Verify your email"
      subtitle={
        <>
          We sent a verification link to{" "}
          <span className="font-medium text-gray-900">{email}</span>. Click the
          link in that email to activate your account, then sign in.
        </>
      }
      error={error}
      message={message}
      showGoogle={false}
      footer={
        <>
          Already verified?{" "}
          <Link href="/signin" className="font-medium text-gray-900 underline">
            Sign in
          </Link>
        </>
      }
    >
      <div className="space-y-3">
        <button
          type="button"
          className={authPrimaryButtonClass}
          disabled={loading}
          onClick={resendVerificationEmail}
        >
          {loading ? "Sending..." : "Resend verification email"}
        </button>
        <Link href="/signin" className={authSecondaryButtonClass}>
          Go to sign in
        </Link>
      </div>
    </AuthPageShell>
  );
}