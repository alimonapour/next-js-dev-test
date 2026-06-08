import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CheckoutPage from '@/app/checkout/page'

/**
 * CheckoutPage — integration-level tests
 *
 * These sit one layer above CheckoutForm.test.tsx.
 * They verify that the page shell (heading, layout wrapper) renders correctly
 * and that the embedded CheckoutForm works end-to-end inside the page context.
 */
describe('CheckoutPage', () => {
  // ── Page shell ──────────────────────────────────────────────────────────────

  it('renders the page heading', () => {
    render(<CheckoutPage />)
    expect(
      screen.getByRole('heading', { name: /checkout/i, level: 1 }),
    ).toBeInTheDocument()
  })

  it('renders the checkout form inside the page', () => {
    render(<CheckoutPage />)
    expect(screen.getByText(/step 1/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument()
  })

  // ── Full happy-path flow through the page ───────────────────────────────────

  it('completes the full checkout flow from within the page', async () => {
    render(<CheckoutPage />)

    // Step 1 — Shipping
    await userEvent.type(screen.getByLabelText(/full name/i), 'Jane Smith')
    await userEvent.type(screen.getByLabelText(/address/i), '42 Commerce Ave')
    await userEvent.click(screen.getByRole('button', { name: /next/i }))

    // Step 2 — Payment
    expect(screen.getByText(/step 2/i)).toBeInTheDocument()
    await userEvent.type(
      screen.getByLabelText(/card number/i),
      '4111111111111111',
    )
    await userEvent.click(screen.getByRole('button', { name: /next/i }))

    // Step 3 — Review
    expect(screen.getByText(/step 3/i)).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('42 Commerce Ave')).toBeInTheDocument()

    // Submit
    await userEvent.click(screen.getByRole('button', { name: /confirm/i }))
    await waitFor(() =>
      expect(screen.getByText(/order placed/i)).toBeInTheDocument(),
    )
  })

  // ── Next button disabled until shipping is filled ───────────────────────────

  it('keeps Next disabled on page load until shipping fields are filled', async () => {
    render(<CheckoutPage />)
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()

    await userEvent.type(screen.getByLabelText(/full name/i), 'Jane Smith')
    await userEvent.type(screen.getByLabelText(/address/i), '42 Commerce Ave')
    expect(screen.getByRole('button', { name: /next/i })).toBeEnabled()
  })

  // ── Progress indicator ──────────────────────────────────────────────────────

  it('shows the progress bar advancing through each step', async () => {
    render(<CheckoutPage />)

    const bar = () => screen.getByRole('progressbar')

    // Step 1
    expect(bar()).toHaveAttribute('aria-valuenow', '33')

    // → Step 2
    await userEvent.type(screen.getByLabelText(/full name/i), 'Jane Smith')
    await userEvent.type(screen.getByLabelText(/address/i), '42 Commerce Ave')
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(bar()).toHaveAttribute('aria-valuenow', '66')

    // → Step 3
    await userEvent.type(
      screen.getByLabelText(/card number/i),
      '4111111111111111',
    )
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(bar()).toHaveAttribute('aria-valuenow', '100')
  })
})
