import "./CategoriesRow.css"
import type React from "react"
import type { Movie } from "../../types/movie"
import { Link } from "react-router-dom"
import { addToHistory } from "../../features/history/historySlice"
import { useAppDispatch } from "../../app/hooks"
import { FavouriteButton } from "../Favourites/FavouriteButton/FavouriteButton"
import { MOVIE_POSTER_BASE_URL_200 } from "../../constants/MovieConsts"

type Props = {
  title: string
  movies: Movie[]
}

export const CategoriesRow: React.FC<Props> = ({ title, movies }) => {
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
                  src={`${MOVIE_POSTER_BASE_URL_200}${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-card-poster"
                />
              </Link>
              <footer className="movie-card-footer">
                <FavouriteButton movie={movie} />
                <p className="movie-card-title">{movie.title}</p>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
