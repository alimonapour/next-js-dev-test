import { type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leadingIcon?: ReactNode
}

export default function Input({
  className,
  leadingIcon,
  ...props
}: InputProps) {
  if (leadingIcon) {
    return (
      <div className='relative'>
        <span
          className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'
          aria-hidden='true'
        >
          {leadingIcon}
        </span>
        <input
          className={cn(
            'flex h-10 w-full rounded-lg border border-border bg-surface pl-10 pr-3 py-2 text-sm text-foreground',
            'placeholder:text-muted-foreground',
            'transition-base',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          {...props}
        />
      </div>
    )
  }

  return (
    <input
      className={cn(
        'flex h-10 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground',
        'placeholder:text-muted-foreground',
        'transition-base',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}
