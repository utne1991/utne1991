# 03 — Kiến trúc đề xuất

**Trạng thái:** khái niệm, chưa chọn backend/hosting, chưa có kết nối thật. Nếu dùng PMS hiện có làm nguồn chính, lớp nghiệp vụ và lưu trữ phải điều chỉnh theo quyền sở hữu dữ liệu đó.

```mermaid
flowchart LR
    USER[Nhân viên và quản lý] --> WEB[Web app theo vai trò]
    WEB --> API[API và xác thực / phân quyền]
    API --> CORE[Booking / tồn phòng / vận hành]
    CORE --> DB[(Dữ liệu nghiệp vụ)]
    CORE --> AUDIT[Nhật ký thao tác]
    DB --> METRICS[Tính chỉ số xác định]
    METRICS --> API
    PMS[PMS hoặc channel manager] <--> ADAPTER[Adapter / hàng đợi / đối soát]
    ADAPTER <--> CORE
    OTA[Kênh bán bên ngoài] <--> PMS
    DB --> BACKUP[Sao lưu và kiểm tra khôi phục]
    METRICS --> AI[Trợ lý AI tùy chọn, chỉ đọc trước]
    AI --> API
    ARCHIFY[Archify: tạo sơ đồ khi phát triển] -.-> DOCS[Tài liệu trong GitHub]
    ECC[ECC: hỗ trợ agent viết code] -.-> DEV[Quy trình phát triển và review]
```

Đường nét đứt là công cụ phát triển, không phải luồng phục vụ khách resort. Hello-Agents là nguồn học và tham khảo, chưa là một service trong kiến trúc. Mọi truy vấn của AI cũng phải qua dữ liệu và quyền được kiểm soát.

[Quay lại danh mục](README.md)
