# AGENTS.md — Project Context

<!-- BEGIN:nextjs-agent-rules -->
 
# Next.js: ALWAYS read docs before coding
 
Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.
 
<!-- END:nextjs-agent-rules -->

## Project Overview

This is a **Next.js 16** starter template built with **React 19**, designed as a full-stack foundation for authenticated web applications. It provides a pre-configured setup with authentication, database access, type-safe server actions, and a polished UI system.

### Core Technologies

| Layer          | Technology                                        |
| -------------- | ------------------------------------------------- |
| Framework      | Next.js 16 (App Router, React Compiler, Typed Routes) |
| Language       | TypeScript 5                                      |
| Database       | PostgreSQL 17 via Prisma 7 (`@prisma/adapter-pg`) |
| Authentication | Better Auth (email/password, session cookies, HaveIBeenPwned plugin) |
| UI             | shadcn/ui (`base-vega` style, base-ui), Tailwind CSS v4, Lucide icons, Geist fonts |
| Forms          | TanStack React Form + Zod v4 validation           |
| Server Actions | `next-safe-action` with auth/no-auth clients      |
| State / URL    | `nuqs` for type-safe search params                |
| Notifications  | Sonner (toast)                                    |
| Linting        | Biome (formatter + linter, replaces ESLint/Prettier) |
| Commits        | Commitizen + Commitlint (Conventional Commits), Husky + lint-staged |
| Releases       | Semantic Release                                  |
| Dev DB         | Docker Compose (PostgreSQL 17 Alpine)             |

### Architecture

```
├── app/
│   ├── (auth-pages)/    # Route group for login/signup (public)
│   ├── (main)/          # Route group for authenticated pages
│   ├── api/             # API route handlers (Better Auth)
│   ├── generated/       # Prisma generated client
│   ├── globals.css      # Tailwind v4 styles & CSS variables
│   └── layout.tsx       # Root layout (Geist fonts, NuqsAdapter, Toaster)
├── actions/
│   ├── safe-action.ts   # next-safe-action clients (noAuthActionClient, authActionClient)
│   └── middleware.ts    # Authentication middleware for server actions
├── components/
│   ├── ui/              # shadcn/ui primitives
│   ├── app-sidebar.tsx  # Application sidebar component
│   ├── search-params.ts # Shared search param definitions
│   └── submit-button.tsx
├── hooks/               # Custom React hooks (e.g., use-mobile)
├── dal/                 # Data Access Layer (read-only data fetching)
│   └── auth.ts          # Cached session retrieval
├── lib/
│   ├── auth.ts          # Better Auth server config (Prisma adapter, plugins)
│   ├── auth-client.ts   # Better Auth client instance
│   ├── prisma.ts        # Singleton Prisma client (PrismaPg adapter)
│   ├── constants.ts     # App-wide constants (e.g., DEFAULT_LOGIN_REDIRECT)
│   ├── public-paths.ts  # Public route definitions for middleware
│   ├── schema/          # Shared Zod schemas
│   └── utils.ts         # Utility functions (cn helper)
├── prisma/
│   └── schema.prisma    # Database schema (User, Session, Account, Verification)
└── proxy.ts             # Next.js middleware (auth redirects, public path checks)
```

**Key patterns:**

- **Route groups** `(auth-pages)` and `(main)` separate public auth flows from protected pages.
- **Middleware** (`proxy.ts`) uses Better Auth's `getSessionCookie` for optimistic auth checks — redirects unauthenticated users to `/auth/login` and authenticated users away from auth pages.
- **Server actions** handle all **mutations** (create, update, delete) via `next-safe-action` with two clients: `noAuthActionClient` (public) and `authActionClient` (requires session). Error handling covers `APIError`, `ZodError`, and Prisma errors.
- **Data Access Layer** (`dal/`) contains all **read-only data fetching** logic, using React's `cache()` for per-request deduplication. Server Components call DAL functions directly — never server actions for reads.
- **Prisma client** is generated to `app/generated/prisma/` and uses `@prisma/adapter-pg` for direct PostgreSQL connections.

---

## Building and Running

### Prerequisites

