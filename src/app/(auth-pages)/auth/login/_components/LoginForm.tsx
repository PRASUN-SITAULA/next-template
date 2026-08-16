"use client"

import { revalidateLogic, useForm } from "@tanstack/react-form"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useId, useState } from "react"
import { toast } from "sonner"
import { SubmitButton } from "@/components/submit-button"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { type AuthValues, authSchema } from "@/lib/schema/auth"

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const id = useId()

  const defaultValues: AuthValues = {
    email: "",
    password: "",
  }

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      toast("You submitted the following values:", {
        classNames: {
          content: "flex flex-col gap-2",
        },
        description: (
          <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      })
      toast.success("Helel")
    },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
    validators: {
      onDynamic: authSchema,
    },
  })

  return (
    <form
      id={id}
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="name@example.com"
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Link
                    className="font-medium text-muted-foreground text-xs hover:text-primary"
                    href="/"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    aria-invalid={isInvalid}
                    className="pr-10"
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    value={field.state.value}
                  />
                  <Button
                    className="absolute top-1/2 right-1 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    size="icon-sm"
                    tabIndex={-1}
                    type="button"
                    variant="ghost"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
      </FieldGroup>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <SubmitButton
            disabled={!canSubmit}
            pending={isSubmitting}
            pendingText="Logging in..."
          >
            Login
          </SubmitButton>
        )}
      </form.Subscribe>
    </form>
  )
}
