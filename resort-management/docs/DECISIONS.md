# Sổ quyết định trước triển khai

**Chưa có baseline triển khai được chủ dự án xác nhận.** Bảng phân biệt ràng buộc đã thể hiện trong yêu cầu, đề xuất của nhóm thiết kế và thông tin còn thiếu. Đề xuất không tự chuyển thành quyết định vì đã được push lên GitHub.

## Các điểm đã thể hiện trong yêu cầu

- Dự án hướng tới resort 100 phòng; cần biết sắp trả, khả dụng theo ngày, công suất và cơ hội cải thiện kinh doanh.
- Tài liệu/mã nguồn lưu trong `utne1991/utne1991/resort-management/`.
- Hoàn thiện bản đồ bằng Archify trước; việc giao Claude lập trình để sau. Không có yêu cầu bắt đầu backend hoặc chạy quảng cáo thật.
- Cập nhật yêu cầu 26/10/2026: thiết kế phải bao quát lịch, booking, buồng phòng, doanh thu/chiến dịch và toàn quy trình PMS, không chỉ dashboard. Đây là yêu cầu phạm vi thiết kế; chưa đồng nghĩa đã duyệt từng bố cục hoặc cho phép code.
- Sau nghiên cứu thị trường, người dùng yêu cầu lưu báo cáo và dựa vào đó làm việc. Đã tiếp nhận làm căn cứ ưu tiên lập kế hoạch: [Operations & Revenue Control kết nối PMS/CM](research/MARKET-RESEARCH-WORKING-SUMMARY.md). Việc này không tự duyệt mọi số liệu/giá hoặc chọn provider/đóng các quyết định dưới đây.
- Sau khi gửi kế hoạch VPS/observability và kiểm toán GitHub, người dùng xác nhận **chỉ đánh giá và lưu kế hoạch, chưa bắt đầu code ứng dụng**. Đã đọc task PR #1 và ghi [review/backlog](PILOT-OBSERVABILITY-REVIEW.md); chưa merge PR, cấp quyền mua/triển khai hoặc duyệt scope OBS-*.

## Các quyết định cần chốt

| ID | Chủ đề | Đề xuất hoặc lựa chọn cần xác nhận | Cần trước |
| --- | --- | --- | --- |
| D01 | Hệ thống hiện có | Resort dùng PMS/channel manager nào, kênh bán nào, có API/export được hỗ trợ không? | S4 |
| D02 | Nguồn dữ liệu chính | Theo nghiên cứu, ưu tiên giữ PMS/CM hiện có làm nguồn booking/tồn chính, BeeSmart đọc/đối soát rồi ghi qua capability được cấp. Vẫn cần tên nguồn, entity/field ownership và contract thật; chưa giả định có quyền tạo/đổi booking hoặc tồn local. | S4 |
| D03 | Phạm vi thiết kế và chia đợt code | Giữ UI01–09/S3a–d làm thư viện thiết kế/demo toàn PMS. Chốt MVP mới theo nghiên cứu: 1 connector + read/reconcile, ops/agency, revenue có duyệt; selected write chỉ khi đủ điều kiện. Chưa duyệt backlog hoặc baseline code cụ thể. | Trước chốt UI và đợt code tương ứng |
| D04 | Phòng và thời gian | Danh mục phòng/loại thật; múi giờ, giờ nhận/trả, chốt ngày, khách nhận sớm/trả muộn, dọn phòng. Tiếng Việt/VND/Asia/Ho_Chi_Minh hiện là giả định mẫu. | S4 |
| D05 | Chính sách bán | Hold bao lâu, điều kiện xác nhận, hủy/no-show, khách đoàn, gia hạn, overbooking và phòng bảo trì. Đề xuất không chủ động overbooking. | S4 |
| D06 | Giá và tiền | Giá theo đêm, người/giường phụ nếu có; VAT/phí, đặt cọc, hoàn tiền, giảm giá; giao dịch nào qua app, giao dịch nào đối soát từ PMS. | S4 |
| D07 | Quyền và dữ liệu khách | Xác nhận ma trận quyền, người duyệt, thông tin cần lưu, thời hạn lưu và cách xuất dữ liệu. | S4 |
| D08 | Kết nối | Mapping phòng/giá, SLA dữ liệu mới, quyền API, lịch đối soát, xử lý khi mất kết nối hoặc OTA bán vượt tồn. Không tự hứa đồng bộ realtime. | S5 |
| D09 | Vận hành và hosting | Kế hoạch PR #1 đề xuất VPS/DB độc lập ToolAds, domain demo/app, telemetry và restore/release gates. Cần repo app đích, quyền hạ tầng/DNS, budget, risk/support owner, RPO/RTO và kết quả đo/restore; chưa xác nhận trạng thái ToolAds hoặc tạo server. Xem [review](PILOT-OBSERVABILITY-REVIEW.md). | Trước sandbox chia sẻ/dữ liệu thật theo mức A/B/C |
| D10 | Mức tự động hóa | Đề xuất giá/quảng cáo có người duyệt; AI chỉ đọc trước. Ngân sách và giá sàn chưa được cấp. | S6 / S7 |
| D11 | BeeSmart và phạm vi SaaS | Audit 002 đề xuất pilot một resort, thiết kế tenant/property/membership từ đầu nhưng chưa làm SaaS billing/portfolio. Đã có ERD/quyền nháp theo phương án đó; chưa được chủ dự án xác nhận hoặc chọn topology DB. | Trước backend và mở rộng phạm vi |
| D12 | Profile dịch vụ 2–5 sao | Chọn checklist/năng lực nào, tiêu chuẩn/loại hình/quốc gia áp dụng và phân quyền; không coi phần mềm tự cấp sao hoặc hạng sao quyết định giá phần mềm. | Trước đưa profile vào scope |
| D13 | Nguồn thiết kế được duyệt | Audit mới sửa thành 16 khung/4 trang và báo cáo đã đọc trực tiếp; chưa kèm node/version/export. Cần ánh xạ, mở rộng form/mobile/states và ghi baseline; chưa nghiệm thu. | Trước chốt UI/giao code theo Figma |
| D14 | OwnerOps làm ứng viên MVP | Đề xuất mới đã được người dùng yêu cầu đánh giá/lưu: dashboard chủ + giao việc/nghiệm thu + mobile, dùng cùng PMS. Cần chốt scope, policy review/ownership, financial coverage, gói giá và lịch pilot; chưa cho phép code HOTEL-* hoặc ghi tiền/booking thật. Xem [đánh giá](OWNEROPS-ASSESSMENT.md). | Trước chốt scope OwnerOps hoặc dùng làm báo giá/kế hoạch triển khai |

