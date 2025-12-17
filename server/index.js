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

// Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' })
    }

    const result = await pool.query(
      'INSERT INTO contact_submissions (name, email, company, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, company || null, message]
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

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})
