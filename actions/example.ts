"use server"

import { updateUserNameSchema } from "@/lib/schema/example"
import { authActionClient } from "./safe-action"

// Protected mutation example (requires authentication)
export const updateUserName = authActionClient
  .inputSchema(updateUserNameSchema)
  .metadata({ name: "update-user-name" })
  .action(async ({ parsedInput, ctx }) => {
    // ctx.session is guaranteed to be present by authenticationMiddleware
    // TODO: Replace with actual database mutation
    return {
      message: `User ${ctx.session.user.id} name updated to ${parsedInput.name}`,
    }
  })
