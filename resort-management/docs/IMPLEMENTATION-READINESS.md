# Đánh giá nghiên cứu Owner Control và mức sẵn sàng triển khai

Ngày 26/10/2026; snapshot repo đầu vào `dd90c191bfab0d6b274b8c7e45683ff781110add`. Nguồn mới: [báo cáo](research/OWNER-CONTROL-HIGH-FIDELITY-2026-10-26.md), [nguyên văn](research/OWNER-CONTROL-HIGH-FIDELITY-2026-10-26.raw.txt), [manifest](research/OWNER-CONTROL-HIGH-FIDELITY-MANIFEST.json). Người dùng giao xem/lưu nghiên cứu và kiểm tra mức sẵn sàng, chưa giao code.

## Kết luận theo mức công việc

**Đã có bản đồ và tài liệu để tiếp tục thiết kế, chọn scope, rồi giao một demo synthetic nhỏ khi được yêu cầu. Chưa có bộ thiết kế high-fidelity đã nghiệm thu hoặc mã ứng dụng đủ để deploy/pilot dữ liệu thật.** Không cần đợi toàn bộ 46+ màn hình để thử một hành trình nhỏ.

| Công việc | Đủ đến đâu | Điều cần trước khi thực hiện |
| --- | --- | --- |
| Thiết kế chi tiết/đối chiếu nghiệp vụ | Có đủ đầu vào để làm tiếp | Chọn hành trình, nguồn UI và fixture; không tự coi báo cáo là ảnh đã tạo |
| Demo local synthetic | Có đề xuất scope/luồng/quyền/state/fixtures; chưa có app | Giao rõ demo nào, nơi đặt code và baseline hành vi; không cần quyền PMS thật |
| Code backend để thử có tài khoản | Có ERD/quyền/state khái niệm, chưa có contract/migration chạy thật | Identity, schema/API/transaction, quyền tenant/property và acceptance cho phạm vi nhỏ |
| Sandbox chia sẻ | Chưa có app/deployment/telemetry đã kiểm chứng | Backend/auth phù hợp, target/budget, tester/retention/quota, kiểm tra isolation và error drills |
| Pilot một resort thật | Chưa đủ | PMS/quyền API hoặc import, mapping/ownership, đối soát, hỗ trợ, backup/restore, policy dữ liệu |
| Ghi giá/tồn/OTA hoặc chi Ads | Chưa đủ | Capability và quyền riêng, duyệt có version, recheck, verify, giám sát và xử lý lỗi/thu hồi |

Repo là nơi lưu kế hoạch và prototype, không tự là máy chủ ứng dụng. Snapshot kiểm tra không có package manifest app, backend BeeSmart, migration, CI build/deploy ứng dụng hoặc tài khoản vận hành thật. Không suy từ Git rằng đã kiểm tra MacBook/VPS/ToolAds.

## Điều đáng đưa vào kế hoạch

- Owner cần đi từ vấn đề → nguyên nhân → phương án → người chịu trách nhiệm → kết quả. Giữ PMS/CM là nguồn booking/tồn chính, connector-first.
- Tách commercial availability khỏi OOO/block/housekeeping và booking chưa gán; dữ liệu trễ/thiếu phải dẫn đến xử lý nguồn trước phương án kinh doanh.
- Kiểm tra net contribution cùng công suất/ADR; giữ giá, direct/package rồi mới xem discount/OTA/Ads theo quyền. Chưa cam kết tăng doanh thu.
- Tách approval, delivery và verification; “đã gửi” không là “đã xác minh”. Giao việc và nghiệm thu vẫn cần bên dưới màn hình chủ.
- High-fidelity cần components/states, clickable journeys, node/version/export manifest và usability, không chỉ nhiều ảnh trình bày.

Đây là hướng mở rộng **Owner Control & Revenue**. [MVP housekeeping đề xuất](OWNEROPS-MVP-CONTRACT.md) hiện là phép thử nhỏ hơn; chưa có quyết định thay nó bằng toàn bộ Owner/revenue hoặc phải code hết trước thử nghiệm. [Bản đồ bàn giao](IMPLEMENTATION-MAP.md) đặt hai phạm vi cạnh nhau.

## Các điểm cần sửa hoặc kiểm chứng trước khóa

