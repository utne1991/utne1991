# Bàn giao cho Claude — đọc phạm vi trước

Ngày cập nhật: 26/10/2026. **Hiện chỉ đánh giá và lưu kế hoạch, chưa bắt đầu code ứng dụng.** Tài liệu này không giao việc cho agent khác hoặc phê duyệt MVP/server.

## Thứ tự đọc

1. [CLAUDE.md](../CLAUDE.md) và [PROJECT-STATUS](../PROJECT-STATUS.md): chỉ thị và bằng chứng hiện có.
2. [Market working summary](research/MARKET-RESEARCH-WORKING-SUMMARY.md): control layer, một nguồn PMS/CM chính.
3. [OwnerOps assessment](OWNEROPS-ASSESSMENT.md) và [đặc tả MVP đề xuất](OWNEROPS-MVP-CONTRACT.md): một bộ phận, ba góc nhìn, một hành trình nghiệm thu.
4. [DECISIONS](DECISIONS.md): những gì còn mở; không tự điền bằng suy đoán.
5. [Review PR #1](PILOT-OBSERVABILITY-REVIEW.md): backlog OBS-*, fixture và ba mức local/sandbox/pilot.

## Prompt cho lượt rà soát tài liệu

> Chỉ rà soát và cập nhật kế hoạch BeeSmart HotelOS trong resort-management/. Đọc CLAUDE.md, PROJECT-STATUS.md, docs/OWNEROPS-MVP-CONTRACT.md, docs/DECISIONS.md và docs/PILOT-OBSERVABILITY-REVIEW.md trước. OwnerOps là ứng viên MVP của control layer, chưa được phê duyệt. Kiểm tra một hành trình housekeeping từ giao việc đến nghiệm thu, quyền tenant/property, submission revision, task accepted khác room-ready, nguồn và mẫu số KPI. Ghi điểm còn thiếu và điều kiện nghiệm thu. Không tạo app/framework/backend, repo app, hạ tầng hoặc sửa ToolAds/DNS; không merge PR #1 hoặc liên hệ người khác. Giữ nguyên báo cáo raw và receipt cũ. Báo file đã sửa, kiểm tra tài liệu đã chạy và quyết định còn mở.

## Trước một lệnh code tương lai

Chủ dự án cần giao rõ scope, mức A/B/C và nơi đặt mã. Với demo local synthetic, không cần đợi PMS thật; với backend phải chốt identity/quyền và dữ liệu; sandbox/pilot cần thêm gate tương ứng. Không biến prompt rà soát bên trên thành lệnh triển khai.

Đề xuất gói việc đầu để xem xét sau này: một demo synthetic giao → làm → nộp → làm lại → nộp lại → nghiệm thu, ba góc nhìn, nguồn và lỗi hiển thị được. Chưa mặc định chọn framework, tạo tài khoản thật, thu tiền, upload ảnh thật hoặc đồng bộ PMS.

Khi được giao code, PR cần nêu phạm vi, cách chạy/reset, phần giả lập, kiểm tra đã thực thi và giới hạn. Không gọi fixture, Mermaid parse hoặc DOM wireframe checks là backend/auth/concurrency tests đã đạt. Không thay baseline/tiêu chí để che phần chưa đạt.

## Thư viện thiết kế cũ

[Prompt dashboard S3a trước đây](DASHBOARD-DEMO-HANDOFF.md) được giữ nguyên để tham chiếu, không còn là prompt triển khai mặc định. Chỉ dùng khi chủ dự án giao riêng dashboard S3a. [Brief S3a–d](IMPLEMENTATION-BRIEF.md), [chín phân hệ](SCREEN-SPECIFICATIONS.md), [Figma handoff](FIGMA-HANDOFF.md) và Archify là thư viện thiết kế; chưa đồng nghĩa scope OwnerOps đã khóa hoặc mọi artifact đã đồng bộ.
