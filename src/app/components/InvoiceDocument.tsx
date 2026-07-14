import { calculateInvoiceTotals, roundMoney } from "../../../lib/invoice";

export type InvoiceDisplayItem = {
  name: string;
  quantity: number;
  price: number;
};

export type InvoiceDisplayData = {
  invoiceName: string;
  invoiceNumber: string;
  invoiceDate: string;
  customerName: string;
  customerEmail?: string | null;
  customerPhone?: string | null;
  tax: number;
  discount: number;
  note?: string | null;
  items: InvoiceDisplayItem[];
};

export type BusinessDisplayData = {
  businessName?: string | null;
  address?: string | null;
  taxInfo?: string | null;
  currency: string;
  logoUrl?: string | null;
};

export function formatCurrency(amount: number, currency?: string | null) {
  const rounded = roundMoney(amount);

  if (currency) {
    try {
      return rounded.toLocaleString(undefined, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } catch {
      // fall through to generic formatting
    }
  }

  return rounded.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function hasBusinessDetails(business?: BusinessDisplayData | null) {
  return Boolean(
    business &&
      (business.businessName || business.address || business.taxInfo)
  );
}

export function formatDisplayDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

type InvoiceDocumentProps = {
  invoice: InvoiceDisplayData;
  business?: BusinessDisplayData | null;
};

export default function InvoiceDocument({
  invoice,
  business,
}: InvoiceDocumentProps) {
  const { subtotal, taxAmount: taxAmt, discountAmount: discountAmt, total } =
    calculateInvoiceTotals(invoice);
  const currency = business?.currency ?? "INR";
  const showBusiness = hasBusinessDetails(business);

  return (
    <article className="card overflow-hidden p-0">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-8 sm:px-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
              Invoice
            </p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {invoice.invoiceName || "Untitled invoice"}
            </h2>
          </div>
          <div className="text-right text-sm text-gray-600">
            <p>
              <span className="font-medium text-gray-900">Number:</span>{" "}
              {invoice.invoiceNumber}
            </p>
            <p className="mt-1">
              <span className="font-medium text-gray-900">Date:</span>{" "}
              {formatDisplayDate(invoice.invoiceDate)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 px-6 py-8 sm:grid-cols-2 sm:px-10">
        {showBusiness && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              From
            </h3>
            {business?.businessName && (
              <p className="mt-2 font-medium text-gray-900">
                {business.businessName}
              </p>
            )}
            {business?.address && (
              <p className="mt-1 whitespace-pre-line text-sm text-gray-600">
                {business.address}
              </p>
            )}
            {business?.taxInfo && (
              <p className="mt-1 text-sm text-gray-600">{business.taxInfo}</p>
            )}
          </div>
        )}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Bill to
          </h3>
          <p className="mt-2 font-medium text-gray-900">
            {invoice.customerName}
          </p>
          {invoice.customerEmail && (
            <p className="mt-1 text-sm text-gray-600">
              {invoice.customerEmail}
            </p>
          )}
          {invoice.customerPhone && (
            <p className="text-sm text-gray-600">{invoice.customerPhone}</p>
          )}
        </div>
      </div>

      <div className="overflow-x-auto px-6 sm:px-10">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
              <th className="pb-3 pr-4 font-medium">Item</th>
              <th className="pb-3 pr-4 text-right font-medium">Qty</th>
              <th className="pb-3 pr-4 text-right font-medium">Price</th>
              <th className="pb-3 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-4 pr-4 font-medium text-gray-900">
                  {item.name || "—"}
                </td>
                <td className="py-4 pr-4 text-right text-gray-600">
                  {item.quantity}
                </td>
                <td className="py-4 pr-4 text-right text-gray-600">
                  {formatCurrency(item.price, currency)}
                </td>
                <td className="py-4 text-right font-medium text-gray-900">
                  {formatCurrency(
                    roundMoney(item.quantity * item.price),
                    currency
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end px-6 py-8 sm:px-10">
        <div className="w-full max-w-xs space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal, currency)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax ({invoice.tax}%)</span>
            <span>{formatCurrency(taxAmt, currency)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Discount ({invoice.discount}%)</span>
            <span>-{formatCurrency(discountAmt, currency)}</span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-bold text-gray-900">
            <span>Total</span>
            <span>{formatCurrency(total, currency)}</span>
          </div>
        </div>
      </div>

      {invoice.note && (
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-6 sm:px-10">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Note
          </h3>
          <p className="mt-2 text-sm text-gray-600">{invoice.note}</p>
        </div>
      )}
    </article>
  );
}
