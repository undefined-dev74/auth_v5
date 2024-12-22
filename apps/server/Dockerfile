# FROM node:20-slim AS base

# # Enable corepack for pnpm
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable

# # Install dependencies only when needed
# FROM base AS deps
# RUN apt-get update && apt-get install -y libc6

# WORKDIR /app

# # Install Turbo
# RUN npm i -g turbo

# # Generate pruned workspace
# COPY . .
# RUN turbo prune server --docker

# FROM base AS installer
# RUN apt-get update && apt-get install -y libc6
# WORKDIR /app

# # Copy pruned dependency information
# COPY --from=deps /app/out/json/ .
# COPY --from=deps /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# # Install dependencies
# RUN pnpm install --no-frozen-lockfile

# # Build the project and its dependencies
# COPY --from=deps /app/out/full/ .
# RUN pnpm turbo run build --filter=server...

# FROM base AS runner
# WORKDIR /app

# ENV NODE_ENV=production
# ENV PORT=3000

# RUN apt-get update && apt-get install -y openssl

# # Create non-root user
# RUN groupadd --system --gid 1001 nodejs && \
#     useradd --system --uid 1001 --gid nodejs nodeapp

# # Copy all necessary files for production
# COPY --from=installer /app/apps/server/dist ./apps/server/dist
# COPY --from=installer /app/apps/server/package.json ./apps/server/package.json
# COPY --from=installer /app/package.json ./package.json
# COPY --from=installer /app/pnpm-lock.yaml ./pnpm-lock.yaml

# # Important: Copy workspace dependencies
# COPY --from=installer /app/node_modules ./node_modules
# COPY --from=installer /app/apps/server/node_modules ./apps/server/node_modules

# # If you have workspace packages, copy them too
# COPY --from=installer /app/packages ./packages

# # Set permissions
# RUN chown -R nodeapp:nodejs .

# USER nodeapp

# EXPOSE 3000

# CMD ["node", "apps/server/dist/index.js"]


# TRAIL one ABOVE one is stable

# FROM node:20-slim AS base

# # Enable corepack for pnpm
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable

# # Install dependencies only when needed
# FROM base AS deps
# RUN apt-get update && apt-get install -y libc6

# WORKDIR /app

# # Install Turbo
# RUN npm i -g turbo

# # Generate pruned workspace
# COPY . .
# RUN turbo prune server --docker

# FROM base AS installer
# RUN apt-get update && apt-get install -y libc6
# WORKDIR /app

# # Copy pruned dependency information
# COPY --from=deps /app/out/json/ .
# COPY --from=deps /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# # Install dependencies
# RUN pnpm install --no-frozen-lockfile

# # Build the project and its dependencies
# COPY --from=deps /app/out/full/ .
# RUN pnpm turbo run build --filter=server...

# FROM base AS runner
# WORKDIR /app

# # Default environment variables
# ENV NODE_ENV=production \
#     PORT=8000 \
#     # JWT settings
#     JWT_ACCESS_EXPIRATION_MINUTES=30 \
#     JWT_REFRESH_EXPIRATION_DAYS=30 \
#     JWT_RESET_PASSWORD_EXPIRATION_MINUTES=10 \
#     JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=10 \
#     # URLs
#     FRONTEND_URL=http://localhost:3000 \
#     OAUTH_CLIENT_URL=http://localhost:3000

# RUN apt-get update && apt-get install -y openssl

# # Create non-root user
# RUN groupadd --system --gid 1001 nodejs && \
#     useradd --system --uid 1001 --gid nodejs nodeapp

# # Copy all necessary files for production
# COPY --from=installer /app/apps/server/dist ./apps/server/dist
# COPY --from=installer /app/apps/server/package.json ./apps/server/package.json
# COPY --from=installer /app/package.json ./package.json
# COPY --from=installer /app/pnpm-lock.yaml ./pnpm-lock.yaml

# # Copy node_modules and workspace packages
# COPY --from=installer /app/node_modules ./node_modules
# COPY --from=installer /app/apps/server/node_modules ./apps/server/node_modules
# COPY --from=installer /app/packages ./packages

# # Set permissions
# RUN chown -R nodeapp:nodejs .

# USER nodeapp

# EXPOSE 8000

# CMD ["node", "apps/server/dist/index.js"]

# FROM node:20-slim AS base

# # Enable corepack for pnpm
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable

# # Install dependencies only when needed
# FROM base AS deps
# RUN apt-get update && apt-get install -y libc6 openssl

# WORKDIR /app

# # Install Turbo
# RUN npm i -g turbo

# # Generate pruned workspace
# COPY . .
# RUN turbo prune server --docker

# FROM base AS installer
# RUN apt-get update && apt-get install -y libc6 openssl
# WORKDIR /app

# # Copy pruned dependency information
# COPY --from=deps /app/out/json/ .
# COPY --from=deps /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# # Install dependencies
# RUN pnpm install --no-frozen-lockfile

# # Build the project and its dependencies
# COPY --from=deps /app/out/full/ .

# # Generate Prisma Client
# RUN cd packages/database && npx prisma generate

# # Build the application
# RUN pnpm turbo run build --filter=server...

# FROM base AS runner
# WORKDIR /app

# # Install production dependencies
# RUN apt-get update && apt-get install -y openssl

# # Create non-root user
# RUN groupadd --system --gid 1001 nodejs && \
#     useradd --system --uid 1001 --gid nodejs nodeapp

# # Copy all necessary files for production
# COPY --from=installer /app/apps/server/dist ./apps/server/dist
# COPY --from=installer /app/apps/server/package.json ./apps/server/package.json
# COPY --from=installer /app/package.json ./package.json
# COPY --from=installer /app/pnpm-lock.yaml ./pnpm-lock.yaml

