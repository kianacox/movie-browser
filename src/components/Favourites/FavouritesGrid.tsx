import { useAppSelector } from "../../app/hooks"
import "./FavouritesGrid.css"
import {
  NO_FAVOURITES_FOUND_MESSAGE,
  NO_FAVOURITES_FOUND_TITLE,
} from "../../constants/FavouriteConsts"
import { MovieCard } from "../MovieCard/MovieCard"

const FavouritesGrid: React.FC = () => {
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
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  )
}

export default FavouritesGrid
