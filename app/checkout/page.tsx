import type { Metadata } from 'next'
import CheckoutForm from '@/components/CheckoutForm'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Checkout | MyShop',
  description:
    'Complete your purchase in three simple steps: shipping, payment, and confirmation.',
}

export default function CheckoutPage() {
  return (
    <Container size='md'>
      <div className='mb-8 text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>
          Checkout
        </h1>
        <p className='mt-2 text-muted-foreground'>
          Complete your purchase in three simple steps.
        </p>
      </div>
      <CheckoutForm />
    </Container>
  )
}
