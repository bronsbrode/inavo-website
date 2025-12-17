# Feature: Services List

**Status:** Planning
**Priority:** High

## Overview

Dynamic services listing page that pulls service data from PostgreSQL database. Services represent Inavo's professional offerings spanning technology and business consulting.

## User Stories

- As a potential client, I want to browse all services so I can understand what Inavo offers
- As a potential client, I want to see featured services highlighted so I can quickly identify key offerings
- As a potential client, I want to filter services by category so I can find relevant services faster

## Acceptance Criteria

- [ ] Services page displays all services from database
- [ ] Featured services appear prominently
- [ ] Services grouped or filterable by category
- [ ] Each service card shows name, description, and icon
- [ ] Clicking a service shows detailed information
- [ ] Page loads gracefully with loading state
- [ ] Empty state handles zero services

## Technical Specification

### Database Schema

```sql
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),           -- Icon name (e.g., 'code', 'chart', 'users')
    category VARCHAR(50),       -- 'technology' | 'business' | 'strategy'
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Sample Data

```sql
INSERT INTO services (name, slug, description, icon, category, featured, sort_order) VALUES
('Digital Transformation', 'digital-transformation', 'End-to-end digital strategy and implementation to modernize your business operations.', 'rocket', 'technology', true, 1),
('Custom Software Development', 'custom-software', 'Bespoke software solutions tailored to your unique business requirements.', 'code', 'technology', true, 2),
('IT Strategy Consulting', 'it-strategy', 'Strategic technology planning aligned with your business objectives.', 'compass', 'technology', false, 3),
('Business Process Optimization', 'process-optimization', 'Streamline operations and improve efficiency across your organization.', 'cog', 'business', true, 4),
('Change Management', 'change-management', 'Guide your organization through transitions with minimal disruption.', 'users', 'business', false, 5),
('Data Analytics', 'data-analytics', 'Transform raw data into actionable business insights.', 'chart', 'technology', false, 6);
```

### API Endpoint

```
GET /api/services
GET /api/services?featured=true
GET /api/services?category=technology
GET /api/services/:slug
```

### Component Structure

```
src/components/services/
├── ServiceCard.jsx       # Individual service display
├── ServicesList.jsx      # Grid/list of services
├── ServiceDetail.jsx     # Full service page
└── CategoryFilter.jsx    # Filter by category
```

### ServiceCard Component

```jsx
// Props: { service: { name, slug, description, icon, category, featured } }
// Uses: shadcn/ui Card, Badge
// Displays: Icon, name, description, category badge
// Action: Links to /services/:slug
```

## Implementation Tasks

- [ ] Create services table in PostgreSQL
- [ ] Seed initial services data
- [ ] Build API endpoint for services
- [ ] Create ServiceCard component
- [ ] Create ServicesList component
- [ ] Create Services page
- [ ] Add category filtering
- [ ] Create ServiceDetail page for individual services

## Testing Strategy

- API returns correct services data
- Services render correctly on page
- Filtering works as expected
- Loading and error states display properly

## Dependencies

- PostgreSQL database connection
- API layer (Express or Vite SSR)
- shadcn/ui Card and Badge components

## Service Categories

| Category | Services |
|----------|----------|
| Technology | Digital Transformation, Custom Software, IT Strategy, Data Analytics |
| Business | Process Optimization, Change Management |
| Strategy | Strategic Planning, Growth Advisory |
