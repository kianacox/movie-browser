import "./MovieRow.css"
import React from "react"
import { Movie } from "../../features/movies/types"
import { Link } from "react-router-dom"
import { addToHistory } from "../../features/history/historyActions"
import { useAppDispatch } from "../../app/hooks"

interface Props {
  title: string
  movies: Movie[]
}

export const MovieRow: React.FC<Props> = ({ title, movies }) => {
  const dispatch = useAppDispatch()
  return (
    <section>
      <h2 className="movie-row-title">{title}</h2>
      <div className="movie-row">
        <div className="movie-row-items">
          {movies.map(movie => (
            <div key={movie.id} className="movie-card">
              <Link
                to={`/details/${movie.id}`}
                onClick={() => dispatch(addToHistory(movie))}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-card-poster"
                />
              </Link>
              <p className="movie-card-title">{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
