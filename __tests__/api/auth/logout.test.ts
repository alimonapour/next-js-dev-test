import { POST } from '@/app/api/auth/logout/route'
import { NextRequest } from 'next/server'

function makeRequest(): NextRequest {
  return new NextRequest('http://localhost/api/auth/logout', {
    method: 'POST',
  })
}

describe('POST /api/auth/logout', () => {
  it('returns 200 on logout', async () => {
    const res = await POST(makeRequest())
    expect(res.status).toBe(200)
  })

  it('returns success message', async () => {
    const res = await POST(makeRequest())
    const body = await res.json()
    expect(body.success).toBe(true)
  })

  it('clears the token cookie', async () => {
    const res = await POST(makeRequest())
    const cookie = res.headers.get('set-cookie')
    expect(cookie).toContain('token=')
    expect(cookie).toContain('Max-Age=0')
  })
})
