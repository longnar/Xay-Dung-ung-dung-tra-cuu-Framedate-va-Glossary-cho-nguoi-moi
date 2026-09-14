# Idol Showdown Wiki

## Project layout

- `server/`: Express application factory.
- `controllers/`, `routes/`, `middleware/`, `config/`: backend feature modules.
- `src/`: React frontend. `src/api/` contains shared HTTP access.
- `database/schema/`: initial database schema.
- `database/migrations/`: incremental migrations.
- `database/migrate.js`: migration runner.
- `docs/`: deployment and product documentation.
- `public/`: files served directly by Vite/Express.
- `uploads/`: runtime-uploaded files; contents are not committed.

## Run locally

```powershell
npm install
npm run db:up
npm run db:migrate
npm run dev:client
```

In another terminal:

```powershell
npm run dev:server
```

Production build and server:

```powershell
npm run build
npm run start:server
```

The API is available at `http://localhost:5000`; the database check is
`http://localhost:5000/health/db`.

## Structure rules

Keep API contracts stable while reorganizing internal files. UI dimension and
position values in `src/App.css` and `src/index.css` must not be changed during
structural refactors.
