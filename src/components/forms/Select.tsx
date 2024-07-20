import {
  Select as NUISelect,
  SelectItem,
  SelectProps as NUISelectProps,
} from '@nextui-org/react'
import { Controller, useFormContext } from 'react-hook-form'

type SelectProps =
  | ({
      name: string
      options: {
        value: string | number
        label: string
      }[]
      children?: undefined
    } & Omit<NUISelectProps, 'children'>)
  | ({
      name: string
      options?: undefined
    } & NUISelectProps)

export const Select = (props: SelectProps) => {
  const form = useFormContext()

  return (
    <Controller
      control={form.control}
      name={props.name}
      render={({ field, fieldState, formState: { defaultValues } }) => (
        <NUISelect
          aria-label="Selecione uma opção"
          isInvalid={!!fieldState.error}
          errorMessage={fieldState?.error?.message}
          variant="bordered"
          classNames={{
            value: 'font-semibold scale-100',
            popoverContent: 'bg-slate-200',
          }}
          defaultSelectedKeys={
            defaultValues?.[props.name]
              ? [defaultValues[props.name].toString()]
              : undefined
          }
          {...field}
          {...props}
        >
          {props?.options
            ? props.options.map((option) => (
                <SelectItem
                  key={option.value}
                  className="text-black"
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))
            : props.children}
        </NUISelect>
      )}
    />
  )
}
