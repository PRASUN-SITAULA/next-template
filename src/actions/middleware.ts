import { headers } from "next/headers"
import { createMiddleware } from "next-safe-action"
import { auth, type Session } from "@/lib/auth"
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

export const authorizationMiddleware = createMiddleware<{
  metadata: { name: string }
  ctx: { session: Session }
}>().define(async ({ next, ctx }) => {
  if (ctx.session.user.role !== "admin") {
    throw new ActionError("User is not authorized")
  }
  return next({ ctx: { session: ctx.session } })
})
