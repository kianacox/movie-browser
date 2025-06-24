import type { MovieList } from "../../types/movie"
import type { RequestState } from "../movies/types"

export type SearchState = {
  query: string
  results: MovieList
  request: {
    fetchSearch: RequestState
  }
}
