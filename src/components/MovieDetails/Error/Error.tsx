import React from "react"
import "./Error.css"
import { useNavigate } from "react-router-dom"

export const Error: React.FC<{ message: string }> = ({ message }) => {
  const navigate = useNavigate()
  console.log("error component rendered")
  return (
    <div className="error-container">
      <div className="error">{message}</div>
      <button className="error-button" onClick={() => navigate("/")}>
        Go back to home
      </button>
    </div>
  )
}
