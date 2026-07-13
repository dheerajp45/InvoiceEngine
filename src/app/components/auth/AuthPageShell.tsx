import type { ReactNode } from "react";
import Link from "next/link";
import { BrandLogo } from "../BrandLogo";
import GoogleButton from "../GoogleButton";

type AuthPageShellProps = {
  title: string;
  subtitle: ReactNode;
  children: ReactNode;
  footer: ReactNode;
  error?: string | null;
  message?: string | null;
  showGoogle?: boolean;
};

const inputFocusClass = "focus:border-[#0F766E] focus:ring-[#0F766E]/20";

export const authPrimaryButtonClass =
  "inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900/30 disabled:opacity-60";

export const authSecondaryButtonClass =
  "inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900/10 disabled:opacity-60";

export { inputFocusClass };

export function AuthPageLoading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, #f4f4f5 0%, #ffffff 50%, #ffffff 100%)",
        }}
        aria-hidden
      />
      <div className="relative w-full max-w-[420px] rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-600 shadow-sm">
        Loading...
      </div>
    </div>
  );
}

export function AuthDivider() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-gray-200" />
      <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
        or
      </span>
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
}

export function AuthPageShell({
  title,
  subtitle,
  children,
  footer,
  error,
  message,
  showGoogle = true,
}: AuthPageShellProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, #f4f4f5 0%, #ffffff 50%, #ffffff 100%)",
        }}
        aria-hidden
      />

      <div className="relative w-full max-w-[420px]">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <BrandLogo className="text-xl" />
          </Link>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {title}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {subtitle}
            </p>
          </div>

          {error ? (
            <p className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-800">
              {error}
            </p>
          ) : null}

          {message ? (
            <p className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm text-green-800">
              {message}
            </p>
          ) : null}

          {showGoogle ? (
            <>
              <div className="mt-6">
                <GoogleButton />
              </div>

              <div className="my-6">
                <AuthDivider />
              </div>
            </>
          ) : null}

          <div className={showGoogle ? undefined : "mt-6"}>{children}</div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">{footer}</p>
      </div>
    </div>
  );
}