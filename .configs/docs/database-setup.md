# Database Setup Guide

This guide covers setting up PostgreSQL for the Diary application in different environments.

## Overview

The application uses PostgreSQL as its primary database with Drizzle ORM for migrations and schema management.

## Docker Images

### Migration Image
- **Image**: `ghcr.io/your-username/diary/db-migration:latest`
- **Purpose**: Runs `drizzle-kit migrate` command in containerized environments
- **Usage**: Kubernetes Jobs, Docker Compose, CI/CD pipelines
- **Command**: Uses `pnpm drizzle-kit migrate` for running migrations

## Environment Setup

### Development (Local)

1. **Start PostgreSQL with Docker Compose**:
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: diary
      POSTGRES_USER: diary_user
      POSTGRES_PASSWORD: dev_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
volumes:
  postgres_data:
```

2. **Set environment variables**:
```bash
export DATABASE_URL="postgresql://diary_user:dev_password@localhost:5432/diary"
```

3. **Run migrations**:
```bash
cd apps/db
pnpm run migrate:up  # For development with .env file
# OR
export DATABASE_URL="postgresql://diary_user:dev_password@localhost:5432/diary"
pnpm drizzle-kit migrate  # Direct drizzle-kit command
```

### Kubernetes (Production)

#### 1. Deploy PostgreSQL

**Basic deployment** (development/staging):
```bash
kubectl apply -f k8s-examples/database/postgresql.yaml
```

**Production deployment** with enhanced security:
```bash
kubectl apply -f k8s-examples/database/postgres-production.yaml
```

#### 2. Initialize Database

```bash
kubectl apply -f k8s-examples/database/init-configmap.yaml
```

#### 3. Run Migrations

```bash
kubectl apply -f k8s-examples/database/migration-job.yaml
```

## Configuration Files

### PostgreSQL Configurations

#### Basic Configuration (`postgresql.yaml`)
- Single replica PostgreSQL
- Basic resource limits
- Simple persistent volume
- Health checks

#### Production Configuration (`postgres-production.yaml`)
- StatefulSet deployment
- Enhanced security settings
- Optimized PostgreSQL configuration
- Automated backups
- Resource limits for production workloads

### Migration Job (`migration-job.yaml`)
- Kubernetes Job for running migrations
- Init container to wait for database readiness
- Proper security contexts
- Resource limits
- TTL for automatic cleanup

### Initialization (`init-configmap.yaml`)
- ConfigMap with initialization scripts
- Database user creation
- Schema setup
- Development seed data

## Security Considerations

### Production Secrets

Create secrets manually or use external secret management:

```bash
kubectl create secret generic postgres-secret \
  --from-literal=POSTGRES_PASSWORD='your-strong-password' \
  --from-literal=DATABASE_URL='postgresql://diary_user:your-strong-password@postgres:5432/diary?sslmode=require'
```

### SSL Configuration

For production, enable SSL in PostgreSQL:

1. Generate SSL certificates
2. Mount certificates in PostgreSQL pod
3. Update connection strings to use `sslmode=require`

### Network Policies

Restrict database access with NetworkPolicies:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: postgres-network-policy
spec:
  podSelector:
    matchLabels:
      app: postgres
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: diary-api
    - podSelector:
        matchLabels:
          app: diary-migration
    ports:
    - protocol: TCP
      port: 5432
```

## Backup Strategy

### Automated Backups

The production configuration includes a CronJob for daily backups:

- Runs daily at 1 AM
- Keeps 7 days of backups
- Stores backups in persistent volume
- Can be extended to upload to cloud storage

### Manual Backup

```bash
# Create backup
kubectl exec -it postgres-0 -- pg_dump -U diary_user diary > backup.sql

# Restore backup
kubectl exec -i postgres-0 -- psql -U diary_user diary < backup.sql
```

## Monitoring

### Health Checks

All deployments include:
- Liveness probes using `pg_isready`
- Readiness probes for connection verification
- Proper failure thresholds and timeouts

### Metrics Collection

Consider adding monitoring tools:
- Prometheus PostgreSQL Exporter
- Grafana dashboards
- Alert manager for critical issues

## Migration Commands

### Available Scripts

```bash
# Generate new migration from schema changes
pnpm migration:new

# Run migrations (development with .env)
pnpm migrate:up

# Run migrations (production, requires DATABASE_URL env)
pnpm migrate:prod

# Push schema changes directly (development only)
pnpm db:push

# Open Drizzle Studio
pnpm dev
```

### Drizzle Kit Commands

```bash
# Generate migration files
drizzle-kit generate

# Run migrations
drizzle-kit migrate

# Push schema directly to database (dev only)
drizzle-kit push

# Open Drizzle Studio
drizzle-kit studio
```

## Migration Strategy

### Development
- Use `drizzle-kit generate` to create migration files
- Use `drizzle-kit migrate` to apply migrations
- Use migration CronJob for regular updates in dev environments

### Production
- Run migrations as part of deployment pipeline using Docker image
- Use `pnpm migrate:prod` in containers (calls `drizzle-kit migrate`)
- Use blue-green deployments for zero-downtime updates
- Always backup before migrations

### Rollback Strategy
- Keep database backups before each migration
- Test rollback procedures in staging
- Document rollback steps for each migration
- Use `drizzle-kit` migration files for version control

## Troubleshooting

### Common Issues

1. **Connection refused**
   - Check if PostgreSQL is running
   - Verify network connectivity
   - Check firewall rules

2. **Authentication failed**
   - Verify credentials in secrets
   - Check user permissions
   - Ensure database exists

3. **Migration failures**
   - Check migration logs
   - Verify database permissions
   - Ensure proper resource limits

### Debug Commands

```bash
# Check PostgreSQL status
kubectl get pods -l app=postgres

# View PostgreSQL logs
kubectl logs -l app=postgres

# Check migration job status
kubectl get jobs -l app=diary-migration

# View migration logs
kubectl logs -l app=diary-migration

# Connect to database
kubectl exec -it postgres-0 -- psql -U diary_user diary
```

## Best Practices

1. **Always use secrets** for passwords and connection strings
2. **Enable SSL** in production environments
3. **Regular backups** with tested restore procedures
4. **Monitor database performance** and set up alerting
5. **Use init containers** to ensure database readiness
6. **Set resource limits** to prevent resource contention
7. **Use StatefulSets** for production PostgreSQL deployments
8. **Implement proper RBAC** for database access