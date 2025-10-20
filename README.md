# clickup-sample-perf-test

A simple locust based performance test(with a little bit of unit test) used for ClickUp interview. This project starts a web and db service and triggers a stress test on the service via a task api endpoint which inserts new task rows into the db. This also showcases test automation using github workflows by triggering test runs on every commit push to Github using events.

## How to Run locally

### Short step with docker compose:

1. Build image and start locust containers(this depends on the web service which in turn depends on the db service) using `docker compose --profile=locust up --build --abort-on-container-exit`
2. Stop and remove all containers using `docker compose --profile=locust down`

### Step by step With docker compose:

1. Build the web and locust services using: `docker compose up --build -d` (Note: This also starts the web service and the locust test)
2. Follow the logs for the test using: `docker compose logs -f`
3. To re-run the test: `docker compose run --remove-orphans locust_service` (if changes are made to code, add --build or re-run #1)
4. After running tests remove containers with: `docker compose down`

### With Test script:

1. Make the test script executable with `chmod +x run-test.sh`
2. Run the shell script manually using `./run-test.sh `. This handles starting and stopping the services in docker

### Testing as expected in github actions or CICD pipeline:

1. Install act https://nektosact.com/ using `curl --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash`
2. Run github workflows:
   1. Run all github workflows using `./bin/act` OR
   2. Run specifiv workflow using `./bin/act -W .github/workflows/unit-test.yaml`
