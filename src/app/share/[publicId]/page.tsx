import { notFound } from "next/navigation";
import { prisma } from "../../../../lib/prisma";
import InvoiceDocument from "@/app/components/InvoiceDocument";

export default async function PublicInvoicePage({
  params,
}: {
  params: Promise<{ publicId: string }>;
}) {
  const { publicId } = await params;

  const invoice = await prisma.invoice.findUnique({
    where: { publicId },
    include: { items: true },
  });

  if (!invoice) {
    notFound();
  }

  return (
    <div className="page-shell">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            Shared invoice
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {invoice.invoiceName || invoice.invoiceNumber}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {invoice.invoiceNumber} · {invoice.customerName}
          </p>
        </div>
        <a href={`/api/share/${publicId}/pdf`} className="btn-secondary">
          Download PDF
        </a>
      </div>

      <InvoiceDocument
        invoice={{
          invoiceName: invoice.invoiceName,
          invoiceNumber: invoice.invoiceNumber,
          invoiceDate: invoice.invoiceDate.toISOString(),
          customerName: invoice.customerName,
          customerEmail: invoice.customerEmail,
          customerPhone: invoice.customerPhone,
          tax: invoice.tax,
          discount: invoice.discount,
          note: invoice.note,
          items: invoice.items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        }}
      />
    </div>
  );
}
