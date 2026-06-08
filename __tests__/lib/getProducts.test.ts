import { getProducts } from '@/lib/getProducts'
import { Product } from '@/types/product'

describe('getProducts', () => {
  it('returns an array of products', () => {
    const products = getProducts()
    expect(Array.isArray(products)).toBe(true)
  })

  it('returns products with required fields', () => {
    const products = getProducts()
    products.forEach((p: Product) => {
      expect(p).toHaveProperty('id')
      expect(p).toHaveProperty('name')
      expect(p).toHaveProperty('price')
      expect(p).toHaveProperty('description')
    })
  })

  it('returns the same reference on every call (cached)', () => {
    const first = getProducts()
    const second = getProducts()
    expect(first).toBe(second)
  })

  it('returns 50 products from the mock data', () => {
    const products = getProducts()
    expect(products).toHaveLength(50)
  })

  it('returns products with numeric ids', () => {
    const products = getProducts()
    products.forEach((p: Product) => {
      expect(typeof p.id).toBe('number')
    })
  })

  it('returns products with numeric prices', () => {
    const products = getProducts()
    products.forEach((p: Product) => {
      expect(typeof p.price).toBe('number')
    })
  })
})
