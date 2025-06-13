import { createSlice } from "@reduxjs/toolkit"
import {
  fetchMovies,
  fetchMovieDetails,
  fetchMovieWatchProviders,
} from "./moviesThunks"
import { MovieCategory } from "../../types/movie"
import { MoviesState } from "./types"

const initialState: MoviesState = {
  popular: [],
  top_rated: [],
  upcoming: [],
  now_playing: [],
  status: "idle",
  error: null,
}

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMovies.pending, state => {
      state.status = "loading"
    })
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      const { category, data } = action.payload
      state[category] = data
      state.status = "succeeded"
    })
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.status = "failed"
      state.error = action.error.message || "Failed to fetch movies"
    })
    builder.addCase(fetchMovieDetails.pending, state => {
      state.status = "loading"
    })

    builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
      const { id, runtime, vote_average, vote_count } = action.payload.data
      const movieId = id

      const categories: MovieCategory[] = [
        "popular",
        "top_rated",
        "upcoming",
        "now_playing",
      ]
      categories.forEach(category => {
        const movie = state[category].find(movie => movie.id === movieId)
        if (movie) {
          Object.assign(movie, { runtime, vote_average, vote_count })
        }
      })

      state.status = "succeeded"
    })

    builder.addCase(fetchMovieDetails.rejected, (state, action) => {
      state.status = "failed"
      state.error = action.error.message || "Failed to fetch details"
    })

    builder.addCase(fetchMovieWatchProviders.pending, state => {
      state.status = "loading"
    })

    builder.addCase(fetchMovieWatchProviders.fulfilled, (state, action) => {
      const { data } = action.payload
      const movieId = data.id

      const categories: MovieCategory[] = [
        "popular",
        "top_rated",
        "upcoming",
        "now_playing",
      ]
      categories.forEach(category => {
        const movie = state[category].find(movie => movie.id === movieId)
        if (movie) {
          movie.watchProviders = data
        }
      })

      state.status = "succeeded"
    })

    builder.addCase(fetchMovieWatchProviders.rejected, (state, action) => {
      state.status = "failed"
      state.error = action.error.message || "Failed to fetch watch providers"
    })
  },
})

export const moviesReducer = moviesSlice.reducer
