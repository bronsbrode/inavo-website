# Architecture Specification

## Overview

Inavo is a professional services company website built as a React SPA with a PostgreSQL backend for dynamic services content. The architecture prioritizes fast page loads, easy content management via database, and a modern dark theme aesthetic.

## System Context

```
┌─────────────────────────────────────────────────────────────┐
│                        Users                                 │
│              (Potential Clients, Partners)                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Inavo Website (React SPA)                  │
│  ┌─────────┐ ┌─────────┐ ┌──────────┐ ┌──────────┐         │
│  │  Home   │ │  About  │ │ Services │ │ Portfolio│         │
│  └─────────┘ └─────────┘ └──────────┘ └──────────┘         │
│  ┌─────────┐ ┌─────────┐                                    │
│  │  Blog   │ │ Contact │                                    │
│  └─────────┘ └─────────┘                                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                       │
│                    (Local: bronsonbrode)                     │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │   services   │ │  portfolio   │ │  blog_posts  │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## High-Level Architecture

### Frontend (React + Vite)
- **Rendering**: Client-side SPA with React Router
- **Styling**: TailwindCSS with custom color theme
- **Components**: shadcn/ui component library
- **State**: React hooks for local state; fetch for API calls

### Backend (API Layer)
- Simple API endpoints to serve PostgreSQL data
- Options: Express.js server, Next.js API routes, or Vite SSR

### Data Layer (PostgreSQL)
- Database: `bronsonbrode` (local Mac installation)
- Tables: `services`, `portfolio`, `blog_posts`, `contact_submissions`

## Component Architecture

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   ├── home/
│   │   ├── Hero.jsx
│   │   ├── ServicesPreview.jsx
│   │   └── CTASection.jsx
│   ├── services/
│   │   ├── ServiceCard.jsx
│   │   └── ServicesList.jsx
│   ├── portfolio/
│   │   ├── CaseStudyCard.jsx
│   │   └── PortfolioGrid.jsx
│   ├── blog/
│   │   ├── BlogCard.jsx
│   │   └── BlogList.jsx
│   └── contact/
│       └── ContactForm.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Services.jsx
│   ├── Portfolio.jsx
│   ├── Blog.jsx
│   └── Contact.jsx
├── lib/
│   ├── utils.js            # shadcn/ui utilities
│   └── api.js              # API client functions
├── hooks/
│   └── useServices.js      # Data fetching hooks
└── styles/
    └── globals.css         # Tailwind + custom theme
```

## Data Flow

1. **Page Load**: React Router renders page component
2. **Data Fetch**: Component mounts → calls API → fetches from PostgreSQL
3. **Render**: Data populates shadcn/ui components
4. **Interaction**: User actions trigger state updates or form submissions

## Color Theme Integration

Custom theme colors from provided palette:
- **Primary Dark**: `#1B1A26` (backgrounds)
- **Accent Blue**: `#8DC3F2` (primary accent, links, buttons)
- **Warm Accent**: `#A65E44` (secondary accent, hover states)
- **Deep Brown**: `#401C14` (tertiary, subtle elements)
- **Olive**: `#595336` (neutral, muted text)

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | React + Vite | Fast dev experience, modern tooling |
| UI Library | shadcn/ui | Accessible, customizable, TailwindCSS native |
| Database | PostgreSQL | Robust, familiar, local development ready |
| Styling | TailwindCSS | Utility-first, matches shadcn/ui |
