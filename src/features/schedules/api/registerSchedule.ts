import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/lib/axios'
import { Schedule } from '~/types'

type RegisterScheduleDto = {
  name: string
  birthDate: Date
  date: string
  hour: string
}

type RegisterScheduleResponse = {
  message: string
  response: Schedule
}

const registerSchedule = async (payload: RegisterScheduleDto) => {
  const { data } = await axiosInstance.post<RegisterScheduleResponse>(
    '/schedules',
    payload
  )

  return data.response
}

export const useRegisterSchedule = () => {
  return useMutation({
    mutationKey: ['schedule-register'],
    mutationFn: async (payload: RegisterScheduleDto) => {
      const result = await registerSchedule(payload)
      return result
    },
  })
}
