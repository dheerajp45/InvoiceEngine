import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../../../lib/auth";
import { ensureBusinessSettings } from "../../../../lib/business";
import BusinessProfileBanner from "@/app/components/BusinessProfileBanner";
import CreateInvoiceForm from "./CreateInvoiceForm";

export const metadata: Metadata = {
  title: "Create Invoice",
};

export default async function CreateInvoicePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const business = await ensureBusinessSettings(session.user.id);

  return (
    <div className="page-shell">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Create invoice
        </h1>
        <p className="mt-2 text-gray-600">
          Fill in customer and item details. Your business info is applied
          automatically from Settings.
        </p>
      </div>

      <BusinessProfileBanner business={business} variant="create" />

      <CreateInvoiceForm />
    </div>
  );
}
