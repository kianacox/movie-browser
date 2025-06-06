import { describe, test, expect } from "vitest"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MovieRow } from "./MovieRow"
import { renderWithProviders } from "../../test/helpers/RenderWithProvider"
import { mockMovie } from "../../test/mocks/Movie"

describe("MovieRow", () => {
  const mockMovies = [
    { ...mockMovie, id: 1, title: "Movie 1" },
    { ...mockMovie, id: 2, title: "Movie 2" },
  ]

  test("displays the row title", () => {
    renderWithProviders(<MovieRow title="Popular Movies" movies={mockMovies} />)

    expect(screen.getByText("Popular Movies")).toBeInTheDocument()
  })

  test("displays all movies in the row", () => {
    renderWithProviders(<MovieRow title="Popular Movies" movies={mockMovies} />)

    expect(screen.getByText("Movie 1")).toBeInTheDocument()
    expect(screen.getByText("Movie 2")).toBeInTheDocument()
  })

  test("displays movie posters with correct images", () => {
    renderWithProviders(<MovieRow title="Popular Movies" movies={mockMovies} />)

    const posters = screen.getAllByRole("img")
    expect(posters).toHaveLength(2)

    posters.forEach((poster, index) => {
      expect(poster).toHaveAttribute(
        "src",
        `https://image.tmdb.org/t/p/w200${mockMovies[index].poster_path}`,
      )
      expect(poster).toHaveAttribute("alt", mockMovies[index].title)
    })
  })

  test("navigates to movie details when a movie is clicked", async () => {
    renderWithProviders(
      <MovieRow title="Popular Movies" movies={mockMovies} />,
      {},
      { route: "/" },
    )

    const firstMovieLink = screen.getByRole("link", { name: /movie 1/i })
    expect(firstMovieLink).toHaveAttribute("href", "/details/1")
  })

  test("adds movie to history when clicked", async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(
      <MovieRow title="Popular Movies" movies={mockMovies} />,
    )

    const firstMovieLink = screen.getByRole("link", { name: /movie 1/i })
    await user.click(firstMovieLink)

    console.log("store", store.getState())
    expect(store.getState().history.history).toContainEqual(mockMovies[0])
  })
})
