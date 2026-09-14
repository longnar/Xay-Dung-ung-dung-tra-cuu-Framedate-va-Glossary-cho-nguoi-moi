# Database

Database files are grouped under `database/`:

- `schema/001_initial_schema.sql`: bootstrap schema used by a new Docker volume.
- `migrations/`: incremental changes for an existing database.
- `migrate.js`: idempotent migration runner using `schema_migrations`.

Run locally:

```powershell
npm run db:up
npm run db:migrate
```

The current schema contains users, characters, moves, base stats and glossary
entries. Character moves reference characters with cascade delete, while base
stats are one-to-one with a character.
