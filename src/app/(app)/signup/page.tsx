"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { authClient } from "../../../../lib/auth-client";
import { useRouter } from "next/navigation";
import GoogleButton from "@/app/components/GoogleButton";
export default function SignUpPage() {
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
          router.push(`/verify-email?email=${encodeURIComponent(email)}`);        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setLoading(false);
        },
      }
    );
  }

  return (
    <div className="page-shell flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Create account
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Sign up to start creating and saving invoices.
        </p>

        {error && (
          <p className="mt-4 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900">
            {error}
          </p>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="field-label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="input"
              type="text"
              name="name"
              placeholder="Your name"
              required
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
            />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={loading}>
          
            {loading ? "Creating account..." : "Sign up"}
          </button>
          <GoogleButton></GoogleButton>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/signin" className="font-medium text-gray-900 underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
