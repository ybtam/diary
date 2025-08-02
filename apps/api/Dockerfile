FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@10.14.0 --activate

FROM base AS pruner
WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN turbo prune @apps/api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (this is where Docker can cache)
COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Copy source code
COPY --from=pruner /app/out/full/ .

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 api

# Copy source code and dependencies
COPY --from=installer --chown=api:nodejs /app/apps/api/src ./src
COPY --from=installer --chown=api:nodejs /app/apps/api/package.json ./package.json
COPY --from=installer --chown=api:nodejs /app/apps/api/tsconfig.json ./tsconfig.json

# Copy node_modules and workspace dependencies
COPY --from=installer --chown=api:nodejs /app/node_modules ./node_modules
COPY --from=installer --chown=api:nodejs /app/apps ./apps
COPY --from=installer --chown=api:nodejs /app/packages ./packages

USER api

EXPOSE 3001

ENV PORT 3001

CMD ["pnpm", "start"]