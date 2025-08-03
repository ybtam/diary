FROM node:24-alpine AS base
RUN apk add --no-cache libc6-compat
RUN apk update

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@10.14.0 --activate
WORKDIR /app

FROM base AS pruner
RUN pnpm add -g turbo
COPY . .
RUN turbo prune @apps/api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
# First install the dependencies (this is where Docker can cache)
COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Copy source code
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json

FROM base AS runner
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 api

# Copy everything from installer stage
COPY --from=installer --chown=api:nodejs /app .

# Create turbo cache directory with correct permissions
RUN mkdir -p /app/.turbo/cache && chown -R api:nodejs /app/.turbo

USER api

EXPOSE 4000

ENV PORT 4000

CMD ["pnpm", "start"]
