import { Link } from "react-router-dom"
import { memo } from "react"
import type { Movie } from "../../types/movie"
import { useAppDispatch } from "../../app/hooks"
import { addToHistory } from "../../features/history/historySlice"
import { MOVIE_POSTER_BASE_URL_200 } from "../../constants/MovieConsts"
import { FavouriteButton } from "../Favourites/FavouriteButton/FavouriteButton"
import "./MovieCard.css"

type props = {
  movie: Movie
}

export const MovieCard: React.FC<props> = memo(({ movie }) => {
  const dispatch = useAppDispatch()

  return (
    <section className="movie-card" data-testid="movie-card">
      <Link
        to={`/details/${movie.id.toString()}`}
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
    </section>
  )
})
