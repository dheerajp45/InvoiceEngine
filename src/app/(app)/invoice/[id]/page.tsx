import { prisma } from "../../../../../lib/prisma";
import { auth } from "../../../../../lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { deleteInvoice } from "@/app/actions/invoice";
import Link from "next/link";
import InvoiceDocument from "@/app/components/InvoiceDocument";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const { id } = await params;

  const invoice = await prisma.invoice.findFirst({
    where: { userId: session.user.id, id },
    include: { items: true },
  });

  if (!invoice) {
    notFound();
  }

  async function deletePresentInvoice(formData: FormData) {
    "use server";
    const invoiceId = formData.get("id") as string;
    const result = await deleteInvoice(invoiceId);
    if (result.ok) {
      redirect("/dashboard");
    }
  }

  return (
    <div className="page-shell">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Invoice
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {invoice.invoiceNumber} · {invoice.customerName}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/dashboard" className="btn-secondary">
            Back
          </Link>
          <Link href={`/invoice/${id}/edit`} className="btn-secondary">
            Edit
          </Link>
          <form action={deletePresentInvoice}>
            <input type="hidden" name="id" value={id} />
            <button type="submit" className="btn-danger">
              Delete
            </button>
          </form>
        </div>
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
