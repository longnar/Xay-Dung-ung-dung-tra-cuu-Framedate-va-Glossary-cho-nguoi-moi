# Architecture

## Runtime flow

```text
Browser -> React client -> /api routes -> NestJS controllers -> services -> TypeORM -> MySQL
                              |
                              -> uploads/
```

`server.js` only loads environment variables and requires the compiled NestJS
app in `dist-server/main.js` (built from `server/src/` with
`npm run build:nestjs`). Existing API URLs remain unchanged.

## Frontend boundaries

- `src/api/`: HTTP access and authentication headers.
- `src/components/`: reusable visual and interaction components.
- `src/utils/`: pure browser utilities.
- `src/data/`: offline fallback data used when the API is unavailable.
- `src/App.jsx`: application state and page composition until each page has
  enough independent behavior to become a standalone page module.

CSS layout values are intentionally kept in their existing files during this
refactor. Structural changes must not alter established size or position
values.

## Backend boundaries (`server/src/`)

- `main.ts`: bootstrap (CORS, validation pipe, Swagger at `/api/docs`, host/port).
- `app.module.ts`: TypeORM connection, static file serving (`uploads/`, `dist/`) and module registration.
- `entities/`: TypeORM entities mapped to the SQL schema (`synchronize: false`).
- `modules/<feature>/`: one NestJS module per feature (`auth`, `character`,
  `glossary`, `news`, `security`), each with controller, service and DTOs.
- `modules/security/`: request middleware applied to every route for intrusion
  detection, audit logging and Discord alerts.
