'use client'

import { useState } from 'react'
import { LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card, { CardHeader, CardContent } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit() {
    setError('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.message || 'Login failed')
    }
  }

  return (
    <Container size='sm'>
      <div className='mx-auto max-w-md'>
        <div className='mb-8 text-center'>
          <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-brand-foreground'>
            <LogIn className='h-6 w-6' aria-hidden='true' />
          </div>
          <h1 className='text-2xl font-bold tracking-tight text-foreground'>
            Login
          </h1>
          <p className='mt-2 text-sm text-muted-foreground'>
            Sign in to access your account and protected routes.
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className='space-y-4'>
              <div>
                <label
                  htmlFor='email'
                  className='mb-1.5 block text-sm font-medium text-foreground'
                >
                  Email
                </label>
                <Input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='you@example.com'
                  autoComplete='email'
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='mb-1.5 block text-sm font-medium text-foreground'
                >
                  Password
                </label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password'
                    autoComplete='current-password'
                    className='pr-10'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-base hover:text-foreground'
                    aria-label={showPassword ? 'Hide characters' : 'Reveal characters'}
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4' aria-hidden='true' />
                    ) : (
                      <Eye className='h-4 w-4' aria-hidden='true' />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <div
                role='alert'
                className='mb-4 flex items-center gap-2 rounded-lg bg-danger-muted px-3 py-2.5 text-sm text-danger'
              >
                <AlertCircle className='h-4 w-4 shrink-0' aria-hidden='true' />
                <p>{error}</p>
              </div>
            )}
            <Button onClick={handleSubmit} className='w-full' size='lg'>
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