| Mức | Vấn đề trong nguồn mới | Cách xử lý trong thiết kế/contract |
| --- | --- | --- |
| P0 | “Commercial vacancy = 1 − occupancy” không khớp ví dụ có hold | Tách confirmed occupancy, active holds và open-to-sell; không dùng một công thức cho ba ngữ nghĩa |
| P0 | Ví dụ D+3 toàn property 52/96 sau đó gắn nhãn Deluxe | Ghi room-type breakdown cộng về tổng; 18 Deluxe là một phần 41 tổng, không mặc định 96 là Deluxe |
| P0 | “52 booking” không tự bằng 52 room-nights | Tính theo từng booking line/ngày/loại và số lượng; đoàn nhiều phòng và chưa gán vẫn trừ đúng tồn, không đếm reservation headers |
| P0 | Hero hôm nay 74% khác 78,7% trong fixture hiện có | Chọn dataset/version và mẫu số mới rõ ràng; không ghi đè/trộn fixture cũ hoặc trộn hôm nay với D+3 |
| P0 | Revenue/Net ADR/contribution có thể trừ discount hai lần | Chốt doanh thu đã sau hay trước discount, thuế/phí, commission, trợ giá và kỳ; mỗi khoản khấu trừ đúng một lần |
| P0 | Rule chặn mọi promotion chỉ vì có booking chưa gán | Booking hợp lệ chưa gán vẫn chiếm tồn loại; chỉ chặn scope có dữ liệu/mapping/allocation không đáng tin hoặc tồn không đủ, không tự đóng toàn khách sạn |
| P0 | Ngưỡng 99,5% “match hoặc giải thích” có thể che mismatch critical | Tách exact-match, coverage, explained exceptions và unresolved critical; tỷ lệ tổng không cấp quyền ghi tồn/giá khi còn sai lệch critical |
| P0 | 90% action critical có owner/audit cho phép 10% không có trách nhiệm | Đề xuất mọi action critical được thực thi phải có owner, approval/audit và đường dừng; chốt tiêu chí release riêng, không nhận 90% làm gate ghi |
| P0 | Ads request PAUSE khi đạt ceiling chưa bảo đảm không vượt tiền | Có độ trễ spend/report/API và chi chưa báo; cần buffer, kiểm tra trước bật, trạng thái pause requested/verified và quy trình xử lý. Không hứa hard cap tuyệt đối |
| P0 | “Giá dưới floor” có thể hiểu Owner tự bypass mọi sàn | Phân loại sàn tuyệt đối và sàn có thể thay theo policy; đổi policy/giá cần đúng quyền, revision và duyệt lại, không tự cấp ngoại lệ cho AI/Owner |
| P1 | Một tuyến state phòng có thể khiến mất trạng thái occupancy/HK/block độc lập | Dùng state operational để hiển thị; mô hình nguồn vẫn tách các trục và khoảng chặn. Booking/tiền/task/campaign có state riêng |
| P1 | Danh sách trạng thái và luồng copy mất mũi tên chưa là transition contract | Giữ nguyên raw; bổ sung actor, precondition, version, retry, expiry, timeout/unknown, partial failure và verify cho đúng scope trước code |
| P1 | SLA stale 10 phút/write block 15 phút chưa thống nhất với rule freshness <10 | Policy theo capability/action; thiếu nguồn, chưa reconcile hoặc không đạt freshness yêu cầu thì không ghi. Không mặc định được ghi trong khoảng 10–15 phút |
| P1 | “Rollback” bên ngoài có thể không đảo được booking/spend đã phát sinh | Tách pause, compensation, khôi phục cấu hình và đối soát; không ghi ROLLED_BACK trước xác minh, không hứa hoàn tác tiền đã chi |
| P1 | Các giá/effort/SLA/lịch pilot và số lượng ảnh chưa được duyệt | Giữ là giả thuyết; số màn có thể trùng Owner mobile/desktop. Chốt inventory frame ID trước quote, không cộng effort thành lịch giao hàng |

Ngưỡng P0/P1 trong bảng là mức ưu tiên làm rõ thiết kế, không phải báo cáo đã phát hiện sự cố production.

### Kiểm tra số học demo D+3

Giả định cho ngày lưu trú 29/10/2026, từ ngày kinh doanh 26/10/2026: 100 phòng vật lý, 4 OOO, không có block bổ sung/chồng lặp, 52 confirmed room-nights và 3 hold còn hiệu lực thực sự giữ tồn.

| Đại lượng | Phép tính | Kết quả |
| --- | --- | --- |
| Sellable capacity | 100 − 4 | 96 room-nights |
| Open to sell | 96 − 52 − 3 | 41 room-nights |
| Confirmed OTB occupancy | 52 / 96 | 54,17% |
| Hold share | 3 / 96 | 3,13% |
| Open-to-sell share | 41 / 96 | 42,71% |
| Chưa confirmed, bao gồm hold | 1 − 52 / 96 | 45,83% |

