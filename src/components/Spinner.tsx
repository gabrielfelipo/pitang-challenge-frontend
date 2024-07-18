import { Spinner as NUISpinner, SpinnerProps } from '@nextui-org/react'

const Spinner = (_props: SpinnerProps) => {
  return (
    <NUISpinner
      classNames={{
        circle1: 'border-b-secondary border-[7px]',
        circle2: 'border-b-secondary border-[7px]',

        wrapper: 'w-20 h-20 mb-12',
      }}
    />
  )
}

export { Spinner }
