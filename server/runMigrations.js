import pg from 'pg'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const { Pool } = pg
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const pool = new Pool({
  database: 'bronsonbrode',
})

async function runMigrations() {
  const client = await pool.connect()

  try {
    // Ensure migrations table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Get already executed migrations
    const { rows: executed } = await client.query('SELECT name FROM migrations')
    const executedNames = executed.map(r => r.name)

    // Read migration files
    const migrationsDir = path.join(__dirname, 'migrations')
    const files = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort()

    console.log(`Found ${files.length} migration files`)

    for (const file of files) {
      if (executedNames.includes(file)) {
        console.log(`⏭️  Skipping ${file} (already executed)`)
        continue
      }

      console.log(`▶️  Running ${file}...`)

      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8')

      await client.query('BEGIN')
      try {
        await client.query(sql)
        await client.query('INSERT INTO migrations (name) VALUES ($1)', [file])
        await client.query('COMMIT')
        console.log(`✅ ${file} completed`)
      } catch (err) {
        await client.query('ROLLBACK')
        console.error(`❌ ${file} failed:`, err.message)
        throw err
      }
    }

    console.log('\n🎉 All migrations complete!')
  } finally {
    client.release()
    await pool.end()
  }
}

runMigrations().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
