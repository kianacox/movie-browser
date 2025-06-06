import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { fetchMovies } from "../features/movies/moviesThunks"
import { MovieRow } from "../components/MoviesRow/MovieRow"

const categories = [
  { key: "popular", title: "Popular" },
  { key: "top_rated", title: "Top Rated" },
  { key: "upcoming", title: "Upcoming" },
  { key: "now_playing", title: "Now Playing" },
] as const

export const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const movies = useAppSelector(state => state.movies)

  useEffect(() => {
    categories.forEach(({ key }) => dispatch(fetchMovies(key)))
  }, [dispatch])

  return (
    <div className="home-page">
      <h1 className="home-page__title">Movie Browser</h1>
      {categories.map(({ key, title }) => (
        <MovieRow key={key} title={title} movies={movies[key] || []} />
      ))}
    </div>
  )
}
