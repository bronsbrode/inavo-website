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
