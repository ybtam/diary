FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@10.14.0 --activate

FROM base AS pruner
WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN turbo prune @apps/db --docker

# Install dependencies
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# Copy lockfile and package.json files
COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Copy source files (needed for drizzle-kit)
COPY --from=pruner /app/out/full/ .

# Migration runner stage
FROM base AS migrator
WORKDIR /app

# Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 migrator

# Copy package files and install dependencies (including drizzle-kit)
COPY --from=installer /app/apps/db/package.json ./package.json
COPY --from=installer /app/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Copy drizzle config and migrations
COPY --from=installer --chown=migrator:nodejs /app/apps/db/drizzle.config.ts ./drizzle.config.ts
COPY --from=installer --chown=migrator:nodejs /app/apps/db/src ./src

USER migrator

# Default command runs drizzle-kit migrations
CMD ["npx", "turbo", "migrate:up"]
