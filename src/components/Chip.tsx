import { Chip as NUIChip, ChipProps as NUIChipProps } from '@nextui-org/react'

export const Chip = ({ ...props }: NUIChipProps) => {
  return <NUIChip {...props}>{props.children}</NUIChip>
}
