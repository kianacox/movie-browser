import { screen } from "@testing-library/react"
import { FavouriteButton } from "./FavouriteButton"
import { mockMovie, mockMovieFavourite } from "../../../test/mocks/Movies"
import { renderWithProviders } from "../../../test/helpers/RenderWithProvider"
import { mockFavourites } from "../../../test/mocks/Favourites"
import userEvent from "@testing-library/user-event"

const mockFavouritesState = {
  favourites: mockFavourites,
}

describe("FavouriteButton", () => {
  test("renders the button", () => {
    renderWithProviders(<FavouriteButton movie={mockMovie} />)
    expect(screen.getByTestId("favourite-button")).toBeInTheDocument()
  })

  test("renders the button with a heart icon when the movie is not a favourite", () => {
    renderWithProviders(<FavouriteButton movie={mockMovie} />)
    expect(screen.getByTestId("favourite-button")).toBeInTheDocument()
    expect(screen.getByTestId("favourite-button")).toHaveAttribute(
      "aria-label",
      "Add to favourites",
    )
    expect(screen.getByTestId("heart-empty-icon")).toBeInTheDocument()
  })

  test("renders the button with a heart icon when the movie is a favourite", () => {
    renderWithProviders(
      <FavouriteButton movie={mockMovieFavourite} />,
      {},
      {},
      mockFavouritesState,
    )
    expect(screen.getByTestId("favourite-button")).toBeInTheDocument()
    expect(screen.getByTestId("favourite-button")).toHaveAttribute(
      "aria-label",
      "Remove from favourites",
    )
    expect(screen.getByTestId("heart-filled-icon")).toBeInTheDocument()
  })

  test("adds the movie to favourites when the button is clicked", async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<FavouriteButton movie={mockMovie} />)
    expect(screen.getByTestId("favourite-button")).toBeInTheDocument()
    await user.click(screen.getByTestId("favourite-button"))
    expect(store.getState().favourites.favourites).toContain(mockMovie)
  })

  test("removes the movie from favourites when the button is clicked", async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(
      <FavouriteButton movie={mockMovieFavourite} />,
      {},
      {},
      mockFavouritesState,
    )
    await user.click(screen.getByTestId("favourite-button"))
    expect(store.getState().favourites.favourites).not.toContain(
      mockMovieFavourite,
    )
  })
})
