import { describe, test, expect } from "vitest"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CategoriesRow } from "./CategoriesRow"
import { renderWithProviders } from "../../test/helpers/RenderWithProvider"
import { mockMovie } from "../../test/mocks/Movie"
import { MOVIE_POSTER_BASE_URL_200 } from "../../constants/MovieConsts"

describe("CategoriesRow", () => {
  const mockMovies = [
    { ...mockMovie, id: 1, title: "Movie 1" },
    { ...mockMovie, id: 2, title: "Movie 2" },
  ]

  test("displays the row title", () => {
    renderWithProviders(
      <CategoriesRow title="Popular Movies" movies={mockMovies} />,
    )

    expect(screen.getByText("Popular Movies")).toBeInTheDocument()
  })

  test("renders favourites button for each movie", () => {
    renderWithProviders(
      <CategoriesRow title="Popular Movies" movies={mockMovies} />,
    )
    expect(screen.getAllByTestId("favourite-button")).toHaveLength(2)
  })

  test("displays all movies in the row", () => {
    renderWithProviders(
      <CategoriesRow title="Popular Movies" movies={mockMovies} />,
    )

    expect(screen.getByText("Movie 1")).toBeInTheDocument()
    expect(screen.getByText("Movie 2")).toBeInTheDocument()
  })

  test("displays movie posters with correct images", () => {
    renderWithProviders(
      <CategoriesRow title="Popular Movies" movies={mockMovies} />,
    )

    const posters = screen.getAllByRole("img")
    expect(posters).toHaveLength(2)

    posters.forEach((poster, index) => {
      expect(poster).toHaveAttribute(
        "src",
        `${MOVIE_POSTER_BASE_URL_200}${mockMovies[index].poster_path}`,
      )
      expect(poster).toHaveAttribute("alt", mockMovies[index].title)
    })
  })

  test("navigates to movie details when a movie is clicked", async () => {
    renderWithProviders(
      <CategoriesRow title="Popular Movies" movies={mockMovies} />,
      {},
      { history: [] },
      { favourites: [] },
      { route: "/" },
    )

    const link = screen.getByRole("link", { name: /Movie 1/i })
    expect(link).toHaveAttribute("href", "/details/1")
  })

  test("adds movie to history when clicked", async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(
      <CategoriesRow title="Popular Movies" movies={mockMovies} />,
    )

    const firstMovieLink = screen.getByRole("link", { name: /movie 1/i })
    await user.click(firstMovieLink)

    expect(store.getState().history.history).toContainEqual(mockMovies[0])
  })
})
