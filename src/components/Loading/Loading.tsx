import React from "react"
import "./Loading.css"
import { FaSpinner } from "react-icons/fa"

export const Loading: React.FC = () => {
  return (
    <main className="loading-container" data-testid="loading-spinner">
      <FaSpinner className="loading-spinner" />
    </main>
  )
}
