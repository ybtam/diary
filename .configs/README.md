# Configuration Directory

This directory contains all configuration files, documentation, and Kubernetes manifests for the Diary application.

## Structure

```
.configs/
├── docs/                    # Documentation
│   ├── gitops-setup.md     # GitOps repository setup guide
│   └── database-setup.md   # Database configuration guide
├── k8s/                    # Kubernetes manifests
│   ├── base/              # Base application manifests
│   ├── database/          # Database-related manifests
│   ├── environments/      # Environment-specific configs
│   ├── monitoring/        # Monitoring and observability
│   └── kustomization-example.yaml
└── docker/                # Docker configurations
    └── compose/           # Docker Compose files
```

## Usage

### For Development
- Use the base manifests and development environment configs
- Start with Docker Compose files for local development

### For GitOps Repository
- Copy the k8s directory structure to your GitOps repository
- Customize environment-specific configurations
- Set up ArgoCD applications using the provided examples

### For Production
- Use production-specific manifests from environments/
- Ensure proper secrets management
- Configure monitoring and alerting

## Documentation

- **[GitOps Setup](.configs/docs/gitops-setup.md)** - Complete guide for setting up GitOps with ArgoCD
- **[Database Setup](.configs/docs/database-setup.md)** - Database configuration and deployment guide

## Docker Images

The application uses the following container images:
- `ghcr.io/your-username/diary/api` - Backend API service
- `ghcr.io/your-username/diary/web` - Frontend web application
- `ghcr.io/your-username/diary/db-migration` - Database migration runner

## Security Notes

- All sensitive data should be stored in Kubernetes Secrets
- Use proper RBAC configurations
- Enable network policies in production
- Regularly update base images and dependencies