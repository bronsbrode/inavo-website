# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Inavo professional services company website built with React, Vite, TailwindCSS, and shadcn/ui. Services data is stored in a PostgreSQL database.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Tech Stack

- **React** with Vite
- **TailwindCSS** for styling
- **shadcn/ui** for all UI components
- **PostgreSQL** database `bronsonbrode` for services data

## Sub-Agent Usage

Use the Task tool with sub-agents for parallel work. Launch independent agents simultaneously to maximize efficiency.

### Parallel Agent Patterns

**Codebase exploration** - Use multiple Explore agents in parallel:
```
Task(subagent_type="Explore", prompt="Find all React components...")
Task(subagent_type="Explore", prompt="Find database connection code...")
```

**Multi-file implementation** - Plan first, then execute in parallel:
```
Task(subagent_type="Plan", prompt="Plan implementation for services page")
# Then parallel execution:
Task(subagent_type="general-purpose", prompt="Create ServiceCard component")
Task(subagent_type="general-purpose", prompt="Create ServicesList component")
```

### When to Use Sub-Agents

| Task Type | Agent | Run Parallel? |
|-----------|-------|---------------|
| Find files/patterns | Explore | Yes - multiple searches |
| Code research | Explore | Yes - different areas |
| Implementation planning | Plan | No - sequential |
| Component creation | general-purpose | Yes - independent components |
| Database queries | general-purpose | Yes - independent operations |

### Sub-Agent Best Practices

1. **Maximize parallelism**: When tasks are independent, spawn multiple agents in a single message
2. **Use Explore for searching**: Don't grep directly; use Explore agent for codebase questions
3. **Plan complex features**: Use Plan agent before multi-file implementations
4. **Background tasks**: Use `run_in_background: true` for long-running operations

## shadcn/ui Usage

All UI components should come from shadcn/ui. Install components as needed:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add navigation-menu
```

Components are installed to `src/components/ui/`.

## Color Theme

Custom palette in TailwindCSS config:

| Name | Hex | Usage |
|------|-----|-------|
| `inavo-dark` | `#1B1A26` | Backgrounds |
| `inavo-blue` | `#8DC3F2` | Primary accent, links, buttons |
| `inavo-terracotta` | `#A65E44` | Secondary accent, hover states |
| `inavo-brown` | `#401C14` | Deep accent |
| `inavo-olive` | `#595336` | Muted text, neutral |

## Database

PostgreSQL database `bronsonbrode` on localhost. Tables:
- `services` - Company service offerings
- `portfolio` - Case studies
- `blog_posts` - Blog content
- `contact_submissions` - Form submissions

## References

- **specs/ARCHITECTURE.md** - System design and component architecture
- **specs/TECHNOLOGY-STACK.md** - Technology choices, database schema, color theme
- **specs/TASKS.md** - Implementation task queue (your command center)
- **specs/core/services.md** - Services feature specification
