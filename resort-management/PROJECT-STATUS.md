# Trạng thái chung và việc tiếp theo

Ngày rà soát: 26/10/2026. Snapshot đối chiếu ban đầu: `f9b004d69f34de0473fa2505d77d6f1c3fd11ab6`, nhánh `main` của `utne1991/utne1991`. Đây là trang tổng hợp để đọc trước, không phải phê duyệt baseline hoặc lệnh bắt đầu code.

**Rà soát mới theo nghiên cứu Owner Control, đầu vào `dd90c19`:** đã lưu [nghiên cứu high-fidelity/vacancy](docs/research/OWNER-CONTROL-HIGH-FIDELITY-2026-10-26.md), lập [bảng sẵn sàng triển khai](docs/IMPLEMENTATION-READINESS.md) và [bản đồ chỉ dẫn thống nhất](docs/IMPLEMENTATION-MAP.md). Đủ đầu vào để thiết kế/chọn một demo nhỏ; chưa đủ code toàn bộ sản phẩm hoặc deploy/pilot. Các frame OWN-/MGR-/HK-/MNT-/FD- mới là ID đề xuất; chưa có high-fidelity/export được tạo trong lần nghiên cứu này. Chỉ đánh giá/lưu, chưa bắt đầu app.

**Tiếp nhận kế hoạch PR #1 sau vòng rà soát ban đầu:** đã đọc head `7577c9c`, một file task kế hoạch, và lưu [review + backlog + fixture](docs/PILOT-OBSERVABILITY-REVIEW.md). Main tại thời điểm đọc PR là `0c6b9bf`; task chưa được merge. Người dùng xác nhận chỉ đánh giá/lưu, chưa bắt đầu code. Không có VPS/repo app/DNS/telemetry thực được tạo.

**Lượt tiếp tục sau commit `ceb5e95`:** đã gom NEXT-01 thành [đặc tả OwnerOps đề xuất](docs/OWNEROPS-MVP-CONTRACT.md) và sửa [handoff Claude](docs/CLAUDE-HANDOFF.md) để không mặc định giao dashboard S3a cũ. Bổ sung luồng sáu view, ma trận quyền, state/revision, source ownership và mẫu số KPI. Đây là kế hoạch chưa duyệt; không phải prototype mới, backend, test nghiệp vụ hoặc tiến độ OBS-01–08.

## 1. Kết luận

**Các báo cáo đã nhận, tài liệu thiết kế và đầu ra local có thể lưu đã được đưa vào repo. Đủ căn cứ để chọn MVP và thử một hành trình demo, chưa đủ để kết luận sản phẩm sẵn sàng vận hành/bán.**

Thông tin Figma/FigJam hiện mới là liên kết và các báo cáo được chuyển tiếp; không có file thiết kế gốc, node/version manifest hoặc export để gọi là đã đồng bộ vào GitHub. Nghiên cứu và đề xuất được lưu không tự chứng minh mọi giá, nhu cầu, quyền API hoặc kết quả kinh doanh.

## 2. Đã lưu những gì?

