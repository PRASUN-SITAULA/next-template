import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import AuthPage from "@/app/(auth-pages)/auth/login/page"

test("Page", () => {
  render(<AuthPage />)
  expect(
    screen.getByRole("heading", { level: 1, name: "Auth Page" })
  ).toBeDefined()
})
