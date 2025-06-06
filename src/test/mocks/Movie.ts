import { Movie } from "../../features/movies/types"

export const mockMovie: Movie = {
  id: 123,
  title: "Test Movie",
  overview: "Test overview",
  poster_path: "/test.jpg",
  release_date: "2024-01-01",
  runtime: 120,
  vote_average: 8.5,
  vote_count: 1000,
  watchProviders: {
    GB: {
      link: "https://www.themoviedb.org/movie/123/watch",
      flatrate: [
        {
          provider_id: 1,
          provider_name: "Netflix",
          logo_path: "/netflix.jpg",
        },
      ],
    },
  },
}
