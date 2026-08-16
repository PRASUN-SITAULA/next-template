import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { nextCookies } from "better-auth/next-js"
import { haveIBeenPwned } from "better-auth/plugins"
import prisma from "./prisma"

export const auth = betterAuth({
  advanced: {
    cookiePrefix: "nextjs-template",
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    haveIBeenPwned({
      customPasswordCompromisedMessage:
        "This password has been linked to a data breach. Please choose a more secure password.",
    }),
    nextCookies(),
  ],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  trustedOrigins:
    process.env.NODE_ENV === "production"
      ? ["https://example.com"]
      : ["http://localhost:3000"],
  user: {
    additionalFields: {
      role: {
        required: true,
        type: "string",
      },
    },
  },
})

export type Session = typeof auth.$Infer.Session
