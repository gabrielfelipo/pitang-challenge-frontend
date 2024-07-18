import { QueryClient, QueryFunction } from '@tanstack/react-query'

import { ApiError, RawApiError, axiosInstance } from './axios'

const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
  const { data } = await axiosInstance.get(
    queryKey.join('/').replaceAll('/?', '?').replaceAll('/&', '&')
  )
  return data
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { queryFn: defaultQueryFn, retry: 3 },
    mutations: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: Error) => {
        throw new ApiError(error as RawApiError)
      },
      retry: 2,
    },
  },
})
