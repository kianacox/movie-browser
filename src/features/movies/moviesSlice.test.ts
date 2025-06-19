import {
  fetchMovies,
  fetchMovieDetails,
  fetchMovieWatchProviders,
} from "./moviesThunks"
import { moviesReducer } from "./moviesSlice"
import type { MoviesState } from "./types"
import { initialMoviesState } from "./sliceState"
import { mockMovie } from "../../test/mocks/Movies"

const initialState: MoviesState = initialMoviesState

describe("moviesSlice", () => {
  describe("fetchMovies", () => {
    test("should handle fetchMovies.pending", () => {
      const action = { type: fetchMovies.pending.type }
      const state = moviesReducer(initialState, action)
      expect(state.requests.fetchMovies.status).toBe("loading")
      expect(state.requests.fetchMovies.error).toBeNull()
    })

    test("should handle fetchMovies.fulfilled", () => {
      const action = {
        type: fetchMovies.fulfilled.type,
        payload: { category: "popular", data: [mockMovie] },
      }
      const state = moviesReducer(initialState, action)
      expect(state.popular).toEqual([mockMovie])
      expect(state.requests.fetchMovies.status).toBe("succeeded")
    })

    test("should handle fetchMovies.rejected when error message is provided", () => {
      const action = {
        type: fetchMovies.rejected.type,
        error: { message: "Error" },
      }
      const state = moviesReducer(initialState, action)
      expect(state.requests.fetchMovies.status).toBe("failed")
      expect(state.requests.fetchMovies.error).toBe("Error")
    })

    test("should handle fetchMovies.rejected when error message is not provided", () => {
      const action = {
        type: fetchMovies.rejected.type,
        error: { message: undefined },
      }
      const state = moviesReducer(initialState, action)
      expect(state.requests.fetchMovies.status).toBe("failed")
      expect(state.requests.fetchMovies.error).toBe("Failed to fetch movies")
    })
  })

  describe("fetchMovieDetails", () => {
    test("should handle fetchMovieDetails.pending", () => {
      const action = { type: fetchMovieDetails.pending.type }
      const state = moviesReducer(initialState, action)
      expect(state.requests.fetchMovieDetails.status).toBe("loading")
      expect(state.requests.fetchMovieDetails.error).toBeNull()
    })

    test("should handle fetchMovieDetails.fulfilled", () => {
      const action = {
        type: fetchMovieDetails.fulfilled.type,
        payload: { data: mockMovie },
      }
      const state = moviesReducer(initialState, action)
      expect(state.requests.fetchMovieDetails.status).toBe("succeeded")
    })

    test("should handle fetchMovieDetails.rejected when error message is provided", () => {
      const action = {
        type: fetchMovieDetails.rejected.type,
        error: { message: "Error" },
      }
      const state = moviesReducer(initialState, action)
      expect(state.requests.fetchMovieDetails.status).toBe("failed")
      expect(state.requests.fetchMovieDetails.error).toBe("Error")
    })

    test("should handle fetchMovieDetails.rejected when error message is not provided", () => {
      const action = {
        type: fetchMovieDetails.rejected.type,
        error: { message: undefined },
      }
      const state = moviesReducer(initialState, action)
      expect(state.requests.fetchMovieDetails.status).toBe("failed")
      expect(state.requests.fetchMovieDetails.error).toBe(
        "Failed to fetch details",
      )
    })
  })

  describe("fetchMovieWatchProviders", () => {
    test("should handle fetchMovieWatchProviders.pending", () => {
      const action = { type: fetchMovieWatchProviders.pending.type }
      const state = moviesReducer(initialState, action)
      expect(state.requests.fetchMovieWatchProviders.status).toBe("loading")
      expect(state.requests.fetchMovieWatchProviders.error).toBeNull()
    })

    test("should handle fetchMovieWatchProviders.fulfilled", () => {
      const action = {
        type: fetchMovieWatchProviders.fulfilled.type,
        payload: { data: mockMovie },
      }
      const state = moviesReducer(initialState, action)
      expect(state.requests.fetchMovieWatchProviders.status).toBe("succeeded")
    })

    test("should handle fetchMovieWatchProviders.rejected when error message is provided", () => {
      const action = {
        type: fetchMovieWatchProviders.rejected.type,
        error: { message: "Error" },
      }
      const state = moviesReducer(initialState, action)
      expect(state.requests.fetchMovieWatchProviders.status).toBe("failed")
      expect(state.requests.fetchMovieWatchProviders.error).toBe("Error")
    })

    test("should handle fetchMovieWatchProviders.rejected when error message is not provided", () => {
      const action = {
        type: fetchMovieWatchProviders.rejected.type,
        error: { message: undefined },
      }
      const state = moviesReducer(initialState, action)
      expect(state.requests.fetchMovieWatchProviders.status).toBe("failed")
      expect(state.requests.fetchMovieWatchProviders.error).toBe(
        "Failed to fetch watch providers",
      )
    })
  })
})
