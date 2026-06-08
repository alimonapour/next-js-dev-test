import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddToCartButton from '@/components/AddToCartButton'
import { CartProvider, useCart } from '@/components/CartProvider'

const mockProduct = {
  id: 1,
  name: 'Wireless Earbuds',
  price: 79.99,
  description: 'Noise-cancelling wireless earbuds',
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

describe('AddToCartButton', () => {
  it('renders an Add to Cart button', () => {
    renderWithCart(<AddToCartButton product={mockProduct} />)
    expect(
      screen.getByRole('button', { name: /add to cart/i }),
    ).toBeInTheDocument()
  })

  it('adds the product to the cart when clicked', async () => {
    renderWithCart(<AddToCartButton product={mockProduct} />)
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
    await userEvent.click(screen.getByRole('button', { name: /add to cart/i }))
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
  })
})
