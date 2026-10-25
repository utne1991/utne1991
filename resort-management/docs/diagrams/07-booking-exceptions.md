# 07 — Đổi ngày, gia hạn và hủy một phần

**Mermaid đề xuất, chưa xuất Archify; chưa có backend thực hiện luồng này.** Bổ sung cho luồng nhận/trả chính, không thay chính sách D05/D06.

```mermaid
flowchart TD
    REQUEST[Đổi ngày / gia hạn / đổi phòng / hủy một phần] --> AUTH[Kiểm tra quyền và phiên bản booking]
    AUTH --> POLICY[Kiểm tra chính sách và dòng phòng bị ảnh hưởng]
    POLICY --> INVENTORY{Cần thêm hoặc đổi tồn?}
    INVENTORY -->|Có| CHECK[Kiểm tra tồn và khả năng gán phòng]
    CHECK --> AVAILABLE{Cập nhật hợp lệ?}
    AVAILABLE -->|Không| KEEP[Giữ nguyên booking cũ và báo xung đột]
    AVAILABLE -->|Có| TRANSACTION[Cập nhật booking và tồn trong giao dịch]
    INVENTORY -->|Không| TRANSACTION
    TRANSACTION --> MONEY[Theo dõi phí / khoản phải thu / hoàn theo chính sách]
    MONEY --> AUDIT[Ghi nhật ký và sự kiện cần đồng bộ]
    AUDIT --> SYNC[Đồng bộ hệ thống ngoài và đối soát]
    LATE[Tiền đến sau khi hold hết hạn] --> RECORD[Ghi nhận idempotent, không tự khôi phục hold]
    RECORD --> RECHECK[Kiểm tra lại tồn và điều kiện xác nhận]
    RECHECK --> HANDLE[Xử lý theo chính sách và báo nhân viên nếu xung đột]
```

Giao dịch database không làm giao dịch ngoài mạng trở thành nguyên tử. Lỗi thu/hoàn tiền hoặc cập nhật OTA cần trạng thái chờ/xử lý lỗi và đối soát; không báo mọi hệ thống thành công chỉ vì cập nhật local đạt.

[Quay lại danh mục](README.md)
