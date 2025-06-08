import { configureStore } from "@reduxjs/toolkit"
import { moviesReducer } from "../features/movies/moviesSlice"
import { historyReducer } from "../features/history/historySlice"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const moviesPersistConfig = {
  key: "movies",
  storage,
  whitelist: ["popular", "top_rated", "upcoming", "now_playing"],
}

const historyPersistConfig = {
  key: "history",
  storage,
  whitelist: ["history"],
}

const persistedMoviesReducer = persistReducer(
  moviesPersistConfig,
  moviesReducer,
)
const persistedHistoryReducer = persistReducer(
  historyPersistConfig,
  historyReducer,
)

export const store = configureStore({
  reducer: {
    movies: persistedMoviesReducer,
    history: persistedHistoryReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
