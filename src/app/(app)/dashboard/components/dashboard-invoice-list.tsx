import Link from "next/link";
import { redirect } from "next/navigation";
import { deleteInvoice, duplicateInvoice } from "@/app/actions/invoice";
import {
  formatCurrency,
  formatDisplayDate,
} from "@/app/components/InvoiceDocument";

export type DashboardInvoiceRow = {
  id: string;
  invoiceName: string;
  invoiceNumber: string;
  customerName: string;
  invoiceDate: Date;
  total: number;
};

type DashboardInvoiceListProps = {
  invoices: DashboardInvoiceRow[];
  currency: string;
};

async function duplicateInvoiceAction(formData: FormData) {
  "use server";

  const id = String(formData.get("id") || "");
  if (!id) {
    throw new Error("Invoice id is required");
  }

  const newId = await duplicateInvoice(id);
  redirect(`/invoice/${newId}`);
}
async function deleteInvoiceAction(formData: FormData) {
  "use server";

  const id = String(formData.get("id") || "");
  if (!id) {
    throw new Error("Invoice id is required");
  }

 await deleteInvoice(id);
 redirect("/dashboard")

}

function RowActions({ id }: { id: string }) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
      <Link href={`/invoice/${id}`} className="btn-ghost text-gray-900">
        View
      </Link>
      <Link href={`/invoice/${id}/edit`} className="btn-ghost text-gray-900">
        Edit
      </Link>
      <form action={duplicateInvoiceAction}>
        <input type="hidden" name="id" value={id} />
        <button type="submit" className="btn-ghost text-gray-900">
          Duplicate
        </button>
      </form>
      <form action={deleteInvoiceAction}>
        <input type="hidden" name="id" value={id} />
        <button type="submit" className="btn-danger">
          Delete
        </button>
      </form>
    </div>
  );
}

export function DashboardInvoiceList({
  invoices,
  currency,
}: DashboardInvoiceListProps) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80">
                <th className="px-5 py-3.5 font-semibold text-gray-900">Invoice</th>
                <th className="px-4 py-3.5 font-semibold text-gray-900">Customer</th>
                <th className="px-4 py-3.5 font-semibold text-gray-900">Number</th>
                <th className="px-4 py-3.5 font-semibold text-gray-900">Date</th>
                <th className="px-4 py-3.5 font-semibold text-gray-900 text-right">
                  Amount
                </th>
                <th className="px-5 py-3.5 font-semibold text-gray-900 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <Link
                      href={`/invoice/${inv.id}`}
                      className="font-medium text-gray-900 transition hover:text-[#0F766E]"
                    >
                      {inv.invoiceName}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-gray-700">{inv.customerName}</td>
                  <td className="px-4 py-4 text-gray-500">{inv.invoiceNumber}</td>
                  <td className="px-4 py-4 text-gray-500">
                    {formatDisplayDate(inv.invoiceDate)}
                  </td>
                  <td className="px-4 py-4 text-right font-medium text-gray-900">
                    {formatCurrency(inv.total, currency)}
                  </td>
                  <td className="px-5 py-4">
                    <RowActions id={inv.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {invoices.map((inv) => (
          <article
            key={inv.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Link
                  href={`/invoice/${inv.id}`}
                  className="block truncate font-semibold text-gray-900 hover:text-[#0F766E]"
                >
                  {inv.invoiceName}
                </Link>
                <p className="mt-1 text-sm text-gray-600">{inv.customerName}</p>
              </div>
              <p className="shrink-0 text-sm font-semibold text-gray-900">
                {formatCurrency(inv.total, currency)}
              </p>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
              <span>{inv.invoiceNumber}</span>
              <span aria-hidden>·</span>
              <span>{formatDisplayDate(inv.invoiceDate)}</span>
            </div>
            <div className="mt-4 border-t border-gray-100 pt-3">
              <RowActions id={inv.id} />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}