import { headers } from "next/headers"
import { createMiddleware } from "next-safe-action"

import { auth } from "@/lib/auth"

import { ActionError } from "./safe-action"

// Authenticate the user
export const authenticationMiddleware = createMiddleware<{
  metadata: { name: string }
}>().define(async ({ next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new ActionError("User is not authenticated")
  }
  return next({
    ctx: { session: session },
  })
})