# # Copy node_modules and workspace packages
# COPY --from=installer /app/node_modules ./node_modules
# COPY --from=installer /app/apps/server/node_modules ./apps/server/node_modules
# COPY --from=installer /app/packages ./packages

# # Copy Prisma schema and client
# COPY --from=installer /app/packages/database/prisma ./prisma
# # COPY --from=installer /app/packages/database/node_modules/.prisma ./node_modules/.prisma

# # Set permissions
# RUN chown -R nodeapp:nodejs .

# USER nodeapp

# EXPOSE 8000

# CMD ["node", "apps/server/dist/index.js"]

# FROM node:20-slim AS base

# # Enable corepack for pnpm
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable

# # Install dependencies only when needed
# FROM base AS deps
# RUN apt-get update && apt-get install -y libc6 openssl

# WORKDIR /app

# # Install Turbo
# RUN npm i -g turbo

# # Generate pruned workspace
# COPY . .
# RUN turbo prune server --docker

# FROM base AS installer
# RUN apt-get update && apt-get install -y libc6 openssl
# WORKDIR /app

# # Copy pruned dependency information
# COPY --from=deps /app/out/json/ .
# COPY --from=deps /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# # Install dependencies
# RUN pnpm install --no-frozen-lockfile

# # Build the project and its dependencies
# COPY --from=deps /app/out/full/ .

# # Generate Prisma Client
# RUN cd packages/database && npx prisma generate

# # Build the application
# ENV NODE_ENV=production
# RUN pnpm turbo run build --filter=server...

# FROM base AS runner
# WORKDIR /app

# # Set default environment variables
# ENV NODE_ENV=production \
#     PORT=8000 \
#     DATABASE_URL=mysql://root:User@123@mysql:3306/streamline \
#     JWT_SECRET=thisisasamplesecret \
#     JWT_ACCESS_EXPIRATION_MINUTES=30 \
#     JWT_REFRESH_EXPIRATION_DAYS=30 \
#     JWT_RESET_PASSWORD_EXPIRATION_MINUTES=10 \
#     JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=10 \
#     SMTP_HOST=smtp.gmail.com \
#     SMTP_PORT=587 \
#     FRONTEND_URL=http://localhost:3000 \
#     OAUTH_CLIENT_URL=http://localhost:3000

# # Install production dependencies
# RUN apt-get update && apt-get install -y openssl

# # Create non-root user
# RUN groupadd --system --gid 1001 nodejs && \
#     useradd --system --uid 1001 --gid nodejs nodeapp

# # Copy all necessary files for production
# COPY --from=installer /app/apps/server/dist ./apps/server/dist
# COPY --from=installer /app/apps/server/package.json ./apps/server/package.json
# COPY --from=installer /app/package.json ./package.json
# COPY --from=installer /app/pnpm-lock.yaml ./pnpm-lock.yaml

# # Copy node_modules and workspace packages
# COPY --from=installer /app/node_modules ./node_modules
# COPY --from=installer /app/node_modules/.prisma ./node_modules/.prisma
# COPY --from=installer /app/apps/server/node_modules ./apps/server/node_modules
# COPY --from=installer /app/packages ./packages

# # Copy Prisma schema and client
# COPY --from=installer /app/packages/database/prisma ./prisma
# # COPY --from=installer /app/packages/database/node_modules/.cache/prisma ./node_modules/.cache/prisma

# # Set permissions
# RUN chown -R nodeapp:nodejs .

# USER nodeapp

# EXPOSE 8000

# CMD ["node", "apps/server/dist/index.js"]

FROM node:20-slim AS base

# Enable corepack for pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install dependencies only when needed
FROM base AS deps
RUN apt-get update && apt-get install -y libc6 openssl

WORKDIR /app

# Install Turbo
RUN npm i -g turbo

# Generate pruned workspace
COPY . .
RUN turbo prune server --docker

FROM base AS installer
RUN apt-get update && apt-get install -y libc6 openssl
WORKDIR /app

# Copy pruned dependency information
COPY --from=deps /app/out/json/ .
COPY --from=deps /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install dependencies
RUN pnpm install --no-frozen-lockfile

# Build the project and its dependencies
COPY --from=deps /app/out/full/ .

# Generate Prisma Client
RUN cd packages/database && npx prisma generate

# Build the application
ENV NODE_ENV=production
RUN pnpm turbo run build --filter=server...

FROM base AS runner
WORKDIR /app

# Set default environment variables
ENV NODE_ENV=production \
    PORT=8000 \
    DATABASE_URL=mysql://root:User@123@mysql:3306/streamline \
    JWT_SECRET=thisisasamplesecret \
    JWT_ACCESS_EXPIRATION_MINUTES=30 \
    JWT_REFRESH_EXPIRATION_DAYS=30 \
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES=10 \
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=10 \
    SMTP_HOST=smtp.gmail.com \
    SMTP_PORT=587 \
    FRONTEND_URL=http://localhost:3000 \
    OAUTH_CLIENT_URL=http://localhost:3000

# Install production dependencies
RUN apt-get update && apt-get install -y openssl

# Create non-root user
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs nodeapp

# Copy all necessary files for production
COPY --from=installer /app/apps/server/dist ./apps/server/dist
COPY --from=installer /app/apps/server/package.json ./apps/server/package.json
COPY --from=installer /app/package.json ./package.json
COPY --from=installer /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Copy node_modules including Prisma client
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=installer /app/packages ./packages

# Set permissions
RUN chown -R nodeapp:nodejs .

USER nodeapp

EXPOSE 8000

CMD ["node", "apps/server/dist/index.js"]