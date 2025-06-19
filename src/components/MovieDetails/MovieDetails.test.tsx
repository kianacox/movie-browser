import { describe, test, expect } from "vitest"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import MovieDetails from "./MovieDetails"
import { renderWithProviders } from "../../test/helpers/RenderWithProvider"
import { mockMovie } from "../../test/mocks/Movies"
import { MOVIE_POSTER_BASE_URL_300 } from "../../constants/MovieConsts"

describe("MovieDetails", () => {
  vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom")
    return {
      ...actual,
      useParams: vi.fn(() => ({ id: mockMovie.id.toString() })),
    }
  })

  test("shows loading spinner while content is loading", () => {
    renderWithProviders(<MovieDetails />, {
      requests: {
        fetchMovieDetails: {
          status: "loading",
          error: null,
        },
        fetchMovies: {
          status: "idle",
          error: null,
        },
        fetchMovieWatchProviders: {
          status: "idle",
          error: null,
        },
      },
    })
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument()
  })

  test("shows error message when content fails to load and state.error is null", () => {
    renderWithProviders(<MovieDetails />, {
      requests: {
        fetchMovieDetails: {
          status: "failed",
          error: null,
        },
        fetchMovies: {
          status: "idle",
          error: null,
        },
        fetchMovieWatchProviders: {
          status: "idle",
          error: null,
        },
      },
    })
    expect(screen.getByText("Movie details not found")).toBeInTheDocument()
  })

  test("shows error message when content fails to load and state.error is not null", () => {
    renderWithProviders(<MovieDetails />, {
      requests: {
        fetchMovieDetails: {
          status: "failed",
          error: "Test error message",
        },
        fetchMovies: {
          status: "idle",
          error: null,
        },
        fetchMovieWatchProviders: {
          status: "idle",
          error: null,
        },
      },
    })
    expect(screen.getByText("Test error message")).toBeInTheDocument()
  })

  // Rewrite to account for the fact that the back button is not a link
  test("navigates back to home when back button is clicked", async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <MovieDetails />,
      {
        popular: [mockMovie],
        requests: {
          fetchMovieDetails: {
            status: "succeeded",
            error: null,
          },

          fetchMovies: {
            status: "idle",
            error: null,
          },
          fetchMovieWatchProviders: {
            status: "idle",
            error: null,
          },
        },
      },
      {},
      {},
      { route: `/movie/${mockMovie.id.toString()}` },
    )

    const backButton = screen.getByRole("button", { name: /back to home/i })
    await user.click(backButton)
    expect(window.location.pathname).toBe("/")
  })

  test("displays movie details when content is loaded", () => {
    renderWithProviders(<MovieDetails />, {
      popular: [mockMovie],
      requests: {
        fetchMovieDetails: {
          status: "succeeded",
          error: null,
        },

        fetchMovies: {
          status: "idle",
          error: null,
        },
        fetchMovieWatchProviders: {
          status: "idle",
          error: null,
        },
      },
    })

    expect(screen.getByText(mockMovie.title)).toBeInTheDocument()
    expect(screen.getByText(mockMovie.overview)).toBeInTheDocument()
    expect(screen.getByText(mockMovie.release_date)).toBeInTheDocument()
    expect(
      screen.getByText(`${(mockMovie.runtime ?? "").toString()} mins`),
    ).toBeInTheDocument()
    expect(
      screen.getByText((mockMovie.vote_average ?? "").toString()),
    ).toBeInTheDocument()
    expect(
      screen.getByText((mockMovie.vote_count ?? "").toString()),
    ).toBeInTheDocument()
  })

  test("displays watch providers when available", () => {
    renderWithProviders(<MovieDetails />, {
      popular: [mockMovie],
      requests: {
        fetchMovieDetails: {
          status: "succeeded",
          error: null,
        },
        fetchMovies: {
          status: "idle",
          error: null,
        },
        fetchMovieWatchProviders: {
          status: "idle",
          error: null,
        },
      },
    })

    expect(screen.getByText("Watch Providers")).toBeInTheDocument()
    expect(screen.getByText("Netflix")).toBeInTheDocument()
    expect(screen.getByAltText("Netflix")).toBeInTheDocument()
  })

  test("displays movie poster with correct image", () => {
    renderWithProviders(<MovieDetails />, {
      popular: [mockMovie],
      requests: {
        fetchMovieDetails: {
          status: "succeeded",
          error: null,
        },
        fetchMovies: {
          status: "idle",
          error: null,
        },
        fetchMovieWatchProviders: {
          status: "idle",
          error: null,
        },
      },
    })

    const poster = screen.getByAltText(mockMovie.title)
    expect(poster).toBeInTheDocument()
    expect(poster).toHaveAttribute(
      "src",
      `${MOVIE_POSTER_BASE_URL_300}${mockMovie.poster_path}`,
    )
  })
})
