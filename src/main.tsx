import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import './index.css'
import { AppProvider } from './providers'
import { appRouter } from './routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppProvider>
    <RouterProvider router={appRouter} />
  </AppProvider>
)
