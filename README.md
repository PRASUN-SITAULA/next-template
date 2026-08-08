# Next.js 16 Starter Template

A modern, full-stack foundation for authenticated web applications built with **Next.js 16**, **React 19**, and **TypeScript 6**. Designed for performance, type safety, and developer experience.

## ✨ Features

- **Framework**: Next.js 16 (App Router) with React 19 & React Compiler
- **Auth**: Robust session-based authentication with `better-auth`
- **Database**: Prisma ORM with PostgreSQL 17
- **Validation**: Type-safe Server Actions and schema validation with `next-safe-action` and `zod`
- **UI**: Tailwind CSS 4, shadcn/ui, and Base UI primitives
- **Testing**: Integrated Vitest and React Testing Library setup
- **DX**: Biome for ultra-fast linting/formatting, Husky for Git hooks, and Conventional Commits

---

## 🛠 Tech Stack Overview

### Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.2.6 | Full-stack framework with App Router & Type-safe Routes |
| **React** | 19.2.6 | UI library with concurrent features & React Compiler |
| **TypeScript** | 6.0.0+ | Modern type-safe JavaScript |

### Database & ORM

| Technology | Version | Purpose |
|------------|---------|---------|
| **PostgreSQL** | 18 | Relational database for persistent storage |
| **Prisma** | 7.8.0 | Type-safe ORM with auto-generated client |
| **@prisma/adapter-pg** | 7.8.0 | Native PostgreSQL adapter for Next.js |

### Authentication

| Technology | Version | Purpose |
|------------|---------|---------|
| **better-auth** | 1.6.10 | Lightweight, secure authentication framework |

### Testing

| Technology | Version | Purpose |
|------------|---------|---------|
| **Vitest** | 4.1.5 | High-performance Vite-native test runner |
| **React Testing Library** | 16.3.2 | User-centric UI component testing |
| **jsdom** | 29.0.2 | Browser environment simulation for Node.js |

### UI & Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **shadcn/ui** | - | Accessible UI components built on Base UI |
| **@base-ui/react** | 1.3.0 | Headless UI primitives |
| **Lucide React** | 1.6.0 | Modern icon library |

### Forms & Validation

| Technology | Version | Purpose |
|------------|---------|---------|
| **@tanstack/react-form** | 1.27.7 | Performance-focused form state management |
| **next-safe-action** | 8.1.8 | Type-safe Server Actions with middleware |
| **Zod** | 4.3.6 | Schema-first validation |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- pnpm 9+ (recommended)
- Docker Desktop/Engine

### Installation

1. **Clone the repository and install dependencies:**
   ```bash
   pnpm install
   ```

2. **Setup environment variables:**
   Run this command to create a `.env` file with default values and a generated secret:
   ```bash
   cat << EOF > .env
   # Authentication
   BETTER_AUTH_SECRET=$(openssl rand -base64 32)
   BETTER_AUTH_URL=http://localhost:3000

   # Database
   DATABASE_USER=postgres
   DATABASE_PASSWORD=postgres
   DATABASE_NAME=nextjs_template
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nextjs_template

   # Application
   NODE_ENV=development
   EOF
   ```

3. **Start local infrastructure (Docker):**
   ```bash
   docker compose up -d
   ```

4. **Initialize database:**
   ```bash
   pnpm db:generate
   pnpm db:seed # Optional
   ```

5. **Start development server:**
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see your app.

---

## 📂 Project Structure

```
├── src/
│   ├── actions/         # Type-safe Server Actions (mutations)
│   ├── app/             # Next.js App Router (pages, layouts, APIs)
│   ├── components/      # UI components (UI primitives, feature components)
│   ├── dal/             # Data Access Layer (cached database reads)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Core logic (Auth, Prisma, Logger, Schemas)
│   └── __tests__/       # Test suites
├── prisma/              # Database schema and migrations
└── public/              # Static assets
```

---

## ⌨️ Available Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm test` | **Run Vitest test suite** |
| `pnpm lint` | Lint code with Biome |
| `pnpm format` | Format code with Biome |
| `pnpm db:studio` | Interactive database GUI |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm commit` | Interactive Conventional Commit CLI |
| `pnpm analyze` | Analyze bundle size |

---

## 🛠 Configuration

### Next.js
Optimized for performance with:
- `reactCompiler: true`
- `cacheComponents: true`
- `typedRoutes: true`

### Biome
Used for both linting and formatting. Extremely fast and replaces ESLint/Prettier.
- Configuration found in `biome.json`.

---

## 📜 License

MIT
