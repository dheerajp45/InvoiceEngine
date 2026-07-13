"use server";

import { headers } from "next/headers";
import { auth } from "../../../lib/auth";
import { ensureBusinessSettings } from "../../../lib/business";
import { prisma } from "../../../lib/prisma";

export type BusinessSettingsInput = {
  businessName: string;
  address: string;
  taxInfo: string;
  currency: string;
};

export async function getBusinessSettings() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return ensureBusinessSettings(session.user.id);
}

export async function upsertBusinessSettings(data: BusinessSettingsInput) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const businessName = data.businessName.trim();
  const address = data.address.trim() || null;
  const taxInfo = data.taxInfo.trim() || null;
  const currency = data.currency.trim() || "INR";

  if (!businessName) {
    throw new Error("Business name is required");
  }

  await prisma.businessSettings.upsert({
    where: { userId: session.user.id },
    create: {
      userId: session.user.id,
      businessName,
      address,
      taxInfo,
      currency,
    },
    update: {
      businessName,
      address,
      taxInfo,
      currency,
    },
  });

  return { ok: true };
}
