# Deployment Guide

## Docker

Every microservice contains a corresponding Dockerfile in the `infrastructure/docker/` directory.

## Docker Compose

For quick multi-container setup, use the root-level `docker-compose.yml`:
```bash
docker compose up --build
```

## Kubernetes

Deployments can be orchestrated using Helm charts or raw manifest files placed under `infrastructure/kubernetes/`.

## Scaling Workers

To scale up worker processing:
1. Increase replica counts for the `execution-service` container/pod.
2. Ensure Redis has sufficient memory limits to handle active queue counts.
3. Configure Redis cluster or replication sets for database high availability.
