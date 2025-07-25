import type React from "react"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { fetchMovies } from "../features/movies/moviesThunks"
import { CategoriesRow } from "../components/CategoriesRow/CategoriesRow"
import { HistoryRow } from "../components/HistoryRow/HistoryRow"
import { Error } from "../components/Error/Error"
import { Loading } from "../components/Loading/Loading"
import { SearchBar } from "../components/Search/SearchBar/SearchBar"

const categories = [
  { key: "popular", title: "Popular" },
  { key: "top_rated", title: "Top Rated" },
  { key: "upcoming", title: "Upcoming" },
  { key: "now_playing", title: "Now Playing" },
] as const

export const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const movies = useAppSelector(state => state.movies)
  const history = useAppSelector(state => state.history)

  const { status, error } = useAppSelector(
    state => state.movies.requests.fetchMovies,
  )

  useEffect(() => {
    categories.forEach(({ key }) => void dispatch(fetchMovies(key)))
  }, [dispatch])

  if (status === "loading") return <Loading />
  if (status === "failed") return <Error message={error?.toString() ?? ""} />

  return (
    <main className="home-page" data-testid="home-page">
      <SearchBar />
      <HistoryRow history={history} />
      {categories.map(({ key, title }) => (
        <CategoriesRow key={key} title={title} movies={movies[key]} />
      ))}
    </main>
  )
}
