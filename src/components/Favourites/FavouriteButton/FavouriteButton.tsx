import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  addToFavourites,
  removeFromFavourites,
} from "../../../features/favourites/favouritesSlice"
import type { Movie } from "../../../types/movie"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import "./FavouriteButton.css"

type Props = {
  movie: Movie
}

export const FavouriteButton: React.FC<Props> = ({ movie }) => {
  const dispatch = useAppDispatch()
  const favourites = useAppSelector(state => state.favourites.favourites)
  const isFavourite = favourites.some(
    (favourite: Movie) => favourite.id === movie.id,
  )

  const clickHandler = () => {
    if (isFavourite) {
      dispatch(removeFromFavourites(movie))
    } else {
      dispatch(addToFavourites(movie))
    }
  }

  return (
    <button
      onClick={clickHandler}
      className="favourite-button"
      data-testid="favourite-button"
      aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
    >
      <span aria-hidden="true">
        {isFavourite ? (
          <FaHeart data-testid="heart-filled-icon" />
        ) : (
          <FaRegHeart data-testid="heart-empty-icon" />
        )}
      </span>
    </button>
  )
}
