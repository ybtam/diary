# Kubernetes Configurations

This directory contains Kubernetes manifests for deploying the Diary application.

## Directory Structure

```
k8s/
├── base/                          # Base application manifests
│   ├── api-deployment.yaml       # API service deployment
│   └── web-deployment.yaml       # Web frontend deployment
├── database/                     # Database configurations
│   ├── postgresql.yaml           # Basic PostgreSQL setup
│   ├── postgres-production.yaml  # Production PostgreSQL with StatefulSet
│   ├── migration-job.yaml        # Database migration job
│   └── init-configmap.yaml       # Database initialization scripts
├── environments/                 # Environment-specific configurations
│   └── development.yaml          # Development ArgoCD application
├── monitoring/                   # Monitoring and observability
└── kustomization-example.yaml    # Example Kustomization file
```

## Base Manifests

### API Deployment (`base/api-deployment.yaml`)
- Deployment and Service for the backend API
- Health checks and resource limits
- Security contexts and proper permissions

### Web Deployment (`base/web-deployment.yaml`)
- Next.js frontend deployment
- Ingress configuration for external access
- Service configuration

## Database Configurations

### Basic Setup (`database/postgresql.yaml`)
- Simple PostgreSQL deployment for development
- Basic persistent volume and service
- ConfigMap and Secret configurations

### Production Setup (`database/postgres-production.yaml`)
- StatefulSet deployment for production use
- Enhanced security and performance settings
- Automated backup CronJob
- Advanced monitoring and logging

### Migration Job (`database/migration-job.yaml`)
- Kubernetes Job for running database migrations
- Init container to wait for database availability
- Proper resource limits and security contexts

## Environment Configurations

### Development (`environments/development.yaml`)
- ArgoCD Application manifest for dev environment
- Basic secret configuration
- Suitable for development and testing

## Usage Examples

### Deploy to Development

1. Create namespace:
```bash
kubectl create namespace diary-dev
```

2. Apply base manifests:
```bash
kubectl apply -f base/ -n diary-dev
```

3. Apply database:
```bash
kubectl apply -f database/postgresql.yaml -n diary-dev
```

4. Run migrations:
```bash
kubectl apply -f database/migration-job.yaml -n diary-dev
```

### Deploy with Kustomize

1. Create kustomization.yaml based on the example
2. Apply with kustomize:
```bash
kubectl apply -k .
```

### Deploy with ArgoCD

1. Install ArgoCD Application:
```bash
kubectl apply -f environments/development.yaml
```

## Customization

### Image Tags
Update image tags in your kustomization.yaml:
```yaml
images:
- name: ghcr.io/your-username/diary/api
  newTag: v1.0.0
- name: ghcr.io/your-username/diary/web
  newTag: v1.0.0
```

### Environment Variables
Create environment-specific patches:
```yaml
# patches/api-env.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: diary-api
spec:
  template:
    spec:
      containers:
      - name: api
        env:
        - name: NODE_ENV
          value: production
```

### Resource Limits
Adjust resources based on your cluster capacity:
```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "100m"
  limits:
    memory: "1Gi"
    cpu: "500m"
```

## Security Considerations

- All deployments use non-root security contexts
- Secrets are properly referenced, not hardcoded
- Network policies should be applied in production
- Regular security updates for base images

## Monitoring

The configurations include:
- Health checks (liveness and readiness probes)
- Resource monitoring capabilities
- Logging configuration for observability

For complete monitoring setup, see the `monitoring/` directory.