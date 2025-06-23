import "./CategoriesRow.css"
import type React from "react"
import type { Movie } from "../../types/movie"
import { memo } from "react"
import { MovieCard } from "../MovieCard/MovieCard"
import { Error } from "../Error/Error"

type Props = {
  title: string
  movies: Movie[]
}

export const CategoriesRow: React.FC<Props> = memo(({ title, movies }) => {
  if (movies.length === 0) return <Error message="No movies found" />
  return (
    <section>
      <h2 className="movie-row-title">{title}</h2>
      <div className="movie-row">
        <div className="movie-row-items">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  )
})
