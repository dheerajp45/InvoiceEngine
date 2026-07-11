"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { authClient } from "../../../../lib/auth-client";
import { useRouter } from "next/navigation";
import GoogleButton from "@/app/components/GoogleButton";
export default function SignInPage() {
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
          setError(ctx.error.message);
          setLoading(false);

          const msg = ctx.error.message.toLowerCase();
          if (msg.includes("verify") || msg.includes("verified")) {
            router.push(`/verify-email?email=${encodeURIComponent(email)}`);
          }
        },
      }
    );
  }

  return (
    <div className="page-shell flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Welcome back. Sign in to manage your invoices.
        </p>

        {error && (
          <p className="mt-4 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900">
            {error}
          </p>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
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
              placeholder="Your password"
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <GoogleButton></GoogleButton>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-gray-900 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
