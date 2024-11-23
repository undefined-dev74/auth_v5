FROM node:18-alpine AS base

# Install necessary packages including build dependencies
RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++ \
    curl \
    openssl

# Install pnpm
RUN npm install -g pnpm@9.14.2

# Set working directory
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy root workspace files
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY .npmrc ./

# Create necessary directories for packages
RUN mkdir -p packages apps/server

# Copy package.json files
COPY packages/*/package.json ./packages/
COPY apps/server/package.json ./apps/server/

# Copy prisma schema and other necessary files
COPY apps/server/prisma ./apps/server/prisma

# Copy source files
COPY packages ./packages
COPY apps/server ./apps/server

# Set environment variables for Prisma and other build tools
ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true
ENV NODE_ENV=development
ENV PRISMA_CLI_QUERY_ENGINE_TYPE=binary
ENV PRISMA_CLIENT_ENGINE_TYPE=binary

# Install dependencies with specific flags
RUN pnpm install --no-frozen-lockfile \
    --unsafe-perm \
    --reporter=silent \
    --ignore-scripts

# Generate Prisma Client separately
RUN cd apps/server && \
    npx prisma generate

# Builder stage
FROM base AS builder
WORKDIR /app

# Copy files from deps
COPY --from=deps /app ./

# Build the application
RUN pnpm build --filter=server...

# Runner stage
FROM node:18-alpine AS runner
WORKDIR /app

# Install production dependencies
RUN apk add --no-cache libc6-compat openssl

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

# Set proper environment variables
ENV NODE_ENV=production
ENV PORT=8000
ENV PRISMA_CLI_QUERY_ENGINE_TYPE=binary
ENV PRISMA_CLIENT_ENGINE_TYPE=binary

# Copy necessary files
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/package.json ./
COPY --from=builder /app/apps/server/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/server/node_modules/.prisma ./node_modules/.prisma

# Fix permissions
RUN chown -R expressjs:nodejs /app

USER expressjs

EXPOSE 8000

CMD ["node", "dist/index.js"]