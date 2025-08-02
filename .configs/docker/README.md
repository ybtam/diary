# Docker Configurations

This directory contains Docker-related configurations for local development and testing.

## Docker Compose Files

### Development Setup (`compose/docker-compose.yml`)
- Basic setup with PostgreSQL, API, and Web services
- Suitable for local development
- Includes health checks and proper networking

### Development with Hot Reload (`compose/docker-compose.override.yml`)
- Automatically loaded with `docker-compose.yml`
- Enables hot reloading for development
- Includes additional development tools:
  - Adminer for database management
  - Redis for caching (optional)

### Production Testing (`compose/docker-compose.prod.yml`)
- Production-like environment for testing
- Uses production Docker builds
- Includes Nginx reverse proxy
- Suitable for integration testing

## Usage

### Start Development Environment
```bash
cd .configs/docker/compose
docker-compose up -d
```

### Start with Development Tools
```bash
cd .configs/docker/compose
docker-compose --profile tools up -d
```

### Start Production-like Environment
```bash
cd .configs/docker/compose
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Available Services

| Service | Port | Description |
|---------|------|-------------|
| Web     | 3000 | Frontend application |
| API     | 3001 | Backend API |
| PostgreSQL | 5432 | Database |
| Adminer | 8080 | Database management (dev tools profile) |
| Redis   | 6379 | Cache (cache profile) |

### Environment Variables

The compose files use development-friendly defaults. For production, ensure you:
- Change all default passwords
- Use proper secrets management
- Configure SSL certificates
- Set appropriate resource limits

## Health Checks

All services include health checks:
- PostgreSQL: `pg_isready` check
- API: HTTP health endpoint check
- Web: Service availability check

## Volumes

- `postgres_data`: Persistent PostgreSQL data
- `redis_data`: Redis data (when using cache profile)

## Networks

All services communicate over the `diary-network` bridge network for isolation and service discovery.