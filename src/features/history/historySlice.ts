import { createSlice } from "@reduxjs/toolkit"
import type { HistoryState } from "./types"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { Movie } from "../../types/movie"

const initialState: HistoryState = {
  history: [],
}
const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<Movie>) => {
      const existingMovie = state.history.find(
        movie => movie.id === action.payload.id,
      )
      if (!existingMovie) {
        state.history.unshift(action.payload)
      } else {
        state.history.splice(state.history.indexOf(existingMovie), 1)
        state.history.unshift(action.payload)
      }
    },
    clearHistory: state => {
      state.history = []
    },
  },
})

export const historyReducer = historySlice.reducer
export const { addToHistory, clearHistory } = historySlice.actions
