# 12 — Bàn giao lễ tân, buồng phòng và bảo trì

**Mermaid thiết kế đề xuất, chưa xuất Archify.** Trạng thái công việc và trạng thái sẵn sàng phòng là hai lớp khác nhau.

```mermaid
flowchart TD
    EVENT[Khách trả / yêu cầu dọn / khách sắp đến / phát hiện lỗi] --> TASK[Tạo hoặc cập nhật việc, tránh trùng]
    TASK --> PRIORITY[Trưởng ca xét ưu tiên, khu, kỹ năng và tải việc]
    PRIORITY --> ASSIGN[Giao người phụ trách và hạn]
    ASSIGN --> WORK[Nhân viên bắt đầu và cập nhật tiến độ]
    WORK --> BLOCKED{Có vướng mắc hoặc lỗi?}
    BLOCKED -->|Có| TRIAGE[Báo trưởng ca, đánh giá ảnh hưởng booking]
    TRIAGE --> MAINT[Chặn/sửa theo quyền và khoảng thời gian hợp lệ]
    MAINT --> WORK
    BLOCKED -->|Không| INSPECT[Người có quyền kiểm tra chất lượng]
    INSPECT --> PASS{Đạt và không có chặn ảnh hưởng?}
    PASS -->|Không| REWORK[Giao làm lại hoặc xử lý lỗi]
    REWORK --> WORK
    PASS -->|Có| COMPLETE[Đóng việc và cập nhật tình trạng vệ sinh]
    COMPLETE --> STAY{Phòng còn lượt ở hoặc xung đột?}
    STAY -->|Có| KEEP[Giữ đúng trạng thái lưu trú, kiểm tra lịch]
    STAY -->|Không| READY[Phòng sạch sẵn sàng, thông báo UI02/UI03]
    DELAY[Trễ hạn / đổi giờ đến-trả] --> REASSIGN[Cảnh báo người phụ trách và xét lại ưu tiên]
    REASSIGN --> PRIORITY
```

Đóng việc dọn trong kỳ ở không giải phóng phòng. Bảo trì đè booking cần xử lý xung đột trước, không tự hủy khách. Thời hạn làm việc và quyền kiểm tra chưa được chốt thành chính sách thực tế.

[Quay lại danh mục](README.md)
