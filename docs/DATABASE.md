# Database

Database files are grouped under `database/`:

- `schema/001_initial_schema.sql`: bootstrap schema used by a new Docker volume.
- `migrations/`: incremental changes for an existing database.
- `migrate.js`: idempotent migration runner using `schema_migrations`.

Run inside Dev Container (Automated):
- Dev Container tự động khởi tạo MySQL container và chạy `npm run db:migrate` khi khởi tạo environment.
- Kiểm tra trạng thái kết nối DB: `http://localhost:5000/health/db`

Run locally (Host Machine):

```powershell
npm run db:up
npm run db:migrate
```

The current schema contains users, characters, moves, base stats, glossary
entries, news patches (`news_patches`, migration 006) and security audit logs
(`security_audit_logs`, migration 005). Character moves reference characters
with cascade delete, while base stats are one-to-one with a character.
