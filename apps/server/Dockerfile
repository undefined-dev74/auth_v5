FROM node:18-alpine AS base
# Install necessary packages and specific pnpm version
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm@9.14.2

# Set working directory
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# First copy only the workspace configuration files
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY .npmrc ./

# Copy all package.json files from workspaces
COPY packages/*/package.json ./packages/
COPY apps/server/package.json ./apps/server/

# Now copy the source files
COPY packages ./packages
COPY apps/server ./apps/server

# Install dependencies with specific flags to handle lockfile
RUN pnpm install --frozen-lockfile=false --recursive

# Builder stage
FROM base AS builder
WORKDIR /app

# Copy files from deps
COPY --from=deps /app ./

# Generate Prisma Client
RUN cd apps/server && npx prisma generate

# Build the application
RUN pnpm build --filter=server...

# Runner stage
FROM base AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

# Copy necessary files
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Fix permissions
RUN chown -R expressjs:nodejs /app

USER expressjs

ENV NODE_ENV production
ENV PORT 8000

EXPOSE 8000

CMD ["node", "dist/index.js"]