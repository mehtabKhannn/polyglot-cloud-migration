#!/bin/bash
set -e

echo "Starting Deployment..."

# Ensure DOCKER_USERNAME is set
if [ -z "$DOCKER_USERNAME" ]; then
  echo "Error: DOCKER_USERNAME is not set."
  exit 1
fi

echo "Pulling latest images from Docker Hub..."
docker compose -f docker-compose.prod.yml pull

echo "Starting containers in detached mode..."
docker compose -f docker-compose.prod.yml up -d

echo "Deployment completed successfully!"
docker ps
