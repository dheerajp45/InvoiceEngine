import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// import { PrismaClient } from "@/generated/prisma/client";
import { prisma } from "./prisma"
import { resend } from "./resend";


export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    emailVerification: {
      sendOnSignUp: true,
      sendOnSignIn: true,
      sendVerificationEmail: async ({ user, url }) => {
        void resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: user.email,
          subject: "Verify your email — Invoice Engine",
          html: `
            <p>Hi ${user.name ?? "there"},</p>
            <p>Click the link below to verify your email address:</p>
            <p><a href="${url}">Verify my email</a></p>
            <p>If you didn't create an account, you can ignore this email.</p>
            <p>Thanks,<br/>Invoice Engine</p>
          `,
        });
      },
    },
    emailAndPassword:{
        enabled:true,
        autoSignIn:false,
        requireEmailVerification: true, 
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
          requireLocalEmailVerified: true 
        },
      },
    secret:process.env.BETTER_AUTH_SECRET
});