Nếu hold không giữ tồn theo policy, open là 44; báo cáo chưa đủ quyền quyết định policy thật. 41 × 1.500.000đ = 61.500.000đ là **gross exposure minh họa ở cùng mức giá**, không phải dự báo doanh thu bỏ lỡ chắc chắn, incremental profit hoặc nhu cầu đã chứng minh.

Ví dụ 3.000 sellable room-nights × 2/5/8 điểm phần trăm × 1.500.000đ cho 90/225/360 triệu là đúng số học, với giả định không có ngày bị giảm capacity và ADR giữ nguyên. Không mang giả định 3.000 này sang tháng có 4 OOO mà không tính lại từng ngày. Chưa có biến phí/counterfactual thì không có verified incremental contribution.

## Đối chiếu bằng chứng và nguồn

| Nhóm | Repo/nguồn có gì | Giới hạn |
| --- | --- | --- |
| Bản đồ | [Implementation map](IMPLEMENTATION-MAP.md), wireflow OwnerOps, full PMS và 7 blueprint | Thiết kế nháp, không là implementation hoặc mọi sơ đồ đồng bộ |
| Prototype | HTML dashboard, 9 desktop + 4 mobile wireframe | Local/in-memory; không có work engine/auth/PMS thật |
| Archify | 6 HTML + JSON + receipts | Snapshot lịch sử; browser-check chưa đạt do môi trường, không chứa toàn nghiên cứu mới |
| Figma | Link và báo cáo bên ngoài nói đã đọc metadata | Chưa có node/version/export mới để Codex xác minh; báo cáo tự ghi chưa tạo PNG/high-fidelity mới |
| Nghiên cứu nguồn | Nêu ezCloud, Skyhotel, SMILE, Cloudbeds, SiteMinder, OHIP, Booking/Agoda/Expedia, Cornell, HotelTechReport, Google/Meta | Bản dán có **0 URL nguồn**; claim truy cập 26/10 thuộc tác giả, chưa được kiểm chứng độc lập ở lượt này |
| Giá/chi phí/API | Bảng tham chiếu và access/certification notes | Chưa có quote/entitlement của resort; “docs có” không bằng “được cấp production” |
| Người dùng/kết quả | Mục tiêu usability, WTP, pilot và GO/PAUSE/STOP | Chưa có phỏng vấn/thử người thật, baseline, số đo cải thiện hoặc ROI |

Nghiên cứu này được lưu làm nguồn mở rộng thiết kế, không thay market working summary thành baseline thương mại mới. Các mức OwnerOps/Connect/Revenue mới vẫn là phương án giá cùng các báo cáo trước.

## Công việc tiếp theo thực tế

1. Chốt một hành trình demo: housekeeping nhỏ hiện có, hoặc Owner vacancy read-only thêm vào. Không tự gộp revenue writes/Ads.
2. Chọn fixture và chính sách mẫu số; làm một dải thiết kế nhỏ có đủ trạng thái và mobile thay vì chờ toàn bộ ảnh sales.
3. Lưu source UI/node/version/export, mapping màn hình → action → data → test; thử UX với đúng vai trò trước khóa baseline.
4. Khi được giao code, chốt repo/scope; làm demo synthetic, rồi backend nhỏ có quyền/transaction thật. Pilot cần PMS/discovery riêng.

Chưa cần nghiên cứu thêm hàng loạt PMS. Những thông tin còn thiếu chủ yếu là quyết định sản phẩm, nguồn PMS thực và bằng chứng sử dụng. Không thể tự tạo chúng từ số lượng tài liệu trong repo.

## Kiểm tra thực hiện trong lượt tiếp nhận

- Nguyên văn 47.774 byte khớp upload/SHA-256 trong manifest; phần nội dung của bản dễ đọc giữ nguyên. Đếm được 0 URL nguồn trong văn bản được cung cấp.
- Bốn hash/byte của wireframe và script trong receipt DOM còn khớp; sáu cặp source/HTML Archify còn khớp receipts. Browser-check lịch sử vẫn fail; không sửa receipts hoặc nhận đã render thành công.
- Kiểm tra 52 Markdown liên quan: liên kết tệp nội bộ tồn tại và code fence cân bằng; một Mermaid implementation map mới parse bằng 11.12.1. Không xác minh external URLs, layout hoặc Figma.
- Trong tracked files dự án không có package manifest app/Docker/compose/migrations; kiểm tra này chỉ nói về repo được đọc, không chứng minh trạng thái server ngoài repo.
- Số học D+3 và ví dụ +2/+5/+8 điểm phần trăm đã kiểm tra. Không chạy app/auth/transaction/PMS/restore/Ads tests hoặc claim ROI từ phép tính mẫu.