| Nhóm | Đã có trong repo | Phạm vi kiểm chứng |
| --- | --- | --- |
| Nghiên cứu thị trường | [Nguyên văn, bản dễ đọc, working summary và source register](docs/research/README.md) | Bản gốc khớp hash upload; chưa có URL trích dẫn trong báo cáo, phỏng vấn/WTP hoặc pilot thật |
| Đề xuất OwnerOps | [Nguyên văn, manifest và đánh giá](docs/OWNEROPS-ASSESSMENT.md) | Đã đánh giá scope/dependency và kiểm tra số học mẫu; chưa chốt giá/scope |
| Báo cáo kiểm toán Figma/PMS | [Nguyên văn](docs/research/DESIGN-AUDIT-002-2026-10-26.raw.txt), [manifest](docs/research/DESIGN-AUDIT-002-MANIFEST.json), [task xử lý](docs/TASK-RESORT-DESIGN-AUDIT-002.md) | Hai lần upload cùng nội dung được lưu một bản; không nhận là Codex đã đọc trực tiếp Figma |
| Figma/FigJam | [Hai liên kết, số khung theo báo cáo và bảng mapping cần kiểm tra](docs/FIGMA-HANDOFF.md) | Báo cáo mới ghi 16 frame/4 page; chưa có node/version/export hoặc visual acceptance |
| Thiết kế sản phẩm | [Chín đặc tả](docs/SCREEN-SPECIFICATIONS.md), [coverage](docs/SCREEN-COVERAGE.md), [quy tắc vận hành](docs/OPERATING-RULES.md), [vai trò/profile/release](docs/FEATURE-ROLE-PROFILE-RELEASE.md) | Bản nháp và điều kiện nghiệm thu, chưa duyệt mọi hành vi |
| Owner Control & Revenue | [Nghiên cứu mới/nguyên văn/manifest](docs/research/README.md), [readiness](docs/IMPLEMENTATION-READINESS.md), [implementation map](docs/IMPLEMENTATION-MAP.md) | Kiểm tra repo/số học và source integrity; chưa xác minh claim Figma/web, chưa tạo 46+ ảnh hoặc đổi scope/giá |
| Wireframe local | [Chín phân hệ và bốn mobile view](design/pms-wireframes.html), [form/state matrix](docs/FORM-STATE-MATRIX.md), dashboard cũ | DOM check 9+4 view, 65 state cases, 13 form và lịch 7/30/90 đã đạt; hash còn khớp, chưa browser/visual/PMS test |
| Sơ đồ | [Bảy blueprint P0/P1](docs/blueprints/README.md), [Mermaid và sáu HTML Archify](docs/diagrams/README.md) | Bảy blueprint có 9 khối Mermaid đã parse; Archify deterministic gates đạt nhưng browser-check lỗi môi trường; các snapshot chưa đồng bộ mọi bổ sung |
| Benchmark kỹ thuật | [Open Hotel PMS, Kamra và QloApps](docs/research/PMS-BENCHMARK.md); [Archify/ECC/Hello-Agents](docs/TOOLING-AND-SOURCES.md) | Source/license đọc có chọn lọc, chưa cài/test/audit toàn sản phẩm hoặc quyết định reuse |
| Hướng dẫn agent và quyết định | CLAUDE.md, [DECISIONS](docs/DECISIONS.md), brief, lộ trình và các đánh giá | Giữ rõ điều được giao, đề xuất và điều chưa chốt; không có baseline backend đã xác nhận |
| VPS/pilot/observability | [Hai báo cáo và snapshot PR #1](docs/PILOT-OBSERVABILITY-REVIEW.md), manifest, backlog OBS-* và fixture synthetic | Đã đọc diff và task bằng Git; metadata PR qua API bị Forbidden, Draft/open theo báo cáo; chưa merge hoặc triển khai |

Trong lần kiểm tra trước cập nhật này, repo có 100 tệp dự án được theo dõi. Con số này chỉ mô tả snapshot đầu vào, không phải thước đo mức hoàn thành hoặc số tệp sau lần bổ sung. Bản nguyên văn không đồng nghĩa lưu toàn bộ cuộc trò chuyện; các thông điệp không phải upload được phản ánh qua tài liệu/handoff có liên quan.

Không có package manifest/app framework, backend, migration BeeSmart đã chạy, tài khoản thật hoặc deployment production trong snapshot đã kiểm tra. Không nhận trạng thái MacBook/VPS hoặc file Figma ngoài repo là đã được xác nhận từ Git.

## 3. Tài liệu đủ ở mức nào?

| Mốc | Đánh giá |
| --- | --- |
| Hiểu bài toán và xem xét định vị | Có đủ tài liệu để thảo luận, so sánh và chọn thử nghiệm |
| Demo với dữ liệu giả | Có wireframe nền; cần chọn một hành trình OwnerOps có trạng thái end-to-end thay vì chỉ mở form và lưu draft |
| Chốt UI/baseline để code sản phẩm | Chưa: OwnerOps MVP, nguồn dữ liệu, quyền/acceptance policy và nguồn thiết kế chưa được chốt |
| Backend/pilot với dữ liệu thật | Chưa: source ownership, schema/API, tenant/quyền, connector, policy tiền và kiểm thử thực chưa có đủ |
| Mở bán hoặc tự động ghi PMS/chi tiền | Chưa: chưa có vận hành đã nghiệm thu, quote/usage/support economics, entitlement hoặc kết quả pilot |

## 4. Những việc cần bổ sung, theo thứ tự

### NEXT-01 — Chốt một scope MVP và bản đồ quyền dữ liệu

Đề xuất xem OwnerOps là ứng viên: chủ xem tổng hợp/ngoại lệ, quản lý giao/duyệt, nhân viên làm/nộp/báo sự cố. Chọn một bộ phận như housekeeping cho hành trình đầu, dùng cùng PMS hiện có nếu khả dụng. Chưa cần chốt mọi phân hệ dài hạn để thử demo.

Đầu ra cần có: một scope ngắn gồm người dùng, hành trình, dữ liệu đọc/ghi, phần không làm, policy reviewer/giá trị critical, mẫu số KPI, nguồn tài chính và điều kiện nghiệm thu. Quyết định liên quan D02/D03/D06/D07/D11/D14; chưa được đánh dấu đã chốt.

Bản thảo đã có tại [OWNEROPS-MVP-CONTRACT](docs/OWNEROPS-MVP-CONTRACT.md): đề xuất housekeeping synthetic trước, chưa bật tài chính/ảnh thật/PMS write; còn cần chốt scope, người review, KPI, nguồn UI và nơi đặt mã. NEXT-01 vẫn mở.

### NEXT-02 — Khảo sát resort thật và một nguồn dữ liệu

Xác định PMS/CM đang dùng, quyền API/export, mẫu dữ liệu đã ẩn thông tin cá nhân, room/rate map và cách phát sinh task. Đề xuất lập ma trận ownership/capability cho booking, inventory, room readiness, task, chi phí, revenue/collection và approval. Chỉ một bên làm nguồn ghi chính cho từng dữ liệu; CSV có thể dùng để prototype/đối soát nhưng không tự cho phép bán phòng realtime.

Đầu ra cần có: data dictionary + capability matrix + mapping + cách đối soát + chi phí/quyền được xác nhận. Nếu chưa có API, demo vẫn có thể dùng fixture/import; không chuyển sang pilot ghi PMS khi thiếu khả năng đã cấp.

### NEXT-03 — Thử một hành trình hoàn chỉnh với người dùng

Ví dụ: sự kiện trả phòng hợp lệ → quản lý giao → nhân viên thực hiện → nộp → quản lý yêu cầu làm lại → nộp lại → nghiệm thu đúng revision → chủ xem kết quả/ngoại lệ. Task accepted khác room-ready và khác mốc PMS xác nhận đã cập nhật.

Đầu ra cần có: demo ba góc nhìn với state thật trong phạm vi demo, thử bằng người sử dụng trên điện thoại, ghi lỗi thao tác/thời gian chờ review. Sau đó mới khóa schema/API/authorization cho backend nhỏ và phát triển theo backlog. Hiện wireframe chỉ lưu draft mẫu; chưa có work engine end-to-end đã chạy.

## 5. Cần nghiên cứu thêm gì?

Đề xuất tạm dừng mở rộng nghiên cứu thị trường tổng quát và danh sách tính năng. Ưu tiên kiểm chứng hẹp:

| Kiểm chứng | Cách thực hiện | Kết quả giúp quyết định |
| --- | --- | --- |
| Pain và workflow thật | Quan sát một ca tại resort, trao đổi chủ/GM/HK/FO/FIN; có thể 5–10 cuộc phỏng vấn khám phá, không coi là survey đại diện | Công việc cần giải quyết trước, reviewer/owner thật và chỉ số baseline |
| Một connector khả thi | Đọc tài liệu/quyền API/export của PMS cụ thể, hỏi vendor và thử read-only bằng môi trường được cấp | Có thể lấy/đối soát gì, cần phí/quyền nào, có đường ghi hay chỉ bàn giao |
| Giá và cost-to-serve | Lấy URL/quote chính thức, thử offer với người mua, đo support, lưu ảnh, onboarding, connector và usage | Scope/quota/gói có biên lợi nhuận và WTP thực, thay vì so giá headline |
| Chất lượng UX/khả năng dùng | Lấy node/version/export Figma hoặc dùng wireframe làm nguồn riêng; thử 3 vai trò, form/error/stale/rework/mobile | Có thể khóa một baseline UI nhỏ với bằng chứng |

AI không thể tự tạo lời phỏng vấn, API entitlement, quote thương mại hoặc kết quả pilot từ nghiên cứu web. RPO/RTO/retention, bảo mật, backup và vận hành cần chốt khi chuẩn bị dữ liệu thật, không được bỏ qua vì gọi là pilot.

## 6. Điểm nên hợp nhất trước khi giao code

- Thứ tự tham chiếu: trang này → market working summary → OwnerOps assessment → DECISIONS → scope được giao. Full PMS specs/prototype là thư viện thiết kế, không tự thay scope MVP.
- Các đề xuất giá Figma/Connect-Revenue/OwnerOps đều còn giả thuyết; pilot 30–45 ngày và 8–12 tuần chưa được quy về một lịch đã chốt.
- Sau khi chọn baseline, cập nhật các sơ đồ/prototype liên quan và lưu node/version hoặc source commit. Không sửa receipt cũ hoặc gọi các sơ đồ cũ là đã chứa phạm vi mới.
- Các task HOTEL-* trong báo cáo là gợi ý phân rã, không phải việc đã được giao hoặc triển khai. Không cần tạo thêm báo cáo dài cho cùng các câu hỏi đã biết là còn mở.
- Nghiên cứu Owner Control mở rộng vacancy/revenue vượt phép thử housekeeping nhỏ. Bản đồ chỉ dẫn mới giữ hai nhánh để chọn, không tự đưa toàn bộ approval/execution/Ads vào MVP. Thống nhất mẫu số confirmed/hold/open và source fixture trước khóa UI; các ngưỡng GO/SLA/giá mới vẫn chưa được duyệt.

## 7. Bằng chứng của lần rà soát

Đã fetch và so HEAD với `refs/heads/main` từ GitHub; snapshot đầu vào trùng `f9b004d`. Đã so các raw source market/OwnerOps với upload/hash và bytes được commit, kiểm tra source/HTML của sáu Archify cùng hash evidence DOM. Kết quả khớp, không thực hiện lại browser-check hoặc backend test. Đã bổ sung raw source audit 002 còn thiếu; hai upload giống nhau không bị lưu trùng.

Trang này và liên kết tài liệu được cập nhật trong commit tiếp theo; kiểm tra cuối chỉ xác nhận persistence/tính toàn vẹn, không phải duyệt sản phẩm. Khi có quyết định mới, cập nhật DECISIONS và trạng thái tương ứng thay vì ghi “đã hoàn thiện” cho toàn dự án.

Lượt bổ sung đặc tả sau `ceb5e95`: kiểm tra 48 Markdown do dự án biên soạn (không gồm nội dung research) không có liên kết tệp nội bộ thiếu hoặc code fence lệch; một wireflow OwnerOps parse được bằng Mermaid 11.12.1. Đã đối chiếu prompt S3a lưu riêng với bản gốc: chỉ thêm dòng chỉ dẫn tham chiếu. Chưa render/browser review sơ đồ mới; không chạy lại tests wireframe/backend vì không thay mã ứng dụng.
