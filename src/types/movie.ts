// API Response Types
export interface Movie {
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

export interface MovieList {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export type MovieCategory = "popular" | "top_rated" | "upcoming" | "now_playing"

export interface WatchProvider {
  display_priority: number
  logo_path: string
  provider_id: number
  provider_name: string
}
export interface CountryWatchProvider {
  link: string
  flatrate?: WatchProvider[]
  rent?: WatchProvider[]
  buy?: WatchProvider[]
}

export interface WatchProviderResults {
  id: number
  results: {
    [countryCode: string]: CountryWatchProvider
  }
}
