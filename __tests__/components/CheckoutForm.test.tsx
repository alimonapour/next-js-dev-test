import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CheckoutForm from '@/components/CheckoutForm'

describe('CheckoutForm', () => {
  // --- Step 1: Shipping ---
  it('renders step 1 shipping form initially', () => {
    render(<CheckoutForm />)
    expect(screen.getByText(/step 1/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument()
  })

  it('does not show step 2 or 3 initially', () => {
    render(<CheckoutForm />)
    expect(screen.queryByText(/step 2/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/step 3/i)).not.toBeInTheDocument()
  })

  it('disables the Next button when shipping fields are empty', () => {
    render(<CheckoutForm />)
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()
  })

  it('enables the Next button when shipping fields are filled', async () => {
    render(<CheckoutForm />)
    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe')
    await userEvent.type(screen.getByLabelText(/address/i), '123 Main St')
    expect(screen.getByRole('button', { name: /next/i })).toBeEnabled()
  })

  // --- Step 2: Payment ---
  it('advances to step 2 when Next is clicked with valid shipping', async () => {
    render(<CheckoutForm />)
    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe')
    await userEvent.type(screen.getByLabelText(/address/i), '123 Main St')
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByText(/step 2/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/card number/i)).toBeInTheDocument()
  })

  it('goes back to step 1 when Back is clicked on step 2', async () => {
    render(<CheckoutForm />)
    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe')
    await userEvent.type(screen.getByLabelText(/address/i), '123 Main St')
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    await userEvent.click(screen.getByRole('button', { name: /back/i }))
    expect(screen.getByText(/step 1/i)).toBeInTheDocument()
  })

  // --- Step 3: Confirmation ---
  it('advances to step 3 when Next is clicked with valid payment', async () => {
    render(<CheckoutForm />)
    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe')
    await userEvent.type(screen.getByLabelText(/address/i), '123 Main St')
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    await userEvent.type(
      screen.getByLabelText(/card number/i),
      '4111111111111111',
    )
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByText(/step 3/i)).toBeInTheDocument()
    expect(screen.getByText(/confirm/i)).toBeInTheDocument()
  })

  it('shows a summary of entered details on step 3', async () => {
    render(<CheckoutForm />)
    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe')
    await userEvent.type(screen.getByLabelText(/address/i), '123 Main St')
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    await userEvent.type(
      screen.getByLabelText(/card number/i),
      '4111111111111111',
    )
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('123 Main St')).toBeInTheDocument()
  })

  it('shows success message after form is submitted', async () => {
    render(<CheckoutForm />)
    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe')
    await userEvent.type(screen.getByLabelText(/address/i), '123 Main St')
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    await userEvent.type(
      screen.getByLabelText(/card number/i),
      '4111111111111111',
    )
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    await userEvent.click(screen.getByRole('button', { name: /confirm/i }))
    await waitFor(() =>
      expect(screen.getByText(/order placed/i)).toBeInTheDocument(),
    )
  })
})