D01 đã được hỏi trong cuộc trò chuyện; chưa nhận thông tin thì tiếp tục làm tài liệu và giao diện mẫu, giữ câu trả lời là chưa biết. Không suy từ README hồ sơ GitHub rằng resort chưa có PMS.

Bản thảo hỗ trợ chốt D03/D07/D13/D14: [OWNEROPS-MVP-CONTRACT](OWNEROPS-MVP-CONTRACT.md), gồm housekeeping synthetic, sáu view, quyền/state/revision và KPI. Các lựa chọn trong bản thảo chưa được người dùng xác nhận; không đóng quyết định vì tài liệu đã được lưu. [Handoff hiện hành](CLAUDE-HANDOFF.md) dành cho rà soát kế hoạch, prompt S3a cũ là tham chiếu riêng.

Nghiên cứu Owner Control/high-fidelity mới đề xuất mở rộng vacancy/revenue. D03/D13/D14 vẫn mở: chưa chọn scope mới hoặc xác nhận 46+ frame đã có. D06/D08/D09/D10 cần kiểm tra lại công thức discount/contribution, hold/open-to-sell, SLA, write/Ads guardrails, ngân sách và quyền. Xem [readiness](IMPLEMENTATION-READINESS.md); giá/ngưỡng/lịch trong nguồn mới không tự thay quyết định cũ.

## Cách ghi một quyết định đã chốt

Ghi ID, nội dung chọn, lựa chọn bị loại và lý do nếu cần, người xác nhận, ngày, liên kết thông điệp/issue/PR và commit baseline. Nếu không có thông tin xác nhận, giữ trạng thái mở. Không dùng checklist đã tích để đại diện việc người dùng chưa trả lời.

## Bản khóa

| Baseline | Trạng thái | Commit được chốt | Người/ngày xác nhận |
| --- | --- | --- | --- |
| S3a dashboard mẫu | Đề xuất, chưa chốt | Chưa có | Chưa có |
| S3b lịch và booking demo | Đề xuất, chưa chốt | Chưa có | Chưa có |
| S3c vận hành và khách demo | Đề xuất, chưa chốt | Chưa có | Chưa có |
| S3d kinh doanh và cấu hình demo | Đề xuất, chưa chốt | Chưa có | Chưa có |
| S4 backend | Chưa đủ quyết định | Chưa có | Chưa có |
