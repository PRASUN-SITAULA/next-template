# Next.js 16 Starter Template

A  full-stack foundation for authenticated web applications built with Next.js 16, React 19, and TypeScript.

## Tech Stack Overview

### Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.2.0 | Full-stack React framework with App Router, Server Components, and Type-safe Routes |
| **React** | 19.2.4 | UI library with concurrent features |
| **TypeScript** | 5.x | Type-safe JavaScript superset |

### Database & ORM

| Technology | Version | Purpose |
|------------|---------|---------|
| **PostgreSQL** | 17 | Relational database for persistent storage |
| **Prisma** | 7.5.0 | Type-safe ORM with auto-generated client |
| **@prisma/adapter-pg** | 7.5.0 | PostgreSQL adapter enabling direct connections |
| **pg** | 8.20.0 | Node.js PostgreSQL client driver |

### Authentication

| Technology | Version | Purpose |
|------------|---------|---------|
| **better-auth** | 1.5.5 | Lightweight authentication framework with session management |

### UI & Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | 4.x | Utility-first CSS framework with modern features |
| **@base-ui/react** | 1.3.0 | Headless UI primitives (base-vega style) |
| **shadcn/ui** | - | Accessible, customizable UI component library |
| **lucide-react** | 1.6.0 | Icon library |

### Forms & Validation

| Technology | Version | Purpose |
|------------|---------|---------|
| **@tanstack/react-form** | 1.27.7 | Performant form state management |
| **zod** | 4.3.6 | TypeScript-first schema validation |
| **next-safe-action** | 8.1.8 | Type-safe server actions with middleware support |

### State Management & URL

| Technology | Version | Purpose |
|------------|---------|---------|
| **nuqs** | 2.8.9 | Type-safe search parameters for URL state |

### Notifications

| Technology | Version | Purpose |
|------------|---------|---------|
| **sonner** | 2.0.7 | Toast notifications |

### Logging

| Technology | Version | Purpose |
|------------|---------|---------|
| **loglayer** | 9.1.0 | Structured logging library |
| **@loglayer/transport-pino** | 3.0.2 | Production logging with Pino |
| **@loglayer/transport-simple-pretty-terminal** | 3.0.2 | Development logging with pretty output |
| **pino** | 10.3.1 | JSON logger for low-overhead production logs |

### Code Quality

| Technology | Version | Purpose |
|------------|---------|---------|
| **Biome** | 2.4.10 | Linter + formatter (replaces ESLint/Prettier) |
| **husky** | 9.1.7 | Git hooks framework |
| **lint-staged** | 16.2.6 | Run linters on staged files |

### Git Workflow

| Technology | Version | Purpose |
|------------|---------|---------|
| **@commitlint/cli** | 20.3.1 | Commit message linting |
| **@commitlint/config-conventional** | 20.3.1 | Conventional Commits specification |
| **commitizen** | 4.3.1 | Interactive commit creation tool |
| **@semantic-release/** | various | Automated versioning and releases |


---

## Prerequisites

- Node.js 20+
- pnpm 8+
- Docker Desktop (for local PostgreSQL)

---

## Environment Setup

Create a `.env` file in the root directory:

```bash
# Authentication
BETTER_AUTH_SECRET=<your_secret_key>
BETTER_AUTH_URL=http://localhost:3000

# Database
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=nextjs_template
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nextjs_template

# Application
NODE_ENV=development
NEXT_RUNTIME=nodejs
```

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Start PostgreSQL (Docker)
docker compose up -d

# Generate Prisma client
pnpm db:generate

# Seed the database (optional)
pnpm db:seed

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Project Architecture

```
├── app/
│   ├── (auth-pages)/    # Route group: public auth pages
│   ├── (main)/          # Route group: protected pages
│   ├── api/auth/        # Better Auth API routes
│   ├── generated/       # Prisma generated client
│   ├── globals.css      # Tailwind v4 styles & CSS variables
│   └── layout.tsx       # Root layout
├── actions/             # Server actions (mutations)
│   ├── safe-action.ts   # next-safe-action clients
│   └── middleware.ts    # Authentication middleware
├── dal/                 # Data Access Layer (reads)
│   └── auth.ts          # Cached session retrieval
├── lib/                 # Shared utilities
│   ├── auth.ts          # Better Auth server config
│   ├── auth-client.ts   # Better Auth client instance
│   ├── prisma.ts        # Singleton Prisma client
│   ├── logger.ts        # LogLayer instance
│   └── schema/          # Zod validation schemas
├── components/          # React components
│   ├── ui/              # shadcn/ui primitives
│   └── ...
├── hooks/               # Custom React hooks
├── prisma/
│   └── schema.prisma    # Database schema
└── proxy.ts             # Next.js middleware
```

### Key Patterns

#### Route Groups
- `(auth-pages)` - Public authentication routes (login, signup)
- `(main)` - Protected authenticated pages

#### Data Flow
- **Mutations**: Server Actions via `next-safe-action`
- **Reads**: DAL functions with React `cache()` in Server Components

#### Authentication Flow
1. Client sends credentials to `/api/auth/*`
2. Better Auth validates and creates session
3. Session cookie stored and cached (5 minutes)
4. Middleware (`proxy.ts`) checks session for protected routes
5. Server Actions use `authMiddleware` for protected mutations

---

## Available Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm debug` | Dev server with inspector |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run Biome linter |
| `pnpm format` | Format with Biome |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:seed` | Seed the database |
| `pnpm commit` | Create conventional commit |
| `pnpm analyze` | Bundle analysis |

---

## Next.js Configuration

```typescript
// next.config.ts
{
  cacheComponents: true,   // Component-level caching
  reactCompiler: true,     // React Compiler enabled
  typedRoutes: true,       // Type-safe routes
}
```

---

## Code Quality

### Biome (Linter + Formatter)
- 2-space indentation, semicolons as-needed
- `components/ui` excluded (shadcn-managed)
- Next.js and React recommended rules enabled

### Git Hooks
- **Pre-commit**: lint-staged runs Biome on staged files
- **Commitlint**: Validates Conventional Commits format

---

## Release Process

Semantic Release automates versioning:
1. Merge to `main` → release patch/minor/major based on commit types
2. Merge to `staging` → prerelease version

Commit types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## License

MIT
