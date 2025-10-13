# clickup-sample-perf-test
A simple locust based performance test used for ClickUp interview

How to Run locally
---
With docker compose:
1. Build the web and locust services using: `docker compose up --build -d` (Note: This also starts the web service and the locust test)
2. Follow the logs for the test using: `docker compose logs -f`
3. To re-run the test: `docker compose run --remove-orphans locust_service` (if changes are made to code, add --build or re-run #1)
4. After running tests remove containers with: `docker compose down`


