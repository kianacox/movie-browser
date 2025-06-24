import { createSlice } from "@reduxjs/toolkit"
import {
  fetchMovies,
  fetchMovieDetails,
  fetchMovieWatchProviders,
} from "./moviesThunks"
import type { MovieCategory, Movie } from "../../types/movie"
import { initialMoviesState } from "./sliceState"

const categories: MovieCategory[] = [
  "popular",
  "top_rated",
  "upcoming",
  "now_playing",
  "searched_for",
]

export const moviesSlice = createSlice({
  name: "movies",
  initialState: initialMoviesState,
  reducers: {
    addSearchedForMovies: (state, action) => {
      const results = action.payload
      console.log(action.payload)
      console.log("Adding searched for movies:", results)
      results.forEach((movie: Movie) => {
        if (!state.searched_for.some(m => m.id === movie.id)) {
          state.searched_for.push(movie)
        }
      })
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchMovies.pending, state => {
      state.requests.fetchMovies.status = "loading"
      state.requests.fetchMovies.error = null
    })
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      const { category, data } = action.payload
      state[category] = data
      state.requests.fetchMovies.status = "succeeded"
    })
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.requests.fetchMovies.status = "failed"
      console.log(action.error)
      state.requests.fetchMovies.error =
        action.error.message ?? "Failed to fetch movies"
    })

    builder.addCase(fetchMovieDetails.pending, state => {
      state.requests.fetchMovieDetails.status = "loading"
      state.requests.fetchMovieDetails.error = null
    })

    builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
      const { id, runtime, vote_average, vote_count } = action.payload.data
      const movieId = id

      categories.forEach(category => {
        const movie = state[category].find(movie => movie.id === movieId)
        if (movie) {
          Object.assign(movie, { runtime, vote_average, vote_count })
        }
      })

      state.requests.fetchMovieDetails.status = "succeeded"
    })

    builder.addCase(fetchMovieDetails.rejected, (state, action) => {
      state.requests.fetchMovieDetails.status = "failed"
      state.requests.fetchMovieDetails.error =
        action.error.message ?? "Failed to fetch details"
    })

    builder.addCase(fetchMovieWatchProviders.pending, state => {
      state.requests.fetchMovieWatchProviders.status = "loading"
      state.requests.fetchMovieWatchProviders.error = null
    })

    builder.addCase(fetchMovieWatchProviders.fulfilled, (state, action) => {
      const { data } = action.payload
      const movieId = data.id

      categories.forEach(category => {
        const movie = state[category].find(movie => movie.id === movieId)
        if (movie) {
          movie.watchProviders = data
        }
      })

      state.requests.fetchMovieWatchProviders.status = "succeeded"
    })
    builder.addCase(fetchMovieWatchProviders.rejected, (state, action) => {
      state.requests.fetchMovieWatchProviders.status = "failed"
      state.requests.fetchMovieWatchProviders.error =
        action.error.message ?? "Failed to fetch watch providers"
    })
  },
})

export const moviesReducer = moviesSlice.reducer
export const { addSearchedForMovies } = moviesSlice.actions
