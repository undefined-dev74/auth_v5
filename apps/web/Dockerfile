# FROM node:20-alpine AS base

# # Install dependencies only when needed
# FROM base AS deps
# RUN apk add --no-cache libc6-compat
# WORKDIR /app

# # Install pnpm
# RUN npm install -g pnpm@9.14.2

# # Copy workspace config and package files
# COPY pnpm-workspace.yaml ./
# COPY package.json ./
# COPY turbo.json ./

# # Create necessary directories
# RUN mkdir -p apps/web packages/logger packages/tsconfig packages/utils packages/types packages/eslint

# # Copy all package.json files
# COPY apps/web/package.json apps/web/
# COPY packages/logger/package.json packages/logger/
# COPY packages/tsconfig/package.json packages/tsconfig/
# COPY packages/utils/package.json packages/utils/
# COPY packages/types/package.json packages/types/
# COPY packages/eslint/package.json packages/eslint/

# # Install ALL dependencies (including devDependencies)
# RUN pnpm install --no-frozen-lockfile

# FROM base AS builder
# WORKDIR /app

# # Install pnpm
# RUN npm install -g pnpm@9.14.2

# # Copy workspace config
# COPY pnpm-workspace.yaml ./
# COPY package.json ./
# COPY turbo.json ./

# # Copy all package sources first
# COPY packages/logger ./packages/logger
# COPY packages/tsconfig ./packages/tsconfig
# COPY packages/utils ./packages/utils
# COPY packages/types ./packages/types
# COPY packages/eslint ./packages/eslint

# # Copy web app files including config files
# COPY apps/web/next.config.cjs ./apps/web/
# COPY apps/web/package.json ./apps/web/
# COPY apps/web/postcss.config.js ./apps/web/
# COPY apps/web/tailwind.config.ts ./apps/web/
# COPY apps/web/tsconfig.json ./apps/web/
# COPY apps/web/public ./apps/web/public
# COPY apps/web/app ./apps/web/app
# COPY apps/web/components ./apps/web/components
# COPY apps/web/constants ./apps/web/constants
# COPY apps/web/context ./apps/web/context
# COPY apps/web/helpers ./apps/web/helpers
# COPY apps/web/hooks ./apps/web/hooks
# COPY apps/web/layouts ./apps/web/layouts
# COPY apps/web/lib ./apps/web/lib
# COPY apps/web/prisma ./apps/web/prisma
# COPY apps/web/schema ./apps/web/schema
# COPY apps/web/services ./apps/web/services
# COPY apps/web/store ./apps/web/store
# COPY apps/web/styles ./apps/web/styles
# COPY apps/web/utils ./apps/web/utils




# # Copy dependencies from deps stage
# COPY --from=deps /app/node_modules ./node_modules
# COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules

# # Set environment variables
# ENV NEXT_TELEMETRY_DISABLED=1
# ENV NODE_ENV=production

# # Build workspace packages first
# RUN pnpm --filter "@repo/types" build && \
#     pnpm --filter "@repo/utils" build && \
#     pnpm --filter "@repo/logger" build

# # Then build the web app (no need to reinstall as we copied node_modules)
# RUN cd apps/web && pnpm build

# FROM base AS runner
# WORKDIR /app

# ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1
# ENV PORT=3000
# ENV HOSTNAME="0.0.0.0"

# # Don't run production as root
# RUN addgroup --system --gid 1001 nodejs && \
#     adduser --system --uid 1001 nextjs && \
#     mkdir .next && \
#     chown nextjs:nodejs .next

# # Copy workspace configuration
# COPY pnpm-workspace.yaml ./
# COPY package.json ./

# # Copy built workspace packages and their package.json files
# COPY --from=builder /app/packages/types/package.json ./packages/types/
# COPY --from=builder /app/packages/types ./packages/types
# COPY --from=builder /app/packages/utils/package.json ./packages/utils/
# COPY --from=builder /app/packages/utils ./packages/utils
# COPY --from=builder /app/packages/logger/package.json ./packages/logger/
# COPY --from=builder /app/packages/logger ./packages/logger

# # Copy web app configuration
# COPY apps/web/package.json ./apps/web/
# COPY apps/web/next.config.cjs ./apps/web/

# # Install production dependencies
# RUN npm install -g pnpm@9.14.2 && \
#     pnpm install --prod --no-frozen-lockfile

# # Copy built application
# COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static
# COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./public

# # Set the correct permission for prerender cache
# RUN chown -R nextjs:nodejs .

# USER nextjs

# EXPOSE 3000

# # Start the application
# CMD ["node", "server.js"]

# ABOVE IS STABLE DOCKER SCRIPT *****************************


# FROM node:20-alpine AS base

# # Install dependencies only when needed
# FROM base AS deps
# RUN apk add --no-cache libc6-compat
# WORKDIR /app

# # Install pnpm
# RUN npm install -g pnpm@9.14.2

# # Copy workspace config and package files
# COPY pnpm-workspace.yaml ./
# COPY package.json ./
# COPY turbo.json ./

# # Create necessary directories and copy package.json files
# COPY apps/web/package.json apps/web/
# COPY packages/*/package.json packages/

# # Install ALL dependencies (including devDependencies)
# RUN pnpm install --no-frozen-lockfile

# FROM base AS builder
# WORKDIR /app

# # Install pnpm
# RUN npm install -g pnpm@9.14.2

# # Copy all source files
# COPY . .

# # Copy dependencies from deps stage
# COPY --from=deps /app/node_modules ./node_modules

