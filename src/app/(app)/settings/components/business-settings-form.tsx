"use client";

import { FormEvent, useState } from "react";
import { upsertBusinessSettings } from "@/app/actions/business";

type BusinessSettingsFormProps = {
  initial: {
    businessName: string;
    address: string;
    taxInfo: string;
    currency: string;
  };
};

const CURRENCIES = ["INR", "USD", "EUR", "GBP", "AUD", "CAD", "SGD", "AED"];

export default function BusinessSettingsForm({
  initial,
}: BusinessSettingsFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      await upsertBusinessSettings({
        businessName: String(formData.get("businessName") || ""),
        address: String(formData.get("address") || ""),
        taxInfo: String(formData.get("taxInfo") || ""),
        currency: String(formData.get("currency") || "INR"),
      });
      setMessage("Business settings saved.");
    } catch {
      setError("Failed to save business settings.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {message && (
        <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-800">
          {message}
        </p>
      )}
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800">
          {error}
        </p>
      )}

      <div>
        <label className="field-label" htmlFor="businessName">
          Business name <span className="text-red-600">*</span>
        </label>
        <input
          id="businessName"
          className="input"
          type="text"
          name="businessName"
          defaultValue={initial.businessName}
          placeholder="Acme Pvt Ltd"
          required
        />
      </div>

      <div>
        <label className="field-label" htmlFor="address">
          Address
        </label>
        <textarea
          id="address"
          className="input"
          name="address"
          rows={3}
          defaultValue={initial.address}
          placeholder="123 Main St, Mumbai, India"
        />
      </div>

      <div>
        <label className="field-label" htmlFor="taxInfo">
          Tax ID / GSTIN
        </label>
        <input
          id="taxInfo"
          className="input"
          type="text"
          name="taxInfo"
          defaultValue={initial.taxInfo}
          placeholder="GSTIN: 27AAAAA0000A1Z5"
        />
        <p className="mt-1 text-xs text-gray-500">
          Your company tax identifier — shown on invoices. Not the tax
          percentage on line items.
        </p>
      </div>

      <div>
        <label className="field-label" htmlFor="currency">
          Currency
        </label>
        <select
          id="currency"
          className="input"
          name="currency"
          defaultValue={initial.currency}
        >
          {CURRENCIES.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? "Saving..." : "Save business settings"}
      </button>
    </form>
  );
}
