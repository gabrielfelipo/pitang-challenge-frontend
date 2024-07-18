import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

interface IPageLayout {
  children: ReactNode
  className?: string
}

export const PageLayout = ({ children, className }: IPageLayout) => {
  return (
    <motion.div
      className={twMerge(
        'relative flex min-h-max w-full flex-col grow',
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.7 } }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}
