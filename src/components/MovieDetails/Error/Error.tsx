import type React from "react"
import "./Error.css"
import { useNavigate } from "react-router-dom"

export const Error: React.FC<{ message: string }> = ({ message }) => {
  const navigate = useNavigate()

  const clickHandler = () => {
    void navigate("/")
  }

  return (
    <div className="error-container">
      <div className="error">{message}</div>
      <button className="error-button" onClick={clickHandler}>
        Go back to home
      </button>
    </div>
  )
}
