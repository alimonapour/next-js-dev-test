import type { Product } from '@/types/product'

const GRADIENTS = [
  'from-indigo-500 via-purple-500 to-pink-500',
  'from-cyan-500 via-blue-500 to-indigo-600',
  'from-emerald-500 via-teal-500 to-cyan-600',
  'from-orange-500 via-rose-500 to-pink-600',
  'from-violet-500 via-purple-600 to-fuchsia-600',
  'from-amber-500 via-orange-500 to-red-500',
  'from-sky-500 via-indigo-500 to-violet-600',
  'from-lime-500 via-green-500 to-emerald-600',
] as const

export function getProductGradient(product: Product): string {
  return GRADIENTS[product.id % GRADIENTS.length]
}

export function getProductInitial(product: Product): string {
  return product.name.charAt(0).toUpperCase()
}
