# 08 — Nhận sự kiện, chống trùng và đối soát

**Mermaid đề xuất, chưa xuất Archify.** Nhà cung cấp, API, nguồn chính và ngưỡng dữ liệu trễ chưa chọn; luồng có thể thay đổi theo D01/D02/D08.

```mermaid
flowchart TD
    EVENT[Sự kiện từ hệ thống được cấp quyền] --> VALID[Kiểm tra nguồn và cấu trúc]
    VALID --> AUTHORIZED{Nguồn hợp lệ?}
    AUTHORIZED -->|Không| REJECT[Từ chối và ghi lỗi phù hợp]
    AUTHORIZED -->|Có| QUEUE[Tiếp nhận bền vững theo cơ chế được hỗ trợ]
    QUEUE --> DEDUP{Sự kiện đã xử lý?}
    DEDUP -->|Có| ACK[Trả kết quả không lặp thao tác]
    DEDUP -->|Chưa| ORDER[Kiểm tra phiên bản, thứ tự và mapping]
    ORDER --> APPLY{Có thể áp dụng an toàn?}
    APPLY -->|Có| COMMIT[Cập nhật và đánh dấu xử lý nguyên tử]
    COMMIT --> ACK
    APPLY -->|Lỗi tạm thời| RETRY[Retry có giới hạn]
    RETRY --> ORDER
    APPLY -->|Xung đột hoặc hết retry| ERROR[Hàng đợi lỗi và cảnh báo]
    TIMER[Đối soát theo lịch hoặc khi khôi phục kết nối] --> COMPARE[So với hệ thống nguồn chính]
    ERROR --> COMPARE
    COMPARE --> RESOLVE[Nhân viên hoặc quy tắc đã chốt xử lý lệch]
    RESOLVE --> VERIFY[Kiểm tra lại rồi cập nhật mốc đồng bộ thành công]
```

Luồng chiều gửi ra cũng cần outbox/khóa thao tác, retry và đối soát phù hợp. Không cho cả app và PMS tự nhận là nguồn chính của cùng loại dữ liệu. Khi chưa khôi phục kết nối, UI hiển thị dữ liệu trễ và giới hạn thao tác theo chính sách; không âm thầm bán từ cache.

[Quay lại danh mục](README.md)
