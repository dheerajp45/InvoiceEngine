import Link from "next/link";

type DashboardEmptyStateProps = {
  searchQuery?: string;
};

export function DashboardEmptyState({ searchQuery }: DashboardEmptyStateProps) {
  if (searchQuery) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-gray-50 text-gray-400">
          <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          No results for &ldquo;{searchQuery}&rdquo;
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Try a different search term or clear the filter.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Clear search
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm">
      <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-[#F0FDF4] text-[#0F766E]">
        <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden>
          <path
            d="M8 3h6l4 4v14H8V3z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M14 3v4h4M10 12h6M10 16h4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-gray-900">No invoices yet</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-gray-600">
        Create your first invoice to start managing clients, PDFs, and share
        links from one workspace.
      </p>
      <Link
        href="/create"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Create invoice
      </Link>
    </div>
  );
}