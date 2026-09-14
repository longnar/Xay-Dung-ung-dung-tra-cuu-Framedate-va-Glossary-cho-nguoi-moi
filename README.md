1) Phân tích các đối tượng
1. User / Admin
Đây là đối tượng người dùng hệ thống.

Có thể là:
User thường: xem thông tin
Admin: quản trị dữ liệu
Thuộc tính quan trọng:
username
password
role (admin / user)
token/session
Vai trò của Admin rất quan trọng vì họ mới có quyền:

thêm nhân vật
sửa nhân vật
xóa nhân vật
thêm glossary
sửa glossary
xóa glossary
2. Character (Nhân vật)
Đây là đối tượng trung tâm của hệ thống.

Thuộc tính cơ bản:

id
name
debut_date
description
difficulty
type
image
Có thể hiểu Character là “bản hồ sơ nhân vật game” được hiển thị trên wiki.

3. Move (Chiêu thức / kỹ năng của nhân vật)
Mỗi nhân vật có thể có nhiều move.

Thuộc tính ví dụ:

id
character_id
name
description
damage / effect / type (nếu cần mở rộng)
Quan hệ của move là phụ thuộc hoàn toàn vào Character.

4. BaseStat (Chỉ số cơ bản)
Mỗi nhân vật có thể có chỉ số nền.

Ví dụ:

hp
attack
defense
speed
energy
Đây là dữ liệu thống kê thuộc về nhân vật, thường là 1 bản ghi cho mỗi nhân vật.

5. Glossary / Terms (Thuật ngữ)
Đây là danh sách thuật ngữ được người chơi tra cứu.

Thuộc tính:

id
term
definition
level (basic, intermediate, advanced...)
video_url
image
Glossary thường là dữ liệu wiki/tra cứu, không gắn trực tiếp với nhân vật nhưng có thể liên quan đến nội dung game.

6. Image / Uploaded File
Đây là đối tượng phụ, dùng để lưu hình ảnh upload.

Ví dụ:

avatar nhân vật
ảnh glossary
ảnh minh họa
Thông thường đối tượng này không được lưu kiểu thuần “bản ghi nghiệp vụ” mà là file trong thư mục upload hoặc URL lưu trong database.

2) Phân tích mối quan hệ các đối tượng
a) User - Admin
User có thể đăng nhập
Admin là loại User đặc biệt
Quan hệ: one-to-one hoặc inheritance-like
Admin được cấp quyền thao tác CRUD
b) Character - Move
Một Character có nhiều Move
Một Move thuộc về duy nhất một Character
Quan hệ: 1-n

Ví dụ:

Character A có Move 1, Move 2, Move 3
Move 1 chỉ thuộc về Character A
c) Character - BaseStat
Một Character có một bộ BaseStat
Một BaseStat thuộc về một Character
Quan hệ: 1-1 hoặc 1-n nếu có nhiều phiên bản số liệu theo thời gian

Trong mô hình đơn giản, thường là:

1 Character: 1 BaseStat
d) Character - Image
Một Character có thể có 1 ảnh đại diện
Một ảnh có thể dùng cho nhiều Character nếu tái sử dụng
Nhưng trong mô hình thực tế, thường là:
1 Character: 1 image
e) Glossary - Image
Một glossary term có thể có 1 ảnh minh họa
1 ảnh có thể được dùng chung cho nhiều glossary
Tùy thiết kế, có thể là 1-n hoặc n-1
f) User - Character / Glossary
Admin quản lý Character và Glossary
User thường chỉ xem
Quan hệ quyền: Admin thực hiện CRUD, User chỉ đọc
3) Mô hình quan hệ tổng quát
Có thể mô tả ngắn gọn như sau:

User (Admin) -> tạo/sửa/xóa Character
User (Admin) -> tạo/sửa/xóa Glossary
Character -> có nhiều Move
Character -> có một BaseStat
Character -> có một Image
Glossary -> có một Image
4) Kết luận
Đối tượng cốt lõi của bài toán là:

User/Admin
Character
Move
BaseStat
Glossary
Và các mối quan hệ chính là:

User/Admin kiểm soát dữ liệu
Character là trung tâm
Move và BaseStat phụ thuộc vào Character
Glossary là dữ liệu tham khảo độc lập nhưng cùng nằm trong hệ thống wiki
