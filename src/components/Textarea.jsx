// src/components/Textarea.jsx

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Textarea = forwardRef(({ className, error, rows = 5, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        'w-full px-4 py-2 bg-input border rounded-md',
        'focus:outline-none focus:ring-2 focus:ring-inavo-blue',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'placeholder:text-muted-foreground',
        'resize-none',
        error ? 'border-red-500' : 'border-border',
        className
      )}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea'

export { Textarea }
