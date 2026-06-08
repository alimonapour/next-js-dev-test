import { filterProducts } from '@/lib/filterProducts'
import { Product } from '@/types/product'

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

describe('filterProducts', () => {
  it('returns all products when query is empty', () => {
    expect(filterProducts(mockProducts, '')).toHaveLength(3)
  })

  it('returns all products when query is only whitespace', () => {
    expect(filterProducts(mockProducts, '   ')).toHaveLength(3)
  })

  it('filters by product name (case-insensitive)', () => {
    const result = filterProducts(mockProducts, 'WATCH')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Smart Watch')
  })

  it('filters by product description (case-insensitive)', () => {
    const result = filterProducts(mockProducts, 'waterproof')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Bluetooth Speaker')
  })

  it('returns multiple matches when query matches more than one product', () => {
    const multiMatchProducts: Product[] = [
      ...mockProducts,
      {
        id: 4,
        name: 'Wireless Mouse',
        price: 49.99,
        description: 'Ergonomic wireless mouse',
      },
    ]
    const result = filterProducts(multiMatchProducts, 'wireless')
    expect(result).toHaveLength(2)
  })

  it('returns an empty array when no products match', () => {
    expect(filterProducts(mockProducts, 'zzznomatch')).toHaveLength(0)
  })

  it('does not mutate the original products array', () => {
    const original = [...mockProducts]
    filterProducts(mockProducts, 'watch')
    expect(mockProducts).toEqual(original)
  })
})
