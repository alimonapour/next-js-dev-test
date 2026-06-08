import { POST } from '@/app/api/auth/login/route'
import { NextRequest } from 'next/server'

// Mock jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mock-jwt-token'),
}))

function makeRequest(body: object): NextRequest {
  return new NextRequest('http://localhost/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('POST /api/auth/login', () => {
  it('returns 200 and a token for valid credentials', async () => {
    const res = await POST(
      makeRequest({ email: 'admin@test.com', password: 'password123' }),
    )
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
  })

  it('sets an HTTP-only cookie on successful login', async () => {
    const res = await POST(
      makeRequest({ email: 'admin@test.com', password: 'password123' }),
    )
    const cookie = res.headers.get('set-cookie')
    expect(cookie).toContain('token=')
    expect(cookie).toContain('HttpOnly')
  })

  it('returns 401 for invalid password', async () => {
    const res = await POST(
      makeRequest({ email: 'admin@test.com', password: 'wrongpassword' }),
    )
    expect(res.status).toBe(401)
    const body = await res.json()
    expect(body.success).toBe(false)
  })

  it('returns 401 for unknown email', async () => {
    const res = await POST(
      makeRequest({ email: 'unknown@test.com', password: 'password123' }),
    )
    expect(res.status).toBe(401)
    const body = await res.json()
    expect(body.success).toBe(false)
  })

  it('returns 400 when email is missing', async () => {
    const res = await POST(makeRequest({ password: 'password123' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when password is missing', async () => {
    const res = await POST(makeRequest({ email: 'admin@test.com' }))
    expect(res.status).toBe(400)
  })
})
