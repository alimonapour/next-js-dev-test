import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { CartProvider } from '@/components/CartProvider'
import SiteHeader from '@/components/SiteHeader'
import Container from '@/components/ui/Container'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'MyShop — Modern Commerce',
  description:
    'Discover premium tech products with a seamless shopping experience.',
}

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = stored === 'dark' || (!stored && prefersDark);
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className='flex min-h-full flex-col bg-background text-foreground'>
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-foreground'
        >
          Skip to content
        </a>
        <CartProvider>
          <SiteHeader />
          <main id='main-content' className='flex-1 py-8 sm:py-12'>
            {children}
          </main>
          <footer className='border-t border-border bg-surface py-8'>
            <Container>
              <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
                <p className='text-sm text-muted-foreground'>
                  &copy; {new Date().getFullYear()} MyShop. All rights reserved.
                </p>
                <p className='text-sm text-muted-foreground'>
                  Built with Next.js &amp; Tailwind CSS
                </p>
              </div>
            </Container>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}
