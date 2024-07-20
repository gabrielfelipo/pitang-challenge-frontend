import DatePicker, { DatePickerProps } from 'react-datepicker'
import { Controller, useFormContext } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css'
import dayjs from 'dayjs'

type DateInputProps = DatePickerProps & { name: string; isOptional?: boolean }

export const DateInput = ({ ...props }: DateInputProps) => {
  const form = useFormContext()

  return (
    <Controller
      control={form.control}
      render={({ field, fieldState }) => (
        <div>
          <DatePicker
            className="min-w-full h-10 border-2 rounded-xl p-3 text-sm"
            wrapperClassName={`react-datepicker-wrapper w-full ${fieldState.error ? 'border-pink-700' : ''}`}
            required={!props.isOptional}
            {...props}
            {...field}
            value={field.value ? dayjs(field.value).format('YYYY-MM-DD') : ''}
            selected={dayjs(field.value).toDate()}
            onChange={field.onChange}
            dateFormat="YYYY-MM-DD"
          />
          {fieldState.error?.message ? (
            <span className="text-pink-700">{fieldState.error?.message}</span>
          ) : null}
        </div>
      )}
      name={props.name}
    />
  )
}
