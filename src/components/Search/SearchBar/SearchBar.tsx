import { IoSearch } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { fetchSearchResults } from "../../../features/search/searchThunk"
import {
  clearSearchQuery,
  updateSearchQuery,
} from "../../../features/search/searchSlice"
import "./SearchBar.css"
import { Loading } from "../../Loading/Loading"
import { useEffect } from "react"
import { addSearchedForMovies } from "../../../features/movies/moviesSlice"

export const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const query = useAppSelector(state => state.search.query ?? "")
  const searchResults = useAppSelector(state => state.search.results.results)
  const { status } = useAppSelector(state => state.search.request.fetchSearch)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    dispatch(updateSearchQuery(query))
  }

  const handleClick = async () => {
    if (!query.trim()) {
      return
    }
    dispatch(fetchSearchResults(query))
    dispatch(clearSearchQuery())
    navigate("/search")
  }

  useEffect(() => {
    if (!searchResults || searchResults.length === 0) {
      return
    }
    dispatch(addSearchedForMovies(searchResults))
  }, [dispatch, searchResults])

  if (status === "loading") {
    return <Loading />
  }

  return (
    <section className="search-bar-container">
      <label className="search">
        <input
          type="search"
          placeholder="Search for a movie by title..."
          value={query}
          onChange={handleInputChange}
        ></input>
      </label>
      <button onClick={handleClick}>
        <IoSearch />
      </button>
    </section>
  )
}
