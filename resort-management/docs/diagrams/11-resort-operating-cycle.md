# 11 — Chu trình vận hành resort 100 phòng

**Mermaid thiết kế đề xuất, chưa xuất Archify, chưa có phần mềm thực hiện.** Xem [mô hình vận hành](../RESORT-OPERATING-MODEL.md).

```mermaid
flowchart TD
    CHANNEL[Kênh bán và yêu cầu trực tiếp] --> BOOK[UI02 / UI03: kiểm tra tồn, giá và booking]
    BOOK --> CONFIRM[UI03 / UI06: cọc và xác nhận theo chính sách]
    CONFIRM --> PLAN[Chuẩn bị khách đến, gán phòng và yêu cầu]
    PLAN --> READY{Phòng đủ điều kiện nhận khách?}
    READY -->|Chưa| PRIORITY[UI04: ưu tiên dọn hoặc xử lý/đổi phòng hợp lệ]
    PRIORITY --> READY
    READY -->|Có| IN[UI03: nhận khách]
    IN --> STAY[UI05 / UI04: phục vụ, yêu cầu và sự cố]
    STAY --> CHANGE{Có đổi ngày, phòng hoặc gia hạn?}
    CHANGE -->|Có| RECHECK[UI02 / UI03 / UI06: kiểm tra lại tồn và tiền]
    RECHECK --> STAY
    CHANGE -->|Không| OUT[UI03 / UI06: trả phòng và đối soát]
    OUT --> DIRTY[UI04: giao việc dọn sau trả]
    DIRTY --> INSPECT{Dọn và kiểm tra đạt?}
    INSPECT -->|Không| FIX[UI04: làm lại hoặc bảo trì có kiểm soát]
    FIX --> INSPECT
    INSPECT -->|Có| AVAILABLE[UI02: phòng sẵn sàng, tồn bán theo lịch]
    AVAILABLE --> BOOK
    OUT --> HANDOVER[Bàn giao ca, công việc mở và chốt ngày]
    HANDOVER --> REPORT[UI08: số liệu đã đối soát]
    REPORT --> REVENUE[UI07: phương án giá / gói / chiến dịch]
    REVENUE --> APPROVAL{Người có quyền duyệt và giới hạn hợp lệ?}
    APPROVAL -->|Có| EXECUTE[Thực thi qua tích hợp được hỗ trợ và đo kết quả]
    APPROVAL -->|Chưa| HOLD[Giữ nháp / sửa / không thực thi]
    EXECUTE --> CHANNEL
```

UI01 là điểm tổng hợp và dẫn tới từng phân hệ, không thay các bước xử lý. UI09 giữ chính sách/quyền/nguồn dữ liệu và trạng thái kết nối cho toàn chu trình. Tồn phòng phải cập nhật qua hệ thống nguồn chính; việc quay lại nút booking không có nghĩa mọi phòng sạch đều trống mọi ngày.

[Quay lại danh mục](README.md)
