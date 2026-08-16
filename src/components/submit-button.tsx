import type { ComponentProps } from "react"

import { Button } from "@/components/ui/button"

type Props = ComponentProps<typeof Button> & {
  pending?: boolean
  pendingText?: string
}

export function SubmitButton({
  children,
  pending,
  pendingText,
  ...props
}: Props) {
  return (
    <Button aria-disabled={pending} type="submit" {...props}>
      {pending ? pendingText : children}
    </Button>
  )
}
