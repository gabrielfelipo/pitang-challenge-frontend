import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useRegisterSchedule } from '../api/registerSchedule'

import { FormSchedule } from '../pages/FormSchedule'
import { useDialog } from '~/components/Dialog'

jest.mock('../api/registerSchedule')
jest.mock('~/components/Dialog.tsx')

const mockRegisterSchedule = useRegisterSchedule as jest.Mock
const mockUseDialog = useDialog as jest.Mock

describe('FormSchedule', () => {
  beforeEach(() => {
    mockRegisterSchedule.mockReturnValue({
      mutateAsync: jest.fn(),
    })
    mockUseDialog.mockReturnValue({
      show: jest.fn(),
      hide: jest.fn(),
    })
  })

  test('renders the form', () => {
    render(
      <MemoryRouter>
        <FormSchedule />
      </MemoryRouter>
    )

    expect(screen.getByText('Agendamento do Teste')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Nome completo')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Data de nascimento')
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Data do exame')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Hora do exame')).toBeInTheDocument()
  })

  test('allows the user to fill out the form', () => {
    render(
      <MemoryRouter>
        <FormSchedule />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByPlaceholderText('Nome completo'), {
      target: { value: 'John Doe' },
    })
    fireEvent.change(screen.getByPlaceholderText('Data de nascimento'), {
      target: { value: '2000-01-01' },
    })
    fireEvent.change(screen.getByPlaceholderText('Data do exame'), {
      target: { value: '2024-12-31' },
    })
    fireEvent.change(screen.getByPlaceholderText('Hora do exame'), {
      target: { value: '10:00' },
    })

    expect(screen.getByPlaceholderText('Nome completo')).toHaveValue('John Doe')
    expect(screen.getByPlaceholderText('Data de nascimento')).toHaveValue(
      '2000-01-01'
    )
    expect(screen.getByPlaceholderText('Data do exame')).toHaveValue(
      '2024-12-31'
    )
    expect(screen.getByPlaceholderText('Hora do exame')).toHaveValue('10:00')
  })

  test('submits the form with correct data', async () => {
    const mockMutateAsync = jest.fn()
    const mockShowDialog = jest.fn()

    mockRegisterSchedule.mockReturnValue({
      mutateAsync: mockMutateAsync,
    })
    mockUseDialog.mockReturnValue({
      show: mockShowDialog,
      hide: jest.fn(),
    })

    render(
      <MemoryRouter>
        <FormSchedule />
        <ToastContainer />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByPlaceholderText('Nome completo'), {
      target: { value: 'John Doe' },
    })
    fireEvent.change(screen.getByPlaceholderText('Data de nascimento'), {
      target: { value: '2000-01-01' },
    })
    fireEvent.change(screen.getByPlaceholderText('Data do exame'), {
      target: { value: '2024-12-31' },
    })
    fireEvent.change(screen.getByPlaceholderText('Hora do exame'), {
      target: { value: '10:00' },
    })

    fireEvent.click(screen.getByText('Agendar exame'))

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        name: 'John Doe',
        birthDate: '2000-01-01',
        date: '2024-12-31',
        hour: '10',
      })
    })

    await waitFor(() => {
      expect(mockShowDialog).toHaveBeenCalledWith({
        title: 'Agendamento realizado com sucesso!',
        subtitle:
          'O agendamento foi realizado, para verificar acesse lista de agendamentos.',
        type: 'success',
        firstButton: {
          label: 'Entendi',
          onClick: expect.any(Function),
        },
      })
    })
  })

  test('shows an error toast on form submission failure', async () => {
    const mockMutateAsync = jest
      .fn()
      .mockRejectedValue(new Error('Submission failed'))

    mockRegisterSchedule.mockReturnValue({
      mutateAsync: mockMutateAsync,
    })

    render(
      <MemoryRouter>
        <FormSchedule />
        <ToastContainer />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByPlaceholderText('Nome completo'), {
      target: { value: 'John Doe' },
    })
    fireEvent.change(screen.getByPlaceholderText('Data de nascimento'), {
      target: { value: '2000-01-01' },
    })
    fireEvent.change(screen.getByPlaceholderText('Data do exame'), {
      target: { value: '2024-12-31' },
    })
    fireEvent.change(screen.getByPlaceholderText('Hora do exame'), {
      target: { value: '10:00' },
    })

    fireEvent.click(screen.getByText('Agendar exame'))

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        name: 'John Doe',
        birthDate: '2000-01-01',
        date: '2024-12-31',
        hour: '10',
      })
    })

    await waitFor(() => {
      expect(
        screen.getByText('Ocorreu um erro no agendamento. Tente novamente')
      ).toBeInTheDocument()
    })
  })
})
