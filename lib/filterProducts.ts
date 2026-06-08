import { Product } from '@/types/product'

export function filterProducts(products: Product[], query: string): Product[] {
  const trimmed = query.toLowerCase().trim()
  if (!trimmed) return products
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(trimmed) ||
      p.description.toLowerCase().includes(trimmed),
  )
}
