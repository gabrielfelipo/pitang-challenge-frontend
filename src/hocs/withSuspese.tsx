import React from 'react'
import { PageLoading } from '../components/PageLoading'

/* eslint-disable react/display-name */
export const withSuspense = (
  Component: React.FC,
  Loading?: React.ReactElement
) => {
  return () => (
    <React.Suspense fallback={Loading || <PageLoading />}>
      <Component />
    </React.Suspense>
  )
}
