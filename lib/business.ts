import { prisma } from "./prisma";

export function isBusinessProfileComplete(
  business: { businessName?: string | null } | null | undefined
) {
  return Boolean(business?.businessName?.trim());
}

export async function ensureBusinessSettings(userId: string) {
  return prisma.businessSettings.upsert({
    where: { userId },
    create: {
      userId,
      currency: "INR",
    },
    update: {},
  });
}

export const DEFAULT_CURRENCY = "INR";
