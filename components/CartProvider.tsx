'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { CartItem } from '@/types/cart'
import { Product } from '@/types/product'

interface CartContextValue {
  items: CartItem[]
  count: number
  total: number
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((productId: number) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  )

  const total = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
    [items],
  )

  const value = useMemo(
    () => ({ items, count, total, addItem, removeItem, clearCart }),
    [items, count, total, addItem, removeItem, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
