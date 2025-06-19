import "./HistoryRow.css"
import type React from "react"
import type { HistoryState } from "../../features/history/types"
import { clearHistory } from "../../features/history/historySlice"
import { useAppDispatch } from "../../app/hooks"
import { HistoryCard } from "./HistoryCard/HistoryCard"

type Props = {
  history: HistoryState
}

export const HistoryRow: React.FC<Props> = ({ history }) => {
  const dispatch = useAppDispatch()

  if (history.history.length === 0) {
    return null
  }

  return (
    <section>
      <h2 className="history-row-title">History</h2>

      <div className="history-row">
        <div className="history-row-items">
          {history.history.map(movie => (
            <HistoryCard key={movie.id} movie={movie} />
          ))}
        </div>
        <button
          className="clear-history-button"
          onClick={() => dispatch(clearHistory())}
        >
          Clear History
        </button>
      </div>
    </section>
  )
}
