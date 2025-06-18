import "./HistoryRow.css"
import type React from "react"
import type { HistoryState } from "../../features/history/types"
import { Link } from "react-router-dom"
import { addToHistory, clearHistory } from "../../features/history/historySlice"
import { useAppDispatch } from "../../app/hooks"

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
            <div key={movie.id} className="history-card">
              <Link
                to={`/details/${movie.id}`}
                onClick={() => dispatch(addToHistory(movie))}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="history-card-poster"
                />
              </Link>
              <p className="history-card-title">{movie.title}</p>
            </div>
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
