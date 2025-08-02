# GitOps Repository Setup for ArgoCD

This document outlines the structure and setup required for the GitOps repository that ArgoCD will monitor.

## Repository Structure

Create a separate repository (e.g., `diary-gitops` or `diary-k8s`) with the following structure:

```
diary-gitops/
├── environments/
│   ├── development/
│   │   ├── api/
│   │   │   ├── deployment.yaml
│   │   │   ├── service.yaml
│   │   │   └── kustomization.yaml
│   │   ├── web/
│   │   │   ├── deployment.yaml
│   │   │   ├── service.yaml
│   │   │   ├── ingress.yaml
│   │   │   └── kustomization.yaml
│   │   └── kustomization.yaml
│   ├── staging/
│   │   ├── api/
│   │   ├── web/
│   │   └── kustomization.yaml
│   └── production/
│       ├── api/
│       ├── web/
│       └── kustomization.yaml
├── base/
│   ├── api/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── configmap.yaml
│   │   └── kustomization.yaml
│   └── web/
│       ├── deployment.yaml
│       ├── service.yaml
│       ├── configmap.yaml
│       └── kustomization.yaml
├── argocd/
│   ├── applications/
│   │   ├── diary-dev.yaml
│   │   ├── diary-staging.yaml
│   │   └── diary-prod.yaml
│   └── app-of-apps.yaml
└── .github/
    └── workflows/
        └── update-manifests.yml
```

## Required GitHub Secrets

Set the following secrets in your source repository:

- `GITOPS_TOKEN`: Personal Access Token with write access to the GitOps repository
- `GITOPS_REPOSITORY`: The GitOps repository name (e.g., `username/diary-gitops`)

## ArgoCD Application Configuration

### App of Apps Pattern

Create `argocd/app-of-apps.yaml`:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: diary-apps
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/your-username/diary-gitops
    targetRevision: HEAD
    path: argocd/applications
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

### Environment Applications

Create `argocd/applications/diary-dev.yaml`:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: diary-dev
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/your-username/diary-gitops
    targetRevision: HEAD
    path: environments/development
  destination:
    server: https://kubernetes.default.svc
    namespace: diary-dev
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
```

## Base Kubernetes Manifests

### API Deployment (`base/api/deployment.yaml`)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: diary-api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: diary-api
  template:
    metadata:
      labels:
        app: diary-api
    spec:
      containers:
      - name: api
        image: ghcr.io/your-username/diary/api:latest
        ports:
        - containerPort: 3001
        env:
        - name: PORT
          value: "3001"
        - name: NODE_ENV
          value: production
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: diary-secrets
              key: database-url
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: diary-secrets
              key: jwt-secret
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3001
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3001
          initialDelaySeconds: 5
          periodSeconds: 5
```

### Web Deployment (`base/web/deployment.yaml`)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: diary-web
spec:
  replicas: 2
  selector:
    matchLabels:
      app: diary-web
  template:
    metadata:
      labels:
        app: diary-web
    spec:
      containers:
      - name: web
        image: ghcr.io/your-username/diary/web:latest
        ports:
        - containerPort: 3000
        env:
        - name: PORT
          value: "3000"
        - name: API_URL
          value: "http://diary-api:3001"
        - name: NEXTAUTH_URL
          value: "https://diary.yourdomain.com"
        - name: NEXTAUTH_SECRET
          valueFrom:
            secretKeyRef:
              name: diary-secrets
              key: nextauth-secret
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

## GitOps Workflow

The GitOps repository should include a workflow to handle image updates:

```yaml
# .github/workflows/update-manifests.yml
name: Update Manifests

on:
  repository_dispatch:
    types: [update-image]

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Update image tags
        run: |
          # Update development environment
          sed -i "s|ghcr.io/.*/api:.*|${{ github.event.client_payload.api_image }}|g" environments/development/api/kustomization.yaml
          sed -i "s|ghcr.io/.*/web:.*|${{ github.event.client_payload.web_image }}|g" environments/development/web/kustomization.yaml

      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "Update images to ${{ github.event.client_payload.sha }}" || exit 0
          git push
```

## Setup Steps

1. Create the GitOps repository with the structure above
2. Set up the base Kubernetes manifests
3. Configure ArgoCD to watch the GitOps repository
4. Add the required secrets to your source repository
5. Deploy the App of Apps to ArgoCD

This setup enables automatic deployment whenever images are built and pushed from the main branch.