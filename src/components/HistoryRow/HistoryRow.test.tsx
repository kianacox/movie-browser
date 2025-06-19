import type { HistoryState } from "../../features/history/types"
import { renderWithProviders } from "../../test/helpers/RenderWithProvider"
import { HistoryRow } from "./HistoryRow"
import { screen } from "@testing-library/react"
import { mockHistory } from "../../test/mocks/History"
import userEvent from "@testing-library/user-event"

const mockEmptyHistory: HistoryState = {
  history: [],
}

describe("HistoryRow", () => {
  test("returns null if the history is empty", () => {
    renderWithProviders(<HistoryRow history={mockEmptyHistory} />)
    expect(screen.queryByTestId("history-row")).not.toBeInTheDocument()
    expect(screen.queryByText("History")).not.toBeInTheDocument()
  })

  test("renders the history row with the correct movies", () => {
    renderWithProviders(<HistoryRow history={mockHistory} />)
    expect(screen.getByTestId("history-row")).toBeInTheDocument()
    expect(screen.getByText("History")).toBeInTheDocument()
    expect(screen.getByText(mockHistory.history[0].title)).toBeInTheDocument()
  })

  test("renders the clear history button", () => {
    renderWithProviders(<HistoryRow history={mockHistory} />)
    expect(screen.getByTestId("history-row")).toBeInTheDocument()
    expect(screen.getByText("Clear History")).toBeInTheDocument()
  })

  test("clears the history when the clear history button is clicked", async () => {
    const { store } = renderWithProviders(<HistoryRow history={mockHistory} />)
    const user = userEvent.setup()
    await user.click(screen.getByText("Clear History"))
    expect(store.getState().history.history).toEqual([])
  })
})
