import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addToHistory } from "../../features/history/historySlice"
import { FavouriteButton } from "./FavouriteButton/FavouriteButton"
import { Link } from "react-router-dom"
import { MOVIE_POSTER_BASE_URL_200 } from "../../constants/MovieConsts"
import "./FavouritesGrid.css"
import {
  NO_FAVOURITES_FOUND_MESSAGE,
  NO_FAVOURITES_FOUND_TITLE,
} from "../../constants/FavouriteConsts"

const FavouritesGrid: React.FC = () => {
  const dispatch = useAppDispatch()
  const favourites = useAppSelector(state => state.favourites.favourites)
  const favouritesPopulated = favourites.length > 0

  if (!favouritesPopulated) {
    return (
      <section className="no-favourites-found">
        <h2>{NO_FAVOURITES_FOUND_TITLE}</h2>
        <p>{NO_FAVOURITES_FOUND_MESSAGE}</p>
      </section>
    )
  }

  return (
    <section className="favourites-grid" data-testid="favourites-grid">
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
    </section>
  )
}

export default FavouritesGrid
