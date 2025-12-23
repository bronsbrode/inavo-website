// src/lib/database.js

const API_URL = 'http://localhost:3001'

/**
 * Fetch all services
 */
export async function getServices() {
  const response = await fetch(`${API_URL}/api/services`)
  if (!response.ok) throw new Error('Failed to fetch services')
  return response.json()
}

/**
 * Fetch a single service by slug
 */
export async function getServiceBySlug(slug) {
  const response = await fetch(`${API_URL}/api/services/${slug}`)
  if (!response.ok) throw new Error('Failed to fetch service')
  return response.json()
}

/**
 * Fetch all portfolio items
 */
export async function getPortfolio() {
  const response = await fetch(`${API_URL}/api/portfolio`)
  if (!response.ok) throw new Error('Failed to fetch portfolio')
  return response.json()
}

/**
 * Fetch a single portfolio item by slug
 */
export async function getPortfolioBySlug(slug) {
  const response = await fetch(`${API_URL}/api/portfolio/${slug}`)
  if (!response.ok) throw new Error('Failed to fetch portfolio item')
  return response.json()
}

/**
 * Fetch all blog posts
 */
export async function getBlogPosts() {
  const response = await fetch(`${API_URL}/api/blog`)
  if (!response.ok) throw new Error('Failed to fetch blog posts')
  return response.json()
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogPostBySlug(slug) {
  const response = await fetch(`${API_URL}/api/blog/${slug}`)
  if (!response.ok) throw new Error('Failed to fetch blog post')
  return response.json()
}

/**
 * Submit contact form
 */
export async function submitContactForm(data) {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to submit form')
  }
  return response.json()
}

// ============ ADMIN FUNCTIONS ============

/**
 * Get service by ID (admin)
 */
export async function getServiceById(id) {
  const response = await fetch(`${API_URL}/api/services/id/${id}`)
  if (!response.ok) throw new Error('Failed to fetch service')
  return response.json()
}

/**
 * Create a new service
 */
export async function createService(data) {
  const response = await fetch(`${API_URL}/api/services`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to create service')
  }
  return response.json()
}

/**
 * Update a service
 */
export async function updateService(id, data) {
  const response = await fetch(`${API_URL}/api/services/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to update service')
  }
  return response.json()
}

/**
 * Delete a service
 */
export async function deleteService(id) {
  const response = await fetch(`${API_URL}/api/services/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to delete service')
  }
  return response.json()
}

// ============ CONTACT SUBMISSIONS (ADMIN) ============

/**
 * Get all contact submissions
 */
export async function getContactSubmissions() {
  const response = await fetch(`${API_URL}/api/contact`)
  if (!response.ok) throw new Error('Failed to fetch contact submissions')
  return response.json()
}

/**
 * Delete a contact submission
 */
export async function deleteContactSubmission(id) {
  const response = await fetch(`${API_URL}/api/contact/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to delete submission')
  }
  return response.json()
}

/**
 * Bulk delete contact submissions
 */
export async function bulkDeleteContactSubmissions(ids) {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to delete submissions')
  }
  return response.json()
}
