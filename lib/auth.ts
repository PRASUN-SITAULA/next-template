import { prismaAdapter } from "better-auth/adapters/prisma"
import { betterAuth } from "better-auth/minimal"
import { nextCookies } from "better-auth/next-js"
import { haveIBeenPwned } from "better-auth/plugins"
import prisma from "./prisma"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
      },
    },
  },
  plugins: [
    haveIBeenPwned({
      customPasswordCompromisedMessage:
        "This password has been linked to a data breach. Please choose a more secure password.",
    }),
    nextCookies(),
  ],
})
