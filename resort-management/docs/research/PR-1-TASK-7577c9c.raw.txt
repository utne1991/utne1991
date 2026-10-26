# TASK-HOTEL-PILOT-OBS-001 — Build-first, isolated pilot & closed-loop observability

**Ngày lập:** 26/10/2026. **Trạng thái:** ĐỀ XUẤT ĐỂ DUYỆT/PHÂN CÔNG; KHÔNG PHẢI ĐÃ TRIỂN KHAI.
**Nguồn:** `PROJECT-OVERVIEW.md`, `docs/OWNEROPS-ASSESSMENT.md`, `docs/research/MARKET-RESEARCH-WORKING-SUMMARY.md`, `docs/DECISIONS.md`, `docs/TASK-RESORT-DESIGN-AUDIT-002.md`.

## A. Mục tiêu và phạm vi v1

Xây **BeeSmart HotelOS OwnerOps Pilot** cho một cơ sở khách sạn/resort dự kiến ~100 phòng; mục tiêu chủ khách sạn xem một dashboard đáng tin cậy, quản lý giao/duyệt việc, nhân viên chỉ thấy việc được giao, nộp checklist/ảnh minh chứng và báo sự cố. Lấy dữ liệu booking/tồn từ **một PMS/CM nguồn chính** hoặc CSV import có xác minh, không tạo inventory/booking song song. Chưa có PMS/API/đơn vị pilot được xác nhận.

**Những chức năng cần có bản đầu:**
1. Owner: doanh thu ghi nhận, tiền thu, chi phí phát sinh, khoảng thiếu dữ liệu, công suất/phòng, chất lượng bộ phận, việc quá hạn, cảnh báo mất đồng bộ; mọi KPI có `asOf`, nguồn, kỳ, drill-down. Chưa đủ chi phí -> ghi `Ước tính / Chưa đủ dữ liệu`, KHÔNG gọi lợi nhuận ròng.
2. Manager/HOD: bảng công việc, giao người/hạn/ưu tiên, kiểm tra minh chứng, yêu cầu làm lại, bàn giao ca, escalation quá hạn.
3. Staff: PWA/mobile view `Việc của tôi`, checklist, báo vướng/sự cố, ảnh khi cần, gửi kiểm tra, trạng thái upload/retry/conflict.
4. Work state machine: `DRAFT -> ASSIGNED -> IN_PROGRESS -> SUBMITTED -> IN_REVIEW -> ACCEPTED | REWORK | BLOCKED | CANCELLED`; giữ submission revision, reviewer, decision reason, audit, `updated_version`, idempotency key.
5. Admin tối thiểu: `tenant -> property -> membership -> role -> permission`, lời mời nhân viên, disable/thu hồi quyền, private media, phạm vi truy vấn/export/job theo tenant/property.
6. Data integration: 1 adapter đọc PMS hoặc CSV mẫu, mapping/reconcile, dấu thời điểm lấy dữ liệu; lỗi stale báo cảnh báo; không có quyền PMS write -> chỉ hiển thị/handoff.
7. Feedback: người dùng chọn `Báo lỗi / Góp ý` trong app, tự gắn route template, app release, request ID và loại thiết bị, ảnh màn hình chỉ sau khi người dùng xem trước và cho phép (bộ lọc PII).

**Để sau:** trực tiếp Booking/Agoda/Expedia API, full PMS/OTA channel manager, thu/hoàn tiền và night audit thay hệ thống gốc, full payroll/POS/ERP, AI tự duyệt / tự đổi giá / tự chạy Ads, sản phẩm SaaS billing và portfolio nhiều cơ sở.

## B. Hạ tầng: KHÔNG dùng chung runtime với ToolAds hiện có

ToolAds được báo cáo đang chạy trên Google Cloud e2-micro khoảng 1 GiB RAM, PostgreSQL 17, HTTPS; tài liệu cũ **không** chứng minh đủ tài nguyên, backup hoặc quyền SSH hiện tại của HotelOS. **Không triển khai HotelOS trên cùng instance e2-micro**, không dùng chung database/schema/secrets/volume/cron/buckets/tunnel token với ToolAds. Chỉ được tái sử dụng **quy trình triển khai đã được chứng minh**, không tái sử dụng credentials.

