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
| 6 | [Vòng làm việc cloud/GitHub](exports/06-cloud-working-loop.html) | Agent đọc, sửa, kiểm tra và bàn giao bằng repo thế nào? |
| 7 | [Ngoại lệ booking](07-booking-exceptions.md) | Đổi ngày, gia hạn, hủy một phần và tiền đến muộn xử lý ra sao? |
| 8 | [Đồng bộ và đối soát](08-sync-and-reconciliation.md) | Chống trùng, retry và dữ liệu lệch được xử lý ở đâu? |
| 9 | [Quyền tại backend](09-access-control.md) | Ai được làm gì với dữ liệu nào? |
| 10 | [Chạy thử và khôi phục](10-release-and-recovery.md) | Điều kiện mở vận hành và xử lý sự cố là gì? |

Mục 6 là [vòng làm việc cloud/GitHub](exports/06-cloud-working-loop.html) trong bộ Archify. Các mục 7–10 hiện là Mermaid bổ sung sau rà soát; chưa xuất Archify. Sáu HTML cũ ghim snapshot tài liệu trước lần bổ sung, không đại diện một baseline đã khóa. Xem [báo cáo rà soát](../DESIGN-REVIEW.md).

## Mermaid và Archify

Mermaid là nguồn sơ đồ hiện có, được giữ cùng tài liệu trong Git. Có thể sửa nội dung trong PR và xem diff văn bản. Chưa kiểm tra render trực tiếp trên GitHub bằng trình duyệt.

Archify đã chạy để tạo sáu sơ đồ ở `sources/` và `exports/`: lộ trình, màn hình, booking, kiến trúc, doanh thu và vòng làm việc agent/GitHub. [Quy trình chạy lại trong cloud](../ARCHIFY-WORKFLOW.md) giải thích cách sửa nguồn và xuất lại. Sơ đồ dữ liệu vẫn là ERD khái niệm Mermaid; chưa chốt schema vật lý.

Không cần bật GitHub Pages để đọc Mermaid. HTML tương tác cần tải/mở hoặc hosting riêng; đây là quyết định tách biệt với việc lưu dự án trên GitHub.
