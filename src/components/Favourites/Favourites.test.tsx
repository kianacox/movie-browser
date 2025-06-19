import { renderWithProviders } from "../../test/helpers/RenderWithProvider"
import FavouritesGrid from "./FavouritesGrid"
import {
  NO_FAVOURITES_FOUND_MESSAGE,
  NO_FAVOURITES_FOUND_TITLE,
} from "../../constants/FavouriteConsts"
import { screen } from "@testing-library/react"
import { mockFavourites } from "../../test/mocks/Favourites"

const mockFavouritesState = {
  favourites: mockFavourites,
}

describe("Favourites", () => {
  it("should render the no favourites found message if there are no favourites", () => {
    renderWithProviders(<FavouritesGrid />)
    expect(screen.getByText(NO_FAVOURITES_FOUND_TITLE)).toBeInTheDocument()
    expect(screen.getByText(NO_FAVOURITES_FOUND_MESSAGE)).toBeInTheDocument()
  })

  it("should render the favourites grid if there are favourites", () => {
    renderWithProviders(<FavouritesGrid />, {}, {}, mockFavouritesState)
    expect(screen.getByTestId("favourites-grid")).toBeInTheDocument()
    expect(screen.getByText(mockFavourites[0].title)).toBeInTheDocument()
  })
})
