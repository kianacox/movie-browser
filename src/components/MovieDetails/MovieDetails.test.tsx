import { describe, test, expect, beforeEach, afterEach } from "vitest"
import { screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MovieDetails } from "./MovieDetails"
import { renderWithProviders } from "../../test/helpers/RenderWithProvider"
import { mockMovie } from "../../test/mocks/Movie"

describe("MovieDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  vi.mock("react-router-dom", async () => {
    const actual =
      await vi.importActual<typeof import("react-router-dom")>(
        "react-router-dom",
      )
    return {
      ...actual,
      useParams: vi.fn(() => ({ id: mockMovie.id.toString() })),
    }
  })

  test("shows loading spinner while content is loading", () => {
    renderWithProviders(<MovieDetails />, {
      status: "loading",
    })
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument()
  })

  test("shows error message when content fails to load", () => {
    renderWithProviders(<MovieDetails />, {
      status: "failed",
      error: "Test error message",
    })
    expect(screen.getByText("Test error message")).toBeInTheDocument()
  })

  test("navigates back to home when back button is clicked", async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <MovieDetails />,
      {
        popular: [mockMovie],
        status: "succeeded",
      },
      { route: `/movie/${mockMovie.id}` },
    )

    const backButton = screen.getByRole("button", { name: /back to home/i })
    await user.click(backButton)
    expect(window.location.pathname).toBe("/")
  })

  test("displays movie details when content is loaded", () => {
    renderWithProviders(<MovieDetails />, {
      popular: [mockMovie],
      status: "succeeded",
    })

    expect(screen.getByText(mockMovie.title)).toBeInTheDocument()
    expect(screen.getByText(mockMovie.overview)).toBeInTheDocument()
    expect(screen.getByText(/Release Date:/)).toBeInTheDocument()
    expect(screen.getByText(/Runtime:/)).toBeInTheDocument()
    expect(screen.getByText(/Vote Average:/)).toBeInTheDocument()
    expect(screen.getByText(/Vote Count:/)).toBeInTheDocument()
  })

  test("displays watch providers when available", () => {
    renderWithProviders(<MovieDetails />, {
      popular: [mockMovie],
      status: "succeeded",
    })

    expect(screen.getByText("Watch Providers")).toBeInTheDocument()
    expect(screen.getByText("Netflix")).toBeInTheDocument()
    expect(screen.getByAltText("Netflix")).toBeInTheDocument()
  })

  test("displays movie poster with correct image", () => {
    renderWithProviders(<MovieDetails />, {
      popular: [mockMovie],
      status: "succeeded",
    })

    const poster = screen.getByAltText(mockMovie.title)
    expect(poster).toBeInTheDocument()
    expect(poster).toHaveAttribute(
      "src",
      `https://image.tmdb.org/t/p/w300${mockMovie.poster_path}`,
    )
  })
})
