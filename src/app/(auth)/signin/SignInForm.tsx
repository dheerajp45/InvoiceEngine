"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { authClient } from "../../../../lib/auth-client";
import { useRouter } from "next/navigation";
import { AuthPageShell } from "@/app/components/auth/AuthPageShell";

export default function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await authClient.signIn.email(
      { email, password, rememberMe: false },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          setLoading(false);

          const msg = ctx.error.message.toLowerCase();
          if (msg.includes("verify") || msg.includes("verified")) {
            router.push(`/verify-email?email=${encodeURIComponent(email)}`);
            return;
          }

          setError(ctx.error.message);
        },
      }
    );
  }

  return (
    <AuthPageShell
      title="Sign in"
      subtitle="Welcome back. Sign in to manage your invoices."
      error={error}
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-gray-900 underline">
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
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
            autoComplete="email"
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <label className="field-label mb-0" htmlFor="password">
              Password
            </label>
            <Link
              href="/password-reset-request"
              className="text-xs font-medium text-[#0F766E] hover:text-[#047857]"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            className="input"
            type="password"
            name="password"
            placeholder="Your password"
            required
            autoComplete="current-password"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Signing in..." : "Sign in with email"}
        </button>
      </form>
    </AuthPageShell>
  );
}