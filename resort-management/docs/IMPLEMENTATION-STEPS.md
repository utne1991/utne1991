# Từng bước thực hiện

Đây là bảng trạng thái chung. Sơ đồ thể hiện **trình tự dự kiến**, không có nghĩa các bước đã được triển khai hoặc được chủ dự án duyệt.

Đọc [kết quả rà soát trước khi khóa](DESIGN-REVIEW.md). Baseline chưa được xác nhận; các quyết định ở [DECISIONS](DECISIONS.md). Theo yêu cầu cập nhật 26/10/2026, thiết kế phải bao quát [cả chín phân hệ PMS](SCREEN-SPECIFICATIONS.md) và [quy trình vận hành](RESORT-OPERATING-MODEL.md) trước khi chốt giao diện. S3a–S3d chia đợt code theo [phạm vi giao việc](IMPLEMENTATION-BRIEF.md), không bỏ qua thiết kế phần còn lại.

Đã tiếp nhận báo cáo thiết kế Figma/FigJam BeeSmart HotelOS; việc ánh xạ frame và nghiệm thu chưa xác minh. Xem [FIGMA-HANDOFF](FIGMA-HANDOFF.md). Chưa đổi các bước S3–S7 thành đã làm từ báo cáo thiết kế.

[Audit 002](TASK-RESORT-DESIGN-AUDIT-002.md) bổ sung wireframe local UI01–UI09, bốn mobile view, ma trận form/quyền/profile và bảy blueprint. Đây là đầu ra thiết kế đã có thao tác mẫu, không phải việc S3 đã hoàn tất thành app framework hoặc backend. UI prototype local đã kiểm tra DOM; visual review/Figma/baseline còn mở.

```mermaid
flowchart TD
    S0["S0 · Tổng quan và dashboard mẫu: đã có"] --> S1["S1 · Bản đồ từng bước và nguồn tham khảo: đã có"]
    S1 --> S2["S2 · Xác nhận thiết kế và nghiệp vụ: chưa chốt"]
    S2 --> S3A["S3a · Dashboard demo: chưa làm app"]
    S3A --> S3B["S3b · Lịch và booking demo: chưa làm"]
    S3B --> S3C["S3c · Buồng phòng, bảo trì và khách demo: chưa làm"]
    S3C --> S3D["S3d · Thu chi, doanh thu, báo cáo và cấu hình demo: chưa làm"]
    S3D --> S4["S4 · Backend và kiểm thử nghiệp vụ: chưa làm"]
    S4 --> S5["S5 · Đồng bộ kênh và chạy thử: chưa làm"]
    S5 --> S6["S6 · Báo cáo và tối ưu doanh thu: chưa làm"]
    S6 --> S7["S7 · Trợ lý AI nếu cần: chưa làm"]
```

| Bước | Trạng thái | Đầu vào / công việc | Đầu ra và kiểm tra |
| --- | --- | --- | --- |
| S0 | Có bản nháp | Tổng quan, PRODUCT-MAP, HTML dashboard | Có file; đã kiểm tra cú pháp JS và phép tính mẫu; chưa kiểm tra giao diện trong trình duyệt |
| S1 | Có tài liệu và HTML Archify; kiểm tra trình duyệt còn vướng | Danh mục ba nguồn, sơ đồ nghiệp vụ, hướng dẫn đọc | Sáu HTML đã đạt validate/deliver/strict check; browser-check lỗi môi trường, chưa duyệt trực quan. Xem [bằng chứng](diagrams/VERIFICATION.md) |
| S2 | Chưa chốt | Vẽ UI01–UI09 và rà hành trình xuyên màn hình; xác nhận chính sách/phạm vi | Hiện mới có đặc tả toàn hệ thống và dashboard HTML; chưa có đủ bản vẽ/phê duyệt |
| S3a | Chưa làm app | Dashboard và tương tác theo CLAUDE-HANDOFF; không gồm lịch đầy đủ | App demo có hướng dẫn chạy, kiểm tra responsive, build/typecheck và PR |
| S3b | Chưa làm | Chốt lịch/form rồi làm đợt demo riêng | Lịch theo ngày, booking mẫu và xử lý xung đột; chưa kết nối dịch vụ thật |
| S3c | Chưa làm | Buồng phòng, bảo trì, khách và yêu cầu demo | Có người phụ trách, ưu tiên và bàn giao; cùng fixture booking/phòng |
| S3d | Chưa làm | Thu chi, doanh thu/chiến dịch, báo cáo và cấu hình demo | Tiền/chỉ số/quyền rõ, không giao dịch hoặc kết nối thật |
| S4 | Chưa làm | Quyết định nguồn booking/tồn phòng chính và mô hình dữ liệu | Booking, quyền, dọn phòng, thanh toán theo phạm vi; kiểm thử đặt đồng thời, chồng lịch, quyền và khôi phục dữ liệu |
| S5 | Chưa làm | Tích hợp được cấp quyền, quy tắc đồng bộ/đối soát | Không mất/trùng sự kiện, phát hiện dữ liệu trễ, đối soát booking/tồn; có kế hoạch quay lui khi chạy thử |
| S6 | Chưa làm | Dữ liệu doanh thu và chi phí đã đối soát | Chỉ số đúng, đề xuất có căn cứ, giới hạn và người duyệt; chưa tự chi quảng cáo |
| S7 | Tùy chọn, chưa làm | Có nhu cầu và tiêu chí đánh giá AI; xác minh quyền dùng nguồn | Trợ lý đọc dữ liệu theo quyền, trả lời có căn cứ; đo độ đúng và chi phí trước khi thêm hành động |

## Cách đọc sơ đồ theo bước

1. [Danh mục sơ đồ](diagrams/README.md): mở bản đồ phù hợp câu hỏi.
2. [Màn hình](diagrams/01-screen-map.md): ai dùng, đi tới đâu.
3. [Booking và dọn phòng](diagrams/02-booking-workflow.md): nghiệp vụ hoạt động thế nào.
4. [Kiến trúc](diagrams/03-system-architecture.md): dữ liệu đi qua hệ thống nào.
5. [Mô hình dữ liệu](diagrams/04-data-model.md): các đối tượng liên quan ra sao.
6. [Giá, khuyến mãi và AI](diagrams/05-revenue-workflow.md): khi nào đề xuất, khi nào được thực thi.

## Quy tắc cập nhật tiến độ

Sau mỗi bước, cập nhật đúng dòng với commit/PR, lệnh kiểm tra và kết quả hoặc tài liệu quyết định liên quan. Không dùng “đã xong” cho phần mới viết prompt. Không đánh dấu công cụ đã cài nếu chỉ đọc hướng dẫn. Khi thay đổi nghiệp vụ, sửa PRODUCT-MAP và sơ đồ liên quan trong cùng thay đổi.

Tài liệu lộ trình này chưa tạo GitHub Issues/Projects, chưa gửi thông báo hay giao việc cho Claude.
