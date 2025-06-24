import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import type { MoviesState } from "../../features/movies/types"
import { MemoryRouter } from "react-router-dom"
import type { HistoryState } from "../../features/history/types"
import { historyReducer } from "../../features/history/historySlice"
import type { FavouritesState } from "../../features/favourites/types"
import { favouritesReducer } from "../../features/favourites/favouritesSlice"
import { searchReducer } from "../../features/search/searchSlice"
import { initialMoviesState } from "../../features/movies/sliceState"

const mockMoviesReducer = (state = defaultMoviesState) => state

const defaultMoviesState: MoviesState = initialMoviesState

const defaultHistoryState: HistoryState = {
  history: [],
}

const defaultFavouritesState: FavouritesState = {
  favourites: [],
}

const createMockStore = (
  moviesState: Partial<MoviesState> = {},
  historyState: Partial<HistoryState> = {},
  favouritesState: Partial<FavouritesState> = {},
) => {
  const preloadedState = {
    movies: {
      ...defaultMoviesState,
      ...moviesState,
    },
    history: {
      ...defaultHistoryState,
      ...historyState,
    },
    favourites: {
      ...defaultFavouritesState,
      ...favouritesState,
    },
  }

  return configureStore({
    reducer: {
      movies: mockMoviesReducer,
      history: historyReducer,
      favourites: favouritesReducer,
      search: searchReducer,
    },
    preloadedState,
  })
}

export const renderWithProviders = (
  ui: React.ReactElement,
  moviesState: Partial<MoviesState> = {},
  historyState: Partial<HistoryState> = {},
  favouritesState: Partial<FavouritesState> = {},
  { route = "/" } = {},
) => {
  const store = createMockStore(moviesState, historyState, favouritesState)
  return {
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </Provider>,
    ),
    store,
  }
}