**Hai cấu hình để chào giá và load-test (không phải cấu hình production đã chốt):**
- Demo dữ liệu giả: một VPS riêng khoảng **2 vCPU / 4 GiB RAM**, SSD 40–80 GiB; app + PostgreSQL chỉ khi đo tài nguyên đáp ứng; backup offsite.
- Pilot giới hạn khách thật: VPS riêng **4 vCPU / 8 GiB RAM** hoặc app + managed PostgreSQL độc lập; chọn sau benchmark, lưu ảnh private object storage, backup offsite, có giám sát và restore test; tăng cấu hình theo tải.
- DNS đề xuất: `demo.hotelos.beesmartads.com` (dữ liệu **giả**); `app.hotelos.beesmartads.com` (chỉ sau nghiệm thu và duyệt). Chưa đặt DNS/SSL hoặc mua tài nguyên. Kiểm tra quyền quản lý tên miền trước.
- Dùng TLS, secret/env ngoài Git, separate app user, DB least privilege, migrations guarded, firewall, rate limit, request size caps, upload virus/content checks, CSP, retention policy, encrypted backups, restore drill. Có staging riêng và không trộn dữ liệu thử với dữ liệu khách thật.
- Budget server, bandwidth, storage, số giờ support, ảnh, thông báo, lỗi, AI, thuế, support ngoài giờ phải được ghi hóa đơn/usage thực trong pilot; **không tự giả định gói 3,49tr có lãi**.

## C. Thu thập lỗi tự động: telemetry khác với dữ liệu khách

Thiết lập **Sentry SDK cho Next.js** hoặc hệ tương đương đã qua kiểm tra bảo mật; **external uptime check** riêng và structured application log/trace với `request_id`, `release_sha`, `environment`, tên route *template*, severity, `property scope` ẩn danh. Không chứa tên/số điện thoại/email khách, hộ chiếu, ghi chú riêng tư, payment info, nội dung ảnh, access/refresh token, cookie, authorization header hoặc raw webhook body. Redact **trước** khi gửi vendor; mặc định tắt replay hoặc masking được thử nghiệm. Tránh tạo alert trùng cho mỗi event.

**Nhóm tín hiệu cần quan sát**
- Kỹ thuật: web 5xx, crash, API latency, job/queue failed, upload failures, DB connectivity, backup/restore result, memory/disk, TLS/uptime, deployment regression.
- Nghiệp vụ: task bị nộp nhưng không tới review; quá hạn review; upload ảnh lỗi; duplicate event; task được duyệt sai revision; lệch PMS snapshot; data stale; KPI cost coverage thiếu; booking/room status mismatch.
- Sản phẩm: user onboarding drop-off, task completion-to-review duration, first-pass QA rate, stale banner impressions, feedback submissions; analytics chỉ tổng hợp, không theo dõi cá nhân ngoài mục đích được thông báo và cho phép.

**Luồng xử lý lỗi tự động (không tự thay production):**
`SDK/log/check -> sanitize & group -> severity -> alert -> issue có reproduction data an toàn -> Codex/Claude đề xuất bản sửa trên nhánh/PR -> CI/typecheck/unit/PG/security/QA -> staging smoke -> người có quyền duyệt -> pilot canary -> theo dõi -> rollback nếu xấu`.
P0: leak dữ liệu khách/sai tiền/sai tồn -> dừng hành động ghi có rủi ro, cảnh báo ngay và điều tra. P1: thao tác chính không dùng được -> xử lý ưu tiên. P2/P3: UI/trải nghiệm -> backlog theo ảnh hưởng và tần suất. **Không cho AI tự sửa schema production, bật PMS WRITE, gửi email khách hoặc tự triển khai code.**

## D. Phân kỳ thực hiện

**Phase 0 — Discovery & security boundary (blocker):** xác minh nguồn PMS/CM; source ownership, loại dữ liệu tài chính, consent/retention, SLA, quyền chủ/quản lý/nhân viên, hạ tầng ToolAds độc lập, budget/quyền tạo DNS. Chốt D01/D02/D06/D07/D11/D14 tối thiểu; xác định risk owner.

