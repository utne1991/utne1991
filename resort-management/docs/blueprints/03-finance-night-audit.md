# B03 — Folio, tiền và chốt ngày

Mô hình đề xuất, chưa phải sổ kế toán hay quy tắc thuế hợp lệ đã triển khai. Chốt D06 trước physical schema và financial API.

```mermaid
erDiagram
    BOOKING ||--o{ FOLIO : billed_to
    FOLIO ||--o{ CHARGE : contains
    PAYMENT ||--o{ PAYMENT_ALLOCATION : allocated
    FOLIO ||--o{ PAYMENT_ALLOCATION : receives
    PAYMENT ||--o{ REFUND : reversed_by
    CHARGE ||--o{ CHARGE_REVERSAL : corrected_by
    PROPERTY ||--o{ CASHIER_SHIFT : operates
    CASHIER_SHIFT ||--o{ PAYMENT : records
    PROPERTY ||--o{ NIGHT_AUDIT_RUN : closes_date
    NIGHT_AUDIT_RUN ||--o{ AUDIT_EXCEPTION : reports
```

Mọi bản ghi có ID, scope tenant/property phù hợp, trạng thái, nguồn, version/thời điểm, liên kết tới nghiệp vụ và khóa chống trùng theo provider. CHARGE giữ service/stay date, giá/thuế tại thời điểm chốt, tiền nguyên đơn vị được thống nhất hoặc decimal chính xác; PAYMENT giữ tiền thu, currency, external reference và status. Allocation hỗ trợ chia khoản nhưng không được phân bổ vượt số tiền hợp lệ; hoàn không vượt phần có thể hoàn theo lịch sử/policy. Không xóa sự kiện đã hạch toán để sửa số; dùng reversal/adjustment có quyền và lý do.

```mermaid
flowchart TD
    CHARGE[Phát sinh charge từ nguồn hợp lệ] --> QUOTE[Tính xác định và khóa quy ước giá/thuế]
    QUOTE --> FOLIO[Ghi folio, audit và trạng thái]
    PAY[Thu / webhook / hoàn theo quyền] --> DEDUP[Scope, idempotency và giới hạn số tiền]
    DEDUP --> LEDGER[Ghi sự kiện và allocation/reversal]
    LEDGER --> RECON[Đối soát provider, folio và ca]
    CLOSE[Yêu cầu chốt ngày kinh doanh] --> PRECHECK[Kiểm tra arrival/no-show, departure, folio, ca và posting]
    PRECHECK --> READY{Hết blocker hoặc exception được xử lý hợp lệ?}
    READY -->|Chưa| FIX[Giữ ngày, giao người xử lý và lưu lý do]
    FIX --> PRECHECK
    READY -->|Có| RUN[Khóa một run theo property và business date]
    RUN --> POST[Post charge đêm/thuế idempotent và lưu checkpoint]
    POST --> VERIFY{Posting và đối soát đủ điều kiện?}
    VERIFY -->|Chưa| RESUME[Giữ trạng thái lỗi, resume an toàn, không post lại]
    RESUME --> POST
    VERIFY -->|Có| ROLL[Lưu report pack, đóng ngày và tăng business date theo policy]
```

Night audit không mặc định chạy lúc 03:00, không tự trừ tiền khách và không chỉ là xuất báo cáo. Chính sách blocker/override, ca, doanh thu theo đêm, no-show, zero balance/công nợ và thời điểm chốt cần D04/D06. Job retry/restore không được tạo charge đêm hai lần. Chưa chọn chuẩn double-entry hoặc hóa đơn điện tử; nếu cần kế toán đầy đủ phải thiết kế riêng hoặc tích hợp ERP.

Nghiệm thu FIN01/02/03, INV02, DATE01, REC01.
