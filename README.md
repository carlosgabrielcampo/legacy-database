# Legacy Database Project

A legacy Node.js application demonstrating structured database interaction with PostgreSQL using Sequelize, organized in a maintainable architecture. Includes Docker support, migrations, and a PostgreSQL snapshot in `backup/`.

⚠️ **Disclaimer:** This repository contains legacy code and a database snapshot; treat data with caution. Use copies and test environments only.


## Quick Links

- Repository root: overview and entry point: `app.js`
- Docker: [Dockerfile](Dockerfile), [docker-compose.yml](docker-compose.yml)
- Source code: [src](src)
- Database backup directory: [backup](backup)
- Migrations: [src/database/migrations](src/database/migrations)

## Repository Layout (high level)

```text
app.js # Main application entry point
src/
├── config/ # System configuration (e.g., database settings)
│ └── database.js
├── routes/ # Express route definitions
│ └── index.js
├── controllers/ # Request handlers
│ └── *.controller.js
├── models/ # Sequelize models
│ └── *.model.js
├── database/ # DB utilities and migrations
│ ├── migrations/ # Sequelize migrations
│ └── index.js
├── middlewares/ # Express middleware
│ └── *.middleware.js
└── utils/ # Shared utility modules
backup/ # PostgreSQL data snapshot directory
Dockerfile # Docker image configuration
docker-compose.yml # Environment orchestration
package.json # Project dependencies and scripts
```

---

## 🚀 Quick Start

Ensure you have Node.js and npm installed. Optionally, use Docker for environment consistency.

### Run locally

```bash
npm start
# or
node app.js
```

## Run using Docker Compose

```bash
docker-compose up --build
```

## Database & Migrations

- Database snapshot is located in backup/ (full PostgreSQL data directory).

- Migrations follow Sequelize conventions under src/database/migrations.

- To run migrations (if configured locally):

```bash
npx sequelize db:migrate

```

## 📦 Tech Stack

- Node.js — Runtime

- Express.js — Web framework

- Sequelize — ORM for PostgreSQL

- PostgreSQL — Relational database

- Docker & Docker Compose — Containerized environment


## 🛠 This repository is a practical example of:

- Structuring a Node.js project with clear separation of concerns

- Working with relational databases via Sequelize

- Managing migrations and database versioning

- Integrating Docker for development reproducibility

- Handling routes, controllers, and middleware in Express

## 📝 Notes

This codebase is legacy, meant for reference and learning rather than direct production use. Some dependencies or patterns may require updates for modern production environments.
