"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "../../../lib/auth-client";
import BrandLogoLink from "@/app/components/BrandLogoLink";
import { ArrowRightIcon } from "./landing-icons";

export function LandingNav() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  }

  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
      <BrandLogoLink />

      <div className="flex items-center gap-4 sm:gap-6">
        {session?.user ? (
          <>
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 transition-colors hover:text-gray-900"
            >
              Dashboard
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="text-sm text-gray-600 transition-colors hover:text-gray-900"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/signin"
              className="text-sm text-gray-600 transition-colors hover:text-gray-900"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 sm:px-5"
            >
              Get Started
              <ArrowRightIcon />
            </Link>
          </>
        )}
      </div>
    </header>
  );
}