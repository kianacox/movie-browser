import { test, expect } from "vitest"
import { screen } from "@testing-library/react"
import { Loading } from "./Loading"
import { renderWithProviders } from "../../test/helpers/RenderWithProvider"

test("renders loading component", () => {
  renderWithProviders(<Loading />)
  expect(screen.getByTestId("loading-spinner")).toBeInTheDocument()
})
