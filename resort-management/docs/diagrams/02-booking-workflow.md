# 02 — Booking, trả phòng và sẵn sàng bán lại

**Trạng thái:** quy trình đề xuất, chưa phải chức năng đã chạy. Nhánh hủy/không đến và chính sách giữ phòng cần xác nhận với resort.

```mermaid
flowchart TD
    REQUEST[Nhận yêu cầu đặt phòng] --> CHECK[Kiểm tra tồn loại phòng và khoảng ngày]
    CHECK --> AVAILABLE{Còn tồn hợp lệ?}
    AVAILABLE -->|Không| ALTERNATIVE[Đề xuất ngày hoặc loại phòng khác]
    AVAILABLE -->|Có| HOLD[Tạo hold có hạn trong giao dịch an toàn]
    HOLD --> CONFIRM{Đủ điều kiện xác nhận?}
    CONFIRM -->|Hết hạn hoặc hủy| RELEASE[Giải phóng tồn và ghi lịch sử]
    CONFIRM -->|Có| BOOKED[Xác nhận booking theo chính sách]
    BOOKED --> ARRIVAL{Kết quả trước nhận khách}
    ARRIVAL -->|Hủy hoặc không đến| POLICY[Xử lý phí và giải phóng tồn theo chính sách]
    ARRIVAL -->|Khách đến| ASSIGN[Gán phòng và kiểm tra phòng sẵn sàng]
    ASSIGN --> READY{Phòng sạch và không bị chặn?}
    READY -->|Chưa| RESOLVE[Ưu tiên xử lý hoặc đổi phòng có kiểm tra tồn]
    RESOLVE --> ASSIGN
    READY -->|Có| IN[Nhận khách]
    IN --> OUT[Trả phòng và đối soát]
    OUT --> DIRTY[Phòng chờ dọn]
    DIRTY --> CLEANING[Phân công và dọn]
    CLEANING --> INSPECT[Kiểm tra phòng]
    INSPECT --> ISSUE{Có lỗi cần sửa?}
    ISSUE -->|Có| BLOCK[Chặn bảo trì theo thời gian]
    BLOCK --> REPAIR[Sửa và kiểm tra lại]
    REPAIR --> INSPECT
    ISSUE -->|Không| SELL[Phòng sạch sẵn sàng nhận khách]
```

Phòng sạch chưa có nghĩa trống trong mọi ngày tương lai: vẫn phải kiểm tra booking và chặn bảo trì của khoảng ngày khách yêu cầu. Backend xử lý cập nhật tồn đồng thời; giao diện không được tự quyết định bán phòng chỉ từ trạng thái sạch.

Luồng chính chưa mô tả đổi ngày, gia hạn, hủy từng phòng hoặc thanh toán sau hold hết hạn; xem [luồng ngoại lệ bổ sung](07-booking-exceptions.md) và [quy tắc vận hành](../OPERATING-RULES.md). Chính sách và thời hạn cụ thể chưa được chốt.

[Quay lại danh mục](README.md)
