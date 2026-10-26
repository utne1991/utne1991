# B02 — Trạng thái từng dòng booking và tồn đêm

State machine đề xuất cho từng dòng lưu trú, không phải trạng thái tiền. Aggregate booking được suy từ các dòng, có nhận/trả/hủy một phần. Chưa chốt policy hold, cọc hoặc no-show.

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Held: kiểm tra quyền và giữ tồn nguyên tử
    Held --> Confirmed: còn hạn, đủ điều kiện, tồn hợp lệ
    Held --> Expired: hết hạn và giải phóng claim
    Held --> Cancelled: hủy theo quyền
    Confirmed --> CheckedIn: đúng quyền, gán hợp lệ, phòng sẵn sàng
    Confirmed --> Cancelled: policy hủy và điều chỉnh tồn
    Confirmed --> NoShow: qua mốc policy, người/job có quyền
    CheckedIn --> CheckedOut: đủ điều kiện đối soát theo policy
    Draft --> Cancelled: bỏ yêu cầu
    Expired --> [*]
    Cancelled --> [*]
    NoShow --> [*]
    CheckedOut --> [*]
```

Đổi/gia hạn không phải nhảy trạng thái tùy ý: preview → kiểm tra version/quyền/chính sách → lock các tài nguyên ảnh hưởng theo thứ tự ổn định → xác minh lại tồn từng đêm và gán phòng → commit cả thay đổi hoặc giữ nguyên. Thu/hoàn và API ngoài là bước riêng có trạng thái đối soát/compensation, không giả làm cùng một DB transaction.

```mermaid
flowchart TD
    REQUEST[Yêu cầu ghi và idempotency key] --> AUTH[Scope, quyền, policy và version]
    AUTH --> LOCK[Transaction và cơ chế khóa tồn phù hợp]
    LOCK --> CHECK{Tồn từng đêm và allocation đều hợp lệ?}
    CHECK -->|Không| REJECT[Rollback, báo xung đột và giữ booking cũ]
    CHECK -->|Có| WRITE[Cập nhật dòng, claim, allocation, audit và outbox]
    WRITE --> COMMIT[Commit local]
    COMMIT --> EXTERNAL[Đồng bộ và đối soát bên ngoài]
    LATE[Tiền đến sau hết hạn] --> RECORD[Ghi nhận idempotent, không hồi sinh hold]
    RECORD --> RESOLVE[Kiểm tra lại tồn; xử lý hoặc hoàn theo quyền/policy]
```

Đề xuất không chủ động overbook. Chưa quyết định lock implementation, isolation level hoặc DB constraints cụ thể; phải chứng minh INV01 bằng test đồng thời, không bằng frontend validation. EXPIRED không tự đổi lại CONFIRMED từ webhook tiền đến muộn.