- **Node.js** (compatible with Next.js 16)
- **pnpm** (package manager — uses `pnpm-lock.yaml`)
- **Docker** (for local PostgreSQL)

### Environment Variables

Create a `.env` file with:

```bash
BETTER_AUTH_SECRET=<your_secret_key>
DATABASE_USER=<your_database_user>
DATABASE_PASSWORD=<your_database_password>
DATABASE_NAME=<your_database_name>
NODE_ENV=<your_node_environment>
DATABASE_URL=<your_database_url>
```

### Commands

```bash
# Install dependencies
pnpm install

# Start PostgreSQL (Docker)
docker compose up -d

# Generate Prisma client
pnpm db:generate

# Seed the database
pnpm db:seed

# Run development server
pnpm dev

# Run dev server with inspector
pnpm debug

# Build for production
pnpm build

# Start production server
pnpm start

# Open Prisma Studio (DB GUI)
pnpm db:studio

# Analyze bundle
pnpm analyze

# Lint (Biome check)
pnpm lint

# Format (Biome format)
pnpm format

# Create a conventional commit
pnpm commit
```

---

## Development Conventions

### Code Style

- **Biome** is the sole linter/formatter (no ESLint or Prettier).
  - 2-space indentation, semicolons as-needed, ES5 trailing commas.
  - Import organization and property sorting are enabled via Biome's `assist` actions.
  - `components/ui` is excluded from linting (shadcn-managed).
- **TypeScript** with `strict` mode enabled.

### Next.js Configuration

- `reactCompiler: true` — React Compiler is enabled.
- `cacheComponents: true` — component-level caching is active.
- `typedRoutes: true` — type-safe route links.

### Component Organization

- **shadcn/ui components** live in `components/ui/` and should be added via the shadcn CLI.
- **App-specific components** live directly in `components/` or co-located with routes using `_components/` directories.
- **Path aliases** use `@/*` mapping to the project root (e.g., `@/lib/utils`, `@/components/ui`).

### Forms & Validation

- **Always use TanStack React Form** (`@tanstack/react-form`) for building forms.
- **Always use Zod v4** for input validation schemas.
- **All Zod schemas must be placed in `lib/schema/`** (e.g., `lib/schema/auth.ts`). Group schemas by domain/feature.
- **Use shadcn/ui components** for all form controls (`Input`, `Select`, `Checkbox`, `Button`, etc.) — never raw HTML inputs.
- Server actions validate input via Zod schemas imported from `lib/schema/`.

### Data Access Layer (DAL)

- **All data fetching (reads)** lives in `dal/`, not in server actions or inline in components.
- Server Components import and call DAL functions directly.
- Group DAL files by domain/feature (e.g., `dal/auth.ts`, `dal/users.ts`).

### Server Actions

- **All mutations (create, update, delete)** use server actions — never DAL functions.
- All server actions should use `noAuthActionClient` or `authActionClient` from `actions/safe-action.ts`.
- Define metadata with `{ name: "actionName" }` for each action.
- Input validation uses **Zod v4** schemas from `lib/schema/`.

### Git Workflow

- **Conventional Commits** enforced via Commitlint + Husky pre-commit hooks.
- **lint-staged** runs `biome check --write` on staged `.js`, `.ts`, `.jsx`, `.tsx`, `.json`, `.jsonc` files.
- **Semantic Release** automates versioning and changelog generation (configured in `.releaserc.json`).

---

## Available Skills

The following skills are available in `.agents/skills/` and should be consulted when working on relevant tasks:

| Skill | Path | When to Use |
| ----- | ---- | ----------- |
| **Next.js Best Practices** | `.agents/skills/next-best-practices/SKILL.md` | Writing/reviewing Next.js code — file conventions, RSC boundaries, data patterns, async APIs, metadata, error handling, route handlers, image/font optimization, bundling |
| **shadcn/ui** | `.agents/skills/shadcn/SKILL.md` | Adding, composing, styling, or debugging shadcn/ui components. All UI work should use shadcn/ui primitives. Read this skill before creating or modifying any UI component |
| **Vercel React Best Practices** | `.agents/skills/vercel-react-best-practices/SKILL.md` | Performance optimization — eliminating waterfalls, bundle size, server-side performance, re-render optimization, rendering patterns |
