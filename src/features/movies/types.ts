import type { Movie } from "../../types/movie"

type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export type RequestState = {
  status: RequestStatus
  error: string | null
}

export type MoviesState = {
  popular: Movie[]
  top_rated: Movie[]
  upcoming: Movie[]
  now_playing: Movie[]
  searched_for: Movie[]
  requests: {
    fetchMovies: RequestState
    fetchMovieDetails: RequestState
    fetchMovieWatchProviders: RequestState
  }
}
