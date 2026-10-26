# Rà soát trước khi chốt triển khai

**Trạng thái mới nhất:** [audit 002](TASK-RESORT-DESIGN-AUDIT-002.md) bổ sung wireframe local cho chín phân hệ/bốn mobile view, bảy blueprint và benchmark PMS. Các nhận định thiếu bản vẽ bên dưới là lịch sử tại thời điểm rà soát; chưa có nghiệm thu Figma hoặc code production từ lần bổ sung này.

Ngày rà soát: 25/10/2026. Cơ sở kiểm tra: repo đến commit `c5ec8f3`, nội dung dashboard, tài liệu bàn giao, nguồn JSON và receipt của sáu sơ đồ Archify. Báo cáo này không phải xác nhận của chủ dự án hoặc lệnh bắt đầu code.

**Cập nhật yêu cầu 26/10/2026:** chủ dự án yêu cầu bao quát toàn PMS trước khi chốt, thay vì chỉ dashboard. Đã thêm [mô hình vận hành](RESORT-OPERATING-MODEL.md), [đặc tả chín phân hệ](SCREEN-SPECIFICATIONS.md), [bảng bao phủ](SCREEN-COVERAGE.md) và hai Mermaid vận hành/bàn giao. Chưa có bản vẽ chi tiết cho UI02–UI09. Kết luận trước đây về khả năng giao riêng dashboard là nhận định phạm vi code, không có nghĩa thiết kế toàn PMS đã hoàn tất.

**Tiếp nhận báo cáo Figma sau lần rà soát:** người dùng đã cung cấp hai liên kết BeeSmart HotelOS và báo cáo chín màn nghiệp vụ được tạo. Nhận định “chưa có bản vẽ chi tiết” ở trên mô tả trạng thái repo lúc rà soát, không kết luận về nguồn bên ngoài mới. Xem [FIGMA-HANDOFF](FIGMA-HANDOFF.md) để đối chiếu; chưa đọc được frame/node nên chưa nâng trạng thái nghiệm thu hoặc khóa thiết kế.

## Kết luận

**Đã có bản đồ tổng quan, chưa khóa thiết kế vận hành toàn hệ thống.** Có thể dùng bộ tài liệu để chốt và giao riêng đợt giao diện dashboard với dữ liệu giả. Chưa đủ để tự chọn backend, đồng bộ OTA, xử lý tiền thật hoặc triển khai production.

Không thiếu thêm một thư viện AI để bắt đầu. Các phần thiếu chủ yếu là quyết định nghiệp vụ, phạm vi giao việc và khả năng kiểm chứng hành vi.

## Phát hiện và xử lý

| Mức | Phát hiện | Xử lý trong lần rà soát này | Trạng thái còn lại |
| --- | --- | --- | --- |
| Chặn backend | Chưa biết PMS/channel manager và hệ thống giữ tồn chính | Tạo sổ quyết định D01/D02, sơ đồ đồng bộ và tình huống đối soát | Cần thông tin resort; chưa được coi app mới là nguồn chính |
| Chặn khóa phạm vi | PRODUCT-MAP nói UI gồm lịch phòng, còn handoff PR đầu chỉ dashboard; tổng quan và roadmap đánh số khác nhau | Tách S3a dashboard, S3b lịch/booking demo; đồng bộ lộ trình về S0–S7 | Phạm vi đề xuất chưa được chủ dự án xác nhận |
| Chặn nghiệp vụ | Chỉ có luồng nhận/trả chính; thiếu đổi ngày, gia hạn, hủy một phần, thanh toán đến muộn | Bổ sung quy tắc ngoại lệ và kịch bản nghiệm thu | Chính sách giá, hủy, giữ chỗ, tiền còn cần chốt |
| Chặn quyền | Mới nói chung về role, chưa có ma trận quyền | Thêm ma trận đề xuất và sơ đồ kiểm tra quyền backend | Cần xác nhận người được thao tác thực tế |
| Chặn đối soát | Chưa định nghĩa đủ công suất đêm, nguồn tính tiền và các tình huống dữ liệu trễ | Tách chỉ số tức thời/đêm phòng; bổ sung tính khả dụng, lỗi và đối soát | Còn quyết định xử lý phòng bảo trì, giá/thuế và thời điểm chốt ngày |
| Chặn production | Chưa có điều kiện chạy thử, khôi phục và quay lui cụ thể | Thêm các cổng nghiệm thu theo giai đoạn và sơ đồ triển khai | Hosting, người chịu trách nhiệm và mục tiêu phục hồi chưa chốt |
| Chặn duyệt trực quan | Cả sáu Archify browser-check đều lỗi môi trường | Kiểm tra lại hash/nguồn/receipt và giữ nguyên kết quả fail | Cần trình duyệt có sandbox hoạt động; chưa duyệt cảm quan |
| Nhỏ, đã sửa | Mẫu 10:30 → 11:00 ghi 45 phút thay vì 30 | Sửa về 30 phút; yêu cầu app thật tính từ cùng `asOf` | Kiểm tra hành vi lúc lập trình |

