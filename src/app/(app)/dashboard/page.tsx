import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { redirect } from "next/navigation";
import { formatDisplayDate } from "@/app/components/InvoiceDocument";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/signin");

  const invoices = await prisma.invoice.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div className="page-shell">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Your invoices
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage and view all your saved invoices.
          </p>
        </div>
        <Link href="/create" className="btn-primary">
          + New invoice
        </Link>
      </div>

      {invoices.length === 0 ? (
        <div className="card mx-auto max-w-lg text-center">
          <h2 className="text-lg font-semibold text-gray-900">No invoices yet</h2>
          <p className="mt-2 text-sm text-gray-600">
            Create your first invoice to get started.
          </p>
          <Link href="/create" className="btn-primary mt-6">
            Create invoice
          </Link>
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="data-table min-w-[640px]">
              <thead>
                <tr>
                  <th className="px-6 pt-6">Invoice</th>
                  <th className="px-4 pt-6">Customer</th>
                  <th className="px-4 pt-6">Number</th>
                  <th className="px-4 pt-6">Date</th>
                  <th className="px-6 pt-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td className="px-6 font-medium text-gray-900">
                      {inv.invoiceName}
                    </td>
                    <td className="px-4">{inv.customerName}</td>
                    <td className="px-4 text-gray-500">{inv.invoiceNumber}</td>
                    <td className="px-4 text-gray-500">
                      {formatDisplayDate(inv.invoiceDate)}
                    </td>
                    <td className="px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/invoice/${inv.id}`}
                          className="btn-ghost text-gray-900"
                        >
                          View
                        </Link>
                        <Link
                          href={`/invoice/${inv.id}/edit`}
                          className="btn-ghost text-gray-900"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
