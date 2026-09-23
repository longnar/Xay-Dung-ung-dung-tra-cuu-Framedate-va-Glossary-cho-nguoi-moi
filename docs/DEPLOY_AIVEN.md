# Triển khai MySQL Aiven

## Local

```powershell
npm run db:up
npm run db:migrate
npm run start:server
```

Local dùng MySQL Docker với `DB_SSL=false`.

## Aiven

1. Tạo MySQL service và database `idol_showdown_wiki`.
2. Tạo application user riêng, không dùng `root`.
3. Tải CA certificate từ Aiven vào nơi lưu secret của máy/server.
4. Copy `.env.aiven.example` thành file environment production và điền host, port, user, password, CA path.
5. Chạy migration:

```powershell
npm run db:migrate
```

6. Khởi động backend:

```powershell
npm run start:server
```

7. Kiểm tra:

```powershell
Invoke-WebRequest http://localhost:5000/health/db
```

## Migration

`database/migrate.js` tự tạo bảng `schema_migrations`, chạy các file trong `database/migrations/` theo thứ tự tên và bỏ qua migration đã ghi nhận.

Không commit `.env` hoặc CA certificate. Trước migration production cần tạo backup trên Aiven.
