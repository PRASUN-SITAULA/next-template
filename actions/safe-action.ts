import { APIError } from "better-auth/api"
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action"
import z, { ZodError } from "zod"
import { Prisma } from "@/app/generated/prisma/client"
import { authenticationMiddleware } from "./middleware"

export class ActionError extends Error {}

const ZOD_VALIDATION_ERROR_MESSAGE = "An error occurred while validating input"
const DATABASE_ERROR_MESSAGE = "An error occurred with the database"

const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof APIError) {
      switch (error.status) {
        case "UNPROCESSABLE_ENTITY":
          return "User already exists."
        case "BAD_REQUEST":
          return "Invalid email"
        case "UNAUTHORIZED":
          return "Invalid email or password"
        default:
          return error.message
      }
    }
    if (error instanceof ZodError) {
      return ZOD_VALIDATION_ERROR_MESSAGE
    } else if (
      error instanceof Prisma.PrismaClientInitializationError ||
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientUnknownRequestError ||
      error instanceof Prisma.PrismaClientValidationError
    ) {
      return DATABASE_ERROR_MESSAGE
    } else if (error instanceof ActionError) {
      return error.message
    }
    return DEFAULT_SERVER_ERROR_MESSAGE
  },
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
    })
  },
})

export const noAuthActionClient = actionClient

export const authActionClient = actionClient.use(authenticationMiddleware)

// export const adminActionClient = actionClient
//   .use(authenticationMiddleware)
//   .use(authorizationMiddleware)
