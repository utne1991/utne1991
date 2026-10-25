# 09 — Kiểm tra quyền tại backend

**Mermaid đề xuất, chưa xuất Archify; provider đăng nhập và quyền thực tế chưa chốt.** Xem ma trận trong [quy tắc vận hành](../OPERATING-RULES.md).

```mermaid
flowchart TD
    REQUEST[Web / export / công cụ AI gọi API] --> SESSION{Xác thực hợp lệ?}
    SESSION -->|Không| LOGIN[Từ chối hoặc yêu cầu đăng nhập lại]
    SESSION -->|Có| PROPERTY{Thuộc cơ sở của tài nguyên?}
    PROPERTY -->|Không| DENY[Từ chối, không trả dữ liệu]
    PROPERTY -->|Có| PERMISSION{Có quyền cho hành động và tài nguyên?}
    PERMISSION -->|Không| DENY
    PERMISSION -->|Có| LIMIT{Cần hạn mức hoặc người duyệt?}
    LIMIT -->|Có| APPROVAL[Kiểm tra điều kiện duyệt riêng]
    APPROVAL --> ALLOWED{Đủ điều kiện?}
    ALLOWED -->|Không| DENY
    ALLOWED -->|Có| EXECUTE[Thực hiện nghiệp vụ với kiểm tra xung đột]
    LIMIT -->|Không| EXECUTE
    EXECUTE --> AUDIT[Ghi nhật ký phù hợp]
    AUDIT --> RESPONSE[Trả dữ liệu tối thiểu theo quyền]
```

Ẩn menu hoặc có tên vai trò “quản lý” không thay thế các bước kiểm tra này. Quyền quản trị tài khoản, xem tài chính và chi quảng cáo không tự đi cùng nhau.

[Quay lại danh mục](README.md)