# # Set environment variables
# ENV NEXT_TELEMETRY_DISABLED=1
# ENV NODE_ENV=production

# # Build the web app (Next.js will handle workspace package transpilation)
# RUN cd apps/web && pnpm build

# FROM base AS runner
# WORKDIR /app

# ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1
# ENV PORT=3000
# ENV HOSTNAME="0.0.0.0"

# # Don't run production as root
# RUN addgroup --system --gid 1001 nodejs && \
#     adduser --system --uid 1001 nextjs && \
#     mkdir .next && \
#     chown nextjs:nodejs .next

# # Copy necessary files from builder
# COPY --from=builder /app/apps/web/.next/standalone ./
# COPY --from=builder /app/apps/web/.next/static ./.next/static
# COPY --from=builder /app/apps/web/public ./public

# # Set the correct permission for prerender cache
# RUN chown -R nextjs:nodejs .

# USER nextjs

# EXPOSE 3000

# CMD ["node", "server.js"]

# NEW DOCKER CODE -- which is stable but have to resolve the standalone output issue

# FROM node:20-slim AS base

# # Enable corepack for pnpm
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable

# # Install dependencies only when needed
# FROM base AS deps
# # Install necessary build tools
# RUN apt-get update && apt-get install -y libc6 
# WORKDIR /app

# # Copy workspace config files
# COPY package.json pnpm-workspace.yaml turbo.json ./

# # Copy all package.json files maintaining directory structure
# COPY apps/web/package.json apps/web/
# COPY packages/types/package.json packages/types/
# COPY packages/utils/package.json packages/utils/
# COPY packages/logger/package.json packages/logger/
# COPY packages/tsconfig/package.json packages/tsconfig/
# COPY packages/eslint/package.json packages/eslint/

# # Install all dependencies
# RUN pnpm install --no-frozen-lockfile

# FROM base AS builder
# WORKDIR /app

# # Copy source files first
# COPY . .

# # Remove any existing node_modules
# RUN rm -rf node_modules
# RUN rm -rf apps/web/node_modules

# # Copy deps
# COPY --from=deps /app/node_modules ./node_modules
# COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules

# ENV NEXT_TELEMETRY_DISABLED=1
# ENV NODE_ENV=production

# # Build the app using Next.js (which handles workspace package transpilation)
# RUN cd apps/web && pnpm build

# FROM base AS runner
# WORKDIR /app

# ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1
# ENV PORT=3000
# ENV HOSTNAME="0.0.0.0"

# RUN apt-get update && apt-get install -y openssl

# # Create non-root user
# RUN groupadd --system --gid 1001 nodejs && \
#     useradd --system --uid 1001 --gid nodejs nextjs && \
#     mkdir .next && \
#     chown nextjs:nodejs .next

# # Copy standalone build and static files
# COPY --from=builder /app/apps/web/.next/standalone ./
# COPY --from=builder /app/apps/web/.next/static ./.next/static
# COPY --from=builder /app/apps/web/public ./public

# USER nextjs

# EXPOSE 3000

# CMD ["node", "server.js"]










# FROM node:20-slim AS base

# # Enable corepack for pnpm
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable

# # Install dependencies only when needed
# FROM base AS deps
# RUN apt-get update && apt-get install -y libc6 
# WORKDIR /app

# # Copy workspace config files
# COPY package.json pnpm-workspace.yaml turbo.json ./

# # Copy all package.json files maintaining directory structure
# COPY apps/web/package.json apps/web/
# COPY packages/types/package.json packages/types/
# COPY packages/utils/package.json packages/utils/
# COPY packages/logger/package.json packages/logger/
# COPY packages/tsconfig/package.json packages/tsconfig/
# COPY packages/eslint/package.json packages/eslint/

# # Install all dependencies
# RUN pnpm install --no-frozen-lockfile

# FROM base AS builder
# WORKDIR /app

# # Copy source files first
# COPY . .

# # Remove any existing node_modules
# RUN rm -rf node_modules
# RUN rm -rf apps/web/node_modules

# # Copy deps
# COPY --from=deps /app/node_modules ./node_modules
# COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules

# ENV NEXT_TELEMETRY_DISABLED=1
# ENV NODE_ENV=production

# # Build the app using Next.js
# RUN cd apps/web && pnpm build

# FROM base AS runner
# WORKDIR /app

# ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1
# ENV PORT=3000
# ENV HOSTNAME="0.0.0.0"

# RUN apt-get update && apt-get install -y openssl

# # Create non-root user
# RUN groupadd --system --gid 1001 nodejs && \
#     useradd --system --uid 1001 --gid nodejs nextjs && \
#     mkdir .next && \
#     chown nextjs:nodejs .next

# # Copy standalone build
# COPY --from=builder /app/apps/web/.next/standalone/. ./
# COPY --from=builder /app/apps/web/.next/static ./.next/static
# COPY --from=builder /app/apps/web/public ./public

# # Set the correct permissions
# RUN chown -R nextjs:nodejs .

# USER nextjs

# EXPOSE 3000

# # Start the application using the correct server.js path
# CMD ["node", "server.js"]


# Use node with alpine and enable corepack for pnpm
FROM node:18-alpine AS base
RUN corepack enable

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm i -g turbo
COPY . .
RUN turbo prune --scope=web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Set PNPM to use Node.js LTS version compatible with Alpine
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN pnpm install --no-frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build --filter=web...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web/next.config.cjs .
COPY --from=installer /app/apps/web/package.json .

# Automatically leverage output traces to reduce image size
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

# Use array syntax for CMD to handle signals properly
CMD node apps/web/server.js