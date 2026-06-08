import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductCard from '@/components/ProductCard'
import { CartProvider, useCart } from '@/components/CartProvider'

const mockProduct = {
  id: 1,
  name: 'Wireless Earbuds',
  price: 79.99,
  description: 'Noise-cancelling wireless earbuds with 24-hour battery life',
}

function CartCount() {
  const { count } = useCart()
  return <span data-testid='cart-count'>{count}</span>
}

function renderWithCart(ui: React.ReactElement) {
  return render(
    <CartProvider>
      {ui}
      <CartCount />
    </CartProvider>,
  )
}

describe('ProductCard', () => {
  it('renders the product name', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Wireless Earbuds')).toBeInTheDocument()
  })

  it('renders the product price formatted as currency', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    expect(screen.getByText('$79.99')).toBeInTheDocument()
  })

  it('renders the product description', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    expect(
      screen.getByText(
        'Noise-cancelling wireless earbuds with 24-hour battery life',
      ),
    ).toBeInTheDocument()
  })

  it('renders a link to the product detail page', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    const link = screen.getByRole('link', { name: /wireless earbuds/i })
    expect(link).toHaveAttribute('href', '/products/1')
  })

  it('renders an Add to Cart button', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    expect(
      screen.getByRole('button', { name: /add to cart/i }),
    ).toBeInTheDocument()
  })

  it('adds the product to the cart on click', async () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
    await userEvent.click(screen.getByRole('button', { name: /add to cart/i }))
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
  })
})
