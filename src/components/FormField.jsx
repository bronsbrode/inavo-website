// src/components/FormField.jsx

import { Input } from '@/components/Input'
import { Textarea } from '@/components/Textarea'
import { Label } from '@/components/Label'

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
  const isTextarea = type === 'textarea'

  return (
    <div className={className}>
      {label && (
        <Label htmlFor={name} required={required}>
          {label}
        </Label>
      )}

      {isTextarea ? (
        <Textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          rows={rows}
          error={error}
          placeholder={placeholder}
        />
      ) : (
        <Input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          error={error}
          placeholder={placeholder}
        />
      )}

      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}
