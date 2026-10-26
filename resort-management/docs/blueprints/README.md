# Bảy sơ đồ ưu tiên — audit 002

**Bản nháp Mermaid ngày 26/10/2026.** Đây là thiết kế đề xuất để xử lý phần thiếu được báo cáo, chưa phải schema/migration hoặc hệ thống đã chạy, chưa được xuất lại bằng Archify. Không thay biên bản nghiệm thu Figma.

| ID | Sơ đồ | Mức | Trạng thái |
| --- | --- | --- | --- |
| B01 | [Core ERD và tenant/property](01-core-erd.md) | P0 | Draft, chờ D01/D02/D11 và chính sách dữ liệu |
| B02 | [Booking, từng dòng và tồn đêm](02-booking-inventory.md) | P0 | Draft, chờ D04/D05 |
| B03 | [Folio, payment và night audit](03-finance-night-audit.md) | P0 | Draft, chờ D06 |
| B04 | [Đồng bộ/retry/đối soát](04-sync.md) | P0 | Draft, chờ nhà cung cấp và D08 |
| B05 | [Quyền và tenant isolation](05-tenant-access.md) | P0 | Draft, chờ D07/D11 |
| B06 | [Service, HK, maintenance, SLA](06-service-operations.md) | P1 | Draft, chờ policy phân công và SLA |
| B07 | [Pricing → promotion → ads approval](07-revenue-approval.md) | P1 | Draft, chưa cấp quyền/ngân sách thật |

B01 ghi các trường lõi và ràng buộc cần có, chưa liệt kê mọi cột/tax/localization/index/migration của bản vật lý. Nếu chọn kiến trúc khác, phải cập nhật trước khi code. Đọc [task và điểm còn chặn](../TASK-RESORT-DESIGN-AUDIT-002.md).
