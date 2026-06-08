import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from '@/app/login/page'

// Mock fetch globally
global.fetch = jest.fn()

const mockFetch = global.fetch as jest.Mock

describe('LoginPage', () => {
  beforeEach(() => {
    mockFetch.mockReset()
  })

  it('renders the login heading', () => {
    render(<LoginPage />)
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
  })

  it('renders email and password inputs', () => {
    render(<LoginPage />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('renders a submit button', () => {
    render(<LoginPage />)
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('updates email and password fields when user types', async () => {
    render(<LoginPage />)
    await userEvent.type(screen.getByLabelText(/email/i), 'admin@test.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'password123')
    expect(screen.getByLabelText(/email/i)).toHaveValue('admin@test.com')
    expect(screen.getByLabelText(/password/i)).toHaveValue('password123')
  })

  it('calls the login API with email and password on submit', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })
    render(<LoginPage />)
    await userEvent.type(screen.getByLabelText(/email/i), 'admin@test.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'password123')
    await userEvent.click(screen.getByRole('button', { name: /login/i }))
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/auth/login',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          email: 'admin@test.com',
          password: 'password123',
        }),
      }),
    )
  })

  it('shows an error message on failed login', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, message: 'Invalid credentials' }),
    })
    render(<LoginPage />)
    await userEvent.type(screen.getByLabelText(/email/i), 'wrong@test.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'wrongpass')
    await userEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() =>
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument(),
    )
  })
})
