import express from 'express'
import cors from 'cors'
import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  database: 'bronsonbrode',
  host: 'localhost',
})

const app = express()
app.use(cors())
app.use(express.json())

// ============ SERVICES ============

// Get all services
app.get('/api/services', async (req, res) => {
  try {
    const { category, featured } = req.query
    let query = 'SELECT * FROM services'
    const conditions = []
    const values = []

    if (category) {
      values.push(category)
      conditions.push(`category = $${values.length}`)
    }
    if (featured === 'true') {
      conditions.push('featured = true')
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ')
    }

    query += ' ORDER BY sort_order ASC'

    const result = await pool.query(query, values)
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching services:', error)
    res.status(500).json({ error: 'Failed to fetch services' })
  }
})

// Get single service by slug
app.get('/api/services/:slug', async (req, res) => {
  try {
    const { slug } = req.params
    const result = await pool.query('SELECT * FROM services WHERE slug = $1', [slug])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching service:', error)
    res.status(500).json({ error: 'Failed to fetch service' })
  }
})

// Create a new service
app.post('/api/services', async (req, res) => {
  try {
    const { name, slug, description, icon, category, featured, sort_order } = req.body

    if (!name || !slug) {
      return res.status(400).json({ error: 'Name and slug are required' })
    }

    const result = await pool.query(
      `INSERT INTO services (name, slug, description, icon, category, featured, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, slug, description || null, icon || 'rocket', category || 'technology', featured || false, sort_order || 0]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error creating service:', error)
    if (error.code === '23505') {
      return res.status(400).json({ error: 'A service with this slug already exists' })
    }
    res.status(500).json({ error: 'Failed to create service' })
  }
})

// Update a service
app.put('/api/services/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, slug, description, icon, category, featured, sort_order } = req.body

    if (!name || !slug) {
      return res.status(400).json({ error: 'Name and slug are required' })
    }

    const result = await pool.query(
      `UPDATE services
       SET name = $1, slug = $2, description = $3, icon = $4, category = $5, featured = $6, sort_order = $7
       WHERE id = $8 RETURNING *`,
      [name, slug, description || null, icon || 'rocket', category || 'technology', featured || false, sort_order || 0, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error updating service:', error)
    if (error.code === '23505') {
      return res.status(400).json({ error: 'A service with this slug already exists' })
    }
    res.status(500).json({ error: 'Failed to update service' })
  }
})

// Delete a service
app.delete('/api/services/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM services WHERE id = $1 RETURNING *', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' })
    }

    res.json({ success: true, deleted: result.rows[0] })
  } catch (error) {
    console.error('Error deleting service:', error)
    res.status(500).json({ error: 'Failed to delete service' })
  }
})

// Get service by ID (for admin)
app.get('/api/services/id/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM services WHERE id = $1', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching service:', error)
    res.status(500).json({ error: 'Failed to fetch service' })
  }
})

// ============ PORTFOLIO ============

// Get all portfolio items
app.get('/api/portfolio', async (req, res) => {
  try {
    const { featured } = req.query
    let query = `
      SELECT p.*, s.name as service_name
      FROM portfolio p
      LEFT JOIN services s ON p.service_id = s.id
    `

    if (featured === 'true') {
      query += ' WHERE p.featured = true'
    }

    query += ' ORDER BY p.created_at DESC'

    const result = await pool.query(query)
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    res.status(500).json({ error: 'Failed to fetch portfolio' })
  }
})

// Get single portfolio item by slug
app.get('/api/portfolio/:slug', async (req, res) => {
  try {
    const { slug } = req.params
    const result = await pool.query(`
      SELECT p.*, s.name as service_name
      FROM portfolio p
      LEFT JOIN services s ON p.service_id = s.id
      WHERE p.slug = $1
    `, [slug])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Portfolio item not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching portfolio item:', error)
    res.status(500).json({ error: 'Failed to fetch portfolio item' })
  }
})

// ============ BLOG ============

// Get all blog posts
app.get('/api/blog', async (req, res) => {
  try {
    const { published } = req.query
    let query = 'SELECT * FROM blog_posts'

    // By default, only show published posts
    if (published !== 'all') {
      query += ' WHERE published = true'
    }

    query += ' ORDER BY published_at DESC NULLS LAST, created_at DESC'

    const result = await pool.query(query)
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    res.status(500).json({ error: 'Failed to fetch blog posts' })
  }
})

// Get single blog post by slug
app.get('/api/blog/:slug', async (req, res) => {
  try {
    const { slug } = req.params
    const result = await pool.query('SELECT * FROM blog_posts WHERE slug = $1', [slug])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching blog post:', error)
    res.status(500).json({ error: 'Failed to fetch blog post' })
  }
})

// ============ CONTACT ============

// Valid categories for contact form
const VALID_CATEGORIES = ['general', 'project', 'partnership', 'support', 'other']

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Phone validation (10-11 digits)
function isValidPhone(phone) {
  if (!phone) return true
  const digitsOnly = phone.replace(/\D/g, '')
  return digitsOnly.length === 10 || digitsOnly.length === 11
}

// Server-side validation for contact form
function validateContactForm(data) {
  const errors = {}

  // Name: required, 2-100 characters
  if (!data.name || !data.name.trim()) {
    errors.name = 'Name is required'
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  } else if (data.name.length > 100) {
    errors.name = 'Name must be 100 characters or less'
  }

  // Email: required, valid format
  if (!data.email || !data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Invalid email format'
  }

  // Phone: optional, valid format if provided
  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = 'Invalid phone format'
  }

  // Date: required, cannot be in the future
  if (!data.date) {
    errors.date = 'Date is required'
  } else {
    const inputDate = new Date(data.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (inputDate > today) {
      errors.date = 'Date cannot be in the future'
    }
  }

  // Category: required, must be valid option
  if (!data.category) {
    errors.category = 'Category is required'
  } else if (!VALID_CATEGORIES.includes(data.category)) {
    errors.category = 'Invalid category'
  }

  // Message: required, 10-1000 characters
  if (!data.message || !data.message.trim()) {
    errors.message = 'Message is required'
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  } else if (data.message.length > 1000) {
    errors.message = 'Message must be 1000 characters or less'
  }

  // Terms: required
  if (!data.terms) {
    errors.terms = 'You must agree to the terms'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, date, category, message, terms } = req.body

    // Server-side validation
    const { isValid, errors } = validateContactForm(req.body)
    if (!isValid) {
      return res.status(400).json({ error: 'Validation failed', errors })
    }

    const result = await pool.query(
      `INSERT INTO contact_submissions
        (name, email, phone, contact_date, category, message, terms_accepted)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name.trim(), email.trim(), phone || null, date, category, message.trim(), terms]
    )

    res.status(201).json({ success: true, submission: result.rows[0] })
  } catch (error) {
    console.error('Error saving contact submission:', error)
    res.status(500).json({ error: 'Failed to submit contact form' })
  }
})

// Get all contact submissions (admin)
app.get('/api/contact', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contact_submissions ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    res.status(500).json({ error: 'Failed to fetch contact submissions' })
  }
})

// Delete a contact submission
app.delete('/api/contact/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'DELETE FROM contact_submissions WHERE id = $1 RETURNING *',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Submission not found' })
    }

    res.json({ success: true, deleted: result.rows[0] })
  } catch (error) {
    console.error('Error deleting contact submission:', error)
    res.status(500).json({ error: 'Failed to delete submission' })
  }
})

// Bulk delete contact submissions
app.delete('/api/contact', async (req, res) => {
  try {
    const { ids } = req.body

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'No IDs provided' })
    }

    const placeholders = ids.map((_, i) => `$${i + 1}`).join(', ')
    const result = await pool.query(
      `DELETE FROM contact_submissions WHERE id IN (${placeholders}) RETURNING *`,
      ids
    )

    res.json({ success: true, deleted: result.rows, count: result.rows.length })
  } catch (error) {
    console.error('Error bulk deleting contact submissions:', error)
    res.status(500).json({ error: 'Failed to delete submissions' })
  }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})
