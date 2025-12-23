// Form validation utilities

/**
 * Validates email format
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email format is valid
 */
export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Checks if a value is not empty
 * @param {string} value - The value to check
 * @returns {boolean} - Whether the value is not empty
 */
export function validateRequired(value) {
  return value && value.trim().length > 0
}

/**
 * Checks if a value meets minimum length
 * @param {string} value - The value to check
 * @param {number} minLength - Minimum required length
 * @returns {boolean} - Whether the value meets minimum length
 */
export function validateMinLength(value, minLength) {
  return value && value.trim().length >= minLength
}

/**
 * Validates phone number formats: (123) 456-7890, 123-456-7890, 123.456.7890, etc.
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - Whether the phone format is valid
 */
export function isValidPhone(phone) {
  if (!phone) return true // Phone is optional
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '')
  // Check if we have 10 or 11 digits (with or without country code)
  return digitsOnly.length === 10 || digitsOnly.length === 11
}

/**
 * Checks if a date is not in the future
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {boolean} - Whether the date is today or in the past
 */
export function isNotFutureDate(dateString) {
  if (!dateString) return false
  const inputDate = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return inputDate <= today
}

/**
 * Checks if a date is in the future
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {boolean} - Whether the date is in the future
 */
export function isFutureDate(dateString) {
  if (!dateString) return false
  const inputDate = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return inputDate > today
}

/**
 * Checks if a value meets maximum length
 * @param {string} value - The value to check
 * @param {number} maxLength - Maximum allowed length
 * @returns {boolean} - Whether the value meets maximum length
 */
export function validateMaxLength(value, maxLength) {
  return !value || value.length <= maxLength
}

/**
 * Valid contact form categories
 */
export const CONTACT_CATEGORIES = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'project', label: 'Project Discussion' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'support', label: 'Support' },
  { value: 'other', label: 'Other' },
]

/**
 * Validates the full contact form
 * @param {object} data - Form data with name, email, message fields
 * @returns {object} - { isValid: boolean, errors: object }
 */
export function validateContactForm(data) {
  const errors = {}

  // Name: required, 2-100 characters
  if (!validateRequired(data.name)) {
    errors.name = 'Name is required'
  } else if (!validateMinLength(data.name, 2)) {
    errors.name = 'Name must be at least 2 characters'
  } else if (!validateMaxLength(data.name, 100)) {
    errors.name = 'Name must be 100 characters or less'
  }

  // Email: required, valid format
  if (!validateRequired(data.email)) {
    errors.email = 'Email is required'
  } else if (!validateEmail(data.email)) {
    errors.email = 'Invalid email format'
  }

  // Phone: optional, valid format if provided
  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = 'Invalid phone format'
  }

  // Date: required, cannot be in the future
  if (!validateRequired(data.date)) {
    errors.date = 'Date is required'
  } else if (!isNotFutureDate(data.date)) {
    errors.date = 'Date cannot be in the future'
  }

  // Category: required, must be valid option
  if (!validateRequired(data.category)) {
    errors.category = 'Category is required'
  } else if (!CONTACT_CATEGORIES.some(c => c.value === data.category)) {
    errors.category = 'Please select a valid category'
  }

  // Message: required, 10-1000 characters
  if (!validateRequired(data.message)) {
    errors.message = 'Message is required'
  } else if (!validateMinLength(data.message, 10)) {
    errors.message = 'Message must be at least 10 characters'
  } else if (data.message.length > 1000) {
    errors.message = 'Message must be 1000 characters or less'
  }

  // Terms: required, must be checked
  if (!data.terms) {
    errors.terms = 'You must agree to the terms'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}
