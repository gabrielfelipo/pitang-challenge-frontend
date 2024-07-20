import axios, { AxiosError } from 'axios'
import { config } from '~/config'

export const axiosInstance = axios.create({
  baseURL: config.apiUrl,
})

export type IApiResponse<T> = {
  message: string
  response: T
}

export type RawApiError = AxiosError<{
  code: number
  message: string
  response: Record<string, unknown>
}>

export class ApiError extends Error {
  httpStatus?: number
  code: number
  errorType: string
  response: {
    [key: string]: unknown
  }

  constructor(error: RawApiError) {
    super()
    this.name = 'ApiError'
    this.httpStatus = error.response?.status
    this.code = error.response?.data?.code!
    this.errorType = error.response?.data?.message!
    this.response = error.response?.data?.response!
  }
}
