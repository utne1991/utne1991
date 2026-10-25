# Sổ quyết định trước triển khai

**Chưa có baseline triển khai được chủ dự án xác nhận.** Bảng phân biệt ràng buộc đã thể hiện trong yêu cầu, đề xuất của nhóm thiết kế và thông tin còn thiếu. Đề xuất không tự chuyển thành quyết định vì đã được push lên GitHub.

## Các điểm đã thể hiện trong yêu cầu

- Dự án hướng tới resort 100 phòng; cần biết sắp trả, khả dụng theo ngày, công suất và cơ hội cải thiện kinh doanh.
- Tài liệu/mã nguồn lưu trong `utne1991/utne1991/resort-management/`.
- Hoàn thiện bản đồ bằng Archify trước; việc giao Claude lập trình để sau. Không có yêu cầu bắt đầu backend hoặc chạy quảng cáo thật.

## Các quyết định cần chốt

| ID | Chủ đề | Đề xuất hoặc lựa chọn cần xác nhận | Cần trước |
| --- | --- | --- | --- |
| D01 | Hệ thống hiện có | Resort dùng PMS/channel manager nào, kênh bán nào, có API/export được hỗ trợ không? | S4 |
| D02 | Nguồn dữ liệu chính | Nếu giữ PMS: app tích hợp theo quyền; nếu chưa có: đánh giá app làm nguồn booking/tồn chính. Chọn một bên sở hữu ghi cho từng dữ liệu. | S4 |
| D03 | Phạm vi đợt đầu | Đề xuất S3a chỉ dashboard; S3b lịch và booking demo làm đợt riêng. | S3a / S3b tương ứng |
| D04 | Phòng và thời gian | Danh mục phòng/loại thật; múi giờ, giờ nhận/trả, chốt ngày, khách nhận sớm/trả muộn, dọn phòng. Tiếng Việt/VND/Asia/Ho_Chi_Minh hiện là giả định mẫu. | S4 |
| D05 | Chính sách bán | Hold bao lâu, điều kiện xác nhận, hủy/no-show, khách đoàn, gia hạn, overbooking và phòng bảo trì. Đề xuất không chủ động overbooking. | S4 |
| D06 | Giá và tiền | Giá theo đêm, người/giường phụ nếu có; VAT/phí, đặt cọc, hoàn tiền, giảm giá; giao dịch nào qua app, giao dịch nào đối soát từ PMS. | S4 |
| D07 | Quyền và dữ liệu khách | Xác nhận ma trận quyền, người duyệt, thông tin cần lưu, thời hạn lưu và cách xuất dữ liệu. | S4 |
| D08 | Kết nối | Mapping phòng/giá, SLA dữ liệu mới, quyền API, lịch đối soát, xử lý khi mất kết nối hoặc OTA bán vượt tồn. Không tự hứa đồng bộ realtime. | S5 |
| D09 | Vận hành và hosting | Nơi chạy, ngân sách, người trực xử lý, mục tiêu mất dữ liệu tối đa/phục hồi (RPO/RTO), sao lưu, bảo trì và quay lui. | Chạy thử production |
| D10 | Mức tự động hóa | Đề xuất giá/quảng cáo có người duyệt; AI chỉ đọc trước. Ngân sách và giá sàn chưa được cấp. | S6 / S7 |

D01 đã được hỏi trong cuộc trò chuyện; chưa nhận thông tin thì tiếp tục làm tài liệu và giao diện mẫu, giữ câu trả lời là chưa biết. Không suy từ README hồ sơ GitHub rằng resort chưa có PMS.

## Cách ghi một quyết định đã chốt

Ghi ID, nội dung chọn, lựa chọn bị loại và lý do nếu cần, người xác nhận, ngày, liên kết thông điệp/issue/PR và commit baseline. Nếu không có thông tin xác nhận, giữ trạng thái mở. Không dùng checklist đã tích để đại diện việc người dùng chưa trả lời.

## Bản khóa

| Baseline | Trạng thái | Commit được chốt | Người/ngày xác nhận |
| --- | --- | --- | --- |
| S3a dashboard mẫu | Đề xuất, chưa chốt | Chưa có | Chưa có |
| S3b lịch và booking demo | Đề xuất, chưa chốt | Chưa có | Chưa có |
| S4 backend | Chưa đủ quyết định | Chưa có | Chưa có |
