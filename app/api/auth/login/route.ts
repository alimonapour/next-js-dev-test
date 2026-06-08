import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key'

// Mock user store — in a real app this would be a database lookup
const MOCK_USERS = [
  { id: 1, email: 'admin@test.com', password: 'password123', role: 'admin' },
  { id: 2, email: 'user@test.com', password: 'password123', role: 'user' },
]

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, password } = body

  // Validate required fields
  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: 'Email and password are required' },
      { status: 400 },
    )
  }

  // Find user
  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password,
  )

  if (!user) {
    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 },
    )
  }

  // Sign JWT
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '1d' },
  )

  // Set HTTP-only cookie
  const response = NextResponse.json({ success: true })
  response.headers.set(
    'set-cookie',
    `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`,
  )

  return response
}
