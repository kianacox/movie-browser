import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { MovieCategory } from "./types"

const API_KEY = "4b8f880a5c7fdf63c3616b6f9969e0f8"
const BASE_URL = "https://api.themoviedb.org/3/movie"

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (category: MovieCategory) => {
    const response = await axios.get(
      `${BASE_URL}/${category}?api_key=${API_KEY}`,
    )
    return { category, data: response.data.results }
  },
)

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (movieId: string) => {
    const response = await axios.get(
      `${BASE_URL}/${movieId}?api_key=${API_KEY}`,
    )
    return { data: response.data }
  },
)

// create a thunk to fetch movie watch providers
export const fetchMovieWatchProviders = createAsyncThunk(
  "movies/fetchMovieWatchProviders",
  async (movieId: string) => {
    const response = await axios.get(
      `${BASE_URL}/${movieId}/watch/providers?api_key=${API_KEY}`,
    )
    return { data: response.data }
  },
)
