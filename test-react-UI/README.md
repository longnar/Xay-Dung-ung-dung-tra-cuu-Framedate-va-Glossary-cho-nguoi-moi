# Idol Showdown React UI

Frontend React được dựng lại từ các file HTML/CSS trong thư mục `testUI`, sử dụng Vite và các asset local trong `src/assets`.

## Yêu cầu môi trường

- Node.js 20.19+ hoặc Node.js 22.12+
- npm

Kiểm tra phiên bản:

```powershell
node --version
npm --version
```

## Cài đặt lần đầu

Mở PowerShell tại thư mục dự án:

```powershell
Set-Location E:\web-plsn\test-react-UI
npm install
```

Lệnh `npm install` chỉ cần chạy lại khi `package.json` hoặc `package-lock.json` thay đổi, hoặc khi thư mục `node_modules` chưa tồn tại.

## Mã hóa lại card nhân vật

Các card được lưu dưới dạng chuỗi Base64 trong `public/cards` và được giải mã thành ảnh khi chạy ứng dụng. Khi thay đổi ảnh trong `E:\web-plsn\asset\card`, chạy:

```powershell
Set-Location E:\web-plsn\test-react-UI
npm run encode-cards
```

Sau đó khởi động lại Vite nếu server đang chạy.

## Chạy frontend ở chế độ development

```powershell
Set-Location E:\web-plsn\test-react-UI
npm run dev
```

Sau đó mở URL được Vite hiển thị trong terminal, thông thường là:

```text
http://localhost:5173
```

Để thiết bị khác trong cùng mạng có thể truy cập:

```powershell
npm run dev -- --host 0.0.0.0
```

Nhấn `Ctrl+C` trong terminal để dừng server.

## Kiểm tra lint

```powershell
Set-Location E:\web-plsn\test-react-UI
npm run lint
```

## Tạo bản build production

```powershell
Set-Location E:\web-plsn\test-react-UI
npm run build
```

Kết quả được tạo trong thư mục `dist`.

## Xem thử bản build production

Sau khi chạy `npm run build`:

```powershell
npm run preview
```

Mở URL preview được terminal hiển thị, thường là:

```text
http://localhost:4173
```

## Các màn hình hiện có

- Home: trang giới thiệu và hero section
- Contacts: các liên kết cộng đồng chính thức
- Glossary: lựa chọn Basic hoặc Advanced
- Basic/Advanced Glossary: khách chưa đăng nhập chỉ xem nội dung; tài khoản đã đăng nhập có thể mở giao diện quản lý
- Selection: màn hình lựa chọn nhân vật
- Login modal: mở từ nút `Login` trên Home

## Quyền truy cập giao diện

Frontend hiện dùng mock login ở phía client:

- Chưa đăng nhập: chỉ có quyền xem các trang công khai, không hiển thị các nút thêm, chỉnh sửa, lưu hoặc upload.
- Đã đăng nhập: nút `+`, `Thêm`, `Chỉnh sửa`, `Lưu` và upload ảnh được hiển thị.
- Nút `Logout` đưa ứng dụng về chế độ chỉ xem.

Đây chỉ là phân quyền giao diện để mô phỏng frontend; khi kết nối backend cần thay bằng xác thực và kiểm tra quyền ở server.

## Asset chính

Các hình ảnh được import từ `src/assets`:

- `Next-Fes-SkyTemplate.png`: background
- `IdolShowdownNextFesBiboo_1.png`: hero art
- `IdolShowdownNF_logo.png`: logo
- `IdolShowdownIcon.png`: icon điều hướng
- `fbk-eating.gif`: hình GIF ở màn hình Contacts

Card nhân vật không còn được import trực tiếp từ `src/assets`. Danh sách card nằm trong `public/cards/manifest.json`, còn dữ liệu ảnh được lưu dưới dạng các file `.txt` Base64 tương ứng.

## Cấu trúc thư mục chính

```text
test-react-UI/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
└── README.md
```

## Xử lý lỗi thường gặp

### `npm` hoặc `node` không được nhận diện

Cài Node.js, sau đó đóng và mở lại PowerShell hoặc VS Code.

### Không tìm thấy module hoặc asset

Chạy lại:

```powershell
Set-Location E:\web-plsn\test-react-UI
npm install
```

Sau đó khởi động lại Vite bằng `npm run dev`.

### Port 5173 đã được sử dụng

Vite sẽ tự chọn port khác và in URL mới trong terminal. Mở đúng URL đó thay vì cố định `5173`.
