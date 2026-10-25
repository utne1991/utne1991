# 10 — Từ code tới chạy thử và vận hành

**Mermaid đề xuất, chưa xuất Archify.** Chưa có CI/CD, staging, production hoặc quy trình khôi phục đã thực thi.

```mermaid
flowchart TD
    SCOPE[Chốt phạm vi và baseline theo giai đoạn] --> PR[Code trong PR có tiêu chí nghiệm thu]
    PR --> CHECK[Build, kiểm thử và review theo phạm vi]
    CHECK --> STAGING[Staging với cấu hình và dữ liệu phù hợp]
    STAGING --> UAT[Nhân viên thử nghiệp vụ và đối soát]
    UAT --> READY{Đạt điều kiện vận hành?}
    READY -->|Chưa| FIX[Sửa và kiểm tra lại phần ảnh hưởng]
    FIX --> CHECK
    READY -->|Có| PREPARE[Backup, diễn tập restore và phương án quay lui]
    PREPARE --> PILOT[Chạy thử có kiểm soát, một nguồn ghi chính]
    PILOT --> MONITOR[Theo dõi lỗi, booking, tồn và tiền]
    MONITOR --> INCIDENT{Có sự cố nghiêm trọng?}
    INCIDENT -->|Không| OPERATE[Tiếp tục trong phạm vi đã nghiệm thu]
    INCIDENT -->|Có| CONTAIN[Giới hạn hoặc dừng ghi theo kế hoạch]
    CONTAIN --> RECOVER[Quay lui / khôi phục có đối soát giao dịch ngoài]
    RECOVER --> VERIFY[Kiểm tra dữ liệu và quyền trước khi mở lại]
    VERIFY --> PILOT
```

Không đồng thời để hai hệ thống bán cùng tồn mà không có quy tắc sở hữu và đồng bộ. Không restore database rồi bỏ qua tiền hoặc booking đã phát sinh tại OTA/cổng thanh toán. Các mục tiêu RPO/RTO và người xử lý sự cố cần chốt trước production.

[Quay lại danh mục](README.md)
