'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import Container from '@/components/ui/Container'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Container size='sm'>
      <EmptyState
        icon={<AlertTriangle className='h-6 w-6' aria-hidden='true' />}
        title='Something went wrong'
        description='An unexpected error occurred. Please try again or return to the homepage.'
      >
        <div className='flex gap-3'>
          <Button onClick={reset} variant='primary'>
            <RefreshCw className='h-4 w-4' aria-hidden='true' />
            Try again
          </Button>
        </div>
      </EmptyState>
    </Container>
  )
}
