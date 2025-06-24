import type { MoviesState } from "./types"

export const initialMoviesState: MoviesState = {
  popular: [],
  top_rated: [],
  upcoming: [],
  now_playing: [],
  searched_for: [],
  requests: {
    fetchMovies: { status: "idle", error: null },
    fetchMovieDetails: { status: "idle", error: null },
    fetchMovieWatchProviders: { status: "idle", error: null },
  },
}
