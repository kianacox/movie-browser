import { Movie } from "../../types/movie"

export interface MoviesState {
  popular: Movie[]
  top_rated: Movie[]
  upcoming: Movie[]
  now_playing: Movie[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}
