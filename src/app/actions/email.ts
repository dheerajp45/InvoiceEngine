"use server"

import { headers } from "next/headers"
import { auth } from "../../../lib/auth"
import { prisma } from "../../../lib/prisma"
import { resend } from "../../../lib/resend"

export async function sendInvoiceEmail(invoiceId: string, toEmail: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  if (!toEmail) {
    throw new Error("Email is required")
  }

  if (!invoiceId) {
    throw new Error("Invoice id is required")
  }

  const invoice = await prisma.invoice.findFirst({
    where: {
      id: invoiceId,
      userId: session.user.id,
    },
  })

  if (!invoice) {
    throw new Error("Invoice not found")
  }

  const invoiceLink = `${process.env.APP_URL}/share/${invoice.publicId}`;
  const pdfLink = `${process.env.APP_URL}/api/share/${invoice.publicId}/pdf`;


  const result = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: toEmail,
    subject: `Invoice ${invoice.invoiceNumber}`,
    html: `
      <p>Hi ${invoice.customerName},</p>
      <p>Your invoice <b>${invoice.invoiceNumber}</b> is ready.</p>
      <p><a href="${invoiceLink}">Click here to view your invoice</a></p>
      <p><a href="${pdfLink}">Download PDF</a></p>
      <p>Thanks,<br/>Invoice Engine</p>
    `,
  })

  if (result.error) {
    throw new Error(result.error.message)
  }

  return { ok: true }
}