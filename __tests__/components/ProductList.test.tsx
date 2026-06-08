import { render, screen } from '@testing-library/react'
import ProductList from '@/components/ProductList'
import { CartProvider } from '@/components/CartProvider'
import { Product } from '@/types/product'

function renderProductList(
  products: Product[],
  searchQuery: string,
) {
  return render(
    <CartProvider>
      <ProductList products={products} searchQuery={searchQuery} />
    </CartProvider>,
  )
}

const mockProducts: Product[] = [
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
]

describe('ProductList', () => {
  it('renders all products when search query is empty', () => {
    renderProductList(mockProducts, '')
    expect(screen.getByText('Wireless Earbuds')).toBeInTheDocument()
    expect(screen.getByText('Smart Watch')).toBeInTheDocument()
    expect(screen.getByText('Bluetooth Speaker')).toBeInTheDocument()
  })

  it('filters products by name when search query matches', () => {
    renderProductList(mockProducts, 'watch')
    expect(screen.getByText('Smart Watch')).toBeInTheDocument()
    expect(screen.queryByText('Wireless Earbuds')).not.toBeInTheDocument()
    expect(screen.queryByText('Bluetooth Speaker')).not.toBeInTheDocument()
  })

  it('filters products by description when search query matches', () => {
    renderProductList(mockProducts, 'waterproof')
    expect(screen.getByText('Bluetooth Speaker')).toBeInTheDocument()
    expect(screen.queryByText('Wireless Earbuds')).not.toBeInTheDocument()
    expect(screen.queryByText('Smart Watch')).not.toBeInTheDocument()
  })

  it('is case-insensitive when filtering', () => {
    renderProductList(mockProducts, 'WATCH')
    expect(screen.getByText('Smart Watch')).toBeInTheDocument()
  })

  it('shows a no results message when nothing matches', () => {
    renderProductList(mockProducts, 'zzznomatch')
    expect(screen.getByText('No products found.')).toBeInTheDocument()
  })

  it('renders the correct number of product cards', () => {
    renderProductList(mockProducts, '')
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)
  })
})
