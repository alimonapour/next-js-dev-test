'use client'

import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/components/CartProvider'
import Button from '@/components/ui/Button'
import { Product } from '@/types/product'
import { cn } from '@/lib/cn'

interface AddToCartButtonProps {
  product: Product
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function AddToCartButton({
  product,
  className,
  size = 'md',
}: AddToCartButtonProps) {
  const { addItem } = useCart()

  return (
    <Button
      type='button'
      variant='primary'
      size={size}
      onClick={() => addItem(product)}
      className={cn('w-full', className)}
    >
      <ShoppingCart className='h-4 w-4' aria-hidden='true' />
      Add to Cart
    </Button>
  )
}
