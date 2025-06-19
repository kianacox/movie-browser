import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Navigation } from "./Navigation"
import { renderWithProviders } from "../../test/helpers/RenderWithProvider"

describe("Navigation", () => {
  it("renders the navigation title", () => {
    renderWithProviders(<Navigation />)
    expect(screen.getByText("Movie Browser")).toBeInTheDocument()
  })

  it("renders Home and Favourites links", () => {
    renderWithProviders(<Navigation />)
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Favourites" })).toBeInTheDocument()
  })

  it("highlights the Home link when on the home page", () => {
    renderWithProviders(<Navigation />, {}, {}, {}, { route: "/" })
    const homeLink = screen.getByRole("link", { name: "Home" })
    expect(homeLink).toHaveClass("navigation-link-active")
    const favouritesLink = screen.getByRole("link", { name: "Favourites" })
    expect(favouritesLink).not.toHaveClass("navigation-link-active")
  })

  it("highlights the Favourites link when on the favourites page", () => {
    renderWithProviders(<Navigation />, {}, {}, {}, { route: "/favourites" })
    const favouritesLink = screen.getByRole("link", { name: "Favourites" })
    expect(favouritesLink).toHaveClass("navigation-link-active")
    const homeLink = screen.getByRole("link", { name: "Home" })
    expect(homeLink).not.toHaveClass("navigation-link-active")
  })

  it("navigates to Favourites when the link is clicked", async () => {
    const user = userEvent.setup()
    renderWithProviders(<Navigation />, {}, {}, {}, { route: "/" })
    const favouritesLink = screen.getByRole("link", { name: "Favourites" })
    await user.click(favouritesLink)
    expect(favouritesLink).toHaveClass("navigation-link-active")
  })
})
