'use client'

import Link from 'next/link'
import { Package } from 'lucide-react'
import AddToCartButton from '@/components/AddToCartButton'
import Card from '@/components/ui/Card'
import { Product } from '@/types/product'
import { getProductGradient, getProductInitial } from '@/lib/productVisuals'
import { cn } from '@/lib/cn'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const gradient = getProductGradient(product)
  const initial = getProductInitial(product)

  return (
    <Card hover className='group flex flex-col overflow-hidden'>
      <Link href={`/products/${product.id}`} className='flex flex-1 flex-col'>
        <div
          className={cn(
            'relative flex h-40 items-center justify-center bg-gradient-to-br',
            gradient,
          )}
          aria-hidden='true'
        >
          <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl font-bold text-white backdrop-blur-sm transition-base group-hover:scale-110'>
            {initial}
          </div>
          <Package
            className='absolute bottom-3 right-3 h-5 w-5 text-white/40'
            aria-hidden='true'
          />
        </div>
        <div className='flex flex-1 flex-col p-4'>
          <h2 className='text-base font-semibold text-foreground transition-base group-hover:text-brand'>
            {product.name}
          </h2>
          <p className='mt-1 text-lg font-bold text-foreground'>
            ${product.price.toFixed(2)}
          </p>
          <p className='mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground'>
            {product.description}
          </p>
        </div>
      </Link>
      <div className='border-t border-border-subtle p-4 pt-0'>
        <AddToCartButton product={product} className='w-full' />
      </div>
    </Card>
  )
}
