# Use node:20-alpine as base image
FROM node:20-alpine AS base

# Install necessary packages and specific pnpm version
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm@9.14.2

# Set working directory
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy configuration files
COPY ../../pnpm-lock.yaml ./
COPY ../../package.json ./
COPY ../../pnpm-workspace.yaml ./
COPY ../../.npmrc ./

# Copy the source code
COPY . ./apps/web/
COPY ../../packages ./packages/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Builder stage
FROM base AS builder
WORKDIR /app

# Copy files from deps
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app ./

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Generate Prisma Client
RUN cd apps/web && npx prisma generate

# Build the application
RUN pnpm build --filter web...

# Runner stage
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy necessary files
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

EXPOSE 3000

CMD ["node", "apps/web/server.js"]