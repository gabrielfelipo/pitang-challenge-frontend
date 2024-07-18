import { createBrowserRouter } from 'react-router-dom'
import { lazyImport } from '~/utils/lazyImport'
import { withSuspense } from '~/hocs/withSuspese'

const { ScheduleRoutes } = lazyImport(
  () => import('~/features/schedules'),
  'ScheduleRoutes'
)

const Root = withSuspense(() => {
  return (
    <div className="flex flex-col h-screen w-full">
      <ScheduleRoutes />
    </div>
  )
})

export const appRouter = createBrowserRouter([
  {
    path: '*',
    Component: Root,
  },
])
