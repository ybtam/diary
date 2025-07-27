# Tamyikadze base template

This is a monorepo for a full-stack application.

## Packages

- [`apps/api`](./apps/api/README.md): The API for the application.
- [`apps/db`](./apps/db/README.md): The database schema and migrations.
- [`apps/web`](./apps/web/README.md): The web application.
- [`packages/config-eslint`](./packages/config-eslint/README.md): ESLint configurations.
- [`packages/config-prettier`](./packages/config-prettier/README.md): Prettier configurations.
- [`packages/config-typescript`](./packages/config-typescript/README.md): TypeScript configurations.
- [`packages/sdk`](./packages/sdk/README.md): The SDK for the application.
- [`packages/ui`](./packages/ui/README.md): The UI components for the application.

## Getting Started

First change the project name in the `package.json` and `./docker/docker-compose.local-dev.yml` files.

Copy the `.env.example` file to `.env` and fill in the values.

```bash
cp .env.example .env
```

start db
either update .env file to use an existing db or create a new one

for docker instance

```bash
docker-compose -f .docker/docker-compose.local-dev.yaml up -d
```

for local instance

Install dependencies

```bash
pnpm install
```

Create the database

```bash
pnpm --filter @apps/db db:create
```

Migrate the database

```bash
pnpm --filter @apps/db migrate:up
```

Start the development server

```bash
pnpm dev
```