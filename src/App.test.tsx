import { screen } from "@testing-library/react"
import { App } from "./App"
import { renderWithProviders } from "./test/helpers/RenderWithProvider"

describe("App", () => {
  test("renders the Home component", () => {
    renderWithProviders(<App />)
    expect(screen.getByTestId("home-page")).toBeInTheDocument()
  })
})
