import { createSlice } from "@reduxjs/toolkit"
import { HistoryState } from "./types"

const initialState: HistoryState = {
  history: [],
}
const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory: (state, action) => {
      state.history.push(action.payload)
    },
  },
})

export default historySlice.reducer
