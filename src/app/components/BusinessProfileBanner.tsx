import Link from "next/link";
import { isBusinessProfileComplete } from "../../../lib/business";

type BusinessProfileBannerProps = {
  business: {
    businessName?: string | null;
    address?: string | null;
    currency?: string;
  } | null;
  variant?: "default" | "settings" | "create";
};

export default function BusinessProfileBanner({
  business,
  variant = "default",
}: BusinessProfileBannerProps) {
  const complete = isBusinessProfileComplete(business);

  if (!complete) {
    if (variant === "settings") {
      return (
        <div className="mb-6 rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-800">
            Action required
          </p>
          <h2 className="mt-2 text-lg font-bold text-gray-900">
            Complete your business profile
          </h2>
          <p className="mt-2 text-sm text-amber-900">
            Add your business name below. This appears on every invoice you
            create, share, and download as PDF.
          </p>
        </div>
      );
    }

    return (
      <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <p className="font-medium">Complete your business profile</p>
        <p className="mt-1">
          Invoices need your business name and details in the &ldquo;From&rdquo;
          section.{" "}
          <Link href="/settings" className="font-semibold underline">
            Set up in Settings
          </Link>
        </p>
      </div>
    );
  }

  if (variant === "create") {
    return (
      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
        <p>
          <span className="font-medium text-gray-900">From on invoices:</span>{" "}
          {business?.businessName}
          {business?.address ? ` · ${business.address.split("\n")[0]}` : ""}
          {business?.currency ? ` · ${business.currency}` : ""}
        </p>
        <p className="mt-1">
          Linked to your business settings.{" "}
          <Link href="/settings" className="font-medium text-gray-900 underline">
            Edit
          </Link>
        </p>
      </div>
    );
  }

  return null;
}
