"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { authClient } from "../../../../lib/auth-client";
import { useRouter } from "next/navigation";
import { AuthPageShell } from "@/app/components/auth/AuthPageShell";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await authClient.signUp.email(
      { email, password, name },
      {
        onSuccess: () => {
          router.push(`/verify-email?email=${encodeURIComponent(email)}`);
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setLoading(false);
        },
      }
    );
  }

  return (
    <AuthPageShell
      title="Create account"
      subtitle="Start creating professional invoices in minutes."
      error={error}
      footer={
        <>
          Already have an account?{" "}
          <Link href="/signin" className="font-medium text-gray-900 underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="field-label" htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            className="input"
            type="text"
            name="name"
            placeholder="Your name"
            required
            autoComplete="name"
          />
        </div>

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
          <label className="field-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="input"
            type="password"
            name="password"
            placeholder="Min. 8 characters"
            required
            minLength={8}
            autoComplete="new-password"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Creating account..." : "Sign up with email"}
        </button>
      </form>
    </AuthPageShell>
  );
}