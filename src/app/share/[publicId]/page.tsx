import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "../../../../lib/prisma";
import { ensureBusinessSettings } from "../../../../lib/business";
import InvoiceDocument from "@/app/components/InvoiceDocument";
import {
  buildCanonical,
  buildOpenGraph,
  buildTwitterCard,
  siteConfig,
} from "../../../../lib/seo";

type PageProps = {
  params: Promise<{ publicId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { publicId } = await params;

  const invoice = await prisma.invoice.findUnique({
    where: { publicId },
    select: {
      invoiceName: true,
      invoiceNumber: true,
      customerName: true,
    },
  });

  if (!invoice) {
    return { title: "Invoice not found" };
  }

  const title = `Invoice ${invoice.invoiceNumber}`;
  const description = `Issued to ${invoice.customerName}. View this professional invoice on ${siteConfig.name}.`;
  const path = `/share/${publicId}`;

  return {
    title,
    description,
    robots: { index: false, follow: false },
    alternates: {
      canonical: buildCanonical(path),
    },
    openGraph: buildOpenGraph({ title, description, path }),
    twitter: buildTwitterCard({ title, description, path }),
  };
}

export default async function PublicInvoicePage({ params }: PageProps) {
  const { publicId } = await params;

  const invoice = await prisma.invoice.findUnique({
    where: { publicId },
    include: { items: true },
  });

  if (!invoice) {
    notFound();
  }

  const business = await ensureBusinessSettings(invoice.userId);

  return (
    <main className="page-shell">
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
        business={business}
      />
    </main>
  );
}