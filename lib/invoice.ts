export type InvoiceLineItem = {
  quantity: number;
  price: number;
};

export type InvoiceTotalsInput = {
  items: InvoiceLineItem[];
  tax: number;
  discount: number;
};

export function roundMoney(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

export function calculateInvoiceTotals(invoice: InvoiceTotalsInput) {
  const subtotal = roundMoney(
    invoice.items.reduce(
      (sum, item) => sum + item.quantity * roundMoney(item.price),
      0
    )
  );
  const taxAmount = roundMoney(subtotal * (invoice.tax / 100));
  const discountAmount = roundMoney(subtotal * (invoice.discount / 100));
  const total = roundMoney(subtotal + taxAmount - discountAmount);

  return { subtotal, taxAmount, discountAmount, total };
}

export function calculateInvoiceTotal(invoice: InvoiceTotalsInput) {
  return calculateInvoiceTotals(invoice).total;
}

export function getStartOfMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
