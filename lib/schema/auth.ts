import { z } from "zod"

export const authSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z
    .string()
    .min(12, "Password must be at least 12 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{12,}$/,
      "Password must contain at least one uppercase, lowercase, number, and special character"
    )
    .trim(),
})
