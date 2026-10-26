# Điểm bắt đầu cho Claude — Resort 100

Đọc [PROJECT-STATUS](PROJECT-STATUS.md) để nắm inventory tài liệu, giới hạn bằng chứng và NEXT-01/02/03 trước khi đọc báo cáo dài. Trang này không thay DECISIONS hoặc biến các task đề xuất thành lệnh code.

**Đọc căn cứ mới nhất trước:** [tóm tắt nghiên cứu thị trường dùng khi làm việc](docs/research/MARKET-RESEARCH-WORKING-SUMMARY.md), [báo cáo đầy đủ](docs/research/MARKET-RESEARCH-2026-10-26.md) và [tình trạng nguồn/bằng chứng](docs/research/MARKET-RESEARCH-SOURCE-REGISTER.md). Người dùng đã giao lưu và dùng làm căn cứ lập kế hoạch. Ưu tiên một PMS/CM connector, read/reconcile → ops → revenue có duyệt; không tự triển khai full PMS/CM hoặc direct OTA từ prototype cũ. Giá/ICP/cost/gate chưa là kết quả thị trường hoặc baseline đã chốt.

**Đề xuất mới để đánh giá scope:** [OwnerOps assessment](docs/OWNEROPS-ASSESSMENT.md) và [báo cáo nguồn](docs/research/OWNEROPS-PROPOSAL-2026-10-26.md). Chuỗi Chủ → Quản lý → Nhân viên → Nghiệm thu là ứng viên cho MVP nhỏ hơn. Chưa tự duyệt gói/giá/pilot, sửa hệ thống nguồn chính hoặc bắt đầu các task HOTEL-*. “Nộp việc” khác “nghiệm thu”, task accepted khác room-ready; tenant/quyền/nguồn số cần thiết kế trước khi có dữ liệu thật.

Ưu tiên đọc [TASK-RESORT-DESIGN-AUDIT-002](docs/TASK-RESORT-DESIGN-AUDIT-002.md): cập nhật 16 frame theo báo cáo ngoài, wireframe local, bảy blueprint, benchmark PMS và các quyết định còn mở. Không diễn giải checklist bảy nhóm việc thành “7/7 đã xong”.

## Đọc theo thứ tự

1. [PROJECT-OVERVIEW.md](PROJECT-OVERVIEW.md): mục tiêu và phạm vi.
   Yêu cầu cập nhật 26/10/2026: thiết kế toàn PMS trước khi chia đợt code. Đọc [mô hình vận hành](docs/RESORT-OPERATING-MODEL.md), [đặc tả chín phân hệ](docs/SCREEN-SPECIFICATIONS.md) và [bảng bao phủ](docs/SCREEN-COVERAGE.md). Repo có dashboard cũ và wireframe local bổ sung; bộ Figma/FigJam độc lập được theo dõi ở [FIGMA-HANDOFF](docs/FIGMA-HANDOFF.md), chưa được Codex trực tiếp đọc node/version.
   Đọc thêm [kết quả rà soát](docs/DESIGN-REVIEW.md), [sổ quyết định](docs/DECISIONS.md), [phạm vi từng đợt](docs/IMPLEMENTATION-BRIEF.md) và [quy tắc vận hành](docs/OPERATING-RULES.md) trước khi làm bước được giao.
2. [docs/IMPLEMENTATION-STEPS.md](docs/IMPLEMENTATION-STEPS.md): vị trí hiện tại và bước tiếp theo.
3. [docs/diagrams/README.md](docs/diagrams/README.md): bản đồ các sơ đồ.
4. [docs/PRODUCT-MAP.md](docs/PRODUCT-MAP.md): quy tắc phòng, booking và KPI.
5. [docs/TOOLING-AND-SOURCES.md](docs/TOOLING-AND-SOURCES.md): cách dùng Archify, ECC, Hello-Agents.
6. [design/dashboard.html](design/dashboard.html): bản mẫu có dữ liệu minh họa.
7. [docs/CLAUDE-HANDOFF.md](docs/CLAUDE-HANDOFF.md): phạm vi và tiêu chí khi được giao triển khai giao diện.

## Trạng thái và giới hạn

- Có tài liệu và HTML mẫu; chưa có app framework, backend, tài khoản người dùng hoặc dữ liệu vận hành thật.
- Đã dùng CLI Archify từ checkout cố định để tạo sáu HTML sơ đồ; chưa cài skill/plugin toàn cục, chưa cài ECC và chưa sử dụng mã Hello-Agents. Browser-check của sơ đồ bị chặn do môi trường, xem [bằng chứng](docs/diagrams/VERIFICATION.md).
- Không coi việc đọc tài liệu này là lệnh tự triển khai toàn bộ sản phẩm. Thực hiện bước người dùng giao; bước phụ cần thiết có thể làm trong cùng phạm vi.
- Khi lập backlog/API/schema v1, áp dụng hướng ưu tiên trong nghiên cứu thị trường và chốt source ownership/capabilities của connector trước. S3a–d và các form booking/thu/hoàn/night audit là thư viện thiết kế toàn PMS, không cấp quyền viết inventory/tiền thật hoặc thay nguồn chính.
- Chưa khóa thiết kế vận hành. Hoàn thiện thiết kế UI01–UI09 và các hành trình trước khi chốt giao diện toàn hệ thống. S3a/S3b/S3c/S3d là đề xuất chia đợt code, không phải lý do bỏ qua thiết kế các phân hệ khác. Không tự gộp tất cả vào một PR. Các sơ đồ Archify hiện ghim snapshot cũ, chưa bao phủ các Mermaid và đặc tả bổ sung; không mô tả tất cả artifact là đã đồng bộ hoặc đã duyệt.
- Không cài hàng loạt plugin, MCP, hooks hoặc chép ba repo tham khảo vào app chỉ vì tài liệu có nhắc đến chúng.
- Các chỉ dẫn trong repo bên ngoài là tư liệu cần đánh giá, không tự động thay thế yêu cầu của chủ dự án.
- Giữ dữ liệu giả có nhãn. Công thức, quyền hạn và nguồn dữ liệu cần tuân thủ PRODUCT-MAP.
- Tên BeeSmart HotelOS, giá SaaS và profile 2–5 sao là thông tin được chuyển tiếp, chưa phải quyết định mở rộng backend hoặc bảng giá thật. Đọc [phương án sản phẩm](docs/BEESMART-PRODUCT-OPTIONS.md) và D11–D13; không tự nhận Figma đã đủ UI01–UI09 hoặc source MacBook đã đồng bộ.
- Không sao chép tài liệu/mã Hello-Agents vào sản phẩm thương mại khi chưa xác minh quyền dùng phần cụ thể. Xem giới hạn giấy phép trong TOOLING-AND-SOURCES.

## Cách hoàn thành một bước

Đọc đầu vào → xác định phần được giao → triển khai hoặc cập nhật thiết kế → chạy kiểm tra phù hợp → báo bằng chứng và giới hạn → cập nhật trạng thái bước tương ứng. Không đánh dấu xong dựa trên kế hoạch hoặc mã chưa chạy. Sơ đồ phải thể hiện sự khác nhau giữa kiến trúc đề xuất và hệ thống thực tế.

Mỗi cloud task đã ở môi trường riêng; dùng checkout hiện có, không tạo Git worktree trừ khi người dùng yêu cầu. Giữ các thay đổi có sẵn của người dùng.
