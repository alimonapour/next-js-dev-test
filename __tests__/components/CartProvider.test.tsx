import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartProvider, useCart } from '@/components/CartProvider'
import { Product } from '@/types/product'

const mockProduct: Product = {
  id: 1,
  name: 'Wireless Earbuds',
  price: 79.99,
  description: 'Noise-cancelling wireless earbuds',
}

const mockProduct2: Product = {
  id: 2,
  name: 'Smart Watch',
  price: 249.99,
  description: 'Fitness tracking smartwatch',
}

function CartConsumer() {
  const { items, count, total, addItem, removeItem, clearCart } = useCart()

  return (
    <div>
      <span data-testid='count'>{count}</span>
      <span data-testid='total'>{total.toFixed(2)}</span>
      <span data-testid='items-length'>{items.length}</span>
      {items.map((item) => (
        <div key={item.product.id} data-testid={`item-${item.product.id}`}>
          <span>{item.product.name}</span>
          <span data-testid={`qty-${item.product.id}`}>{item.quantity}</span>
        </div>
      ))}
      <button onClick={() => addItem(mockProduct)}>Add Product 1</button>
      <button onClick={() => addItem(mockProduct2)}>Add Product 2</button>
      <button onClick={() => removeItem(1)}>Remove Product 1</button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  )
}

function renderWithCart() {
  return render(
    <CartProvider>
      <CartConsumer />
    </CartProvider>,
  )
}

describe('CartProvider', () => {
  it('starts with an empty cart', () => {
    renderWithCart()
    expect(screen.getByTestId('count')).toHaveTextContent('0')
    expect(screen.getByTestId('total')).toHaveTextContent('0.00')
    expect(screen.getByTestId('items-length')).toHaveTextContent('0')
  })

  it('adds an item and updates count and total', async () => {
    renderWithCart()
    await userEvent.click(screen.getByRole('button', { name: /add product 1/i }))
    expect(screen.getByTestId('count')).toHaveTextContent('1')
    expect(screen.getByTestId('total')).toHaveTextContent('79.99')
    expect(screen.getByTestId('items-length')).toHaveTextContent('1')
    expect(screen.getByTestId('qty-1')).toHaveTextContent('1')
  })

  it('increments quantity when adding the same product again', async () => {
    renderWithCart()
    const addBtn = screen.getByRole('button', { name: /add product 1/i })
    await userEvent.click(addBtn)
    await userEvent.click(addBtn)
    expect(screen.getByTestId('count')).toHaveTextContent('2')
    expect(screen.getByTestId('total')).toHaveTextContent('159.98')
    expect(screen.getByTestId('items-length')).toHaveTextContent('1')
    expect(screen.getByTestId('qty-1')).toHaveTextContent('2')
  })

  it('adds multiple different products', async () => {
    renderWithCart()
    await userEvent.click(screen.getByRole('button', { name: /add product 1/i }))
    await userEvent.click(screen.getByRole('button', { name: /add product 2/i }))
    expect(screen.getByTestId('count')).toHaveTextContent('2')
    expect(screen.getByTestId('total')).toHaveTextContent('329.98')
    expect(screen.getByTestId('items-length')).toHaveTextContent('2')
  })

  it('removes an item by product id', async () => {
    renderWithCart()
    await userEvent.click(screen.getByRole('button', { name: /add product 1/i }))
    await userEvent.click(screen.getByRole('button', { name: /add product 2/i }))
    await userEvent.click(screen.getByRole('button', { name: /remove product 1/i }))
    expect(screen.getByTestId('count')).toHaveTextContent('1')
    expect(screen.getByTestId('total')).toHaveTextContent('249.99')
    expect(screen.queryByTestId('item-1')).not.toBeInTheDocument()
    expect(screen.getByTestId('item-2')).toBeInTheDocument()
  })

  it('clears all items from the cart', async () => {
    renderWithCart()
    await userEvent.click(screen.getByRole('button', { name: /add product 1/i }))
    await userEvent.click(screen.getByRole('button', { name: /add product 2/i }))
    await userEvent.click(screen.getByRole('button', { name: /clear cart/i }))
    expect(screen.getByTestId('count')).toHaveTextContent('0')
    expect(screen.getByTestId('total')).toHaveTextContent('0.00')
    expect(screen.getByTestId('items-length')).toHaveTextContent('0')
  })

  it('throws when useCart is used outside CartProvider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<CartConsumer />)).toThrow(
      'useCart must be used within a CartProvider',
    )
    consoleError.mockRestore()
  })
})
