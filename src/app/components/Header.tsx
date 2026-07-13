"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "../../../lib/auth-client";

export default function Header() {
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
    <>
      {session ? (
        <>
          <Link href="/dashboard" className="btn-ghost">
            Dashboard
          </Link>
          <Link href="/create" className="btn-ghost">
            Create
          </Link>
          <Link href="/settings" className="btn-ghost">
            Settings
          </Link>
          <button type="button" onClick={handleSignOut} className="btn-ghost">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/signin" className="btn-ghost">
            Sign in
          </Link>
          <Link href="/signup" className="btn-primary">
            Sign up
          </Link>
        </>
      )}
    </>
  );
}
