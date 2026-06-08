import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type BadgeVariant = 'default' | 'brand' | 'success' | 'warning' | 'danger'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-muted text-muted-foreground',
  brand: 'bg-brand/10 text-brand',
  success: 'bg-success-muted text-success',
  warning: 'bg-warning-muted text-warning',
  danger: 'bg-danger-muted text-danger',
}

export default function Badge({
  children,
  variant = 'default',
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
