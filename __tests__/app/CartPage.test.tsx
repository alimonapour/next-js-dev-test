import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CartPage from '@/app/cart/page'
import { CartProvider, useCart } from '@/components/CartProvider'

const mockProduct1 = {
  id: 1,
  name: 'Wireless Earbuds',
  price: 79.99,
  description: 'Noise-cancelling wireless earbuds',
}

const mockProduct2 = {
  id: 2,
  name: 'Smart Watch',
  price: 249.99,
  description: 'Fitness tracking smartwatch',
}

function SeedCart() {
  const { addItem } = useCart()
  return (
    <div>
      <button onClick={() => addItem(mockProduct1)}>Seed Product 1</button>
      <button onClick={() => addItem(mockProduct2)}>Seed Product 2</button>
    </div>
  )
}

function renderCartPage() {
  return render(
    <CartProvider>
      <SeedCart />
      <CartPage />
    </CartProvider>,
  )
}

describe('CartPage', () => {
  it('renders the page heading', () => {
    renderCartPage()
    expect(
      screen.getByRole('heading', { name: /your cart/i, level: 1 }),
    ).toBeInTheDocument()
  })

  it('shows an empty cart message when no items', () => {
    renderCartPage()
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
  })

  it('lists cart items with name, quantity, and line price', async () => {
    renderCartPage()
    await userEvent.click(screen.getByRole('button', { name: /seed product 1/i }))
    await userEvent.click(screen.getByRole('button', { name: /seed product 1/i }))
    await userEvent.click(screen.getByRole('button', { name: /seed product 2/i }))
    expect(screen.getByText('Wireless Earbuds')).toBeInTheDocument()
    expect(screen.getByText('Smart Watch')).toBeInTheDocument()
    expect(screen.getByText('Qty: 2')).toBeInTheDocument()
    expect(screen.getByText('Qty: 1')).toBeInTheDocument()
    expect(screen.getByText('$159.98')).toBeInTheDocument()
    expect(screen.getByText('$249.99')).toBeInTheDocument()
  })

  it('displays the cart total', async () => {
    renderCartPage()
    await userEvent.click(screen.getByRole('button', { name: /seed product 1/i }))
    await userEvent.click(screen.getByRole('button', { name: /seed product 2/i }))
    expect(screen.getByText(/total: \$329\.98/i)).toBeInTheDocument()
  })

  it('removes an item when Remove is clicked', async () => {
    renderCartPage()
    await userEvent.click(screen.getByRole('button', { name: /seed product 1/i }))
    await userEvent.click(screen.getByRole('button', { name: /seed product 2/i }))
    const removeButtons = screen.getAllByRole('button', { name: /remove/i })
    await userEvent.click(removeButtons[0])
    expect(screen.queryByText('Wireless Earbuds')).not.toBeInTheDocument()
    expect(screen.getByText('Smart Watch')).toBeInTheDocument()
    expect(screen.getByText(/total: \$249\.99/i)).toBeInTheDocument()
  })

  it('renders a Proceed to checkout link pointing to /checkout', async () => {
    renderCartPage()
    await userEvent.click(screen.getByRole('button', { name: /seed product 1/i }))
    const link = screen.getByRole('link', { name: /proceed to checkout/i })
    expect(link).toHaveAttribute('href', '/checkout')
  })
})
