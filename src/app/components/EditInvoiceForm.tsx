"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { updateInvoice } from "@/app/actions/invoice";
import InvoiceItemForm from "@/app/components/InvoiceItemForm";
import type { Item } from "@/app/context/invoice-context";

type InvoiceItem = {
  name: string;
  quantity: number;
  price: number;
};

type EditInvoice = {
  invoiceName: string;
  invoiceNumber: string;
  invoiceDate: Date | string;
  customerName: string;
  customerEmail: string | null;
  customerPhone: string | null;
  tax: number;
  discount: number;
  note: string | null;
  items: InvoiceItem[];
};

type EditInvoiceFormProps = {
  invoice: EditInvoice;
  id: string;
};

function formatDateForInput(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().slice(0, 10);
}

import { roundMoney } from "../../../lib/invoice";

function mapItemsToState(items: InvoiceItem[]): Item[] {
  if (items.length === 0) {
    return [{ name: "", quantity: 1, price: 0 }];
  }
  return items.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    price: roundMoney(item.price),
  }));
}

export default function EditInvoiceForm({ invoice, id }: EditInvoiceFormProps) {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>(() => mapItemsToState(invoice.items));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function addItem() {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  }

  function handleItemChange(
    index: number,
    field: string,
    value: string | number
  ) {
    setItems(
      items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);
      const invoiceData = {
        invoiceName: String(data.invoiceName ?? ""),
        invoiceNumber: String(data.invoiceId ?? ""),
        invoiceDate: String(data.invoiceDate ?? ""),
        customerName: String(data.customerName ?? ""),
        customerEmail: String(data.customerEmail ?? ""),
        customerPhone: String(data.customerPhone ?? ""),
        items,
        tax: Number(data.tax) || 0,
        discount: Number(data.discount) || 0,
        note: String(data.note ?? ""),
      };

      await updateInvoice(id, invoiceData);
      router.push(`/invoice/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save invoice");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page-shell">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Edit invoice
        </h1>
        <p className="mt-2 text-gray-600">
          Update the details below and save your changes.
        </p>
      </div>

      {error && (
        <p className="mb-4 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900">
          {error}
        </p>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        <section className="card">
          <h2 className="section-title">Invoice details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="invoiceName">
                Invoice name
              </label>
              <input
                id="invoiceName"
                className="input"
                type="text"
                name="invoiceName"
                defaultValue={invoice.invoiceName}
                placeholder="e.g. Website redesign"
                required
              />
            </div>
            <div>
              <label className="field-label" htmlFor="invoiceId">
                Invoice ID
              </label>
              <input
                id="invoiceId"
                className="input"
                type="text"
                name="invoiceId"
                defaultValue={invoice.invoiceNumber}
                placeholder="e.g. INV-001"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="invoiceDate">
                Invoice date
              </label>
              <input
                id="invoiceDate"
                className="input"
                type="date"
                name="invoiceDate"
                defaultValue={formatDateForInput(invoice.invoiceDate)}
                required
              />
            </div>
          </div>
        </section>

        <section className="card">
          <h2 className="section-title">Customer details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="customerName">
                Customer name
              </label>
              <input
                id="customerName"
                className="input"
                type="text"
                name="customerName"
                defaultValue={invoice.customerName}
                placeholder="Client or company name"
                required
              />
            </div>
            <div>
              <label className="field-label" htmlFor="customerEmail">
                Email
              </label>
              <input
                id="customerEmail"
                className="input"
                type="email"
                name="customerEmail"
                defaultValue={invoice.customerEmail ?? ""}
                placeholder="client@email.com"
              />
            </div>
            <div>
              <label className="field-label" htmlFor="customerPhone">
                Phone
              </label>
              <input
                id="customerPhone"
                className="input"
                type="text"
                name="customerPhone"
                defaultValue={invoice.customerPhone ?? ""}
                placeholder="Phone number"
              />
            </div>
          </div>
        </section>

        <section className="card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="section-title mb-0">Line items</h2>
            <button type="button" onClick={addItem} className="btn-secondary">
              + Add item
            </button>
          </div>

          <div className="hidden gap-4 px-1 pb-2 text-xs font-medium uppercase tracking-wide text-zinc-500 sm:grid sm:grid-cols-[1fr_100px_120px]">
            <span>Item name</span>
            <span>Qty</span>
            <span>Price</span>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <InvoiceItemForm
                key={index}
                item={item}
                index={index}
                handleItemChange={handleItemChange}
              />
            ))}
          </div>
        </section>

        <section className="card">
          <h2 className="section-title">Charges & notes</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="tax">
                Tax on items (%)
              </label>
              <input
                id="tax"
                className="input"
                type="number"
                name="tax"
                defaultValue={invoice.tax}
                placeholder="0"
                min="0"
              />
            </div>
            <div>
              <label className="field-label" htmlFor="discount">
                Discount (%)
              </label>
              <input
                id="discount"
                className="input"
                type="number"
                name="discount"
                defaultValue={invoice.discount}
                placeholder="0"
                min="0"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="note">
                Note
              </label>
              <input
                id="note"
                className="input"
                type="text"
                name="note"
                defaultValue={invoice.note ?? ""}
                placeholder="Payment terms, thank you message, etc."
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => router.push(`/invoice/${id}`)}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
