# BeeSmart HotelOS — phương án sản phẩm mở rộng

Nguồn: báo cáo thiết kế người dùng cung cấp ngày 26/10/2026. Nội dung dưới đây là **đề xuất được ghi nhận**, chưa phải quyết định đổi thương hiệu, sản phẩm đã có hoặc bảng giá bán được phê duyệt. Phạm vi nền vẫn là PMS resort 100 phòng theo PROJECT-OVERVIEW.

## 1. Ba lớp cần chốt riêng

| Lớp | Nội dung | Trạng thái |
| --- | --- | --- |
| PMS cho cơ sở | UI01–UI09 và vận hành booking/phòng/khách/tiền | Phạm vi thiết kế hiện tại; chưa khóa hoặc triển khai |
| Profile dịch vụ | Tuỳ chọn phục vụ theo mô hình khách sạn, checklist và năng lực vận hành | Được đề xuất trong bộ BeeSmart; chưa chốt danh mục và tiêu chuẩn |
| Kinh doanh SaaS | Nhiều khách hàng/cơ sở, gói thuê bao, billing và quản trị nhà cung cấp | Phương án nghiên cứu; chưa được thêm vào phạm vi backend |

Chốt việc có hỗ trợ SaaS trước schema backend nếu muốn đưa vào phiên bản đầu. Một cơ sở có nhiều vai trò, một chủ có nhiều cơ sở và nhiều khách hàng thuê phần mềm là ba phạm vi dữ liệu khác nhau; thêm bộ chọn “cơ sở” không tự giải quyết cô lập tenant.

## 2. Giá được báo cáo trong Figma

| Gói | Quy mô được đề xuất | Giá giả định / tháng |
| --- | --- | --- |
| Starter | Đến 30 phòng | 1.490.000 VND |
| Growth | Đến 100 phòng | 3.490.000 VND |
| Premium | Đến 200 phòng | 6.990.000 VND |
| Enterprise | Đa cơ sở | Báo giá riêng |

Chưa xác minh bảng giá trong Figma; bảng này chỉ chép lại số liệu của báo cáo người dùng đưa. Chưa có định nghĩa đầy đủ giới hạn tính năng, người dùng, dung lượng, phòng/cơ sở, thuế, phí onboarding, API/OTA, support, SLA và AI/quảng cáo. Chưa đối chiếu chi phí phục vụ, khả năng trả hoặc biên lợi nhuận. Không dùng làm báo giá/hợp đồng, cấu hình thanh toán hoặc điều kiện chặn tính năng thật.

Giá không tự phụ thuộc hạng sao. Chi phí phần mềm, phí quảng cáo, hoa hồng OTA và phí giao dịch phải được tách khi nghiên cứu mô hình.

## 3. Nếu chọn SaaS, cần thêm gì vào thiết kế?

- Tách tenant/khách hàng, cơ sở, membership và phạm vi tài nguyên; kiểm tra cô lập ở API, database, export, tác vụ nền, cache và công cụ AI.
- Onboarding, import/mapping, mời nhân viên, phân quyền và quá trình hỗ trợ có nhật ký/được cấp quyền.
- Gói/tính năng/quota, chu kỳ thuê bao, thay đổi gói, hóa đơn, hết hạn và chính sách truy cập/xuất dữ liệu.
- Migration, backup/khôi phục/xóa/xuất theo tenant; thời hạn lưu và quyền sở hữu dữ liệu.
- Bảng quản trị nhà cung cấp tách khỏi quản trị khách sạn, theo dõi vận hành/chi phí và sự cố; không mặc định BeeSmartAds có quyền xem mọi dữ liệu khách.

Các mục này chưa được vẽ/triển khai trong repo. Chưa quyết định dùng database dùng chung hay tách riêng; quyết định theo mô hình vận hành, rủi ro và chi phí.

## 4. Profile 2–5 sao và trải nghiệm khách

Giữ profile dịch vụ cấu hình được, không hardcode hạng sao thành quyền phần mềm hoặc giá thuê bao. Cần xác định quốc gia, loại hình cơ sở, tiêu chuẩn và phiên bản áp dụng trước checklist chứng nhận.

Phần mềm có thể lưu tiêu chí, minh chứng, việc cần khắc phục và lịch kiểm tra; không tự công nhận hạng sao. Không gắn nhãn “đạt 5 sao” từ một bộ màn hình hoặc workflow được chọn.

Concierge, pre-arrival, đưa đón, spa/nhà hàng, room service, yêu cầu VIP hoặc giao diện khách cần đặc tả nguồn dịch vụ, nhân sự, quyền dữ liệu và tích hợp trước khi đưa vào scope. Phục vụ khách 4–5 sao không chỉ là thêm một tab hoặc nhãn VIP.

## 5. Việc tiếp theo

Đối chiếu [Figma với đặc tả](FIGMA-HANDOFF.md), rồi chốt riêng D11–D13 trong [sổ quyết định](DECISIONS.md). Chưa đổi kiến trúc PMS hiện tại theo phương án thương mại chưa được xác nhận. Nếu phê duyệt mở rộng, cập nhật tổng quan, sơ đồ dữ liệu/quyền, kế hoạch triển khai và nghiệm thu trong cùng baseline.
