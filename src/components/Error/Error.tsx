import type React from "react"
import "./Error.css"
import { useLocation, useNavigate } from "react-router-dom"

type Props = {
  message: string
}

export const Error: React.FC<Props> = ({ message }) => {
  const navigate = useNavigate()

  const clickHandler = () => {
    void navigate("/")
  }

  const isHomepage = useLocation().pathname === "/"

  return (
    <main className="error-container">
      <div className="error">{message}</div>
      {!isHomepage && (
        <button className="error-button" onClick={clickHandler}>
          Go back to home
        </button>
      )}
    </main>
  )
}
