export interface Movie {
  id: number
  title: string
  poster_path: string
  release_date: string
  overview: string
  runtime?: number
  watchProviders?: WatchProviderResults
}

export type MovieCategory = "popular" | "top_rated" | "upcoming" | "now_playing"

export interface WatchProviderFlatrate {
  logo_path: string
  provider_id: number
  provider_name: string
}

export interface WatchProviderBuy {
  logo_path: string
  provider_id: number
  provider_name: string
}

export interface WatchProviderRent {
  logo_path: string
  provider_id: number
  provider_name: string
}

export interface WatchProviderResults {
  GB: {
    link: string
    flatrate: WatchProviderFlatrate[]
  }
}

export interface WatchProvider {
  id: number
  results: WatchProviderResults
}

export interface MoviesState {
  popular: Movie[]
  top_rated: Movie[]
  upcoming: Movie[]
  now_playing: Movie[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  watchProviders?: WatchProvider[]
}
