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
COPY . ./apps/server/
COPY ../../packages ./packages/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Builder stage
FROM base AS builder
WORKDIR /app

# Copy files from deps
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app ./

# Generate Prisma Client
RUN cd apps/server && npx prisma generate

# Build the application
RUN pnpm build --filter server...

# Runner stage
FROM base AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs
USER expressjs

# Copy necessary files
COPY --from=builder --chown=expressjs:nodejs /app/apps/server/dist ./dist
COPY --from=builder --chown=expressjs:nodejs /app/apps/server/package.json ./
COPY --from=builder --chown=expressjs:nodejs /app/node_modules ./node_modules

ENV NODE_ENV production
ENV PORT 8000

EXPOSE 8000

CMD ["node", "dist/index.js"]