## Phần đã có và có thể dùng

- Mục tiêu, danh mục phân hệ, sơ đồ màn hình và luồng booking chính.
- Dashboard HTML 100 phòng, có bộ lọc và số liệu minh họa nhất quán về tổng trạng thái.
- Sáu HTML Archify có nguồn JSON và snapshot tài liệu; hash khớp receipt, validate/deliver/strict check đạt.
- Hướng dẫn Claude, danh mục Archify/ECC/Hello-Agents và giới hạn giấy phép.

Không coi kiểm tra schema/HTML là kiểm thử booking, đồng bộ hoặc bảo mật của một app chưa tồn tại.

## Trước khi chốt từng phạm vi

| Phạm vi muốn chốt | Điều kiện cần | Kết luận hiện tại |
| --- | --- | --- |
| S3a — Code dashboard mẫu | Chấp nhận bố cục/phạm vi; tiêu chí có thể kiểm tra; dữ liệu giả có nhãn | Có tài liệu bàn giao; chưa có xác nhận thiết kế và kiểm tra hiển thị |
| S3b — Lịch và booking demo | Chốt màn hình, khả dụng theo ngày và các trạng thái mẫu | Đã bổ sung brief; chưa có bản vẽ/implementation chi tiết cho từng trang |
| S4 — Backend thật | Chốt nguồn chính, chính sách, quyền, schema/API, kiểm thử nghiệp vụ | Chưa đạt; xem sổ quyết định |
| S5 — Vận hành đa kênh | Có quyền tích hợp, mapping và đối soát chạy thử thành công | Chưa đạt |
| Production | Nghiệm thu vai trò, sao lưu/khôi phục, giám sát và phương án quay lui | Chưa đạt |

## Tài liệu bổ sung cần đọc

- [Sổ quyết định](DECISIONS.md): tách đề xuất với điều đã xác nhận.
- [Phạm vi từng đợt và nghiệm thu](IMPLEMENTATION-BRIEF.md).
- [Quy tắc vận hành và quyền](OPERATING-RULES.md).
- [Ngoại lệ booking](diagrams/07-booking-exceptions.md), [đồng bộ](diagrams/08-sync-and-reconciliation.md), [quyền](diagrams/09-access-control.md), [chạy thử và triển khai](diagrams/10-release-and-recovery.md).

Bốn sơ đồ bổ sung hiện là Mermaid, chưa xuất thành Archify. Sáu artifact Archify cũ giữ snapshot lịch sử, chưa bao phủ toàn bộ bổ sung trong lần rà soát này. Phải cập nhật nguồn và xuất lại sau khi chốt các quyết định liên quan; không ghi đè bằng chứng cũ hoặc tuyên bố chúng đã được đồng bộ.

## Khi nào gọi là đã khóa?

Chủ dự án xác nhận phạm vi cụ thể và các quyết định tương ứng; ghi người xác nhận, ngày và commit tài liệu vào DECISIONS. Khóa theo mốc S3a/S3b/S4, không khóa chung toàn bộ lộ trình AI và quảng cáo. Thay đổi sau đó phải nêu tác động tới dữ liệu, màn hình, kiểm thử và phạm vi trước khi thực hiện.
