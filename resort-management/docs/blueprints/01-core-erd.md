# B01 — Core ERD dự thảo

Phương án **một resort pilot, tenant-aware từ thiết kế**, chưa được chốt thay D11. `tenant_id`/`property_id` không tự bảo vệ dữ liệu. UUID/type dưới đây là đề xuất, chưa chọn database hoặc Auth provider.

```mermaid
erDiagram
    TENANT {
        uuid id PK
        string name
        string status
    }
    PROPERTY {
        uuid id PK
        uuid tenant_id FK
        string code
        string timezone
        string currency
        date business_date
    }
    STAFF_USER {
        uuid id PK
        string auth_subject UK
        string status
    }
    MEMBERSHIP {
        uuid id PK
        uuid tenant_id FK
        uuid user_id FK
        string status
    }
    PROPERTY_ACCESS {
        uuid membership_id PK,FK
        uuid property_id PK,FK
        string role_code PK
    }
    ROOM_TYPE {
        uuid id PK
        uuid tenant_id FK
        uuid property_id FK
        string code
        int capacity
    }
    ROOM {
        uuid id PK
        uuid tenant_id FK
        uuid property_id FK
        uuid room_type_id FK
        string number
    }
    GUEST {
        uuid id PK
        uuid tenant_id FK
        string display_name
        string contact_reference
    }
    BOOKING {
        uuid id PK
        uuid tenant_id FK
        uuid property_id FK
        string reference
        string aggregate_status
        int version
    }
    BOOKING_LINE {
        uuid id PK
        uuid tenant_id FK
        uuid property_id FK
        uuid booking_id FK
        uuid room_type_id FK
        date arrival_date
        date departure_date
        string status
        datetime hold_expires_at
    }
    BOOKING_GUEST {
        uuid booking_id PK,FK
        uuid guest_id PK,FK
        string guest_role
    }
    INVENTORY_NIGHT {
        uuid id PK
        uuid tenant_id FK
        uuid property_id FK
        uuid room_type_id FK
        uuid booking_line_id FK
        date stay_date
        string claim_status
    }
    ROOM_ALLOCATION {
        uuid id PK
        uuid tenant_id FK
        uuid property_id FK
        uuid booking_line_id FK
        uuid room_id FK
        datetime starts_at
        datetime ends_at
    }
    ROOM_BLOCK {
        uuid id PK
        uuid tenant_id FK
        uuid property_id FK
        uuid room_id FK
        datetime starts_at
        datetime ends_at
        string reason
    }
    TENANT ||--o{ PROPERTY : owns
    TENANT ||--o{ MEMBERSHIP : has
    STAFF_USER ||--o{ MEMBERSHIP : joins
    MEMBERSHIP ||--o{ PROPERTY_ACCESS : scoped_by
    PROPERTY ||--o{ PROPERTY_ACCESS : permits
    PROPERTY ||--o{ ROOM_TYPE : defines
    ROOM_TYPE ||--o{ ROOM : groups
    PROPERTY ||--o{ BOOKING : receives
    TENANT ||--o{ GUEST : keeps
    BOOKING ||--|{ BOOKING_LINE : contains
    ROOM_TYPE ||--o{ BOOKING_LINE : requested
    BOOKING ||--o{ BOOKING_GUEST : includes
    GUEST ||--o{ BOOKING_GUEST : linked
    BOOKING_LINE ||--o{ INVENTORY_NIGHT : consumes
    BOOKING_LINE ||--o{ ROOM_ALLOCATION : allocates
    ROOM ||--o{ ROOM_ALLOCATION : assigned
    ROOM ||--o{ ROOM_BLOCK : blocked
```

## Ràng buộc phải thiết kế, không chỉ vẽ FK

- Đề xuất một BOOKING_LINE = một đơn vị phòng của một lượt ở; booking nhiều phòng có nhiều dòng. Nếu chọn quantity trên dòng thì mọi công thức/inventory phải đổi đồng bộ.
- Unique `(tenant_id, property_id, number)` cho phòng, `(tenant_id, property_id, reference)` cho booking, membership user/tenant và claim dòng/ngày theo mô hình đã chọn.
- FK xuyên bảng phải kiểm tra cùng tenant/property bằng composite constraints hoặc cơ chế tương đương; gửi ID của tenant khác không được chỉ dựa vào UUID khó đoán.
- Cặp membership/property trong PROPERTY_ACCESS phải cùng tenant; role_code tham chiếu danh mục quyền được kiểm soát. Không cho client tự thêm membership hoặc tự nhận scope.
- Guest thuộc tenant; quyền xem ở property dựa trên mục đích/lượt ở và D07, không tự mở mọi hồ sơ trong tenant cho mọi nhân viên. Liên kết BOOKING_GUEST phải cùng tenant.
- `arrival_date < departure_date` cho overnight; day-use cần thiết kế riêng trước khi hỗ trợ. Allocation có khoảng không rỗng, đúng dòng/loại và không chồng phòng theo chính sách.
- Inventory claim chỉ hiệu lực khi trạng thái và hold còn hợp lệ; nhiều lý do block cùng phòng/ngày loại trừ một lần. Cần lock/transaction phù hợp, không chỉ `SELECT COUNT` trước insert.
- Giá/thuế theo đêm, ledger, API idempotency, outbox/inbox, service/asset và audit schema chi tiết nằm trong các sơ đồ còn lại, cần physical model trước migration. Không gọi đây là ERD toàn bộ PMS đã khóa.

Nghiệm thu: TEN01/02, INV01/02/04/05/06, DATE01. Quyền của job/export/service-role cần kiểm tra như API người dùng. Dữ liệu thật không được đưa vào fixture.
