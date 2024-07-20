import { Route, Routes } from 'react-router-dom'

import { FormSchedule } from './pages/FormSchedule'
import { ListSchedules } from './pages/ListSchedules'

export const ScheduleRoutes = () => {
  return (
    <Routes>
      <Route element={<FormSchedule />} path="/schedules/register" />
      <Route element={<ListSchedules />} path="/schedules/" />
    </Routes>
  )
}
