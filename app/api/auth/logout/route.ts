import { NextRequest, NextResponse } from 'next/server'

export async function POST(_request: NextRequest) {
  const response = NextResponse.json({ success: true })
  response.headers.set(
    'set-cookie',
    'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict',
  )
  return response
}
