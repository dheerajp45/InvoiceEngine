import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// import { PrismaClient } from "@/generated/prisma/client";
import { prisma } from "./prisma"

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    emailAndPassword:{
        enabled:true,
        autoSignIn:false
    },
    socialProviders: {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
      },
      account: {
        accountLinking: {
          enabled: true,
          trustedProviders: ["google"],
          disableImplicitLinking: false,
          requireLocalEmailVerified: false 
        },
      },
    secret:process.env.BETTER_AUTH_SECRET
});