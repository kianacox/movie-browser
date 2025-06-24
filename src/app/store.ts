import { configureStore } from "@reduxjs/toolkit"
import { moviesReducer } from "../features/movies/moviesSlice"
import { historyReducer } from "../features/history/historySlice"
import { favouritesReducer } from "../features/favourites/favouritesSlice"
import { searchReducer } from "../features/search/searchSlice"
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

const favouritesPersistConfig = {
  key: "favourites",
  storage,
  whitelist: ["favourites"],
}

const persistedMoviesReducer = persistReducer(
  moviesPersistConfig,
  moviesReducer,
)
const persistedHistoryReducer = persistReducer(
  historyPersistConfig,
  historyReducer,
)
const persistedFavouritesReducer = persistReducer(
  favouritesPersistConfig,
  favouritesReducer,
)

export const store = configureStore({
  reducer: {
    movies: persistedMoviesReducer,
    history: persistedHistoryReducer,
    favourites: persistedFavouritesReducer,
    search: searchReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
