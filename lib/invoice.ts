export type InvoiceLineItem = {
  quantity: number;
  price: number;
};

export type InvoiceTotalsInput = {
  items: InvoiceLineItem[];
  tax: number;
  discount: number;
};

export function calculateInvoiceTotal(invoice: InvoiceTotalsInput) {
  const subtotal = invoice.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const taxAmount = subtotal * (invoice.tax / 100);
  const discountAmount = subtotal * (invoice.discount / 100);
  return subtotal + taxAmount - discountAmount;
}

export function getStartOfMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}