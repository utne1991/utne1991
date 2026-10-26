# B06 — Service desk, housekeeping và maintenance

Đề xuất mở rộng [bàn giao buồng phòng](../diagrams/12-housekeeping-handover.md). SLA, nhân sự, tài sản và quyền bồi hoàn chưa chốt.

```mermaid
flowchart TD
    INTAKE[FO / khách / HK báo yêu cầu, sự cố hoặc việc định kỳ] --> TICKET[Tạo ticket scope và tránh trùng]
    TICKET --> TRIAGE[Ưu tiên, SLA, bộ phận và owner]
    TRIAGE --> ROUTE{Loại việc?}
    ROUTE --> HK[Housekeeping: phân công, dọn và checklist]
    ROUTE --> MT[Maintenance: đánh giá lỗi, tài sản, thời gian ngưng]
    ROUTE --> GS[Guest service: yêu cầu, khiếu nại hoặc concierge]
    MT --> IMPACT{Ảnh hưởng booking hoặc an toàn?}
    IMPACT -->|Có| ESCALATE[Báo quản lý, xử lý khách và chặn theo quyền]
    IMPACT -->|Không| WORK[Thực hiện theo phân công]
    ESCALATE --> WORK
    HK --> WORK
    GS --> WORK
    WORK --> QA{Cần kiểm tra/khách xác nhận và đã đạt?}
    QA -->|Chưa| REWORK[Làm lại hoặc escalation có lý do]
    REWORK --> WORK
    QA -->|Đạt| COMPLETE[Đóng việc, cập nhật room readiness và chi phí hợp lệ]
    TIMER[Trễ SLA / đổi ETA / chuyển ca] --> REASSIGN[Cảnh báo owner, bàn giao và ưu tiên lại]
    REASSIGN --> TRIAGE
```

Hoàn tất ticket không giải phóng booking đang ở. Maintenance có asset/area như hồ bơi, spa, điện nước; chặn phòng chỉ khi quan hệ ảnh hưởng và khoảng thời gian hợp lệ, không block toàn khách sạn mặc định. Vật tư/giặt là/đồng hồ/POS là nguồn tích hợp hoặc scope sau khi được chốt.

Nghiệm thu OPS01/02, MOB01/02/03, INV06. Ứng dụng nhân viên có thể responsive/mobile trước; chưa hứa offline sync hay push notification nếu chưa thiết kế lưu trữ, cache dữ liệu khách và xử lý xung đột.
