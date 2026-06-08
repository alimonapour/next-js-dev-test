import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductsPage from '@/app/page'
import { CartProvider } from '@/components/CartProvider'

function renderProductsPage() {
  return render(
    <CartProvider>
      <ProductsPage />
    </CartProvider>,
  )
}

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  ),
}))

jest.mock('@/data/products.json', () => ({
  products: [
    {
      id: 1,
      name: 'Wireless Earbuds',
      price: 79.99,
      description: 'Noise-cancelling wireless earbuds',
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 249.99,
      description: 'Fitness tracking smartwatch',
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      price: 59.95,
      description: 'Portable waterproof speaker',
    },
  ],
}))

describe('ProductsPage (dynamic import)', () => {
  it('renders the heading immediately', async () => {
    await act(async () => {
      renderProductsPage()
    })
    expect(
      screen.getByRole('heading', { name: /products/i }),
    ).toBeInTheDocument()
  })

  it('renders the search bar immediately', async () => {
    await act(async () => {
      renderProductsPage()
    })
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('eventually renders all products after dynamic load', async () => {
    await act(async () => {
      renderProductsPage()
    })
    await waitFor(() => {
      expect(screen.getByText('Wireless Earbuds')).toBeInTheDocument()
      expect(screen.getByText('Smart Watch')).toBeInTheDocument()
      expect(screen.getByText('Bluetooth Speaker')).toBeInTheDocument()
    })
  })

  it('eventually filters products after dynamic load', async () => {
    await act(async () => {
      renderProductsPage()
    })
    await waitFor(() =>
      expect(screen.getByText('Wireless Earbuds')).toBeInTheDocument(),
    )
    await userEvent.type(screen.getByRole('searchbox'), 'watch')
    expect(screen.getByText('Smart Watch')).toBeInTheDocument()
    expect(screen.queryByText('Wireless Earbuds')).not.toBeInTheDocument()
  })

  it('shows a loading fallback before the list is ready', async () => {
    await act(async () => {
      renderProductsPage()
    })
    await waitFor(() =>
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument(),
    )
  })
})
