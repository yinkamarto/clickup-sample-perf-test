#!/bin/bash

# Build image and run containers
docker compose --profile=locust up --build --abort-on-container-exit
# Remove containers
docker compose --profile=locust down