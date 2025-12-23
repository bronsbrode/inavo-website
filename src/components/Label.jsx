// src/components/Label.jsx

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Label = forwardRef(({ className, required, children, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        'block text-sm font-medium mb-2',
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
  )
})

Label.displayName = 'Label'

export { Label }
