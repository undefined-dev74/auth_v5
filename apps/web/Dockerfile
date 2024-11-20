# Use node:20-alpine as base image
FROM node:20-alpine AS base

# Install necessary packages
RUN apk update && apk add --no-cache libc6-compat bash
RUN corepack enable pnpm

# Stage 1: Builder
FROM base AS builder
WORKDIR /app

# Copy essential configuration files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy the full source code
COPY . .

# Prune the monorepo for the target workspace 'web'
RUN pnpm dlx turbo prune --scope=auth_v5 --docker

# Stage 2: Installer
FROM base AS installer
WORKDIR /app

# Copy environment variables
ARG DATABASE_URL
ARG AUTH_SECRET
ARG NEXT_PUBLIC_API_BASE_URL
ARG RESEND_API_KEY
ENV DATABASE_URL=${DATABASE_URL}
ENV AUTH_SECRET=${AUTH_SECRET}
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV RESEND_API_KEY=${RESEND_API_KEY}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}

# Copy pruned lockfile and package.json
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code and configs
COPY --from=builder /app/out/full/ .
COPY --from=builder /app/apps/web/next.config.js ./apps/web/next.config.js
COPY --from=builder /app/apps/web/.env ./apps/web/.env

# Generate Prisma Client
RUN cd apps/web && npx prisma generate

# Build the application
RUN pnpm dlx turbo run build --filter=auth_v5...

# Stage 3: Runner
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy necessary files for production
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

# Expose port
EXPOSE 3000

# Start Next.js
CMD ["node", "apps/web/server.js"]