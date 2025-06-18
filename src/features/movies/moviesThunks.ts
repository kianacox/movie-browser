import { createAsyncThunk } from "@reduxjs/toolkit"
import type { MovieCategory } from "../../types/movie"
import { createMovieService } from "../../services/api/movieService"

const movieService = createMovieService()

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (category: MovieCategory) => {
    const response = await movieService.getMovies(category)
    return { category, data: response.results }
  },
)

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (movieId: string) => {
    const data = await movieService.getMovieDetails(parseInt(movieId))
    return { data }
  },
)

export const fetchMovieWatchProviders = createAsyncThunk(
  "movies/fetchMovieWatchProviders",
  async (movieId: string) => {
    const data = await movieService.getMovieWatchProviders(parseInt(movieId))
    return { data }
  },
)
