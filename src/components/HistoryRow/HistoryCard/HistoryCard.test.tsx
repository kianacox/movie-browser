// TODO: add tests for HistoryCard

import { renderWithProviders } from "../../../test/helpers/RenderWithProvider"
import { HistoryCard } from "./HistoryCard"
import { mockMovie } from "../../../test/mocks/Movies"
import { screen } from "@testing-library/react"
import { MOVIE_POSTER_BASE_URL_200 } from "../../../constants/MovieConsts"
import userEvent from "@testing-library/user-event"

describe("HistoryCard", () => {
  test("should render the history card", () => {
    renderWithProviders(<HistoryCard movie={mockMovie} />)
    expect(screen.getByTestId("history-card")).toBeInTheDocument()
  })

  test("should render the history card with the correct movie", () => {
    renderWithProviders(<HistoryCard movie={mockMovie} />)
    expect(screen.getByTestId("history-card")).toBeInTheDocument()
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument()
  })

  test("should render the history card with the correct movie poster", () => {
    renderWithProviders(<HistoryCard movie={mockMovie} />)
    expect(screen.getByTestId("history-card")).toBeInTheDocument()
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      `${MOVIE_POSTER_BASE_URL_200}${mockMovie.poster_path}`,
    )
  })
  test("should navigate to the movie details page when the history card is clicked", () => {
    renderWithProviders(<HistoryCard movie={mockMovie} />)
    expect(screen.getByTestId("history-card")).toBeInTheDocument()
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/details/${mockMovie.id.toString()}`,
    )
  })

  test("should add the movie to the history when the history card is clicked", async () => {
    const { store } = renderWithProviders(<HistoryCard movie={mockMovie} />)
    const user = userEvent.setup()
    await user.click(screen.getByRole("link"))
    expect(store.getState().history.history).toContain(mockMovie)
  })
})
