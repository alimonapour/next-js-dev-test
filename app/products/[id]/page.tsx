import Link from 'next/link'
import { ArrowLeft, Package } from 'lucide-react'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/AddToCartButton'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { getProducts } from '@/lib/getProducts'
import { getProductGradient, getProductInitial } from '@/lib/productVisuals'
import { cn } from '@/lib/cn'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params
  const product = getProducts().find((p) => p.id === Number(id))

  if (!product) {
    notFound()
    return null
  }

  const gradient = getProductGradient(product)
  const initial = getProductInitial(product)

  return (
    <Container size='lg'>
      <Link
        href='/'
        className='mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-base hover:text-foreground'
      >
        <ArrowLeft className='h-4 w-4' aria-hidden='true' />
        ← Back to products
      </Link>

      <div className='grid gap-8 lg:grid-cols-2 lg:gap-12'>
        <Card className='overflow-hidden'>
          <div
            className={cn(
              'relative flex aspect-square items-center justify-center bg-gradient-to-br',
              gradient,
            )}
            aria-hidden='true'
          >
            <div className='flex h-32 w-32 items-center justify-center rounded-3xl bg-white/20 text-6xl font-bold text-white backdrop-blur-sm'>
              {initial}
            </div>
            <Package
              className='absolute bottom-6 right-6 h-8 w-8 text-white/30'
              aria-hidden='true'
            />
          </div>
        </Card>

        <div className='flex flex-col justify-center space-y-6'>
          <div>
            <Badge variant='brand' className='mb-3'>
              In Stock
            </Badge>
            <h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
              {product.name}
            </h1>
          </div>

          <p className='text-3xl font-bold text-foreground'>
            ${product.price.toFixed(2)}
          </p>

          <p className='text-base leading-relaxed text-muted-foreground'>
            {product.description}
          </p>

          <div className='pt-2'>
            <AddToCartButton product={product} size='lg' className='sm:w-auto sm:min-w-[200px]' />
          </div>
        </div>
      </div>
    </Container>
  )
}
