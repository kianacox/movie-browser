import { moviesReducer } from "../features/movies/moviesSlice"
import { configureStore } from "@reduxjs/toolkit"
import { historyReducer } from "../features/history/historySlice"

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    history: historyReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
