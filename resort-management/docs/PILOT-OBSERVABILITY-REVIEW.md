# PR #1 — OwnerOps, VPS riêng và observability

Ngày rà soát: 26/10/2026. Đầu vào: [đề xuất server/pilot](research/SERVER-PILOT-PROPOSAL-2026-10-26.md), [kiểm toán GitHub](research/PROJECT-AUDIT-2026-10-26.md), [manifest nguồn](research/PILOT-OBS-INTAKE-MANIFEST.json) và task trong PR #1.

**Phạm vi người dùng đã xác nhận trong lượt này:** “Chỉ đánh giá và lưu kế hoạch, chưa bắt đầu code ứng dụng”. Backlog/fixture bên dưới là tài liệu chuẩn bị, không phải phần app đã được thực hiện hoặc nhiệm vụ được duyệt.

## 1. Kết quả kiểm tra trực tiếp

- Đã fetch `refs/pull/1/head`, HEAD PR là `7577c9c` và chỉ thêm `resort-management/docs/TASK-HOTEL-PILOT-OBS-001.md` so với common ancestor. [Task tại đúng commit](https://github.com/utne1991/utne1991/blob/7577c9c/resort-management/docs/TASK-HOTEL-PILOT-OBS-001.md), [bản snapshot đã lưu](research/PR-1-TASK-7577c9c.raw.txt).
- Tại lúc rà soát, `main = 0c6b9bf`, merge base là `f9b004d`; mỗi phía có một commit riêng sau merge base. Task PR chưa ở `main`. Không có code app trong diff PR này.
- Trạng thái Draft/open được báo cáo bên ngoài; `gh pr view` qua GitHub GraphQL trả `Forbidden` trong phiên này nên chưa xác nhận metadata hiện hành. Git đọc được ref không chứng minh quyền GitHub API hoặc quyền merge/tạo repo private.
- Chưa merge PR, sửa nhánh của tác giả, gửi review/comment, tạo VPS/private repo, cấu hình DNS, Sentry hoặc triển khai ứng dụng. Các bản raw giữ đúng bytes nguồn; không coi snapshot lưu ở main là đã merge hoặc phê duyệt PR.

## 2. Đánh giá

Kế hoạch phù hợp với OwnerOps/control layer: demo synthetic trước, nguồn booking/tồn duy nhất, trách nhiệm người làm/người duyệt, tài chính có nguồn/coverage, môi trường HotelOS tách ToolAds và telemetry không chứa dữ liệu khách. Khả năng tự phát hiện lỗi có thể xây; điều này không chứng minh hệ thống tự sửa đúng hoặc cho phép tự phát hành production.

Task tự ghi **ĐỀ XUẤT ĐỂ DUYỆT/PHÂN CÔNG**, chưa phải deployed hoặc scope đã xác nhận. Vì vậy cần phân biệt tài liệu sẵn để review, demo có thể triển khai cục bộ, và quyền dùng hạ tầng/dữ liệu thật.

## 3. Điều chỉnh cần có trong backlog

| Ưu tiên | Điểm cần sửa/làm rõ | Cách xử lý đề xuất |
| --- | --- | --- |
| P0 | Phase 0 yêu cầu biết PMS thật có thể làm chặn cả demo synthetic | Tách demo gate: scope/quyền/fixture/telemetry; pilot gate mới bắt buộc nguồn PMS/import thật, D01/D02 và quyền dữ liệu |
| P0 | Tenant/RBAC xuất hiện ở Phase 2 nhưng Phase 1 đã có testers và đăng nhập | Đưa boundary, quyền server, chống tự duyệt và private/disabled media ngay từ thiết kế backend. Demo role switch không được gọi là auth |
| P0 | Chuỗi state dạng một dòng chưa xác định đủ BLOCKED/REWORK/CANCELLED | Lập transition/actor/version rõ; block có đường resume, rework tạo submission mới, reviewer không duyệt revision cũ, cancel không làm mất audit |
| P0 | Ghi task accepted có thể bị hiểu là cập nhật tồn phòng thật | Tách task result/QA, readiness projection và PMS acknowledgment. Không có PMS write thì chỉ hiển thị/handoff |
| P0 | beforeSend của Sentry không bao phủ mọi log/trace/worker | Allowlist/redact ở frontend/server/job, breadcrumb/span/query/feedback và log pipeline; không gửi raw webhook, ảnh hoặc nội dung tự do mặc định |
| P0 | Private repo/app target chưa được chỉ định | Giữ tài liệu công khai; chọn repo app private theo yêu cầu chủ dự án trước khi push code triển khai. Repo private không thay kiểm soát quyền runtime hoặc quản lý secrets |
| P0 | Public sandbox nhưng có upload/feedback tự do | Synthetic demo mặc định chỉ dùng mẫu; media thật/replay/screenshot ngoài phạm vi trước policy, quyền và quota. Invitation/rate/size/retention cần trước mời testers ngoài |
| P1 | Severity/alerts chưa có tiêu chí đo end-to-end | Dùng error drills, grouping, owner, receipt và xác minh alert thực; chỉ tạo issue/gửi thông báo khi đã cấp quyền/kết nối cho luồng đó |
| P1 | “Rollback” có thể chỉ rollback image, không xử lý migration/data | Quy định rollback app tương thích DB, checkpoint/idempotency và restore có đối soát; giữ runbook và diễn tập trước pilot |
| P1 | Cấu hình VPS/budget/domain còn là đề xuất | Báo giá/benchmark và quyền DNS riêng trước mua/deploy; không coi ToolAds e2-micro, PostgreSQL hoặc SSH đã được xác minh |

## 4. Ba mức thực hiện tách biệt

| Mức | Đầu ra | Điều kiện trước mức đó |
| --- | --- | --- |
| A — Demo cục bộ/synthetic | Một luồng owner/manager/staff giao → nộp → làm lại/duyệt → dashboard; dữ liệu reset được, adapter fake | Scope được giao, nơi đặt app/source; không cần credentials PMS hoặc mua VPS để phát triển demo |
| B — Sandbox chia sẻ | App được host riêng, testers được quản lý, telemetry đã scrub, giới hạn upload/abuse, nguồn synthetic | Repo/deploy target, chi phí và quyền domain được chọn; kiểm tra auth/isolation và vận hành phù hợp |
| C — Pilot dữ liệu thật | Một property, một nguồn PMS/import read-only, media private, audit/backup/restore, support và kiểm chứng | D01/D02/D06/D07/D09/D11/D14 liên quan được chốt, quyền dữ liệu/nguồn, test và restore thực đạt |

Việc có thể tiến ở A không miễn điều kiện B/C. Không cần bật PMS write, billing SaaS, thu tiền khách, direct OTA hoặc AI auto-deploy cho demo đầu.

## 5. Backlog triển khai để giao từng phần

Các ID OBS-* bên dưới là đề xuất chia việc, chưa được giao hoặc đánh dấu xong.

| ID | Hạng mục | Phụ thuộc | Đầu ra nghiệm thu |
| --- | --- | --- | --- |
| OBS-00 | Scope + repo app + data/auth contract | Quyết định mức A/B/C | Ranh giới ghi/đọc, role/action, state machine, synthetic fixtures và tiêu chí có thể chạy |
| OBS-01 | App skeleton + cấu hình môi trường | OBS-00, repo đích | Hướng dẫn chạy, config validation, health/live/ready không lộ secrets; source không phụ thuộc ToolAds |
| OBS-02 | Work engine + owner/manager/staff | OBS-01 | Server permission nếu có backend; submit/rework/revision/idempotency/concurrency được kiểm tra, số demo có nhãn |
| OBS-03 | Adapter fake/CSV + freshness | OBS-00/01 | Nguồn/asOf, mapping và data quality; stale không bị che; không tạo inventory nguồn thứ hai |
| OBS-04 | Telemetry + feedback | OBS-01 | Allowlist/redaction trên mọi runtime, release/request ID, dedup; provider chưa cấu hình thì không gửi ra ngoài |
| OBS-05 | CI + drills + staging smoke | OBS-02/03/04 | Kiểm tra có thể fail theo fixture; không ghi pass nếu chưa thực thi hoặc test bỏ qua |
| OBS-06 | Hạ tầng riêng và sandbox | OBS-05 + quyền/chi phí target | HTTPS, hạn mức, external uptime, tester isolation; demo không có dữ liệu lưu trú thật |
| OBS-07 | Backup/restore + pilot runbook | OBS-05/06 + nguồn/dữ liệu hợp lệ | Restore thực, kiểm tra scope/financial coverage, support/risk owner, go-live gate rõ |
| OBS-08 | Controlled improvement loop | Các gate liên quan đạt | Triage → fix PR → tests → staging → release được duyệt → monitor/rollback; không tự sửa production |

## 6. Fixture và nghiệm thu cụ thể

[Fixture synthetic](../design/fixtures/ownerops-pilot-scenarios.json) mô tả một lượt giao việc phòng mẫu và các tình huống sai quyền/version, duplicate submit, PMS stale và telemetry. Nó là **dữ liệu/expected outcomes**, chưa là test implementation hoặc kết quả pass.

Khi có app, cần kiểm tra ít nhất:

- Tenant A không xem/sửa/export/media của B; thu hồi membership phải có hiệu lực theo policy, actor không tự đổi scope.
- Staff không tự nhận quyền reviewer. Duyệt revision cũ hoặc hai review đồng thời phải bị chặn đúng điều kiện; retry không tạo submission/review hai lần.
- Accepted của việc dọn không giải phóng phòng đang có khách hoặc ghi PMS chưa được cấp quyền.
- Dashboard phân biệt submitted/accepted/first-pass/on-time; tài chính có kỳ/nguồn/coverage và không gọi profit thật khi thiếu chi phí.
- Client exception, API 500, job retry, upload fail, stale source có tín hiệu phân loại/dedup; canary PII/token test không xuất hiện trong payload ra vendor/log.
- Feedback không tự đính kèm screenshot hoặc nội dung nhạy cảm; health không trả stack trace/DSN/DB connection string.
- Restore trong môi trường kiểm tra đạt mục tiêu đã chọn; release mới không tương thích phải có đường giữ/khôi phục an toàn. Không dùng backup cùng VPS làm bằng chứng duy nhất.

P0/P1 chặn dữ liệu thật theo ảnh hưởng và policy; lỗi UI nhỏ không được quy thành an toàn chỉ vì không có exception. Không dựa vào việc “đã tích hợp Sentry” để tuyên bố đã quan sát mọi lỗi nghiệp vụ.

## 7. Mối quan hệ với PR #1 và việc còn cần chỉ định

PR #1 được giữ làm đề xuất của tác giả; chưa tự merge hoặc đổi trạng thái. Bản main lưu review/snapshot để không mất ngữ cảnh khi nhánh khác cập nhật. Khi được yêu cầu tích hợp task, cần rebase/merge theo chiến lược repo và giữ commit mới trên main, không reset về base cũ.

Trước bắt đầu code cần biết scope được giao và vị trí repo app (báo cáo đề xuất private); trước triển khai cần thêm hạ tầng, domain và chi phí được chỉ định. Không cần xin token bí mật qua chat. Dùng bindings/quyền truy cập hiện có trước; chỉ bổ sung yêu cầu thực sự thiếu qua nơi quản lý cấu hình an toàn.

Tài liệu và fixture này chưa thực thi OBS-01–08, chưa cho phép mua VPS, sửa DNS, tác động ToolAds hoặc mở pilot dữ liệu thật.
