import { useState } from 'react'

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

const RegisterSchedule = async (params: RegisterScheduleDto) =>
  await axiosInstance.post<RegisterScheduleResponse>('/schedules', params)

export const useRegisterSchedule = () => {
  const [data, setData] = useState<RegisterScheduleResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const registerSchedule = async (payload: RegisterScheduleDto) => {
    setLoading(true)
    const response = await RegisterSchedule(payload)
    setData(response.data)
    setLoading(false)
  }

  return { data, loading, registerSchedule }
}
