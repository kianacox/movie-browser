import { useParams, useNavigate } from "react-router-dom"
import type React from "react"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  fetchMovieDetails,
  fetchMovieWatchProviders,
} from "../../features/movies/moviesThunks"
import "./MovieDetails.css"
import { Loading } from "../Loading/Loading"
import { Error } from "./Error/Error"
import { MOVIE_POSTER_BASE_URL_300 } from "../../constants/MovieConsts"

export const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { status, error } = useAppSelector(
    state => state.movies.requests.fetchMovieDetails,
  )

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id))
      dispatch(fetchMovieWatchProviders(id))
    }
  }, [id, dispatch])

  const movie = useAppSelector(state => {
    const categories = [
      "popular",
      "top_rated",
      "upcoming",
      "now_playing",
    ] as const

    for (const category of categories) {
      const found = state.movies[category].find(
        movie => movie.id.toString() === id,
      )
      if (found) return found
    }
    return null
  })

  if (status === "loading") return <Loading />
  if (error || status === "failed") {
    return <Error message={error?.toString() || "Movie details not found"} />
  }
  if (!movie) return <Error message={"Movie details not found"} />

  const {
    title,
    overview,
    poster_path,
    release_date,
    runtime,
    watchProviders,
    vote_average,
    vote_count,
  } = movie

  const gbProviders = watchProviders?.results?.GB
  const hasProviders = !!gbProviders?.flatrate
  const convertedVoteAverage = vote_average?.toFixed(1)

  return (
    <main className="movie-details-container">
      <button
        onClick={() => navigate("/")}
        className="movie-details-back-button"
      >
        ← Back to Home
      </button>
      <section className="movie-details-card">
        <img
          src={`${MOVIE_POSTER_BASE_URL_300}${poster_path}`}
          alt={title}
          className="movie-details-poster"
        />
        <div className="movie-details-info">
          <h1 className="movie-details-title">{title}</h1>
          <p className="movie-details-overview">{overview}</p>
          <p className="movie-details-meta">
            <strong>Release Date:</strong> {release_date}
          </p>
          <p className="movie-details-meta">
            <strong>Runtime:</strong> {runtime} mins
          </p>
          <p className="movie-details-meta">
            <strong>Vote Average:</strong> {convertedVoteAverage}
          </p>
          <p className="movie-details-meta">
            <strong>Vote Count:</strong> {vote_count}
          </p>
          {hasProviders && (
            <article className="movie-providers">
              <h2 className="movie-providers-title">Watch Providers</h2>
              <ul className="movie-providers-list">
                {gbProviders?.flatrate?.map(provider => (
                  <li key={provider.provider_id}>
                    <img
                      className="movie-provider-logo"
                      src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                      alt={provider.provider_name}
                    />
                    {provider.provider_name}
                  </li>
                ))}
              </ul>
            </article>
          )}
        </div>
      </section>
    </main>
  )
}

export default MovieDetails
