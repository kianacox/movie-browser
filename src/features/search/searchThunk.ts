import { createAsyncThunk } from "@reduxjs/toolkit"
import { createMovieService } from "../../services/api/movieService"

const movieService = createMovieService()

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (query: string) => {
    const response = await movieService.getMovieSearchResults(query)
    return { response }
  },
)
