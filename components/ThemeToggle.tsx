'use client'

import { useSyncExternalStore, useCallback } from 'react'
import { Moon, Sun } from 'lucide-react'
import Button from '@/components/ui/Button'

const THEME_EVENT = 'theme-change'

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback)
  return () => window.removeEventListener(THEME_EVENT, callback)
}

function getSnapshot(): boolean {
  return document.documentElement.classList.contains('dark')
}

function getServerSnapshot(): boolean {
  return false
}

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggleTheme = useCallback(() => {
    const next = !getSnapshot()
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    window.dispatchEvent(new Event(THEME_EVENT))
  }, [])

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className='w-9 px-0'
    >
      {isDark ? (
        <Sun className='h-4 w-4' aria-hidden='true' />
      ) : (
        <Moon className='h-4 w-4' aria-hidden='true' />
      )}
    </Button>
  )
}
