import {
  favouritesReducer,
  addToFavourites,
  removeFromFavourites,
  clearFavourites,
} from "./favouritesSlice"
import type { FavouritesState } from "./types"
import { mockMovie } from "../../test/mocks/Movies"

const initialState: FavouritesState = {
  favourites: [],
}

describe("favouritesSlice", () => {
  test("should handle add to favourites", () => {
    const action = addToFavourites(mockMovie)
    const state = favouritesReducer(initialState, action)
    expect(state.favourites).toEqual([mockMovie])
  })

  test("should handle remove from favourites", () => {
    const action = removeFromFavourites(mockMovie)
    const state = favouritesReducer(initialState, action)
    expect(state.favourites).toEqual([])
  })

  test("should handle clear favourites", () => {
    const action = addToFavourites(mockMovie)
    const state = favouritesReducer(initialState, action)
    const clearAction = clearFavourites()
    const clearState = favouritesReducer(state, clearAction)
    expect(clearState.favourites).toEqual([])
  })

  test("should handle add to favourites when movie already exists", () => {
    const action = addToFavourites(mockMovie)
    const state = favouritesReducer(initialState, action)
    const addAction = addToFavourites(mockMovie)
    const addState = favouritesReducer(state, addAction)
    expect(addState.favourites).toEqual([mockMovie])
  })
})
