// src/components/FormField.jsx

import { cn } from '@/lib/utils'

export function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  placeholder,
  rows,
  className,
}) {
  const inputClass = cn(
    'w-full px-4 py-2 bg-input border rounded-md',
    'focus:outline-none focus:ring-2 focus:ring-inavo-blue',
    'disabled:opacity-50',
    error ? 'border-red-500' : 'border-border',
    className
  )

  const isTextarea = type === 'textarea'

  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-2">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}

      {isTextarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          rows={rows || 5}
          className={cn(inputClass, 'resize-none')}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={inputClass}
          placeholder={placeholder}
        />
      )}

      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}
