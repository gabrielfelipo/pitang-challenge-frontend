import { Input as NUIInput } from '@nextui-org/react'
import { Controller, useFormContext } from 'react-hook-form'
import { InputProps } from './types'

export const Input = ({ ...props }: InputProps) => {
    const form = useFormContext()

    return (
        <Controller 
            control={form.control}
            render={({
                field, 
                fieldState
            }) => (
                <NUIInput 
                required={!props.isOptional}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                maxLength={10}
                labelPlacement='inside'
                variant='bordered'
                classNames={{
                    errorMessage: 'text-danger',
                    inputWrapper: 'border-2 transition-colors',
                    label: 'font-semibold',
                    input: ['placeholder:text-default-600/50'],
                  }}
                {...props}
                {...field}
                value={field.value}
                onChange={field.onChange}
                />
            )}
            name={props.name}
        />

    )
}