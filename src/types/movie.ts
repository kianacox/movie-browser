// API Response Types
export type Movie = {
  id: number
  title: string
  poster_path: string
  release_date: string
  overview: string
  runtime?: number
  watchProviders?: WatchProviderResults
  vote_average?: number
  vote_count?: number
}

export type MovieList = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export type MovieCategory = "popular" | "top_rated" | "upcoming" | "now_playing"

export type WatchProvider = {
  display_priority: number
  logo_path: string
  provider_id: number
  provider_name: string
}
export type CountryWatchProvider = {
  link: string
  flatrate?: WatchProvider[]
}

export type WatchProviderResults = {
  id: number
  results: Record<string, CountryWatchProvider>
}
