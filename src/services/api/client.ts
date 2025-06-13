import axios from "axios"
import { createApiError, createNetworkError } from "./errors"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
  headers: {
    "Content-Type": "application/json",
  },
})

const handleError = (error: any) => {
  if (error.response) {
    return createApiError(error.response.status, error.response.data)
  }
  if (error.request) {
    return createNetworkError("No response from server")
  }
  return createApiError(500, {
    status_code: 500,
    status_message: "Request failed",
  })
}

export const createApiClient = () => {
  return {
    async get<T>(url: string): Promise<T> {
      try {
        const response = await axiosInstance.get(url)
        return response.data
      } catch (error) {
        throw handleError(error)
      }
    },
  }
}
