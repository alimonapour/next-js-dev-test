import { Shield } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export default function ProtectedPage() {
  return (
    <Container size='md'>
      <Card className='p-8 text-center'>
        <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand'>
          <Shield className='h-6 w-6' aria-hidden='true' />
        </div>
        <Badge variant='success' className='mb-4'>
          Authenticated
        </Badge>
        <h1 className='text-2xl font-bold text-foreground'>Protected Area</h1>
        <p className='mt-2 text-muted-foreground'>
          You have successfully accessed a protected route. This page is only
          available to authenticated users.
        </p>
      </Card>
    </Container>
  )
}
