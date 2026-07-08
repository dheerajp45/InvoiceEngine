import { prisma } from "../../../../../../lib/prisma";
import { auth } from "../../../../../../lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import EditInvoiceForm from "@/app/components/EditInvoiceForm";

export default async function EditInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const { id } =await   params;

  const invoice = await prisma.invoice.findFirst({
    where: { userId: session.user.id, id },
    include: { items: true },
  });

  if (!invoice) {
    notFound();
  }

  return <EditInvoiceForm invoice={invoice} id={id} />;
}
