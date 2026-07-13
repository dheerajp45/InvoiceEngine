import { prisma } from "../../../../../lib/prisma";
import { auth } from "../../../../../lib/auth";
import { ensureBusinessSettings } from "../../../../../lib/business";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { deleteInvoice, duplicateInvoice } from "@/app/actions/invoice";
import Link from "next/link";
import InvoiceDocument from "@/app/components/InvoiceDocument";
import CopyShareLink from "@/app/components/CopyShareLink";
import BusinessProfileBanner from "@/app/components/BusinessProfileBanner";
import { sendInvoiceEmail } from "@/app/actions/email";

export default async function InvoiceDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ email?: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const { id } = await params;
  const { email: emailStatus } = await searchParams;

  const invoice = await prisma.invoice.findFirst({
    where: { userId: session.user.id, id },
    include: { items: true },
  });

  if (!invoice) {
    notFound();
  }

  const business = await ensureBusinessSettings(session.user.id);

  const appUrl = process.env.APP_URL;

  async function duplicatePresentInvoice(formData: FormData) {
    "use server";
    const invoiceId = formData.get("id") as string;
    if (!invoiceId) {
      throw new Error("Invoice id is required");
    }
    const newId = await duplicateInvoice(invoiceId);
    redirect(`/invoice/${newId}`);
  }

  async function deletePresentInvoice(formData: FormData) {
    "use server";
    const invoiceId = formData.get("id") as string;
    const result = await deleteInvoice(invoiceId);
    if (result.ok) {
      redirect("/dashboard");
    }
  }

  async function sendInvoiceEmailAction(formData: FormData) {
    "use server";
    const toEmail = formData.get("toEmail") as string;
    try {
      await sendInvoiceEmail(id, toEmail);
    } catch {
      redirect(`/invoice/${id}?email=error`);
    }
    redirect(`/invoice/${id}?email=sent`);
  }

  return (
    <div className="page-shell">
      {emailStatus === "sent" && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          Email sent successfully!
        </div>
      )}
      {emailStatus === "error" && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          Failed to send email. Please try again.
        </div>
      )}

      <BusinessProfileBanner business={business} />

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
          <form action={duplicatePresentInvoice}>
            <input type="hidden" name="id" value={id} />
            <button type="submit" className="btn-secondary">
              Duplicate
            </button>
          </form>
          <a href={`/api/invoice/${id}/pdf`} className="btn-secondary">
            Download PDF
          </a>
          <CopyShareLink publicId={invoice.publicId} appUrl={appUrl} />
          <Link
            href={`/share/${invoice.publicId}`}
            className="btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Preview public page
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
        business={business}
      />

      <div className="card mt-6">
        <h2 className="section-title">Send to client</h2>
        <form action={sendInvoiceEmailAction} className="flex flex-wrap items-end gap-3">
          <div className="min-w-[220px] flex-1">
            <label htmlFor="toEmail" className="field-label">
              Client email
            </label>
            <input
              id="toEmail"
              type="email"
              name="toEmail"
              defaultValue={invoice.customerEmail ?? ""}
              required
              className="input"
              placeholder="client@example.com"
            />
          </div>
          <button type="submit" className="btn-primary">
            Send invoice link
          </button>
        </form>
      </div>
    </div>
  );
}
