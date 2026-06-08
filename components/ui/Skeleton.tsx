import { cn } from '@/lib/cn'

interface SkeletonProps {
  className?: string
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-muted',
        className,
      )}
      aria-hidden='true'
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className='overflow-hidden rounded-xl border border-border bg-surface shadow-sm'>
      <Skeleton className='h-40 w-full rounded-none' />
      <div className='space-y-3 p-4'>
        <Skeleton className='h-5 w-3/4' />
        <Skeleton className='h-4 w-1/4' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-2/3' />
        <Skeleton className='mt-4 h-10 w-full' />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      aria-busy='true'
      aria-label='Loading products'
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
