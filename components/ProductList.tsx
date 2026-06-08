import { useMemo } from 'react'
import { SearchX } from 'lucide-react'
import { Product } from '@/types/product'
import ProductCard from '@/components/ProductCard'
import EmptyState from '@/components/ui/EmptyState'
import { filterProducts } from '@/lib/filterProducts'

interface ProductListProps {
  products: Product[]
  searchQuery: string
}

export default function ProductList({
  products,
  searchQuery,
}: ProductListProps) {
  const filtered = useMemo(
    () => filterProducts(products, searchQuery),
    [products, searchQuery],
  )

  if (filtered.length === 0) {
    return (
      <EmptyState
        icon={<SearchX className='h-6 w-6' aria-hidden='true' />}
        title='No products found.'
        description={
          searchQuery
            ? `We couldn't find any products matching "${searchQuery}". Try a different search term.`
            : 'No products are available at the moment.'
        }
      />
    )
  }

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {filtered.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
