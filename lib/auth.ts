import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// import { PrismaClient } from "@/generated/prisma/client";
import { prisma } from "./prisma"

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    emailAndPassword:{
        enabled:true,
        autoSignIn:false
    },
    secret:process.env.BETTER_AUTH_SECRET
});