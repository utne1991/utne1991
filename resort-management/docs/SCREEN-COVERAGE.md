# Bao phủ màn hình và điều kiện chốt thiết kế PMS

Ngày 26/10/2026. Bảng này phân biệt **có đặc tả**, **có bản vẽ**, **có implementation** và **đã nghiệm thu**. Không có màn hình app production nào đã triển khai.

**Nguồn bên ngoài mới:** người dùng đã cung cấp báo cáo tạo Figma/FigJam BeeSmart HotelOS gồm chín màn nghiệp vụ. Xem [liên kết và bảng đối chiếu](FIGMA-HANDOFF.md). Chưa đọc được nội dung trong phiên cloud này nên không coi bản vẽ bên ngoài là chưa tồn tại hoặc đã nghiệm thu. Bảng bên dưới mô tả artifact hiện có trong repo.

**Audit 002:** người kiểm toán báo cáo 16 frame/4 page, chín UI mới ở mức concept, chưa prototype/components/Auto Layout/mobile trên phần đã kiểm tra. Trong repo nay có [wireframe local cho UI01–09 và bốn mobile view](../design/pms-wireframes.html), [form/state matrix](FORM-STATE-MATRIX.md) và [bảy blueprint](blueprints/README.md). Đây là bản nháp bổ sung, không phải Figma đã cập nhật hoặc implementation PMS. Chưa duyệt trực quan/thiết bị.

| ID | Phân hệ | Đặc tả bố cục/hành động | Bản vẽ/HTML trong repo | App / nghiệm thu |
| --- | --- | --- | --- | --- |
| UI01 | Tổng quan | Có bản nháp | Có dashboard HTML mẫu, chưa kiểm tra hiển thị | Chưa |
| UI02 | Lịch phòng | Có bản nháp | Wireframe local: lịch và form ví dụ; chưa mọi biến thể | Chưa |
| UI03 | Đặt phòng | Có bản nháp | Wireframe local: hàng đợi và form phác thảo, chưa wizard đầy đủ | Chưa |
| UI04 | Buồng phòng/bảo trì | Có bản nháp | Wireframe desktop + mobile HK/MT, checklist/QA mẫu | Chưa |
| UI05 | Khách/yêu cầu | Có bản nháp | Wireframe desktop + mobile GS, form/ticket mẫu | Chưa |
| UI06 | Thu chi/đối soát | Có bản nháp | Wireframe folio, thu/hoàn/chia và night-audit form mẫu | Chưa |
| UI07 | Doanh thu/chiến dịch | Có bản nháp | Wireframe calendar/đề xuất và form duyệt mẫu | Chưa |
| UI08 | Báo cáo | Có bản nháp | Wireframe nguồn chỉ số, drill-down mẫu | Chưa |
| UI09 | Cấu hình/kết nối | Có bản nháp | Wireframe scope/membership/mapping mẫu | Chưa |

Xem [SCREEN-SPECIFICATIONS](SCREEN-SPECIFICATIONS.md). “Có bản nháp” chưa có nghĩa chủ dự án đã duyệt.

## Những hành trình cần xem xuyên màn hình trước khi khóa

| Hành trình | Màn hình liên quan | Kết quả cần thống nhất |
| --- | --- | --- |
| Tìm phòng → booking → cọc/xác nhận | UI02 → UI03 → UI06 | Cùng ID, nguồn tồn và chính sách; trạng thái tiền tách booking |
| Khách đến nhưng phòng chưa sẵn sàng | UI01 → UI03/UI02 → UI04 | Có người xử lý, ưu tiên và cách đổi phòng hợp lệ |
| Trả phòng → dọn → kiểm tra → nhận lượt mới | UI03/UI06 → UI04 → UI02 | Không bán/nhận sớm chỉ vì khách đã trả |
| Gia hạn/đổi phòng/hủy một phần | UI03 → UI02/UI06/UI04 | Tồn, tiền và việc cập nhật nhất quán, lỗi thì không mất trạng thái cũ |
| Yêu cầu khách và dịch vụ tính tiền | UI05 → UI04 hoặc bộ phận phục vụ → UI06 | Có người nhận, xác minh hoàn tất và khoản phát sinh theo quyền |
| Ngày yếu → phương án → duyệt → đo kết quả | UI08/UI02 → UI07 → UI08 | Không tự chi; nguồn dữ liệu và lợi nhuận có thể giải thích |
| Lỗi đồng bộ → đối soát → tiếp tục ghi | UI01 → UI09 → UI02/UI03/UI06 | Cảnh báo không bị bỏ quên, không bán từ cache cũ khi chưa có chính sách |
| Bàn giao ca và chốt ngày | UI01/UI03/UI04/UI06 → UI08 | Công việc mở và chênh lệch được chuyển người có trách nhiệm |

## Điều kiện chốt giao diện toàn PMS

1. Xác nhận danh mục UI01–UI09 và phạm vi tích hợp/phần chưa làm.
2. Vẽ các màn hình chính và panel/form cần cho các hành trình trên; thống nhất điều hướng desktop và công việc mobile.
3. Dùng chung fixture phòng/booking/công việc/tiền theo một `asOf`; ghi rõ dữ liệu báo cáo khác kỳ khi có.
4. Mỗi màn hình có vai trò, bộ lọc, hành động, loading/empty/error/stale/denied và phản hồi xung đột.
5. Người phụ trách nghiệp vụ kiểm tra các hành trình; ghi quyết định, giả định và commit được duyệt.
6. Đồng bộ nguồn sơ đồ, Archify và tài liệu; kiểm tra cấu trúc, trình duyệt và đọc bố cục, báo rõ phần chưa chạy được.

Hiện chưa đạt các điều kiện về bản vẽ/UI toàn hệ thống và kiểm tra trình duyệt. Không chốt giao diện toàn PMS chỉ dựa trên một dashboard. Việc duyệt phạm vi thiết kế toàn hệ thống khác với duyệt cho code hoặc cho chạy production.

## Thứ tự thiết kế đề xuất

UI02/UI03 → UI04 → UI06 → UI05 → UI07/UI08 → UI09, rồi cập nhật UI01 từ nhu cầu đã thống nhất. Đây là thứ tự thiết kế, không mặc định là thứ tự code. Đối chiếu nguồn chính và quyền ngay từ đầu thay vì chờ tới cuối mới sửa luồng.
