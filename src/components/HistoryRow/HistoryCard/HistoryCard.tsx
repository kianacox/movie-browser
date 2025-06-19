import { Link } from "react-router-dom"
import type { Movie } from "../../../types/movie"
import { addToHistory } from "../../../features/history/historySlice"
import { MOVIE_POSTER_BASE_URL_200 } from "../../../constants/MovieConsts"
import { useAppDispatch } from "../../../app/hooks"
import "./HistoryCard.css"

type props = {
  movie: Movie
}
export const HistoryCard: React.FC<props> = ({ movie }) => {
  const dispatch = useAppDispatch()

  return (
    <section key={movie.id} className="history-card" data-testid="history-card">
      <Link
        to={`/details/${movie.id.toString()}`}
        onClick={() => dispatch(addToHistory(movie))}
      >
        <img
          src={`${MOVIE_POSTER_BASE_URL_200}${movie.poster_path}`}
          alt={movie.title}
          className="history-card-poster"
        />
      </Link>
      <p className="history-card-title">{movie.title}</p>
    </section>
  )
}
