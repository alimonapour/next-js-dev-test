import productsData from '@/data/products.json'
import { Product } from '@/types/product'

// Module-level cache — parsed once, same reference on every call
const cachedProducts: Product[] = productsData.products

export function getProducts(): Product[] {
  return cachedProducts
}
