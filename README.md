# DePIN Uptime Monitoring Platform

A decentralized physical infrastructure network (DePIN) for distributed uptime monitoring. This platform allows users to monitor the availability and performance of their websites through a globally distributed network of validator nodes.

## 📖 What it is

The DPin Uptime  is a robust, decentralized alternative to traditional uptime monitoring tools (like Pingdom or Uptime Robot). Instead of relying on centralized servers, it uses a network of independent "validators" to perform continuous health checks (`WebsiteTick`) on registered target URLs. This ensures high reliability, bypasses regional censorship, and provides true global latency metrics.

## ⚙️ Architecture

This project is a monorepo managed by [Turborepo](https://turborepo.org/) and built primarily with TypeScript, Next.js, and Prisma.

### Apps

- **`apps/web`**: The main user-facing dashboard built with Next.js. Users can log in (via Google Auth), add websites to monitor, and view uptime statistics & analytics.
- **`apps/api`**: The core backend API that serves the frontend, handles user authentication, and orchestrates database interactions.
- **`apps/hub`**: The central coordinator service. It manages the queue of websites that need to be monitored and distributes these monitoring tasks to the validator network.
- **`apps/validator`**: The worker node (daemon) application. Anyone can run a validator to join the network. It receives tasks from the Hub, performs the actual HTTP ping/checks to the target websites, and reports the results back.

### Packages

- **`packages/db`**: The unified Prisma database schema and generated client. Contains core models: `User`, `Website`, `Validator`, and `WebsiteTick`.
- **`packages/ui`**: Shared React components used across the platform.
- **`packages/eslint-config` & `packages/typescript-config`**: Shared linting and TS configurations to maintain code quality across all apps.

## 🚀 How it Works

1. **Registration**: A user logs into the `web` dashboard and adds a new `Website` to be monitored.
2. **Coordination**: The `hub` service periodically fetches active websites from the database and batches them into monitoring tasks.
3. **Execution**: Independent `validator` nodes pull these tasks, make the necessary HTTP requests to the target websites, and measure the response time and status code.
4. **Aggregation**: The validators push the results (`WebsiteTick` data) back to the system. 
5. **Reporting**: The `api` aggregates these ticks to calculate uptime percentages, average latencies, and payout states (`pending_payout`) for validators, which are then displayed on the user's `web` dashboard.
