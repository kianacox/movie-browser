import { describe, test, expect } from "vitest"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Error } from "./Error"
import { renderWithProviders } from "../../../test/helpers/RenderWithProvider"

describe("Error", () => {
  test("displays error message to user", () => {
    const errorMessage = "Something went wrong"
    renderWithProviders(<Error message={errorMessage} />)

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  test("shows a button to navigate back to home", () => {
    renderWithProviders(<Error message="Test error" />)

    const backButton = screen.getByRole("button", { name: /go back to home/i })
    expect(backButton).toBeInTheDocument()
  })

  test("button is present and clickable", async () => {
    const user = userEvent.setup()
    renderWithProviders(<Error message="Test error" />)

    const backButton = screen.getByRole("button", { name: /go back to home/i })
    expect(backButton).toBeEnabled()
    await user.click(backButton) // Verify it's clickable
  })
})
