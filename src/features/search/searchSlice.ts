import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { fetchSearchResults } from "./searchThunk"
import type { SearchState } from "./types"

const initialState: SearchState = {
  query: "",
  results: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  request: {
    fetchSearch: {
      status: "idle",
      error: null,
    },
  },
}

export const SearchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    clearSearchQuery: state => {
      state.query = ""
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchSearchResults.pending, state => {
      state.request.fetchSearch.status = "loading"
      state.request.fetchSearch.error = null
    })
    builder.addCase(fetchSearchResults.rejected, (state, action) => {
      state.request.fetchSearch.status = "failed"
      state.request.fetchSearch.error = action.error.message ?? "Search failed"
    })
    builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
      const { results } = action.payload.response
      state.results.results = results
      state.request.fetchSearch.status = "succeeded"
    })
  },
})

export const searchReducer = SearchSlice.reducer
export const { updateSearchQuery, clearSearchQuery } = SearchSlice.actions
