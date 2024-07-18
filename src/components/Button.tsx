import {
  Button as NUIButton,
  ButtonProps as NUIButtonProps,
} from '@nextui-org/react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends NUIButtonProps {
  disabledSmartLoading?: boolean
}

const Button = (props: ButtonProps) => {
  const [isClicking, setIsClicking] = useState(false)
  const form = useFormContext()

  const isLoading = (() => {
    if (props.disabledSmartLoading) return false

    if (props.type === 'submit') return !!form?.formState.isSubmitting

    return isClicking
  })()

  const isDisabled = (() => {
    if (props.type === 'submit' && props.isDisabled)
      return !form?.formState.isValid

    if (props.isDisabled) return true
  })()

  return (
    <NUIButton
      isLoading={isLoading}
      color="primary"
      {...props}
      onClick={async (event) => {
        if (props.onClick) {
          setIsClicking(true)
          await props.onClick(event)
          setIsClicking(false)
        }
      }}
      className={twMerge('rounded-lg', props.className)}
      isDisabled={isDisabled}
    >
      <div className="text-white font-semibold justify-center items-center">
        {props.children}
      </div>
    </NUIButton>
  )
}

export { Button }
export type { ButtonProps }
