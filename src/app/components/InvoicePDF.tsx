import {
  Document,
  Page,
  renderToBuffer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import {
  formatCurrency,
  formatDisplayDate,
  type InvoiceDisplayData,
} from "@/app/components/InvoiceDocument";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#111827",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  label: {
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#6b7280",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  meta: {
    textAlign: "right",
    color: "#4b5563",
    lineHeight: 1.5,
  },
  metaBold: {
    color: "#111827",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#6b7280",
    marginBottom: 6,
  },
  customerName: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 2,
  },
  muted: {
    color: "#4b5563",
    lineHeight: 1.5,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 6,
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    paddingVertical: 8,
  },
  colItem: { flex: 3 },
  colQty: { flex: 1, textAlign: "right" },
  colPrice: { flex: 1, textAlign: "right" },
  colTotal: { flex: 1, textAlign: "right" },
  th: {
    fontSize: 8,
    textTransform: "uppercase",
    color: "#6b7280",
  },
  totals: {
    marginTop: 16,
    marginLeft: "auto",
    width: 180,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    color: "#4b5563",
  },
  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    fontSize: 12,
    fontWeight: "bold",
  },
  note: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
});

export function InvoicePDF({ invoice }: { invoice: InvoiceDisplayData }) {
  const subtotal = invoice.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const taxAmt = subtotal * (invoice.tax / 100);
  const discountAmt = subtotal * (invoice.discount / 100);
  const total = subtotal + taxAmt - discountAmt;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.label}>Invoice</Text>
            <Text style={styles.title}>
              {invoice.invoiceName || "Untitled invoice"}
            </Text>
          </View>
          <View style={styles.meta}>
            <Text>
              <Text style={styles.metaBold}>Number: </Text>
              {invoice.invoiceNumber}
            </Text>
            <Text>
              <Text style={styles.metaBold}>Date: </Text>
              {formatDisplayDate(invoice.invoiceDate)}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bill to</Text>
          <Text style={styles.customerName}>{invoice.customerName}</Text>
          {invoice.customerEmail ? (
            <Text style={styles.muted}>{invoice.customerEmail}</Text>
          ) : null}
          {invoice.customerPhone ? (
            <Text style={styles.muted}>{invoice.customerPhone}</Text>
          ) : null}
        </View>

        <View>
          <View style={styles.tableHeader}>
            <Text style={[styles.th, styles.colItem]}>Item</Text>
            <Text style={[styles.th, styles.colQty]}>Qty</Text>
            <Text style={[styles.th, styles.colPrice]}>Price</Text>
            <Text style={[styles.th, styles.colTotal]}>Total</Text>
          </View>
          {invoice.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.colItem}>{item.name || "—"}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colPrice}>{formatCurrency(item.price)}</Text>
              <Text style={styles.colTotal}>
                {formatCurrency(item.quantity * item.price)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text>Subtotal</Text>
            <Text>{formatCurrency(subtotal)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Tax ({invoice.tax}%)</Text>
            <Text>{formatCurrency(taxAmt)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Discount ({invoice.discount}%)</Text>
            <Text>-{formatCurrency(discountAmt)}</Text>
          </View>
          <View style={styles.grandTotal}>
            <Text>Total</Text>
            <Text>{formatCurrency(total)}</Text>
          </View>
        </View>

        {invoice.note ? (
          <View style={styles.note}>
            <Text style={styles.sectionTitle}>Note</Text>
            <Text style={styles.muted}>{invoice.note}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}

export async function renderInvoicePDF(invoice: InvoiceDisplayData) {
  return renderToBuffer(<InvoicePDF invoice={invoice} />);
}
