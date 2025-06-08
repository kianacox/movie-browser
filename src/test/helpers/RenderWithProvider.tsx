import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { MoviesState } from "../../features/movies/types"
import { MemoryRouter } from "react-router-dom"
import { HistoryState } from "../../features/history/types"
import { historyReducer } from "../../features/history/historySlice"

//create a mock reducer that preserves the preloaded state
const mockMoviesReducer = (state = defaultMoviesState) => state

const defaultMoviesState: MoviesState = {
  popular: [],
  top_rated: [],
  upcoming: [],
  now_playing: [],
  status: "idle",
  error: null,
}

const defaultHistoryState: HistoryState = {
  history: [],
}

const createMockStore = (
  initialState: Partial<MoviesState> = {},
  historyState: Partial<HistoryState> = {},
) => {
  const preloadedState = {
    movies: {
      ...defaultMoviesState,
      ...initialState,
    },
    history: {
      ...defaultHistoryState,
      ...historyState,
    },
  }

  return configureStore({
    reducer: {
      movies: mockMoviesReducer,
      history: historyReducer,
    },
    preloadedState,
  })
}

export const renderWithProviders = (
  ui: React.ReactElement,
  initialState: Partial<MoviesState> = {},
  { route = "/" } = {},
) => {
  const store = createMockStore(initialState)
  return {
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </Provider>,
    ),
    store,
  }
}
