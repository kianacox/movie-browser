export type ApiErrorResponse = {
  status_code: number
  status_message: string
}

export type ApiError = Error & {
  status: number
  data: ApiErrorResponse
}

export type NetworkError = Error & {
  message: string
  isNetworkError: true
}

export const createApiError = (
  status: number,
  data: ApiErrorResponse,
): ApiError => {
  const error = new Error(data.status_message) as ApiError
  error.name = "ApiError"
  error.status = status
  error.data = data
  return error
}

export const createNetworkError = (message: string): NetworkError => {
  const error = new Error(message) as NetworkError
  error.name = "NetworkError"
  error.isNetworkError = true
  return error
}
