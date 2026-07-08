import { renderInvoicePDF } from "@/app/components/InvoicePDF";

import { prisma } from "../../../../../../lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ publicId : string }> }
) {


  const { publicId  } = await params;

  const invoice = await prisma.invoice.findFirst({
    where: { publicId  },
    include: { items: true },
  });

  if (!invoice) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const buffer = await renderInvoicePDF({
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
  });

  const filename = `invoice-${invoice.invoiceNumber.replace(/[^a-zA-Z0-9-_]/g, "-")}.pdf`;

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
