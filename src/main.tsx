import { Suspense, lazy, StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { App } from "./App"
import { store, persistor } from "./app/store"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./index.css"
import { Loading } from "./components/Loading/Loading"
import { Navigation } from "./components/Navigation/Navigation"
import SearchResults from "./components/Search/SearchResults/SearchResults"
import { Analytics } from "@vercel/analytics/react"

const container = document.getElementById("root")

const MovieDetails = lazy(
  () => import("./components/MovieDetails/MovieDetails"),
)

const FavouritesGrid = lazy(
  () => import("./components/Favourites/FavouritesGrid"),
)

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <Analytics />
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <BrowserRouter>
            <Navigation />
            <div className="layout-container">
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="/details/:id" element={<MovieDetails />} />
                  <Route path="/favourites" element={<FavouritesGrid />} />
                  <Route path="/search" element={<SearchResults />} />
                </Routes>
              </Suspense>
            </div>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
