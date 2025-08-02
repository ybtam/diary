# Repository Structure

This repository follows a monorepo structure managed by pnpm workspaces.

## Packages:

- `apps/api`: Contains the backend API built with Fastify and tRPC.
- `apps/db`: Manages database schemas, migrations, and utilities using Drizzle ORM.
- `apps/web`: The Next.js frontend application.
- `packages/config-eslint`: Shared ESLint configurations.
- `packages/config-prettier`: Shared Prettier configurations.
- `packages/config-typescript`: Shared TypeScript configurations.
- `packages/sdk`: Contains the tRPC client and other shared SDK functionalities for interacting with the API.
- `packages/ui`: Houses reusable UI components (primitive components like Button, Input, Card, etc.). Page-specific components are kept in `_components` within the same directory as the page, or higher if reused elsewhere.

## Key Directories and Conventions:

- `apps/web/src/app/@public`: Contains public-facing pages (e.g., login, register).
- `apps/web/src/app/@protected`: Contains protected pages that require authentication (e.g., diary entries, create entry).
- `apps/web/src/app/@public/_components` and `apps/web/src/app/@protected/_components`: Directories for components specific to a page or a small set of related pages within the respective public/protected routes.
- `apps/ui/src/components/ui`: Location for highly reusable, primitive UI components that can be used across different applications or parts of the application.
- `.env.example`: Example environment variables.
