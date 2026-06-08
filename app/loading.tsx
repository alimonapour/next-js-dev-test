import Container from '@/components/ui/Container'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <Container>
      <div className='mb-8 space-y-4'>
        <div className='h-10 w-48 animate-pulse rounded-lg bg-muted' />
        <div className='h-4 w-72 animate-pulse rounded-lg bg-muted' />
        <div className='h-11 w-full animate-pulse rounded-lg bg-muted' />
      </div>
      <ProductGridSkeleton count={8} />
    </Container>
  )
}
