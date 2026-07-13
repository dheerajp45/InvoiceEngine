import Link from "next/link";
import { BrandLogo } from "@/app/components/BrandLogo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <BrandLogo className="text-2xl" />
      <h1 className="mt-8 text-4xl font-bold tracking-tight text-gray-900">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-center text-sm text-gray-600">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn-primary">
          Go home
        </Link>
        <Link href="/signin" className="btn-secondary">
          Sign in
        </Link>
      </div>
    </div>
  );
}