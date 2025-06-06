import { test, expect } from "vitest"
import { render } from "@testing-library/react"
import { Loading } from "./Loading"

test("renders loading component", () => {
  const { getByRole } = render(<Loading />)
  expect(getByRole("main")).toBeInTheDocument()
})
