# 01 — Bản đồ màn hình

**Trạng thái:** đề xuất. Chỉ dashboard HTML mẫu đã tồn tại; các màn hình còn lại chưa được lập trình.

```mermaid
flowchart TD
    LOGIN[Đăng nhập] --> ROLE[Quyền theo cơ sở và vai trò]
    ROLE --> DASH[Dashboard theo vai trò]
    DASH --> TODAY[Khách đến / sắp trả / việc cần dọn]
    DASH --> CAL[Lịch phòng theo ngày và loại phòng]
    DASH --> ROOM[Chi tiết phòng và thời gian sẵn sàng]
    DASH --> BOOKINGS[Danh sách đặt phòng]
    BOOKINGS --> DETAIL[Chi tiết booking nhiều phòng]
    DETAIL --> PAYMENT[Đặt cọc / thanh toán theo quyền]
    DETAIL --> CHANGE[Thay đổi / hủy theo chính sách]
    DASH --> HK[Buồng phòng và bảo trì]
    HK --> TASK[Phân công và kiểm tra]
    DASH --> REPORT[Báo cáo công suất và hiệu quả kênh]
    REPORT --> REVENUE[Đề xuất giá và khuyến mãi]
    DASH --> SETTINGS[Cấu hình và tích hợp]
```

Dashboard quản lý không phải màn hình chung cho mọi nhân viên. Buồng phòng chỉ được xem dữ liệu phục vụ công việc; quyền cần kiểm tra tại backend. Danh sách màn hình không tự cấp quyền thao tác.

[Quay lại danh mục](README.md)
