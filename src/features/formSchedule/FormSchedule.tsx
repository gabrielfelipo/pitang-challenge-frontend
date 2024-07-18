import { z } from 'zod'
import validator from 'validator'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

import { PageLayout } from '~/components/PageLayout'
import { ZodForm } from '~/components/forms'
import { Button } from '~/components/Button'
import { hours } from '~/constants'
import { useRegisterSchedule } from './api/registerSchedule'

export const scheduleCitizenExamSchema = z.object({
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
  const { registerSchedule } = useRegisterSchedule()

  const handleSubmit = async (
    data: z.infer<typeof scheduleCitizenExamSchema>
  ) => {
    const { date, hour } = data

    const formattedData = {
      ...data,
      date: dayjs(date).format('YYYY-MM-DD'),
      hour: hour.split(':')[0],
    }

    try {
      await registerSchedule(formattedData)
    } catch (error) {
      return toast.error('Ocorreu um erro no agendamento', {
        theme: 'colored',
      })
    }
  }

  return (
    <PageLayout>
      <div className="flex min-h-screen items-center justify-center ">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow-lg">
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Agendamento do Teste</h1>
            <p className="mb-6">
              Preencha as informações do cidadão que será examinado e os dados
              do agendamento.
            </p>
            <ZodForm schema={scheduleCitizenExamSchema} onSubmit={handleSubmit}>
              {({ Input, DateInput, Select }) => (
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
              )}
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
      </div>
    </PageLayout>
  )
}
