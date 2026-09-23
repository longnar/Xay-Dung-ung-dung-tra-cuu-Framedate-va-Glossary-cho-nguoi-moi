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

## Run with Dev Container (Recommended for Team)

1. Cài đặt **Docker Desktop** và tiện ích mở rộng **Dev Containers** (`ms-vscode-remote.remote-containers`) trên VS Code / Cursor.
2. Mở thư mục dự án trong VS Code, nhấn `F1` (hoặc `Ctrl+Shift+P`), chọn **Dev Containers: Reopen in Container**.
3. Hệ thống sẽ tự động build container, cài đặt dependencies (`npm install`), tự động kết nối MySQL container (`DB_HOST=mysql`) và chạy DB migrations (`npm run db:migrate`).
4. Mở Terminal trong Dev Container để khởi chạy dự án:

```bash
# Khởi chạy cả Frontend và Backend API đồng thời:
npm run dev

# Hoặc chạy riêng từng terminal:
# Terminal 1 (Frontend): npm run dev:client
# Terminal 2 (Backend):  npm run dev:server
```

- Giao diện Frontend: `http://localhost:3000`
- API Backend: `http://localhost:5000`
- Kiểm tra kết nối DB: `http://localhost:5000/health/db`

## Run locally (Host Machine)

```powershell
npm install
npm run db:up
npm run db:migrate
npm run dev
```

Hoặc chạy riêng từng terminal:

```powershell
npm run dev:client
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

## Phân tích bài toán

### 1) Phân tích các đối tượng

#### User / Admin

- Là người dùng của hệ thống.
- Có thể là người xem thông tin hoặc người quản trị.
- Admin có quyền thực hiện CRUD với dữ liệu quan trọng như nhân vật và glossary.
- Các thuộc tính quan trọng gồm: username, password_hash, role, created_at, updated_at.

#### Character (Nhân vật)

- Là đối tượng trung tâm của hệ thống.
- Mỗi nhân vật có thông tin như tên, ngày debut, mô tả, độ khó, loại nhân vật và ảnh đại diện.
- Đây là dữ liệu chính được hiển thị trên wiki/game.

#### Move (Chiêu thức / kỹ năng)

- Mỗi nhân vật có thể có nhiều move.
- Move thuộc về một nhân vật cụ thể và phản ánh kỹ năng/đòn đánh trong game.

#### BaseStat (Chỉ số cơ bản)

- Là bộ chỉ số nền của nhân vật.
- Thường bao gồm hp, speed, dash, jump, defense, vv.
- Mỗi nhân vật có thể có một bản ghi chỉ số cơ bản riêng.

#### Glossary (Thuật ngữ)

- Là kho từ vựng/thuật ngữ của game để người chơi tra cứu.
- Có thể có định nghĩa, mức độ, ảnh minh họa và liên kết video.
- Dùng cho mục đích wiki và hướng dẫn người chơi.

#### Uploaded Image

- Là đối tượng phụ dùng để lưu hình ảnh nhân vật và glossary.
- File hình ảnh thường được lưu trong thư mục uploads và tham chiếu từ database bằng URL.

### 2) Phân tích mối quan hệ giữa các đối tượng

- User/Admin quản lý dữ liệu: Admin có quyền thêm, sửa, xóa Character và Glossary.
- One-to-many: Một Character có nhiều Move.
- One-to-one: Một Character có một bộ BaseStat.
- One-to-many: Một Character có thể có một ảnh đại diện.
- One-to-many: Một Glossary có thể có một ảnh minh họa hoặc video hướng dẫn.
- User thường chỉ xem thông tin; Admin là người cập nhật dữ liệu.

### 3) Tóm tắt kiến trúc nghiệp vụ

Hệ thống đang xây dựng là một wiki game/kho dữ liệu nhân vật và glossary, trong đó:

- Frontend hiển thị thông tin cho người dùng.
- Backend API quản lý dữ liệu và xác thực quyền truy cập.
- MySQL lưu trữ dữ liệu chính.
- Upload file xử lý hình ảnh minh họa cho nhân vật và glossary.

## File quan trọng của hệ thống

- `config/database.js` → File kết nối MySQL chính
- `database/schema/001_initial_schema.sql` → Cấu trúc CSDL ban đầu

Đây là hai file nền tảng quan trọng để hiểu cấu trúc dữ liệu và kết nối hệ thống.
