# Technology Stack Specification

## Programming Languages

- **JavaScript/JSX**: Primary language for React components
- **CSS**: TailwindCSS utility classes + custom theme
- **SQL**: PostgreSQL queries for data layer

## Frameworks & Libraries

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | ^19.x | UI framework |
| Vite | ^7.x | Build tool & dev server |
| React Router | ^7.x | Client-side routing |
| TailwindCSS | ^4.x | Utility-first styling |
| shadcn/ui | latest | Component library |

### Backend (API)
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | ^20.x | Runtime |
| Express.js | ^4.x | API server (or Vite SSR) |
| pg (node-postgres) | ^8.x | PostgreSQL client |

## Data Layer

### Database
- **PostgreSQL**: Local installation
- **Database Name**: `bronsonbrode`
- **Connection**: Local socket or `localhost:5432`

### Tables Schema
```sql
-- Services offered by Inavo
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    category VARCHAR(50),
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Portfolio/Case studies
CREATE TABLE portfolio (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    client_name VARCHAR(100),
    description TEXT,
    challenge TEXT,
    solution TEXT,
    results TEXT,
    image_url VARCHAR(500),
    service_id INTEGER REFERENCES services(id),
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog posts
CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(300) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    author VARCHAR(100),
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact form submissions
CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(100),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Development Tools

### Package Management
- **npm**: Package manager

### Code Quality
- **ESLint**: Linting with React hooks plugin
- **Prettier**: Code formatting (optional)

### Version Control
- **Git**: Source control

## Infrastructure

### Development
- Vite dev server with HMR
- Local PostgreSQL instance

### Production (Future)
- Static hosting (Vercel, Netlify) for frontend
- API hosting (Vercel Functions, Railway) for backend
- Managed PostgreSQL (Supabase, Railway, Neon)

## Color Theme

Custom palette integrated into TailwindCSS:

```javascript
// tailwind.config.js theme extension
colors: {
  inavo: {
    dark: '#1B1A26',      // Primary background
    blue: '#8DC3F2',      // Accent, links, buttons
    terracotta: '#A65E44', // Secondary accent
    brown: '#401C14',      // Deep accent
    olive: '#595336',      // Muted/neutral
  }
}
```

## shadcn/ui Components (Install as Needed)

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add navigation-menu
npx shadcn@latest add sheet          # Mobile menu
npx shadcn@latest add badge
npx shadcn@latest add separator
```
