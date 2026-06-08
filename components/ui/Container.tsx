import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeStyles = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
}

export default function Container({
  children,
  className,
  size = 'xl',
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeStyles[size], className)}
      {...props}
    >
      {children}
    </div>
  )
}
