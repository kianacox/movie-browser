import type React from "react"
import { useAppSelector } from "../../../app/hooks"
import { MovieCard } from "../../MovieCard/MovieCard"
import { Error } from "../../Error/Error"
import { Loading } from "../../Loading/Loading"

import "./SearchResults.css"

const SearchResults: React.FC = () => {
  const results = useAppSelector(state => state.search.results.results)
  const { error, status } = useAppSelector(
    state => state.search.request.fetchSearch,
  )

  if (status === "loading") {
    return <Loading />
  }
  return (
    <main className="search-results">
      {error && <Error message={error} />}
      {results.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </main>
  )
}

export default SearchResults
