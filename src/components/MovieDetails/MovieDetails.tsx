import { useParams, useNavigate } from "react-router-dom"
import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  fetchMovieDetails,
  fetchMovieWatchProviders,
} from "../../features/movies/moviesThunks"
import "./MovieDetails.css"

export const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { status, error } = useAppSelector(state => state.movies)

  console.log(useAppSelector(state => state))
  // Find the movie in any category
  const movie = useAppSelector(state => {
    const categories = [
      "popular",
      "top_rated",
      "upcoming",
      "now_playing",
    ] as const
    for (const category of categories) {
      const found = state.movies[category].find(m => m.id.toString() === id)
      if (found) return found
    }
    return null
  })

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieWatchProviders(id))
    }
  }, [id, dispatch])

  if (status === "loading")
    return <div className="movie-details-loading">Loading...</div>
  if (status === "failed")
    return <div className="movie-details-error">{error}</div>
  if (!movie) return null

  const {
    title,
    overview,
    poster_path,
    release_date,
    runtime,
    watchProviders,
  } = movie

  const hasProviders = !!watchProviders?.GB?.flatrate

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
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
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
          {hasProviders && (
            <article className="movie-providers">
              <h2 className="movie-providers-title">Watch Providers</h2>
              <ul className="movie-providers-list">
                {watchProviders?.GB?.flatrate?.map(provider => (
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
