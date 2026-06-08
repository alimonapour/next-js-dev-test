'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { getProducts } from '@/lib/getProducts'
import SearchBar from '@/components/SearchBar'
import Container from '@/components/ui/Container'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'

const ProductList = dynamic(() => import('@/components/ProductList'), {
  loading: () => <ProductGridSkeleton count={8} />,
  ssr: false,
})

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const products = getProducts()

  return (
    <Container>
      <div className='mb-8 space-y-6'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Products
          </h1>
          <p className='mt-2 text-muted-foreground'>
            Browse our curated collection of premium tech products.
          </p>
        </div>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>
      <ProductList products={products} searchQuery={searchQuery} />
    </Container>
  )
}
