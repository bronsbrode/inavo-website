// src/components/Input.jsx

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Input = forwardRef(({ className, type = 'text', error, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        'w-full px-4 py-2 bg-input border rounded-md',
        'focus:outline-none focus:ring-2 focus:ring-inavo-blue',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'placeholder:text-muted-foreground',
        error ? 'border-red-500' : 'border-border',
        className
      )}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export { Input }
