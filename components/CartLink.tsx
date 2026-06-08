'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/components/CartProvider'
import { cn } from '@/lib/cn'

export default function CartLink() {
  const { count } = useCart()

  return (
    <Link
      href='/cart'
      className={cn(
        'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium',
        'text-muted-foreground transition-base',
        'hover:bg-muted hover:text-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      )}
    >
      <ShoppingCart className='h-4 w-4' aria-hidden='true' />
      <span>Cart ({count})</span>
    </Link>
  )
}
