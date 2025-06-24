import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { FavouritesState } from "./types"
import type { Movie } from "../../types/movie"

const initialState: FavouritesState = {
  favourites: [],
}

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<Movie>) => {
      const existingMovie = state.favourites.find(
        movie => movie.id === action.payload.id,
      )
      if (!existingMovie) {
        state.favourites.push(action.payload)
      } else {
        state.favourites.splice(state.favourites.indexOf(existingMovie), 1)
        state.favourites.unshift(action.payload)
      }
    },
    removeFromFavourites: (state, action: PayloadAction<Movie>) => {
      state.favourites = state.favourites.filter(
        favourite => favourite.id !== action.payload.id,
      )
    },
    clearFavourites: state => {
      state.favourites = []
    },
  },
})

export const favouritesReducer = favouritesSlice.reducer
export const { addToFavourites, removeFromFavourites, clearFavourites } =
  favouritesSlice.actions
