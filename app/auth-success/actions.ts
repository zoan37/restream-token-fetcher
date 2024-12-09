'use server'
import { cookies } from 'next/headers'

export async function clearAuthCookies() {
  const cookieStore = await cookies()
  cookieStore.set({
    name: 'access_token',
    value: '',
    maxAge: 0
  })
  cookieStore.set({
    name: 'refresh_token',
    value: '',
    maxAge: 0
  })
} 