# 🏓 VN PICKLEBALL ACADEMY — WEBSITE HỌC VIỆN ĐÀO TẠO PICKLEBALL CHUẨN QUỐC TẾ

**Đồ án môn học:** Front-End Web Development with ReactJS (FER201 / FER202)  
**Đề tài:** Xây dựng Website Học viện Đào tạo Pickleball (VN Pickleball Academy)  
**Công nghệ sử dụng:** ReactJS 18, Bootstrap 5, Lucide React Icons, Context API, LocalStorage  
**Tương thích thiết bị (Responsive):** Tối ưu hóa 100% trên Mobile (`320px` – `428px`), Tablet (`768px` – `1024px`) và Desktop (`1280px+`).

---

## 📑 MỤC LỤC TÀI LIỆU BÀN GIAO (SUBMISSION DELIVERABLES)

1. [Phân tích Nghiệp vụ (BA) & Lý do chọn các Chức năng Mở rộng](#1-phân-tích-nghiệp-vụ-ba--lý-do-chọn-các-chức-năng-mở-rộng)
2. [Installation & Deployment Guide (Hướng dẫn Cài đặt & Deploy Vercel)](#2-installation--deployment-guide-hướng-dẫn-cài-đặt--deploy-vercel)
3. [Source Code Architecture (Cấu trúc Mã nguồn)](#3-source-code-architecture-cấu-trúc-mã-nguồn)
4. [Root Credentials (Tài khoản Quản trị & Demo 4 Vai trò)](#4-root-credentials-tài-khoản-quản-trị--demo-4-vai-trò)
5. [End-user Manual (Hướng dẫn Sử dụng dành cho Học viên & Khách hàng)](#5-end-user-manual-hướng-dẫn-sử-dụng-dành-cho-học-viên--khách-hàng)
6. [Administrator Manual (Hướng dẫn Quản trị Hệ thống & Huấn luyện viên)](#6-administrator-manual-hướng-dẫn-quản-trị-hệ-thống--huấn-luyện-viên)

---

## 1. Phân tích Nghiệp vụ (BA) & Lý do chọn các Chức năng Mở rộng

Đóng vai trò là Chuyên viên Phân tích Nghiệp vụ (Business Analyst - BA) khảo sát hoạt động thực tế của các Học viện Pickleball hiện nay tại Việt Nam, nhóm nhận thấy một học viện đào tạo thành công không chỉ dừng lại ở việc giới thiệu và nhận ghi danh khóa học mà còn vận hành theo mô hình **Hệ sinh thái Đào tạo – Sân tập – Dụng cụ – Cộng đồng**. Vì vậy, bên cạnh 4 trang cơ bản theo yêu cầu đề bài (`Home`, `Courses`, `Booking/Register`, `About & Contact`), nhóm đã phân tích và triển khai **5 chức năng mở rộng thực tế**:

1. **Hệ thống Đặt sân tập theo giờ (Real-time Court Booking System):**
   - *Lý do BA lựa chọn:* Học viên sau giờ học với HLV luôn có nhu cầu thuê sân để tự luyện tập thêm (Drilling) hoặc giao lưu đánh đôi. Đồng thời, việc cho thuê sân theo khung giờ (Ca sáng, Ca chiều, Giờ vàng Peak Hour) kết hợp cho thuê vợt Carbon và máy bắn bóng Titan Pro giúp học viện tối ưu công suất khai thác 12 sân tập và tăng nguồn thu.
2. **Cửa hàng Dụng cụ Pickleball Chính hãng (Pro Shop & Giỏ hàng / Thanh toán):**
   - *Lý do BA lựa chọn:* 90% học viên mới bắt đầu chưa có vợt riêng hoặc chưa biết chọn vợt lõi 14mm hay 16mm. Tích hợp Pro Shop ngay trên website giúp học viên dễ dàng đặt mua vợt JOOLA, Selkirk, bóng thi đấu Franklin X-40 và giày chuyên dụng chuẩn USAPA do chính HLV học viện khuyên dùng.
3. **Blog Cẩm nang Luật chơi Pickleball & Đánh giá từ Học viên cũ (Knowledge Hub & Testimonials):**
   - *Lý do BA lựa chọn:* Người mới tìm hiểu về Pickleball rất cần tài liệu chuẩn hóa về luật Non-Volley Zone (Kitchen), quy tắc 2-Bounce Rule và kỹ thuật Third-Shot Drop. Ngoài ra, mục Đánh giá thực tế (Testimonials) hiển thị tiến bộ điểm DUPR của học viên cũ kèm biểu mẫu gửi Review trực tiếp giúp gia tăng niềm tin (Social Proof) và tỷ lệ chuyển đổi đăng ký học.
4. **Hệ thống Quản lý Tài khoản Đa vai trò (Student / Coach / Admin) & Lịch sử Học tập:**
   - *Lý do BA lựa chọn:* Giúp học viên đăng nhập để theo dõi lại danh sách khóa học đã đăng ký, lịch sử mã đặt sân và đơn hàng Pro Shop; đồng thời giúp Ban Giám đốc và HLV quản lý danh sách học viên, mở lớp mới và phân quyền thành viên ngay trên giao diện web.

---

## 2. Installation & Deployment Guide (Hướng dẫn Cài đặt & Deploy Vercel)

### 2.1. Yêu cầu môi trường (Prerequisites)
- **Node.js:** Phiên bản `>= 18.x` (Khuyến nghị bản LTS)
- **Trình quản lý gói:** `npm` (đi kèm Node.js) và `Git`

### 2.2. Các bước cài đặt và chạy dưới Local
```bash
# Bước 1: Di chuyển vào thư mục gốc của dự án
cd FER_Assignment

# Bước 2: Cài đặt đầy đủ các thư viện phụ thuộc (Dependencies)
npm install

# Bước 3: Khởi chạy сервер phát triển (Development Server)
npm start
```
- Sau khi chạy lệnh `npm start`, trình duyệt sẽ tự động mở tại địa chỉ: **`http://localhost:3000`**

### 2.3. Kiểm tra bản Build Production
```bash
npm run build
```
- Lệnh trên sẽ đóng gói và tối ưu hóa toàn bộ mã nguồn ReactJS vào thư mục `build/`, sẵn sàng để đưa lên môi trường Production.

### 2.4. Hướng dẫn Deploy lên Vercel (Public Internet Miễn phí)
1. **Đẩy code lên GitHub:**
   ```bash
   git init
   git add .
   git commit -m "feat: complete VN Pickleball Academy full group project"
   git branch -M main
   git remote add origin https://github.com/<ten-tai-khoan>/<ten-repo>.git
   git push -u origin main
   ```
2. **Kết nối Vercel:**
   - Truy cập [https://vercel.com/](https://vercel.com/) và đăng nhập bằng tài khoản **GitHub**.
   - Nhấn **Add New...** ➔ **Project** ➔ Chọn **Import** kho lưu trữ GitHub vừa đẩy lên.
3. **Cấu hình Build Settings trên Vercel:**
   - **Framework Preset:** `Create React App` (Vercel tự động nhận diện)
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install`
4. **Hoàn tất:** Nhấn **Deploy**, đợi khoảng 1–2 phút để nhận đường dẫn public có dạng `https://vn-pickleball-academy.vercel.app`.

---

## 3. Source Code Architecture (Cấu trúc Mã nguồn)

Dự án được thiết kế theo kiến trúc phân tầng Component-driven sạch sẽ, dễ bảo trì và tái sử dụng:

```text
FER_Assignment/
├── public/
│   └── index.html                     # Cấu hình 메타태그 SEO, Google Fonts (Plus Jakarta Sans) & Viewport Mobile
├── src/
│   ├── components/
│   │   ├── Header.jsx                 # Thanh điều hướng Responsive, Giỏ hàng, Menu Mobile & Thông tin User
│   │   ├── HomeSection.jsx            # Trang chủ: Hero Banner, Cơ sở vật chất, Khóa học nổi bật, Đội ngũ HLV
│   │   ├── CoursesSection.jsx         # Trang Khóa học: Tìm kiếm, Lọc danh mục, Sắp xếp & Modal Giáo trình chi tiết
│   │   ├── RegisterSection.jsx        # Trang Đăng ký học: Form ghi danh & Hệ thống Validation chuẩn UX
│   │   ├── CourtBookingSection.jsx    # [Mở rộng #1] Hệ thống Đặt sân tập theo giờ & Thuê vợt / Máy bắn bóng
│   │   ├── ProShopSection.jsx         # [Mở rộng #2] Cửa hàng dụng cụ Pickleball chính hãng
│   │   ├── BlogReviewsSection.jsx     # [Mở rộng #3] Blog Luật chơi Pickleball & Đánh giá học viên (Testimonials)
│   │   ├── AboutContactSection.jsx    # Trang Giới thiệu & Liên hệ: Lịch sử hình thành, Google Maps Iframe, Form liên hệ
│   │   ├── AuthModal.jsx              # Modal Đăng nhập / Đăng ký & Nút 1-Click Demo Login
│   │   ├── UserProfileModal.jsx       # Hồ sơ Học viên: Xem lịch sử đăng ký khóa học, lịch đặt sân, đơn hàng
│   │   ├── CartDrawerModal.jsx        # Giỏ hàng & Thanh toán dụng cụ Pro Shop (VietQR / COD / Tại sân)
│   │   ├── AdminDashboardModal.jsx    # Trung tâm Quản trị (Root Admin) & Bảng điều khiển Huấn luyện viên (Coach)
│   │   └── Footer.jsx                 # Chân trang, Toast Notification & Thanh chuyển đổi Role nhanh (RoleSwitcherBar)
│   ├── context/
│   │   └── AuthContext.jsx            # Quản lý State xác thực toàn cục, phân quyền 4 Roles & đồng bộ LocalStorage
│   ├── data/
│   │   ├── courses.js                 # Dữ liệu 6 khóa đào tạo chi tiết (Cơ bản, Nâng cao, 1 kèm 1, Trẻ em, Giải đấu)
│   │   ├── courts.js                  # Dữ liệu 4 sân tập tiêu chuẩn USAPA & 8 khung giờ đặt sân
│   │   ├── products.js                # Dữ liệu 8 sản phẩm vợt, bóng, giày, phụ kiện Pro Shop
│   │   ├── blogs.js                   # Dữ liệu bài viết luật chơi, đánh giá học viên & danh sách ghi danh mẫu
│   │   └── users.js                   # Dữ liệu tài khoản Root Admin, Coach, Student & Đội ngũ HLV
│   ├── App.jsx                        # Component gốc điều phối định tuyến Tab, State & Modals
│   ├── App.css                        # Hệ thống giao diện & Media Queries chống vỡ layout từ 320px
│   └── index.js                       # Điểm khởi chạy ứng dụng React 18
├── package.json                       # Khai báo thư viện và scripts
└── README.md                          # Tài liệu hướng dẫn toàn diện
```

---

## 4. Root Credentials (Tài khoản Quản trị & Demo 4 Vai trò)

Để thuận tiện cho Giảng viên kiểm thử và chấm điểm, hệ thống cung cấp sẵn **Tài khoản Quản trị tối cao (Root Credentials)** cùng tính năng **1-Click Demo Login** ngay trong cửa sổ Đăng nhập và trên **Thanh chuyển đổi Role ở góc dưới màn hình**:

| Vai trò (Role) | Email đăng nhập | Mật khẩu | Quyền hạn trong hệ thống |
| :--- | :--- | :--- | :--- |
| **Root Admin (Quản trị viên)** | `admin@pickleball.edu.vn` | `Admin@123` | Toàn quyền truy cập **Admin Dashboard**: Xem thống kê doanh thu/KPI, Thêm/Xóa khóa học, Xem danh sách học viên ghi danh, Quản lý lịch đặt sân, Khóa/Mở khóa user và Đổi quyền thành viên. |
| **Coach (Huấn luyện viên)** | `coach@pickleball.edu.vn` | `Coach@123` | Truy cập **Kênh HLV (Coach Portal)**: Theo dõi danh sách học viên đăng ký lớp học, xem lịch sử đặt sân tập và quản lý giáo trình khóa học. |
| **Student (Học viên)** | `student@pickleball.edu.vn` | `Student@123` | Đăng ký khóa học (tự động điền thông tin cá nhân), đặt sân tập theo giờ, mua dụng cụ Pro Shop, gửi đánh giá khóa học và xem **Lịch sử học tập** trong Hồ sơ cá nhân. |
| **Banned Account (Kiểm thử khóa)** | `tung.dang@spam.com` | `123456` | Tài khoản bị khóa để kiểm thử thông báo chặn đăng nhập an toàn. |

---

## 5. End-user Manual (Hướng dẫn Sử dụng dành cho Học viên & Khách hàng)

1. **Khám phá Trang chủ (`Trang chủ`):**
   - Xem tổng quan cơ sở vật chất 12 sân chuẩn quốc tế, 3 khóa học tiêu biểu, thông tin đội ngũ 4 Huấn luyện viên chứng chỉ PPR/IPTPA và đánh giá từ học viên cũ.
2. **Tra cứu & Xem chi tiết Khóa học (`Khóa học`):**
   - Sử dụng thanh tìm kiếm hoặc các nút lọc danh mục (`Cơ bản`, `Nâng cao`, `Trẻ em`, `1 Kèm 1`, `Luyện thi đấu`).
   - Nhấn **"Xem Giáo Trình"** trên bất kỳ thẻ khóa học nào để xem chi tiết Thời lượng, Học phí, Lịch học, HLV phụ trách và nội dung từng buổi học (Syllabus).
3. **Đăng ký Khóa học & Kiểm tra Validation (`Đăng ký học`):**
   - Nhấn nút **"Đăng Ký Học"** để chuyển sang biểu mẫu ghi danh.
   - Nhập *Họ tên*, *Số điện thoại (chuẩn 10 số VN)*, *Email*, *Khóa học muốn đăng ký* và *Ghi chú*.
   - Nếu bỏ trống hoặc nhập sai định dạng Email/SĐT, hệ thống sẽ báo lỗi chi tiết ngay bên dưới ô nhập liệu. Khi hợp lệ, nhấn **"Xác Nhận Đăng Ký Khóa Học"** để nhận Mã hồ sơ ghi danh.
4. **Đặt sân tập theo giờ (`Đặt sân tập`):**
   - Bước 1: Chọn 1 trong 4 sân tập (Sân Indoor VIP máy lạnh hoặc Sân mái che).
   - Bước 2: Chọn ngày và khung giờ trống (các ca đã đặt sẽ hiển thị trạng thái *"Đã kín"*).
   - Tùy chọn thuê thêm vợt Carbon hoặc máy bắn bóng Titan Pro, điền tên & SĐT và nhấn **"Xác Nhận Đặt Sân Ngay"**.
5. **Mua sắm tại Pro Shop (`Pro Shop`):**
   - Lọc theo nhóm sản phẩm (*Vợt*, *Bóng*, *Giày*, *Balo & Phụ kiện*), nhấn **"Mua ngay"** để thêm vào Giỏ hàng.
   - Mở nút **Giỏ hàng** trên thanh Header để điều chỉnh số lượng và tiến hành đặt hàng (VietQR, COD hoặc Nhận tại sân).
6. **Đọc Blog Luật chơi & Gửi Review (`Blog & Review`):**
   - Nhấn **"Đọc bài viết"** để xem toàn văn cẩm nang luật chơi Pickleball và kỹ thuật 3rd Shot Drop.
   - Điền biểu mẫu **"Gửi Đánh Giá Của Bạn"** ở cột bên phải để đăng cảm nhận mới lên hệ thống.
7. **Xem Bản đồ & Liên hệ (`Giới thiệu & Liên hệ`):**
   - Xem lịch sử phát triển của Học viện, tương tác trực tiếp với bản đồ **Google Maps Iframe** và gửi câu hỏi qua Form liên hệ.

---

## 6. Administrator Manual (Hướng dẫn Quản trị Hệ thống & Huấn luyện viên)

1. **Cách truy cập Bảng điều khiển Quản trị (Root Admin Dashboard):**
   - **Cách 1 (Nhanh nhất):** Nhấn nút **`🛡️ Root Admin`** trên thanh công cụ **DEMO ROLES** ở góc dưới màn hình.
   - **Cách 2:** Nhấn nút **Đăng nhập** trên thanh Header ➔ Nhập tài khoản `admin@pickleball.edu.vn` / `Admin@123` (hoặc nhấn nút 1-Click Demo Root Admin) ➔ Nhấn nút màu đỏ **"Quản trị"** trên thanh Header.
2. **Quản lý Khóa học (`Tab: Quản Lý Khóa Học`):**
   - Xem danh sách toàn bộ các khóa đào tạo hiện hành.
   - Sử dụng biểu mẫu **"Mở Lớp / Khóa Đào Tạo Mới"** ở cột bên phải để thêm khóa học mới (nhập tên khóa học, học phí, HLV, lịch học) hoặc nhấn biểu tượng thùng rác để xóa khóa học.
3. **Quản lý Hồ sơ Ghi danh Học viên (`Tab: Danh Sách Học Viên Đăng Ký`):**
   - Theo dõi toàn bộ phiếu đăng ký khóa học mới từ trang Đăng ký học theo thời gian thực (Mã phiếu, Họ tên, SĐT, Email, Khóa học, Lịch học và Ghi chú).
4. **Quản lý Lịch Đặt Sân Tập (`Tab: Lịch Đặt Sân Tập`):**
   - Kiểm tra danh sách khách hàng đặt sân theo ngày, ca tập và tổng phí thanh toán.
5. **Quản lý Tài khoản & Phân quyền (`Tab: Quản Lý Tài Khoản & Phân Quyền`):**
   - Thay đổi vai trò của bất kỳ tài khoản nào giữa `Học viên (Student)` ↔ `Huấn luyện viên (Coach)` ↔ `Quản trị viên (Admin)`.
   - Nhấn nút **Khóa (Lock)** để vô hiệu hóa tài khoản vi phạm hoặc **Mở (Unlock)** để khôi phục quyền truy cập.
