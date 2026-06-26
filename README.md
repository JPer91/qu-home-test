# qu-home-test

This repository is a test exercise that contains Playwright and Selenium end-to-end tests for a local web app. The Playwright tests are organized with a page object model structure under the `POMs` folders with all tests under `tests` folder. The Selenium test is under the Selenium folder and contains both the Page object model and test file.

## Features

- End-to-end UI tests for checkout, login, menu/grid, and search flows
- Page object model for reusable locators and actions
- Playwright HTML reporting
- Docker-based test execution support

## Prerequisites

- Node.js 18 or newer
- npm
- Docker (optional, for containerized runs)

## Installation

Install dependencies locally:

`npm install`

Install Playwright browsers:

`npx playwright install`

## Running Tests Locally

You will need to setup .env with following values:

**Note: Normally I would not store values in the repo as it is a security risk. Due to this being a test exercise, I have added them here for convinience**

`BASE_URL=http://localhost:3100`
`LOGIN_USERNAME=johndoe19`
`LOGIN_PASSWORD=supersecret`

Run the full suite:

`npm test`

Run a specific file:

`npx playwright test tests/login-tests.spec.ts`

Run in headed mode:

`npm run test:headed`

Open the Playwright UI:

`npm run test:ui`

Run the Selenium login test:

`node --test Selenium/selenium-login.test.js`

## Running Tests in Docker

Build the Docker image 
**If you changed test or config files and Docker is using stale content, rebuild first using this command**

`docker compose build test-runner`

Run Playwright inside the container:

`docker compose run --rm test-runner bash`

From inside the container, you can run:

`cd /app`
`npx playwright test --list`
`npx playwright test`

Run Selenium from inside the container:

`node --test Selenium/selenium-login.test.js`

Run Selenium directly from your host terminal:

`npm run test:selenium:docker`

## Project Structure

POMs/              # Page object classes
tests/             # Playwright spec files
playwright.config.ts  # Playwright configuration
Dockerfile         # Container image definition
docker-compose.yml # Docker Compose configuration
Selenium/          # Constain Selenium Test and Page Object

## Notes

- The tests expect the application under test to be available at the configured base URL.
- If you are running the app from your host machine and the tests from Docker, make sure the app is reachable from the container network.
