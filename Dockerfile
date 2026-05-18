ARG NODE_VERSION=24.15.0-slim

# Stage 1: install dependencies
FROM node:${NODE_VERSION} AS dependencies

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* pnpm-workspace.yaml* .npmrc* ./

# Install project dependencies with frozen lockfile for reproducible builds
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/usr/local/share/.cache/yarn \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
  if [ -f package-lock.json ]; then \
    npm ci --no-audit --no-fund; \
  elif [ -f yarn.lock ]; then \
    corepack enable yarn && yarn install --frozen-lockfile --production=false; \
  elif [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm install --frozen-lockfile; \
  else \
    echo "No lockfile found." && exit 1; \
  fi

  # Stage 2: copy source code and build
FROM node:${NODE_VERSION} AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Generate prisma schema
# Dummy DATABASE_URL for prisma generate (only needs schema, not a real connection)
RUN if [ -f package-lock.json ]; then \
    DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" npm run prisma generate; \
  elif [ -f yarn.lock ]; then \
    corepack enable yarn && DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" yarn prisma generate; \
  elif [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" pnpm prisma generate; \
  else \
    echo "Cannot generate prisma schema." && exit 1; \
  fi

# Build the application
RUN if [ -f package-lock.json ]; then \
    npm run build; \
  elif [ -f yarn.lock ]; then \
    corepack enable yarn && yarn build; \
  elif [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm build; \
  else \
    echo "No lockfile found." && exit 1; \
  fi


  # Stage 3: Run Next.js application

FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"


COPY --from=builder --chown=node:node /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown node:node .next

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000

# Start Next.js standalone server
CMD ["node", "server.js"]
