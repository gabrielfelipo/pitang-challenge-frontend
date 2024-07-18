import { InputProps as NUIInputProps } from '@nextui-org/react'
import { ReactNode } from 'react'
import { Except } from 'type-fest'

export interface InputProps
  extends Except<
    NUIInputProps,
    | 'onChange'
    | 'onBlur'
    | 'value'
    | 'onFocus'
    | 'ref'
    | 'required'
    | 'isRequired'
  > {
  name: string
  label: string | ReactNode
  isOptional?: boolean
}
