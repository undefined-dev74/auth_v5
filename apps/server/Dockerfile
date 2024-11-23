FROM node:18-alpine AS base

# Install necessary dependencies including glibc
RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++ \
    curl \
    openssl \
    git

# Install pnpm globally
RUN npm install -g pnpm@9.14.2

WORKDIR /app

# Dependencies stage
FROM base AS deps
WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY .npmrc ./

# Set npm config to avoid postinstall issues
ENV SKIP_POSTINSTALL=1
ENV NODE_ENV=production
ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true
ENV NEXT_TELEMETRY_DISABLED=1
ENV CI=true

# Create .npmrc with necessary settings
RUN echo "node-linker=hoisted\nstrict-peer-dependencies=false\nauto-install-peers=true\nenable-pre-post-scripts=false" > .npmrc

# Copy all package.json files
COPY packages/*/package.json ./packages/
COPY apps/server/package.json ./apps/server/
COPY apps/server/prisma ./apps/server/prisma

# Install dependencies with specific flags to avoid postinstall issues
RUN pnpm install --frozen-lockfile=false \
    --ignore-scripts \
    # Ignore specific problematic packages
    --ignore-workspace-root-check \
    --filter="./apps/server..." \
    # Skip optional dependencies
    --no-optional

# Builder stage
FROM base AS builder
WORKDIR /app

# Copy files from deps stage
COPY --from=deps /app ./

# Copy source files
COPY packages ./packages
COPY apps/server ./apps/server
COPY tsconfig.json ./

# Set environment variables for build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install necessary build dependencies separately
RUN cd apps/server && \
    pnpm add -D esbuild@latest @swc/core@latest --ignore-scripts && \
    # Generate Prisma client without postinstall
    npx prisma generate --no-engine

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

ENV NODE_ENV=production
ENV PORT=8000

# Copy build output and necessary files
COPY --from=builder --chown=expressjs:nodejs /app/apps/server/dist ./dist
COPY --from=builder --chown=expressjs:nodejs /app/apps/server/package.json ./
COPY --from=builder --chown=expressjs:nodejs /app/node_modules ./node_modules

# Switch to non-root user
USER expressjs

EXPOSE 8000

CMD ["node", "dist/index.js"]