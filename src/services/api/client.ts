import axios from "axios"
import type { AxiosInstance } from "axios"
import { createApiError, createNetworkError } from "./errors"

const API_KEY: string = import.meta.env.VITE_TMDB_API_KEY as string
const BASE_URL = "https://api.themoviedb.org/3"

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
  headers: {
    "Content-Type": "application/json",
  },
})

type ApiErrorResponse = {
  status_code: number
  status_message: string
}

const handleError = (error: unknown) => {
  if (typeof error === "object" && error !== null) {
    const err = error as {
      response?: { status: number; data: ApiErrorResponse }
      request?: unknown
    }
    if (err.response) {
      console.log(err.response)
      return createApiError(err.response.status, err.response.data)
    }
    if (err.request) {
      return createNetworkError("No response from server")
    }
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
        return response.data as T
      } catch (error) {
        throw handleError(error)
      }
    },
  }
}
