#!/bin/bash

# Build image and container
docker compose up --build -d
# Execute locust test
docker compose run --remove-orphans locust_service
# Remove containers
docker compose down