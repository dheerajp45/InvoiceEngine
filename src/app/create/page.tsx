"use client";

import InvoiceItemForm from "../components/InvoiceItemForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useInvoice, type Item } from "../context/invoice-context";
import React, { FormEvent } from "react";

export default function createinvoice() {
  const { setInvoice } = useInvoice();
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([
    {
      name: "",
      quantity: 1,
      price: 0,
    },
  ]);

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

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    setInvoice({
      invoiceName: String(data.invoiceName ?? ""),
      invoiceId: String(data.invoiceId ?? ""),
      invoiceDate: String(data.invoiceDate ?? ""),
      customerName: String(data.customerName ?? ""),
      customerEmail: String(data.customerEmail ?? ""),
      customerPhone: String(data.customerPhone ?? ""),
      items,
      tax: Number(data.tax) || 0,
      discount: Number(data.discount) || 0,
      note: String(data.note ?? ""),
    });
    router.push("/preview");
  }

  return (
    <div className="page-shell">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Create invoice
        </h1>
        <p className="mt-2 text-gray-600">
          Fill in the details below. You can preview before downloading.
        </p>
      </div>

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
                type="number"
                name="customerPhone"
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
                Tax (%)
              </label>
              <input
                id="tax"
                className="input"
                type="number"
                name="tax"
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
                placeholder="Payment terms, thank you message, etc."
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button type="submit" className="btn-primary">
            Preview invoice
          </button>
        </div>
      </form>
    </div>
  );
}
