import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CartLink from '@/components/CartLink'
import { CartProvider, useCart } from '@/components/CartProvider'

const mockProduct = {
  id: 1,
  name: 'Wireless Earbuds',
  price: 79.99,
  description: 'Noise-cancelling wireless earbuds',
}

function AddItemButton() {
  const { addItem } = useCart()
  return <button onClick={() => addItem(mockProduct)}>Add Item</button>
}

function renderWithCart() {
  return render(
    <CartProvider>
      <CartLink />
      <AddItemButton />
    </CartProvider>,
  )
}

describe('CartLink', () => {
  it('renders a link to the cart page', () => {
    renderWithCart()
    const link = screen.getByRole('link', { name: /cart/i })
    expect(link).toHaveAttribute('href', '/cart')
  })

  it('displays the cart item count', async () => {
    renderWithCart()
    expect(screen.getByText(/cart \(0\)/i)).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /add item/i }))
    expect(screen.getByText(/cart \(1\)/i)).toBeInTheDocument()
  })
})
