# Movie Browser

A modern web application for browsing and discovering movies, built with React and Redux Toolkit.

## Overview

Movie Browser is a responsive web application that allows users to:

- Browse movies by different categories (Popular, Top Rated, Upcoming, Now Playing)
- View detailed information about each movie
- See where movies are available to watch
- Track their viewing history

## Technologies

- **Frontend Framework**: React 19
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Styling**: Custom CSS
- **API Integration**: Axios
- **Testing**: Vitest, React Testing Library
- **Build Tool**: Vite
- **Language**: TypeScript

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Setup

1. Clone the repository:

```bash
git clone [repository-url]
cd movie-browser
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:coverage:report` - Generate HTML coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Testing

The project uses Vitest and React Testing Library for testing. Tests are located alongside the components they test with the `.test.tsx` extension.

### Running Tests

```bash
# Run tests in watch mode
npm run test

# Run tests with coverage
npm run test:coverage

# Generate HTML coverage report
npm run test:coverage:report
```

### Test Coverage

The coverage report will show:

- Line coverage
- Branch coverage
- Function coverage
- File-by-file breakdown

Coverage reports are generated in the `coverage` directory. Open `coverage/index.html` in your browser to view the detailed HTML report.

## Project Structure

src/
├── app/ # Redux store configuration
├── components/ # React components
├── features/ # Redux slices and thunks
├── pages/ # Page components
├── test/ # Test utilities and mocks

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
