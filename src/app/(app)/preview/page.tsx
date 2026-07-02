"use client";

import Link from "next/link";
import { useInvoice } from "@/app/context/invoice-context";
import InvoiceDocument from "@/app/components/InvoiceDocument";

export default function PreviewPage() {
  const { invoice } = useInvoice();

  if (!invoice) {
    return (
      <div className="page-shell">
        <div className="card mx-auto max-w-md text-center">
          <h1 className="text-xl font-semibold text-gray-900">
            No invoice found
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Create an invoice first, then come back here to preview it.
          </p>
          <Link href="/create" className="btn-primary mt-6">
            Create invoice
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Invoice preview
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Review your invoice before saving.
          </p>
        </div>
        <Link href="/create" className="btn-secondary">
          Back to form
        </Link>
      </div>

      <InvoiceDocument
        invoice={{
          invoiceName: invoice.invoiceName,
          invoiceNumber: invoice.invoiceId,
          invoiceDate: invoice.invoiceDate,
          customerName: invoice.customerName,
          customerEmail: invoice.customerEmail,
          customerPhone: invoice.customerPhone,
          tax: invoice.tax,
          discount: invoice.discount,
          note: invoice.note,
          items: invoice.items,
        }}
      />
    </div>
  );
}
