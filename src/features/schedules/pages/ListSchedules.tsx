import React from 'react'
import Carousel from 'react-multi-carousel'

import { PageLayout } from '~/components/PageLayout'
import { useListSchedules } from '../api/listSchedule'
import { ScheduleCard } from '../components/ScheduleCard'
import dayjs from 'dayjs'
import { Schedule } from '~/types'

import 'react-multi-carousel/lib/styles.css'
import { Navbar } from '~/components/Navbar'

type ScheduleGroupedByDate = {
  [date: string]: Schedule[]
}

const groupSchedulesByDate = (schedules: Schedule[]): ScheduleGroupedByDate => {
  return schedules.reduce((acc: ScheduleGroupedByDate, schedule: Schedule) => {
    const date = dayjs(schedule.date).format('YYYY-MM-DD')
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(schedule)
    return acc
  }, {})
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 735 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 735, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
}

export const ListSchedules: React.FC = () => {
  const { data: schedules = [], isLoading } = useListSchedules()

  if (isLoading) {
    return (
      <PageLayout className="h-full items-center justify-center">
        <div>Loading...</div>
      </PageLayout>
    )
  }

  const schedulesByDate = groupSchedulesByDate(schedules)

  return (
    <PageLayout className="w-full min-h-screen px-4 py-4">
      <Navbar />
      <h1 className='text-3xl font-semibold my-4'>Schedules</h1>
      <div className="flex flex-col w-full space-y-">
        {Object.keys(schedulesByDate).map((date) => (
          <div key={date} className="w-full mb-4 space-y-2">
            <h2 className="text-xl font-bold">
              {dayjs(date).format('DD/MM/YYYY')}
            </h2>
            <Carousel
              responsive={responsive}
              arrows={true}
              draggable={false}
              swipeable
              focusOnSelect={false}
              infinite={false}
            >
              {schedulesByDate[date].map((schedule) => (
                <div className="mx-4">
                  {schedule.hour}:00
                  <ScheduleCard key={schedule.id} schedule={schedule} />
                </div>
              ))}
            </Carousel>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
