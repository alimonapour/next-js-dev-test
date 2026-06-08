import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
}

export default function Card({
  children,
  className,
  hover = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-surface shadow-sm',
        hover &&
          'transition-base hover:-translate-y-0.5 hover:shadow-md hover:border-brand/30',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('p-6 pb-4', className)}>{children}</div>
}

export function CardContent({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('p-6 pt-0', className)}>{children}</div>
}

export function CardFooter({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center p-6 pt-0', className)}>{children}</div>
  )
}
