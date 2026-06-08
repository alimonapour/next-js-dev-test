'use client'

import Link from 'next/link'
import { ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { useCart } from '@/components/CartProvider'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'
import { getProductGradient, getProductInitial } from '@/lib/productVisuals'
import { cn } from '@/lib/cn'

export default function CartPage() {
  const { items, total, removeItem } = useCart()

  return (
    <Container size='lg'>
      <h1 className='mb-8 text-3xl font-bold tracking-tight text-foreground'>
        Your Cart
      </h1>

      {items.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag className='h-6 w-6' aria-hidden='true' />}
          title='Your cart is empty.'
          description='Browse our products and add items to your cart to get started.'
        >
          <Link href='/'>
            <Button variant='primary'>Browse Products</Button>
          </Link>
        </EmptyState>
      ) : (
        <div className='grid gap-8 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <Card className='divide-y divide-border'>
              <ul className='divide-y divide-border'>
                {items.map((item) => {
                  const gradient = getProductGradient(item.product)
                  const initial = getProductInitial(item.product)

                  return (
                    <li
                      key={item.product.id}
                      className='flex items-center gap-4 p-4 sm:p-6'
                    >
                      <div
                        className={cn(
                          'flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-lg font-bold text-white',
                          gradient,
                        )}
                        aria-hidden='true'
                      >
                        {initial}
                      </div>
                      <div className='min-w-0 flex-1'>
                        <span className='block font-medium text-foreground'>
                          {item.product.name}
                        </span>
                        <span className='mt-1 block text-sm text-muted-foreground'>
                          Qty: {item.quantity}
                        </span>
                      </div>
                      <div className='flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-4'>
                        <span className='font-semibold text-foreground'>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <Button
                          type='button'
                          variant='ghost'
                          size='sm'
                          onClick={() => removeItem(item.product.id)}
                          className='text-danger hover:bg-danger-muted hover:text-danger'
                        >
                          <Trash2 className='h-4 w-4' aria-hidden='true' />
                          Remove
                        </Button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </Card>
          </div>

          <div className='lg:col-span-1'>
            <Card className='sticky top-24 p-6'>
              <h2 className='text-lg font-semibold text-foreground'>
                Order Summary
              </h2>
              <div className='mt-4 space-y-3 border-b border-border pb-4'>
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className='flex justify-between text-sm text-muted-foreground'
                  >
                    <span className='truncate pr-2'>
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className='shrink-0 font-medium text-foreground'>
                      @ ${item.product.price.toFixed(2)} ea
                    </span>
                  </div>
                ))}
              </div>
              <p className='mt-4 text-lg font-bold text-foreground'>
                Total: ${total.toFixed(2)}
              </p>
              <Link href='/checkout' className='mt-6 block'>
                <Button variant='primary' size='lg' className='w-full'>
                  Proceed to checkout
                  <ArrowRight className='h-4 w-4' aria-hidden='true' />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      )}
    </Container>
  )
}
