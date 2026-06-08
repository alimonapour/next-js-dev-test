import { render, screen } from '@testing-library/react'
import ProductDetailPage from '@/app/products/[id]/page'
import { CartProvider } from '@/components/CartProvider'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  ),
}))

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
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
  ],
}))

function renderPage(page: React.ReactElement) {
  return render(<CartProvider>{page}</CartProvider>)
}

describe('ProductDetailPage', () => {
  it('renders the product name as a heading', async () => {
    const page = await ProductDetailPage({
      params: Promise.resolve({ id: '1' }),
    })
    renderPage(page)
    expect(
      screen.getByRole('heading', { name: 'Wireless Earbuds' }),
    ).toBeInTheDocument()
  })

  it('renders the product price', async () => {
    const page = await ProductDetailPage({
      params: Promise.resolve({ id: '1' }),
    })
    renderPage(page)
    expect(screen.getByText('$79.99')).toBeInTheDocument()
  })

  it('renders the product description', async () => {
    const page = await ProductDetailPage({
      params: Promise.resolve({ id: '1' }),
    })
    renderPage(page)
    expect(
      screen.getByText('Noise-cancelling wireless earbuds'),
    ).toBeInTheDocument()
  })

  it('renders a back link to the products page', async () => {
    const page = await ProductDetailPage({
      params: Promise.resolve({ id: '1' }),
    })
    renderPage(page)
    const link = screen.getByRole('link', { name: /back/i })
    expect(link).toHaveAttribute('href', '/')
  })

  it('calls notFound when product id does not exist', async () => {
    const { notFound } = require('next/navigation')
    await ProductDetailPage({ params: Promise.resolve({ id: '999' }) })
    expect(notFound).toHaveBeenCalled()
  })

  it('renders an Add to Cart button', async () => {
    const page = await ProductDetailPage({
      params: Promise.resolve({ id: '1' }),
    })
    renderPage(page)
    expect(
      screen.getByRole('button', { name: /add to cart/i }),
    ).toBeInTheDocument()
  })
})