**Phase 1 — Public sandbox demo:** ứng dụng tách repo/code, synthetic data, owner dashboard + manager queue + mobile staff + công việc có thể nộp/duyệt/làm lại. Sentry, health endpoint, issue template; không kết nối PMS hoặc dữ liệu khách. Link chỉ cấp cho testers, dễ reset demo.

**Phase 2 — Private pilot:** tenant/property isolation, invitation RBAC, private photo, audit, real database, backup/restore, one import/API **read-only**, reconciliation, tài chính chỉ có dữ liệu hợp lệ và nhãn coverage, external uptime, alerts và support runbook. Staging phải PASS trước; một resort và ít bộ phận để đo.

**Phase 3 — Scale decision:** ghi adoption, task time, review bottlenecks, error trends, monthly cost-to-serve, WTP/pilot fee; quyết định mở rộng / cải tiến / dừng; chỉ sau đó mới mở SaaS billing, pricing/AI sâu.

## E. Definition of done (không được tự nhận PASS)

1. GitHub có mã app thật, source map/report SDK, unit + PG test, migration scripts, CI, SBOM/dependency checks, branch protection phù hợp, private credential scan.
2. Cross-tenant tests: API/list/search/export/object storage/queue/notifications/analytics không lộ tenant B khi là tenant A. All auth checks backend, không chỉ giấu UI.
3. Task workflow tests: assign, submit ảnh/checklist, reject & resubmit, old revision approval blocked, concurrent review, idempotent retry, shift handover and escalation.
4. Finance dashboard số minh họa có nhãn, số thực được truy nguyên đến nguồn/đối soát; thiếu chi phí hiển thị rõ, không gọi lãi ròng; asOf và stale rõ ràng.
5. Error drills: mô phỏng client exception/API 500/job retry/upload fail/PMS stale, kiểm chứng alert không kèm PII/token, issue dedup và rollback playbook.
6. VPS riêng đo tải trên kịch bản pilot và bảo đảm ToolAds không bị tác động; HTTPS, limits, offsite backup + **restore PASS**.
7. Bộ phận người dùng xác nhận UI mobile hữu dụng; nhật ký thao tác và phân quyền có kiểm toán; lỗi P0/P1 chặn phát hành.
8. Đã đo baseline và có trách nhiệm hỗ trợ sự cố; kiểm soát phiên bản và rollback theo runbook.
9. **Không tuyên bố khách dùng thật/thu thập lỗi thật** khi chưa có tên miền, hạ tầng, tài khoản, consent, kiểm thử và logs sản xuất được xác minh.

## F. Báo cáo vận hành cho chủ BeeSmart

Một dashboard *operator* riêng với chủ resort: deployments, error rate/group, P0/P1, active properties, affected sessions, uptime, upload failures, reconciliation lag, per-property COGS, support hours, số release lỗi/rollback. Không cho admin BeeSmart tự ý xem thông tin khách bằng quyền tổng.

**Gate quyết định:** chỉ mở pilot nếu bảo mật và khôi phục đạt; một lỗi cross-tenant hoặc ghi tiền/booking sai thì dừng triển khai có dữ liệu thật. Khi hết pilot, đánh giá theo [MARKET-RESEARCH-WORKING-SUMMARY.md](research/MARKET-RESEARCH-WORKING-SUMMARY.md), không tự nhận 80% adoption hay 30% tiết kiệm đã đạt.

## G. Cách phối hợp Codex / Claude

- Codex: audit repo, lập implementation backlog, test fixtures và review độc lập; có thể tạo app skeleton trên nhánh khác sau khi gate được duyệt.
- Claude: thực hiện các task đã duyệt trong scope một branch/PR, không ghi chung file khi có agent khác làm.
- Người quản lý: phê duyệt scope, chi phí VPS, DNS, dữ liệu khách, API provider và go-live; không có code agent nào tự mua server/chạy production.
- Tài liệu này là handoff, **không tự tạo server, không gọi API production, không nhập dữ liệu khách, không sửa ToolAds**.
