import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { FormSchedule } from './features/formSchedule/FormSchedule.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
      <FormSchedule />
    </NextUIProvider>
  </React.StrictMode>
)
