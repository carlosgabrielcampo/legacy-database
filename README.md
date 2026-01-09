# Legacy Database Project

This repository contains a legacy Node.js application that interacts with a PostgreSQL database. The codebase is organized in a traditional MVC-like layout and includes an on-disk PostgreSQL `backup/` (a data directory snapshot), Sequelize migrations, and Docker support.

**Warning:** This is legacy code and a dumped database. Treat backups and data with caution — they may contain sensitive or production data. Always work on copies and test databases.

## Quick Links

- Repository root: overview and entry point: `app.js`
- Docker: [Dockerfile](Dockerfile), [docker-compose.yml](docker-compose.yml)
- Source code: [src](src)
- Database backup directory: [backup](backup)
- Migrations: [src/database/migrations](src/database/migrations)

## Repository Layout (high level)

- `app.js` — application entry point
- `src/` — application source
  - `config/` — configuration (includes `database.js`)
  - `controllers/` — route handlers and controllers
  - `models/` — Sequelize models
  - `routes/` — Express route definitions
  - `database/` — DB helpers and `migrations/`
  - `middlewares/` — Express middlewares
- `backup/` — PostgreSQL data directory snapshot (PG files, configs)
- `Dockerfile`, `docker-compose.yml` — containerized runtime

## Getting Started (recommended minimal steps)

Prerequisites: Node.js (LTS recommended), npm, Docker (optional)

1. Install dependencies:

```bash
npm install
```

2. Run locally (simple):

```bash
npm start
# or
node app.js
```

3. Run with Docker Compose (recommended to reproduce environment):

```bash
docker-compose up --build
```

## Database and Migrations

- The repository includes Sequelize-style migrations in `src/database/migrations`.
- If you need to run migrations, use the Sequelize CLI (install globally or use npx):

