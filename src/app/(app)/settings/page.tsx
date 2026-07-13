import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ChangePasswordForm from "./components/change-password-form";
import SetPasswordForm from "./components/set-password-form";
import BusinessSettingsForm from "./components/business-settings-form";
import BusinessProfileBanner from "@/app/components/BusinessProfileBanner";
import { auth } from "../../../../lib/auth";
import { ensureBusinessSettings } from "../../../../lib/business";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const accounts = await auth.api.listUserAccounts({
    headers: await headers(),
  });

  const hasPassword = accounts?.some(
    (account) => account.providerId === "credential"
  );

  const business = await ensureBusinessSettings(session.user.id);

  return (
    <div className="page-shell">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Settings
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your business details and account security.
        </p>
      </div>

      <BusinessProfileBanner business={business} variant="settings" />

      <div className="space-y-6">
        <div className="card max-w-lg">
          <h2 className="section-title">Business details</h2>
          <p className="mb-6 text-sm text-gray-600">
            These appear as the &ldquo;From&rdquo; details on every invoice you
            create and share. Your company tax ID goes here — invoice tax
            percentages are set per invoice.
          </p>
          <BusinessSettingsForm
            initial={{
              businessName: business.businessName ?? "",
              address: business.address ?? "",
              taxInfo: business.taxInfo ?? "",
              currency: business.currency ?? "INR",
            }}
          />
        </div>

        <div className="card max-w-lg">
          <h2 className="section-title">
            {hasPassword ? "Change password" : "Set a password"}
          </h2>
          <p className="mb-6 text-sm text-gray-600">
            {hasPassword
              ? "Update your password. Other sessions will be signed out."
              : "Add a password so you can also sign in with email."}
          </p>

          {hasPassword ? <ChangePasswordForm /> : <SetPasswordForm />}
        </div>
      </div>
    </div>
  );
}
