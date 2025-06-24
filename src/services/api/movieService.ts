import { createApiClient } from "./client"
import type {
  Movie,
  MovieCategory,
  MovieList,
  WatchProviderResults,
} from "../../types/movie"

export const createMovieService = () => {
  const apiClient = createApiClient()

  return {
    async getMovies(category: MovieCategory): Promise<MovieList> {
      return apiClient.get<MovieList>(`/movie/${category}`)
    },
    async getMovieDetails(id: number): Promise<Movie> {
      return apiClient.get<Movie>(`/movie/${id.toString()}`)
    },
    async getMovieWatchProviders(id: number): Promise<WatchProviderResults> {
      return apiClient.get<WatchProviderResults>(
        `/movie/${id.toString()}/watch/providers`,
      )
    },
    async getMovieSearchResults(title: string): Promise<MovieList> {
      return apiClient.get<MovieList>(`/search/movie?query=${title}`)
    },
  }
}
