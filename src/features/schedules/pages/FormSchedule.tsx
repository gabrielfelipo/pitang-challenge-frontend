import { z } from 'zod'
import validator from 'validator'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import { Navbar } from '~/components/Navbar'
import { PageLayout } from '~/components/PageLayout'
import { ZodForm } from '~/components/forms'
import { Button } from '~/components/Button'
import { useDialog } from '~/components/Dialog'
import { hours } from '~/constants'
import { useRegisterSchedule } from '../api/registerSchedule'
import { useEffect } from 'react'

export const schema = z.object({
  name: z
    .string()
    .trim()
    .min(4, { message: 'Nome muito curto' })
    .refine((value) => validator.isAlpha(value, 'pt-BR', { ignore: ' ' }), {
      message: 'Nome inválido',
    }),

  birthDate: z.date().refine(
    (value) => {
      const birthDate = dayjs(value, 'YYYY-MM-DD', true)
      if (birthDate.isAfter(dayjs())) return false
      return birthDate.isValid()
    },
    { message: 'Data de nascimento inválida' }
  ),

  date: z.date().refine(
    (value) => {
      const date = dayjs(value, 'YYYY-MM-DD', true)
      if (date.isBefore(dayjs())) return false
      return date.isValid()
    },
    { message: 'Data inválida' }
  ),
  hour: z.string(),
})

export const FormSchedule = () => {
  const navigate = useNavigate()
  const dialog = useDialog()
  const registerSchedule = useRegisterSchedule()

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const { date, hour } = data

      const formattedData = {
        ...data,
        date: dayjs(date).format('YYYY-MM-DD'),
        hour: hour.split(':')[0],
      }

      await registerSchedule.mutateAsync(formattedData)

      localStorage.clear()

      dialog.show({
        title: 'Agendamento realizado com sucesso!',
        subtitle:
          'O agendamento foi realizado, para verificar acesse lista de agendamentos.',
        type: 'success',
        firstButton: {
          label: 'Entendi',
          onClick: () => {
            dialog.hide(), navigate('/schedules')
          },
        },
      })
    } catch (error) {
      toast.error('Esse dia/hora já chegou ao limite de testes agendados.', {
        theme: 'colored',
      })
    }
  }

  return (
    <PageLayout className="flex min-h-screen items-center justify-center">
      <Navbar />
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow-lg">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Agendamento do Teste</h1>
          <p className="mb-6">
            Preencha as informações do cidadão que será examinado e os dados do
            agendamento.
          </p>
          <ZodForm
            onSubmit={handleSubmit}
            schema={schema}
            defaultValues={{
              name: localStorage.getItem('storageName')
                ? localStorage.getItem('storageName')
                : '',
              birthDate: localStorage.getItem('storageBirthDate')
                ? new Date(
                    localStorage.getItem('storageBirthDate') as unknown as Date
                  )
                : undefined,
              date: localStorage.getItem('storageDate')
                ? new Date(
                    localStorage.getItem('storageDate') as unknown as Date
                  )
                : undefined,
              hour: localStorage.getItem('storageHour')
                ? localStorage.getItem('storageHour')
                : '',
            }}
          >
            {({ Input, DateInput, Select, form: { watch } }) => {
              const name = watch('name')
              const birthDate = watch('birthDate')
              const date = watch('date')
              const hour = watch('hour')

              useEffect(() => {
                console.log(birthDate)
                localStorage.setItem('storageName', name)
              }, [name])

              useEffect(() => {
                localStorage.setItem('storagedDate', date)
              }, [date])

              useEffect(() => {
                console.log(birthDate)
                if (birthDate != undefined)
                  localStorage.setItem('storageBirthDate', birthDate)
              }, [birthDate])

              useEffect(() => {
                localStorage.setItem('storageHour', hour)
              }, [hour])

              return (
                <div className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold">
                      Nome completo
                    </label>
                    <Input
                      name="name"
                      label=""
                      placeholder="Nome completo"
                      maxLength={24}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold">
                      Data de nascimento
                    </label>
                    <DateInput
                      name="birthDate"
                      placeholderText="Data de nascimento"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold">
                      Data do exame
                    </label>
                    <DateInput name="date" placeholderText="Data do exame" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold">
                      Data do exame
                    </label>
                    <Select
                      name="hour"
                      placeholder="Hora do exame"
                      options={hours}
                    />
                  </div>
                  <Button type="submit">Agendar exame</Button>
                </div>
              )
            }}
          </ZodForm>
        </div>
        <div className="hidden lg:block">
          <img
            src="https://cdn.folhape.com.br/img/c/1200/900/dn_arquivo/2020/09/pcr.jpeg"
            alt="Placeholder image"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </PageLayout>
  )
}
