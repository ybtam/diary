FROM node:24-alpine AS base
RUN apk update
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm i -g corepack@latest
RUN corepack enable
# Set working directory
WORKDIR /app

FROM base AS builder
RUN pnpm add -g turbo@^2
COPY . .
RUN turbo prune --scope=@apps/db --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
RUN pnpm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

FROM base AS runner

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy everything from installer stage
COPY --from=installer --chown=api:nodejs /app .

# Create turbo cache directory with correct permissions
RUN mkdir -p /app/.turbo/cache && chown -R api:nodejs /app/.turbo

USER nextjs

CMD ["sh", "-c", "npx turbo create-db && npx turbo migrate:up"]
