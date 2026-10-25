# Sơ đồ dự án

Mở từng file `.md` trên GitHub ở chế độ xem thông thường để xem Mermaid. Các sơ đồ là **thiết kế đề xuất**. Chưa có backend hoặc tích hợp live tương ứng.

Đã tạo [bộ sơ đồ tương tác Archify](exports/index.html) và [nguồn JSON](sources/). Tải repo rồi mở `exports/index.html`; GitHub không tự chạy HTML này. Xem [bằng chứng và giới hạn kiểm tra](VERIFICATION.md) trước khi dùng làm cơ sở duyệt giao diện.

| Thứ tự | Sơ đồ | Câu hỏi được trả lời |
| --- | --- | --- |
| 0 | [Từng bước thực hiện](../IMPLEMENTATION-STEPS.md) | Đang ở đâu, làm gì tiếp? |
| 1 | [Bản đồ màn hình](01-screen-map.md) | Người dùng thao tác ở đâu? |
| 2 | [Quy trình booking và dọn phòng](02-booking-workflow.md) | Từ nhận booking tới sẵn sàng bán lại diễn ra thế nào? |
| 3 | [Kiến trúc hệ thống](03-system-architecture.md) | Các thành phần kết nối ra sao? |
| 4 | [Mô hình dữ liệu khái niệm](04-data-model.md) | Cần những đối tượng và quan hệ nào? |
| 5 | [Đề xuất doanh thu và duyệt](05-revenue-workflow.md) | Giá, khuyến mãi và AI được kiểm soát ra sao? |

## Mermaid và Archify

Mermaid là nguồn sơ đồ hiện có, được giữ cùng tài liệu trong Git. Có thể sửa nội dung trong PR và xem diff văn bản. Chưa kiểm tra render trực tiếp trên GitHub bằng trình duyệt.

Archify đã chạy để tạo sáu sơ đồ ở `sources/` và `exports/`: lộ trình, màn hình, booking, kiến trúc, doanh thu và vòng làm việc agent/GitHub. [Quy trình chạy lại trong cloud](../ARCHIFY-WORKFLOW.md) giải thích cách sửa nguồn và xuất lại. Sơ đồ dữ liệu vẫn là ERD khái niệm Mermaid; chưa chốt schema vật lý.

Không cần bật GitHub Pages để đọc Mermaid. HTML tương tác cần tải/mở hoặc hosting riêng; đây là quyết định tách biệt với việc lưu dự án trên GitHub.
