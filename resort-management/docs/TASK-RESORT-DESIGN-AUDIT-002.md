# TASK-RESORT-DESIGN-AUDIT-002

Ngày: 26/10/2026. **Trạng thái: có gói thiết kế bổ sung, chưa đủ điều kiện khóa baseline.** Không phải “7/7 đã hoàn thành”. Số 7 trong báo cáo đầu vào là bảy nhóm việc; mỗi nhóm còn điều kiện nghiệm thu riêng.

## 1. Nguồn đầu vào

Người dùng chuyển tiếp báo cáo MrAiTiNiuBi: kiểm tra trực tiếp 4 trang Figma, tổng 16 khung (9 UI + 7 bổ sung), sửa số 13 trước đó; trên các node đã kiểm tra không phát hiện prototype links, reusable components, Auto Layout hoặc mobile frames. Theo báo cáo có 2 sơ đồ FigJam và chưa duyệt cảm quan toàn bộ.

Báo cáo không đính kèm node IDs, danh mục frame/version hoặc snapshot cấu trúc. Phiên Codex này vẫn không có tool Figma/FigJam; không đổi thông tin người khác báo thành kết quả kiểm tra trực tiếp của Codex. Xem [FIGMA-HANDOFF](FIGMA-HANDOFF.md).

## 2. Tiến độ bảy nhóm việc

| Nhóm | Đầu ra có trong lượt này | Trạng thái nghiệm thu |
| --- | --- | --- |
| 1. Figma 16 frame + node | Cập nhật số theo báo cáo kiểm toán mới, phạm vi quan sát và phần thiếu bằng chứng | **Chưa xong:** chưa có node/version/export hoặc quyền đọc trực tiếp |
| 2. Feature × Role × Profile × Release | [Ma trận đề xuất](FEATURE-ROLE-PROFILE-RELEASE.md) | Có bản nháp, chưa duyệt |
| 3. Form/popup/states UI01–09 | [Wireframe HTML](../design/pms-wireframes.html) + [hợp đồng thiết kế](FORM-STATE-MATRIX.md) | Có phác thảo tương tác local; chưa đủ mọi biến thể, chưa cập nhật Figma/visual review |
| 4. Mobile HK/MT/concierge/GM | Bốn view mobile riêng trong wireframe | Có bản nháp; chưa là PWA, chưa nghiệm thu thiết bị thực |
| 5. Bảy sơ đồ ưu tiên | [B01–B07 Mermaid](blueprints/README.md), ERD lõi và nhánh lỗi | Có bản nháp; chưa schema vật lý hoàn chỉnh, chưa xuất Archify/FigJam hay duyệt chính sách |
| 6. Ba PMS tham khảo | [Snapshot, file code, license và kết luận dùng](research/PMS-BENCHMARK.md) | Đã đọc source có chọn lọc; chưa cài/test/audit toàn sản phẩm; chưa chọn reuse |
| 7. Quyết định và nghiệm thu | Đề xuất pilot tenant-aware + test scenarios dưới đây, cập nhật DECISIONS | **Chưa xong:** D01/D02/D11/D12/D13 chưa được xác nhận |

Chưa triển khai app framework, backend hoặc migration của BeeSmart; chưa nhập/sửa tài liệu Figma hoặc gửi việc cho agent khác.

## 3. Phương án kiến trúc để chốt

**Đề xuất:** pilot một resort 100 phòng; thiết kế tenant/property/membership và kiểm thử hai tenant giả ngay từ backend; chưa làm SaaS billing, hàng trăm khách hàng, superadmin rộng quyền hoặc portfolio dashboard trong pilot. Đây là phương án cần D11, không phải một quyết định đã được chủ dự án phê duyệt từ câu “em chọn” trong báo cáo bên ngoài.

Next.js/Supabase là ứng viên, không tự được chọn vì Open Hotel PMS dùng stack đó. Nguồn ghi booking/tồn phụ thuộc D01/D02; không cài nguyên repo tham khảo rồi đổi tên thương hiệu.

Profile dịch vụ cấu hình theo nhu cầu, không hardcode sao thành role/tính năng/giá SaaS. Khả năng concierge/MICE/POS/tài sản mở rộng phải có scope và dữ liệu thật; D12 cần tiêu chuẩn áp dụng trước checklist chứng nhận.

## 4. Nghiệm thu bổ sung cho implementation sau này

Đọc cùng INV01–06, OPS01, FIN01, SYNC01/02, AUTH01, KPI01, DATE01, REC01 ở [IMPLEMENTATION-BRIEF](IMPLEMENTATION-BRIEF.md).

