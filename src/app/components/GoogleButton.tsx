"use client";

import { useState } from "react";
import { authClient } from "../../../lib/auth-client";
import { GoogleIcon } from "./GoogleIcon";

type GoogleButtonProps = {
  callbackURL?: string;
};

export default function GoogleButton({
  callbackURL = "/dashboard",
}: GoogleButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleGoogleSignIn() {
    setLoading(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL,
    });
  }

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={loading}
      className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 disabled:opacity-60"
    >
      <GoogleIcon className="size-5 shrink-0" />
      {loading ? "Redirecting..." : "Continue with Google"}
    </button>
  );
}