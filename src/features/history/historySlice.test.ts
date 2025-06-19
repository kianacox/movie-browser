import { historyReducer, addToHistory, clearHistory } from "./historySlice"
import type { HistoryState } from "./types"
import { mockMovie } from "../../test/mocks/Movies"

const initialState: HistoryState = {
  history: [],
}

describe("historySlice", () => {
  test("should handle add to history", () => {
    const action = addToHistory(mockMovie)
    const state = historyReducer(initialState, action)
    expect(state.history).toEqual([mockMovie])
  })

  test("should handle clear history", () => {
    const action = addToHistory(mockMovie)
    const state = historyReducer(initialState, action)
    const clearAction = clearHistory()
    const clearState = historyReducer(state, clearAction)
    expect(clearState.history).toEqual([])
  })

  test("should handle add to history when movie already exists", () => {
    const action = addToHistory(mockMovie)
    const state = historyReducer(initialState, action)
    const addAction = addToHistory(mockMovie)
    const addState = historyReducer(state, addAction)
    expect(addState.history).toEqual([mockMovie])
  })
})
