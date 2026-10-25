# Resort 100 — Bản thiết kế trước khi lập trình

Bộ tài liệu dự án trong repository `utne1991/utne1991`, thư mục `resort-management/`. Đây là thiết kế đề xuất, chưa phải hệ thống vận hành khách sạn. Việc giao triển khai cho Claude sẽ thực hiện sau.

## Bắt đầu

- **Toàn bộ PMS, không chỉ dashboard:** đọc [mô hình vận hành resort 100 phòng](docs/RESORT-OPERATING-MODEL.md), [đặc tả chín phân hệ](docs/SCREEN-SPECIFICATIONS.md) và [bảng bao phủ màn hình](docs/SCREEN-COVERAGE.md). Các trang ngoài dashboard hiện mới được đặc tả, chưa có bản vẽ chi tiết.

- **Trước khi khóa triển khai:** đọc [kết quả rà soát](docs/DESIGN-REVIEW.md), [quyết định còn mở](docs/DECISIONS.md) và [phạm vi từng đợt](docs/IMPLEMENTATION-BRIEF.md). Chưa có baseline vận hành được xác nhận.

- Đọc [Tổng quan dự án](PROJECT-OVERVIEW.md) trước để thống nhất mục tiêu, phạm vi và trạng thái.
- Xem [Từng bước thực hiện](docs/IMPLEMENTATION-STEPS.md) và [Danh mục sơ đồ](docs/diagrams/README.md) để theo dõi kế hoạch ngay trên GitHub.
- Đọc [Công cụ và nguồn tham khảo](docs/TOOLING-AND-SOURCES.md) để hiểu vai trò của Archify, ECC và Hello-Agents. Claude bắt đầu từ [CLAUDE.md](CLAUDE.md).
- [Bộ bản đồ tương tác Archify](docs/diagrams/exports/index.html): tải repo và mở HTML. Đọc [cách agent làm việc trong cloud](docs/ARCHIFY-WORKFLOW.md) và [giới hạn kiểm tra](docs/diagrams/VERIFICATION.md).

- Mở `design/dashboard.html` bằng trình duyệt để xem bản mẫu dashboard. Không cần cài thư viện hay chạy server.
- Đọc `docs/PRODUCT-MAP.md` để hiểu bản đồ màn hình, quy tắc và lộ trình.
- Khi quyết định triển khai sau này, đưa `docs/CLAUDE-HANDOFF.md` cùng các tài liệu trên cho Claude.

Mọi số liệu trong bản mẫu đều là dữ liệu minh họa. Phần lọc phòng và chuyển nhóm công việc có tương tác; các nút nghiệp vụ chưa kết nối backend. Không có AI dự báo, API PMS, thanh toán hay tài khoản quảng cáo thật.

## Vị trí dự án

Theo lựa chọn của chủ dự án, tài liệu và bản mẫu được lưu tại `utne1991/utne1991/resort-management/`. README hồ sơ ở gốc repository giữ nội dung cũ và bổ sung liên kết tới dự án. Chưa cấu hình GitHub Pages; liên kết tới HTML trên GitHub hiển thị mã nguồn, không phải ứng dụng đã triển khai.

## MCP và công cụ

Không bắt buộc MCP để dùng bản thiết kế HTML và sơ đồ Mermaid này. GitHub hiển thị Mermaid trong Markdown; Claude có thể đọc các tệp từ checkout.

- Figma: tùy chọn nếu cần chỉnh thiết kế trực quan theo nhóm. Kiểm tra đúng khả năng đọc/ghi của MCP và gói dịch vụ; có MCP không có nghĩa tự tạo được mọi loại sơ đồ.
- GitHub: MCP tùy chọn để Claude đọc repo, quản lý issue và pull request. Có thể dùng Git/CLI thay thế.
- Playwright: tùy chọn trong giai đoạn lập trình để kiểm tra giao diện bằng trình duyệt. Không thay thế thiết kế hoặc kiểm thử nghiệp vụ.

Không cần kết nối PMS, cơ sở dữ liệu sản xuất hay tài khoản quảng cáo cho giai đoạn vẽ bản mẫu.
