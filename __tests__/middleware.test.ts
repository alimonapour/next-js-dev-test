import { middleware } from '@/middleware'
import { NextRequest } from 'next/server'

function makeRequest(path: string, token?: string): NextRequest {
  const url = `http://localhost${path}`
  const req = new NextRequest(url)
  if (token) {
    req.cookies.set('token', token)
  }
  return req
}

describe('middleware', () => {
  // ── Public routes ────────────────────────────────────────────────────────────

  it('allows access to public routes without a token', () => {
    const res = middleware(makeRequest('/'))
    expect(res.status).toBe(200)
  })

  it('allows access to login page without a token', () => {
    const res = middleware(makeRequest('/login'))
    expect(res.status).toBe(200)
  })

  // ── /dashboard ───────────────────────────────────────────────────────────────

  it('redirects unauthenticated users away from /dashboard', () => {
    const res = middleware(makeRequest('/dashboard'))
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toContain('/login')
  })

  it('allows authenticated users to access /dashboard', () => {
    const res = middleware(makeRequest('/dashboard', 'valid-token'))
    expect(res.status).toBe(200)
  })

  // ── /products ────────────────────────────────────────────────────────────────

  it('redirects unauthenticated users away from /products', () => {
    const res = middleware(makeRequest('/products'))
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toContain('/login')
  })

  it('redirects unauthenticated users away from /products/[id]', () => {
    const res = middleware(makeRequest('/products/42'))
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toContain('/login')
  })

  it('allows authenticated users to access /products', () => {
    const res = middleware(makeRequest('/products', 'valid-token'))
    expect(res.status).toBe(200)
  })

  it('allows authenticated users to access /products/[id]', () => {
    const res = middleware(makeRequest('/products/42', 'valid-token'))
    expect(res.status).toBe(200)
  })

  // ── /checkout ────────────────────────────────────────────────────────────────

  it('redirects unauthenticated users away from /checkout', () => {
    const res = middleware(makeRequest('/checkout'))
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toContain('/login')
  })

  it('allows authenticated users to access /checkout', () => {
    const res = middleware(makeRequest('/checkout', 'valid-token'))
    expect(res.status).toBe(200)
  })

  // ── /login redirect ──────────────────────────────────────────────────────────

  it('redirects authenticated users away from /login to /', () => {
    const res = middleware(makeRequest('/login', 'valid-token'))
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toContain('/')
  })
})
