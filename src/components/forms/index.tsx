import { zodResolver } from '@hookform/resolvers/zod'
import { memo } from 'react'
import {
  FormProvider,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
  useForm,
  useFormContext,
} from 'react-hook-form'
import { Except } from 'type-fest'
import { z } from 'zod'

import { Input } from './Input'
import { DateInput } from './DateInput'
import { Select } from './Select'

const components = { Input, DateInput, Select }

interface UseZodFormProps<S extends z.ZodSchema>
  extends Exclude<UseFormProps<z.infer<S>>, 'resolver'> {
  schema: S
}

type FormComponent<
  S extends z.ZodSchema,
  T extends (typeof components)[keyof typeof components],
> = (props: Parameters<T>[0] & { name: keyof z.infer<S> }) => ReturnType<T>

interface UseZodFormReturn<S extends z.ZodSchema>
  extends UseFormReturn<z.infer<S>> {}

export const useZodFormContext = <
  S extends z.ZodSchema,
>(): UseZodFormReturn<S> => useFormContext<z.infer<S>>()

export const useZodForm = <S extends z.ZodSchema>({
  schema,
  ...formProps
}: UseZodFormProps<S>): UseZodFormReturn<S> =>
  useForm({
    ...formProps,
    mode: 'onTouched',
    resolver: zodResolver(schema),
  })

type ZodFormProps<S extends z.ZodSchema> = {
  onSubmit: SubmitHandler<z.infer<S>>
  children: (props: {
    form: UseFormReturn<z.TypeOf<S>, unknown, undefined>
    Input: FormComponent<S, typeof Input>
    DateInput: FormComponent<S, typeof DateInput>
    Select: FormComponent<S, typeof Select>
  }) => JSX.Element
  className?: string
  action?: string
  method?: string
} & Except<UseFormProps<z.infer<S>>, 'resolver'> &
  (
    | {
        schema: S
      }
    | { form: UseFormReturn<z.infer<S>> }
  )

export const ZodForm = memo(
  <S extends z.ZodSchema>({
    children: Children,
    onSubmit,
    className,
    defaultValues,
    ...props
  }: ZodFormProps<S>) => {
    const form =
      'schema' in props
        ? useForm({
            mode: 'onTouched',
            ...props,
            resolver: zodResolver(props.schema),
            defaultValues,
          })
        : props.form

    return (
      <FormProvider {...form}>
        <form
          className={className}
          onSubmit={form.handleSubmit(onSubmit)}
          {...props}
        >
          {Children({ ...components, form })}
        </form>
      </FormProvider>
    )
  }
)