| ID | Tình huống | Kết quả cần có khi code thật |
| --- | --- | --- |
| TEN01 | User/AI/job tenant A gọi ID, search, tổng hợp, export, realtime hoặc object của B | Không đọc/ghi/rò metadata trái scope ở mọi đường truy cập |
| TEN02 | Thu hồi membership, import/restore hoặc service account bị dùng sai scope | Quyền bị chặn theo policy; không tạo liên kết xuyên tenant/property |
| FIN02 | Chia khoản, chuyển folio, hoàn một phần, duplicate event | Allocation không vượt tiền hợp lệ, reversal truy nguyên, không hạch toán hai lần |
| FIN03 | Night audit chạy lặp/đồng thời, bị gián đoạn sau posting | Một run hợp lệ/property/date; resume không post lại tiền; chưa đủ điều kiện thì không lặng lẽ chuyển ngày |
| OPS02 | Ticket khiếu nại quá SLA, chuyển ca, có bồi hoàn | Owner/hạn/lý do rõ, bàn giao được; bồi hoàn cần quyền/hạn mức |
| MOB01 | HK làm xong, QA không đạt, mất kết nối | Không thành ready giả; làm lại được; không hứa lưu offline nếu chưa có cơ chế |
| MOB02 | MT đề nghị block đè booking | Báo xung đột, không tự hủy khách; thời điểm bàn giao cần xác minh |
| MOB03 | Concierge xem yêu cầu nhạy cảm/ghi khoản dịch vụ | Dữ liệu tối thiểu theo quyền, owner/SLA; khoản tiền đi qua luồng hợp lệ |
| MOB04 | Quản lý thao tác từ điện thoại khi version đã đổi | Kiểm tra lại dữ liệu, quyền và version, không duyệt từ cache cũ |
| REV01 | Giá/gói/ads thay sau duyệt hoặc hết quota | Duyệt lại hoặc dừng; không chi/quá tồn từ một approval cũ |
| REV02 | Gửi ads/giá ra ngoài timeout rồi retry | Không nhân đôi side effect; trạng thái chờ/lỗi/đối soát trước báo đã chạy |

Đây là test cases cần xây và chạy khi có backend, không phải test đã pass trong lượt thiết kế. Kết quả kiểm tra wireframe local được ghi riêng dưới đây.

## 5. Kiểm tra và giới hạn của đầu ra

- Đã chạy kiểm tra DOM bằng jsdom 26.1.0: 9 desktop + 4 mobile view, 65 trạng thái thiếu/tải/lỗi/trễ/quyền, 3 khoảng lịch (7/30/90), 13 form lưu draft và giữ input khi conflict, ngày trả sai bị chặn, hủy không lưu và text người nhập không được chèn thành HTML: đạt. Native dialog API được stub; không kiểm tra browser layout hoặc focus thực.
- [Kết quả DOM và hash artifact](../design/checks/audit-002-dom.json) ghi đúng phạm vi kiểm tra và nguồn đã chạy; không phải receipt Archify hay nghiệm thu Figma.
- Script tái lập: `scripts/check-wireframes.cjs`, cần jsdom. Trong lượt này dependency kiểm tra nằm ngoài repo ở `/tmp`, không thêm dependency app. Có thể chạy từ `resort-management/` với `NODE_PATH=/tmp/beesmart-audit002-dom/node_modules node scripts/check-wireframes.cjs` sau khi chuẩn bị đúng dependency trong môi trường kiểm tra.
- Cú pháp JS của wireframe và 9 khối Mermaid thuộc 7 blueprint đã kiểm tra đạt bằng Mermaid 11.12.1; parser không render SVG hoặc xác nhận bố cục. Liên kết nội bộ/mapping UI được rà riêng trước commit.
- Wireframe local không kiểm tra tính đúng inventory/tiền/authorization; danh sách mock không đại diện toàn bộ nghiệp vụ 100 phòng.
- Kiểm tra DOM nếu được chạy chỉ chứng minh thao tác mẫu; không thay browser/native dialog/a11y/visual review.
- Browser sandbox của môi trường từng chặn kiểm tra Archify; không gọi test DOM là đã sửa/đạt browser-check đó.
- Sáu HTML Archify cũ giữ snapshot riêng, chưa chứa bảy blueprint mới. Không sửa receipt cũ để biểu diễn sự đồng bộ.

## 6. Điều kiện bên ngoài để hoàn tất

1. Danh mục page/frame/node IDs và version hoặc export có quyền từ phiên đã kiểm toán Figma, hoặc quyền/công cụ đọc trực tiếp; sau đó đối chiếu và cập nhật Figma/prototype thực.
2. Tên PMS/channel manager và nguồn ghi chính (D01/D02); nếu chưa dùng hệ thống cần ghi xác nhận đó.
3. Xác nhận phương án một pilot nhưng tenant-aware (D11), profile/module pilot (D12) và baseline thiết kế/node được duyệt (D13), cùng policy tiền/phòng/quyền liên quan.

Chưa đánh dấu các điều kiện này hoàn tất bằng số lượng frame, bảng giá SaaS, source có sẵn hoặc tuyên bố AI có thể làm được.
