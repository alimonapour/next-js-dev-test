import Link from 'next/link'
import { FileQuestion } from 'lucide-react'
import Container from '@/components/ui/Container'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <Container size='sm'>
      <EmptyState
        icon={<FileQuestion className='h-6 w-6' aria-hidden='true' />}
        title='Page not found'
        description="The page you're looking for doesn't exist or has been moved."
      >
        <Link href='/'>
          <Button variant='primary'>Back to Products</Button>
        </Link>
      </EmptyState>
    </Container>
  )
}
