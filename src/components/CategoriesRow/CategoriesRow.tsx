import "./CategoriesRow.css"
import type React from "react"
import type { Movie } from "../../types/movie"
import { memo } from "react"
import { MovieCard } from "../MovieCard/MovieCard"

type Props = {
  title: string
  movies: Movie[]
}

export const CategoriesRow: React.FC<Props> = memo(({ title, movies }) => {
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
