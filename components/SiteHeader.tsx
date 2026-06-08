'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import CartLink from '@/components/CartLink'
import ThemeToggle from '@/components/ThemeToggle'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/cn'

const navLinks = [
  { href: '/', label: 'Products' },
  { href: '/cart', label: 'Cart' },
  { href: '/checkout', label: 'Checkout' },
  { href: '/login', label: 'Login' },
]

export default function SiteHeader() {
  return (
    <header className='sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md'>
      <Container>
        <div className='flex h-16 items-center justify-between gap-4'>
          <Link
            href='/'
            className='flex items-center gap-2 font-semibold text-foreground transition-base hover:text-brand'
          >
            <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground'>
              <ShoppingBag className='h-4 w-4' aria-hidden='true' />
            </span>
            <span className='hidden sm:inline'>MyShop</span>
          </Link>

          <nav aria-label='Main navigation' className='hidden items-center gap-1 md:flex'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground',
                  'transition-base hover:bg-muted hover:text-foreground',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className='flex items-center gap-1'>
            <ThemeToggle />
            <CartLink />
          </div>
        </div>
      </Container>
    </header>
  )
}
