import { describe, test, expect } from "vitest"
import { screen } from "@testing-library/react"
import { MovieCard } from "./MovieCard"
import { renderWithProviders } from "../../test/helpers/RenderWithProvider"
import { mockMovie } from "../../test/mocks/Movies"
import { MOVIE_POSTER_BASE_URL_200 } from "../../constants/MovieConsts"
import userEvent from "@testing-library/user-event"

describe("MovieCard", () => {
  test("renders the movie card", () => {
    renderWithProviders(<MovieCard movie={mockMovie} />)
    expect(screen.getByTestId("movie-card")).toBeInTheDocument()
  })

  test("renders the movie card with the correct movie", () => {
    renderWithProviders(<MovieCard movie={mockMovie} />)
    expect(screen.getByTestId("movie-card")).toBeInTheDocument()
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument()
  })

  test("renders the movie card with the correct movie poster", () => {
    renderWithProviders(<MovieCard movie={mockMovie} />)
    expect(screen.getByTestId("movie-card")).toBeInTheDocument()
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      `${MOVIE_POSTER_BASE_URL_200}${mockMovie.poster_path}`,
    )
  })

  test("should navigate to the movie details page when the movie card is clicked", () => {
    renderWithProviders(<MovieCard movie={mockMovie} />)
    expect(screen.getByTestId("movie-card")).toBeInTheDocument()
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/details/${mockMovie.id.toString()}`,
    )
  })

  test("should add the movie to the history when the movie card is clicked", async () => {
    const { store } = renderWithProviders(<MovieCard movie={mockMovie} />)
    const user = userEvent.setup()
    await user.click(screen.getByRole("link"))
    expect(store.getState().history.history).toContain(mockMovie)
  })
})
