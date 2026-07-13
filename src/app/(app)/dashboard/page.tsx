import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { ensureBusinessSettings } from "../../../../lib/business";
import {
  calculateInvoiceTotal,
  getStartOfMonth,
} from "../../../../lib/invoice";
import BusinessProfileBanner from "@/app/components/BusinessProfileBanner";
import { DashboardStats } from "./components/dashboard-stats";
import { DashboardEmptyState } from "./components/dashboard-empty-state";
import {
  DashboardInvoiceList,
  type DashboardInvoiceRow,
} from "./components/dashboard-invoice-list";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const searchQuery = q?.trim() ?? "";

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/signin");

  const userId = session.user.id;
  const business = await ensureBusinessSettings(userId);
  const currency = business.currency ?? "INR";
  const firstName = session.user.name?.split(" ")[0] ?? "there";

  const [invoices, totalCount, thisMonthCount, latestInvoice] =
    await Promise.all([
      prisma.invoice.findMany({
        where: {
          userId,
          ...(searchQuery
            ? {
                OR: [
                  { invoiceName: { contains: searchQuery, mode: "insensitive" } },
                  { customerName: { contains: searchQuery, mode: "insensitive" } },
                  { invoiceNumber: { contains: searchQuery, mode: "insensitive" } },
                ],
              }
            : {}),
        },
        include: { items: true },
        orderBy: { updatedAt: "desc" },
      }),
      prisma.invoice.count({ where: { userId } }),
      prisma.invoice.count({
        where: {
          userId,
          createdAt: { gte: getStartOfMonth() },
        },
      }),
      prisma.invoice.findFirst({
        where: { userId },
        orderBy: { updatedAt: "desc" },
        select: { invoiceName: true },
      }),
    ]);

  const rows: DashboardInvoiceRow[] = invoices.map((inv) => ({
    id: inv.id,
    invoiceName: inv.invoiceName,
    invoiceNumber: inv.invoiceNumber,
    customerName: inv.customerName,
    invoiceDate: inv.invoiceDate,
    total: calculateInvoiceTotal(inv),
  }));

  return (
    <div className="page-shell">
      <BusinessProfileBanner business={business} />

      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-gray-600">
            Welcome back, <span className="font-medium text-gray-900">{firstName}</span>
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Your workspace for creating, managing, and sharing invoices.
          </p>
        </div>
        <Link
          href="/create"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          + New invoice
        </Link>
      </div>

      <div className="mb-6">
        <DashboardStats
          total={totalCount}
          thisMonth={thisMonthCount}
          latestLabel={latestInvoice?.invoiceName ?? null}
        />
      </div>

      <form method="GET" className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="text"
          name="q"
          defaultValue={searchQuery}
          placeholder="Search by invoice, customer, or number..."
          className="input min-w-0 flex-1"
        />
        <div className="flex gap-2">
          <button type="submit" className="btn-secondary shrink-0">
            Search
          </button>
          {searchQuery ? (
            <Link href="/dashboard" className="btn-ghost shrink-0">
              Clear
            </Link>
          ) : null}
        </div>
      </form>

      {rows.length === 0 ? (
        <DashboardEmptyState searchQuery={searchQuery || undefined} />
      ) : (
        <DashboardInvoiceList invoices={rows} currency={currency} />
      )}
    </div>
  );
}