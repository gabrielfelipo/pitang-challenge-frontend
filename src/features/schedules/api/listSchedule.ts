import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '~/lib/axios'
import { Schedule } from '~/types'

type ListSchedulesResponse = {
  value: {
    message: string
    response: {
      schedules: Schedule[]
    }
  }
}

const listSchedules = async (): Promise<Schedule[]> => {
  const { data } = await axiosInstance.get<ListSchedulesResponse>('/schedules')
  return data.value.response.schedules
}

export const useListSchedules = () => {
  return useQuery({
    queryKey: ['schedules-list'],
    queryFn: listSchedules,
    select: (data) => data,
  })
}
