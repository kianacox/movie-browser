# Movie Browser

## Project Overview

A modern web app for browsing and discovering movies. Users can explore movies by category, view details, see where to watch, and track their viewing history.

## Tech Stack

- React 19
- Redux Toolkit
- React Router v7
- TypeScript
- Axios
- Custom CSS
- Vite
- Vitest & React Testing Library

## Project Structure

```
src/
├── app/         # Redux store config
├── components/  # Reusable UI components
├── features/    # Redux slices & thunks
├── pages/       # Page components/routes
├── test/        # Test utilities & mocks
├── services/    # RESTful API abstration
├── types/       # Globally used type definitions
```

## Basic App Architecture

- **React** for UI components and routing
- **Redux Toolkit** for state management (movie data, user history)
- **Axios** for API requests
- **Component-based structure**: UI split into reusable components
- **Pages** for main routes (Home, Movie Details, etc.)
- **Redux slices/thunks** for async data fetching and state logic

## State Management

Movie Browser uses Redux Toolkit for state management. The store is organized into three main slices: movies, history, and favourites. State is persisted using redux-persist.

### Store Structure Example

```ts
{
  movies: {
    popular: Movie[],
    top_rated: Movie[],
    upcoming: Movie[],
    now_playing: Movie[],
    requests: {
      fetchMovies: { status, error },
      fetchMovieDetails: { status, error },
      fetchMovieWatchProviders: { status, error }
    }
  },
  history: {
    history: Movie[]
  },
  favourites: {
    favourites: Movie[]
  }
}
```

### Slices

- **movies**: Handles movie lists, details, and watch providers
- **history**: Tracks user's viewing history
- **favourites**: Manages user's favourite movies

### Available Actions

#### movies (async thunks)

- `fetchMovies(category)` – Fetch movies by category
- `fetchMovieDetails(movieId)` – Fetch details for a movie
- `fetchMovieWatchProviders(movieId)` – Fetch where a movie can be watched

#### history

- `addToHistory(movie)` – Add a movie to viewing history
- `clearHistory()` – Clear viewing history

#### favourites

- `addToFavourites(movie)` – Add a movie to favourites
- `removeFromFavourites(movie)` – Remove a movie from favourites
- `clearFavourites()` – Clear all favourites

## Prerequisites

- Node.js v18+
- npm v9+

## Setup

1. Clone the repo:
   ```bash
   git clone [repository-url]
   cd movie-browser
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   App runs at http://localhost:5173

## Available Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run test` – Run tests
- `npm run test:coverage` – Test coverage report
- `npm run lint` – Lint code
- `npm run lint:fix` – Fix lint errors
- `npm run format` – Format code
- `npm run type-check` – TypeScript check

## Testing

This project uses **Vitest** for fast, modern unit testing and **React Testing Library** (RTL) for testing React components in a user-centric way. Tests are colocated with components and features, using `.test.tsx` or `.test.ts` extensions.

### Running Tests

```bash
npm run test            # Run all tests in watch mode
npm run test:coverage   # Run tests with coverage report
```

Coverage reports are generated in the `coverage/` directory.

To view the detailed HTML coverage report, open `coverage/index.html` in your browser after running the coverage command.

## Contribution Rules

- Fork the repo and create a feature branch
- Write clear, concise commits
- Follow code style (lint & format before PR)
- Add/maintain tests for new features
- Open a Pull Request for review
