# Bằng chứng tạo sơ đồ bằng Archify

Ngày chạy: 25/10/2026. Nội dung là **thiết kế đề xuất**, dựa trên tài liệu trong commit `24f04ba` của repository. Công cụ Archify: `81c6be8d87090670c45d08a8f97f9d29c5af0bec`. Đây là kết quả trên máy cloud hiện tại, không phải kiểm thử trên máy mới.

| Artifact | Validate | Deliver | Strict check | Browser-check |
| --- | --- | --- | --- | --- |
| [Lộ trình](exports/00-roadmap.html) | Đạt | Đạt | Đạt | Lỗi môi trường |
| [Màn hình](exports/01-screen-map.html) | Đạt | Đạt | Đạt | Lỗi môi trường |
| [Booking và buồng phòng](exports/02-booking-workflow.html) | Đạt | Đạt | Đạt | Lỗi môi trường |
| [Kiến trúc tổng quan](exports/03-system-architecture.html) | Đạt | Đạt | Đạt | Lỗi môi trường |
| [Doanh thu và duyệt](exports/05-revenue-workflow.html) | Đạt | Đạt | Đạt | Lỗi môi trường |
| [Agent và GitHub](exports/06-cloud-working-loop.html) | Đạt | Đạt | Đạt | Lỗi môi trường |

Browser-check không hoàn tất vì Chromium không khởi chạy được sandbox: helper `/usr/lib/chromium/chrome-sandbox` có owner `nobody`, còn user namespace mapping không khả dụng trong môi trường này. Không thay quyền hệ thống hoặc tắt browser sandbox để né lỗi. Các receipt ghi `browser-check: fail`, không phải `pass` hoặc `skipped`.

Chưa kiểm tra cảm quan bố cục, tương tác và hiển thị trên trình duyệt. Cần chạy lại bằng Chrome/Chromium có sandbox hoạt động trước khi khẳng định toàn bộ chuỗi finalize đạt. Không có screenshot chứng minh giao diện đẹp hoặc đã được duyệt.

Mỗi HTML có các tệp cùng tên `.delivery.json`, `.browser-check.json`, `.finalize.json` và `.finalize-summary.json` trong `exports/`. Các tệp chứa kết quả, hash và đường dẫn thực tế của lần chạy; chúng không phải chứng nhận tính đúng của nghiệp vụ thiết kế.

Sơ đồ dữ liệu hiện chỉ là [ERD khái niệm Mermaid](04-data-model.md); chưa tạo ERD vật lý bằng Archify vì chưa chốt schema/cột/khóa. Không dựng bảng SQL giả để làm sơ đồ có vẻ hoàn chỉnh.

## Rà soát sau khi xuất

Đã kiểm tra lại sáu cặp nguồn/HTML so với hash receipt và sự tồn tại của các đường dẫn bằng chứng tại revision được ghim: khớp. Đây là kiểm tra tính toàn vẹn, không phải chạy lại Chromium hoặc kiểm thử nghiệp vụ.

Lần [rà soát thiết kế](../DESIGN-REVIEW.md) bổ sung các sơ đồ Mermaid 7–10, quy tắc và tiêu chí giao việc. Những nội dung đó chưa được xuất lại vào sáu HTML ở bảng trên. Receipt vẫn chỉ chứng minh snapshot cũ; không có baseline vận hành đã được duyệt.
