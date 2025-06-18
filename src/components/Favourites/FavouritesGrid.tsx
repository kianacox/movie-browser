import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addToHistory } from "../../features/history/historySlice"
import { FavouriteButton } from "./FavouriteButton/FavouriteButton"
import { Link } from "react-router-dom"
import { MOVIE_POSTER_BASE_URL_200 } from "../../constants/MovieConsts"
import "./FavouritesGrid.css"

const FavouritesGrid: React.FC = () => {
  const dispatch = useAppDispatch()
  const favourites = useAppSelector(state => state.favourites.favourites)
  return (
    <div className="favourites-grid">
      {favourites.map(movie => (
        <div key={movie.id} className="movie-card">
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
          <div className="movie-card-footer">
            <FavouriteButton movie={movie} />
            <p className="movie-card-title">{movie.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FavouritesGrid
