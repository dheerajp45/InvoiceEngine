"use server"

import { headers } from "next/headers"
import { auth } from "../../../lib/auth"
import { prisma } from "../../../lib/prisma"

export type CreateInvoiceInput = {
  invoiceName: string
  invoiceNumber: string
  invoiceDate: string
  customerName: string
  customerEmail?: string
  customerPhone?: string
  tax: number
  discount: number
  note?: string
  items: { name: string; quantity: number; price: number }[]
}

export async function createInvoice(data: CreateInvoiceInput) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    throw new Error("Unauthorized")
  }
// Invoice Name
if (!data.invoiceName.trim()) {
    throw new Error("Invoice name is required")
  }
  
  // Invoice Number
  if (!data.invoiceNumber.trim()) {
    throw new Error("Invoice number is required")
  }
  
  // Invoice Date
  if (!data.invoiceDate) {
    throw new Error("Invoice date is required")
  }
  
  // Customer Name
  if (!data.customerName.trim()) {
    throw new Error("Customer name is required")
  }
  
  // Tax
  if (data.tax < 0) {
    throw new Error("Tax cannot be negative")
  }
  
  // Discount
  if (data.discount < 0) {
    throw new Error("Discount cannot be negative")
  }
  
  // Items
  if (data.items.length === 0) {
    throw new Error("At least one invoice item is required")
  }
  
  // Validate every item
  for (const item of data.items) {
    if (!item.name.trim()) {
      throw new Error("Item name is required")
    }
  
    if (item.quantity <= 0) {
      throw new Error("Item quantity must be greater than 0")
    }
  
    if (item.price < 0) {
      throw new Error("Item price cannot be negative")
    }
  }

  const invoice = await prisma.invoice.create({
    data: {
      invoiceName: data.invoiceName,
      invoiceNumber: data.invoiceNumber,
      invoiceDate: new Date(data.invoiceDate),
      customerName: data.customerName,
      customerEmail: data.customerEmail || null,
      customerPhone: data.customerPhone || null,
      tax: data.tax,
      discount: data.discount,
      note: data.note || null,
      userId: session.user.id,
      items: {
        create: data.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  })

  return invoice
}


export async function deleteInvoice(id:string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  const invoice = await prisma.invoice.findFirst({
    where:{
      id:id,
      userId:session.user.id
    }
  });
  if(invoice){
    await prisma.invoice.delete({
      where:{
        id:invoice.id
      }
    })
    return{
      ok:true
    }
  }
  else{
    return {
      ok:false
    }
  } 
}


export async function updateInvoice (id:string , receivedData: CreateInvoiceInput) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    throw new Error("Unauthorized")
  }
  const foundInvoice = await prisma.invoice.findFirst({
    where:{
      id:id,
      userId:session.user.id
    }
  });
  if(!foundInvoice){
    throw new Error("invoice not found")
  }
  // Invoice Name
if (!receivedData.invoiceName.trim()) {
  throw new Error("Invoice name is required")
}

// Invoice Number
if (!receivedData.invoiceNumber.trim()) {
  throw new Error("Invoice number is required")
}

// Invoice Date
if (!receivedData.invoiceDate) {
  throw new Error("Invoice date is required")
}

// Customer Name
if (!receivedData.customerName.trim()) {
  throw new Error("Customer name is required")
}

// Tax
if (receivedData.tax < 0) {
  throw new Error("Tax cannot be negative")
}

// Discount
if (receivedData.discount < 0) {
  throw new Error("Discount cannot be negative")
}

// Items
if (receivedData.items.length === 0) {
  throw new Error("At least one invoice item is required")
}

// Validate every item
for (const item of receivedData.items) {
  if (!item.name.trim()) {
    throw new Error("Item name is required")
  }

  if (item.quantity <= 0) {
    throw new Error("Item quantity must be greater than 0")
  }

  if (item.price < 0) {
    throw new Error("Item price cannot be negative")
  }
}
await prisma.invoiceItem.deleteMany({
  where:{invoiceId:foundInvoice.id}
})


const updatedInvoice = await prisma.invoice.update({
  where:{id:foundInvoice.id},
  data:{
    invoiceName: receivedData.invoiceName,
    invoiceNumber: receivedData.invoiceNumber,
    invoiceDate: new Date(receivedData.invoiceDate),
    customerName: receivedData.customerName,
    customerEmail: receivedData.customerEmail || null,
    customerPhone: receivedData.customerPhone || null,
    tax: receivedData.tax,
    discount: receivedData.discount,
    note: receivedData.note || null,
    userId: session.user.id,
    items: {
      create: receivedData.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    }
  }
  
})

return updatedInvoice
}