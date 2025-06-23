import { useParams, useNavigate } from "react-router-dom"
import type React from "react"
import { useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  fetchMovieDetails,
  fetchMovieWatchProviders,
} from "../../features/movies/moviesThunks"
import "./MovieDetails.css"
import { Loading } from "../Loading/Loading"
import { Error } from "../Error/Error"
import {
  MOVIE_POSTER_BASE_URL_200,
  MOVIE_POSTER_BASE_URL_300,
} from "../../constants/MovieConsts"
import type { WatchProvider } from "../../types/movie"

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { status, error } = useAppSelector(
    state => state.movies.requests.fetchMovieDetails,
  )
  const movies = useAppSelector(state => state.movies)

  useEffect(() => {
    if (id) {
      void dispatch(fetchMovieDetails(id))
      void dispatch(fetchMovieWatchProviders(id))
    }
  }, [id, dispatch])

  const movie = useMemo(() => {
    const categories = [
      "popular",
      "top_rated",
      "upcoming",
      "now_playing",
    ] as const

    for (const category of categories) {
      const found = movies[category].find(movie => movie.id.toString() === id)
      if (found) return found
    }
    return null
  }, [movies, id])

  if (status === "loading") return <Loading />
  if (status === "failed") {
    return <Error message={error?.toString() ?? "Movie details not found"} />
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

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const providers: WatchProvider[] = watchProviders?.results?.GB?.flatrate ?? []

  const convertedVoteAverage = vote_average?.toFixed(1)

  return (
    <main className="movie-details-container">
      <button
        onClick={() => void navigate("/")}
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
          {providers.length > 0 && (
            <article className="movie-providers">
              <h2 className="movie-providers-title">Watch Providers</h2>
              <ul className="movie-providers-list">
                {providers.map((provider: WatchProvider) => (
                  <li key={provider.provider_id}>
                    <img
                      className="movie-provider-logo"
                      src={`${MOVIE_POSTER_BASE_URL_200}${provider.logo_path}`}
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
