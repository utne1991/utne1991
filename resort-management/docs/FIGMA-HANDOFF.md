# BeeSmart HotelOS — tiếp nhận thiết kế Figma và FigJam

Ngày tiếp nhận báo cáo: 26/10/2026. Nguồn là nội dung người dùng chuyển tiếp từ MrAiTiNiuBi trong cuộc trò chuyện. Tài liệu này ghi nhận nguồn thiết kế bên ngoài và công việc đối chiếu; **không phải biên bản nghiệm thu thiết kế**.

## Cập nhật audit 002

Báo cáo kiểm toán mới của MrAiTiNiuBi nói đã đọc trực tiếp 4 trang và sửa tổng số từ **13 thành 16 khung: 9 UI + 7 bổ sung**. Đồng thời báo cáo 0 prototype links trên node đã kiểm tra, 0 reusable components/Auto Layout được phát hiện, chưa có frame mobile và chưa hoàn tất kiểm tra cảm quan. Đây là **kết quả do người kiểm toán bên ngoài báo cáo**, không phải Codex vừa đọc được Figma. Không suy quan sát “không phát hiện” thành chứng minh mọi node/file hoặc phiên bản đều không có khả năng đó.

Văn bản mới vẫn chưa cung cấp node ID, danh mục frame/version hoặc snapshot. Vì vậy chưa thể hoàn tất yêu cầu “cập nhật node ID đã xác minh”, chưa đổi D13 thành đã duyệt. Xem [TASK-RESORT-DESIGN-AUDIT-002](TASK-RESORT-DESIGN-AUDIT-002.md), [benchmark mã PMS](research/PMS-BENCHMARK.md) và [wireframe local bổ sung](../design/pms-wireframes.html). Wireframe local không được gọi là source Figma đã nhập.

## 1. Tài liệu được báo cáo đã tạo

| Tài liệu | Liên kết | Thông tin theo báo cáo | Đã xác minh trong phiên này |
| --- | --- | --- | --- |
| BeeSmart HotelOS — UI & Business Blueprint | [Figma design](https://www.figma.com/design/tqj8gIVcaEPR8tyJiRZx3W) | Theo audit mới: 4 trang, **16 khung (9 UI + 7 bổ sung)**; số 13 trong báo cáo tạo ban đầu được sửa | Codex chưa đọc được file/node hoặc frame/version; bằng chứng kiểm toán ở mức báo cáo chuyển tiếp |
| BeeSmart HotelOS — System & Operations | [FigJam board](https://www.figma.com/board/fpwBy4R8xWmiLpWPqLkxzm) | 2 sơ đồ kiến trúc và chu trình booking → nhận khách → lưu trú → trả → dọn → sẵn sàng | Chưa đọc được board, node hoặc các nhánh ngoại lệ |

Báo cáo nói đã có ảnh kiểm tra dashboard và bảng giá; các ảnh đó chưa được cung cấp trong workspace để kiểm tra. Chưa có danh mục frame/node, version thiết kế hoặc bản export được nhập vào repo. Link tới file không phải link cố định tới một frame/version đã nghiệm thu.

Phiên này không có tool Figma/FigJam để đọc cấu trúc. Thử GET hai URL qua mạng hiện tại đều trả lỗi proxy `Tunnel connection failed: 403 Forbidden`; đây không phải bằng chứng file không tồn tại, bị riêng tư hay đã cấp sai quyền. Không yêu cầu token hoặc thay chính sách mạng từ kết quả này.

## 2. Phạm vi nguồn và điều đã biết

- Repo hiện có đặc tả UI01–UI09, dashboard HTML, sơ đồ Mermaid và sáu HTML Archify ở snapshot cũ.
- Bộ Figma/FigJam là nguồn thiết kế bên ngoài **được báo cáo đã tạo**, chưa thay thế các quy tắc nghiệp vụ đã ghi.
- Tên BeeSmart HotelOS, gói SaaS và profile dịch vụ 2–5 sao xuất hiện trong báo cáo; chưa có quyết định đổi phạm vi từ resort một cơ sở sang SaaS đa khách hàng.
- Backend, dữ liệu thật và prototype tương tác đầy đủ chưa được báo cáo hoàn thành.
- Báo cáo chưa commit repo; lần tiếp nhận này chỉ cập nhật tài liệu, không nhập source Figma hoặc tạo app.
- Không có quyền/công cụ xác nhận source trên MacBook. GitHub/cloud checkout không chứng minh trạng thái máy đó.

## 3. Bảng đối chiếu chín phân hệ

Mỗi dòng hiện là công việc cần kiểm tra, không phải kết luận thiếu nội dung trong Figma. Không điền node ID hoặc số frame khi chưa đọc được.

| ID | Hạng mục được nêu trong báo cáo | Cần kiểm tra theo SCREEN-SPECIFICATIONS | Frame/node và kết luận |
| --- | --- | --- | --- |
| UI01 | Dashboard 100 phòng | Công thức KPI, tuổi dữ liệu, vai trò, cảnh báo có người phụ trách và hành động mở đúng trang | Chưa xác minh |
| UI02 | Lịch đặt phòng | Hai góc nhìn tồn loại/phòng vật lý; booking chưa gán, 7/30/90 ngày, chặn bảo trì, đổi ngày xung đột | Chưa xác minh |
| UI03 | Lễ tân | Booking nhiều phòng, hold/cọc, nhận/trả một phần, đổi/gia hạn/hủy, form và lịch sử | Chưa xác minh; không mặc định màn lễ tân đã đủ mọi chức năng booking |
| UI04 | Theo audit mới: có danh sách công việc và bảo trì | Phân công, kiểm tra/làm lại, dọn trong kỳ ở, bảo trì và chặn ảnh hưởng booking, bàn giao | Theo người kiểm toán báo cáo; Codex chưa đọc node hoặc nghiệm thu luồng |
| UI05 | Chăm sóc khách | Yêu cầu có người xử lý/hạn/kết quả, quyền dữ liệu khách, dịch vụ tính tiền đi tới folio | Chưa xác minh |
| UI06 | Thu chi | Tách doanh thu/cọc/thu/phải thu/hoàn, điều chỉnh có duyệt, bàn giao ca và đối soát | Chưa xác minh |
| UI07 | Theo audit mới: có đề xuất giá/chiến dịch | Giá/điều kiện, gói khuyến mãi và chiến dịch là ba phần; có giới hạn tồn/giá/ngân sách và duyệt/thực thi/lỗi/dừng | Theo người kiểm toán báo cáo; calendar giá, phê duyệt và kết quả thực thi còn cần mở rộng |
| UI08 | Báo cáo, ROI | On-the-books/dự báo/thực tế, định nghĩa ADR/RevPAR, nguồn chi phí, đóng góp so với lợi nhuận ròng, giả định ROI | Chưa xác minh |
| UI09 | Cấu hình | Danh mục/phòng, chính sách, quyền, nguồn ghi chính, mapping, lỗi/retry/đối soát kết nối | Chưa xác minh |

## 4. Những phần cần nhìn xuyên màn hình

1. Tìm phòng → tạo booking → cọc/xác nhận → gán phòng: cùng dữ liệu và ID.
2. Khách đến nhưng phòng chưa sạch → giao việc → kiểm tra → nhận khách.
3. Gia hạn/đổi phòng/hủy một phần → tồn, công việc và tiền cập nhật nhất quán; có đường báo xung đột.
4. Khách trả → đối soát → dọn/kiểm tra → phòng sẵn sàng; không giải phóng phòng từ việc dọn trong kỳ ở.
5. Yêu cầu khách → người nhận → xử lý/xác minh → khoản dịch vụ nếu có.
6. Ngày yếu → phương án → duyệt ngân sách/giá → thực thi hoặc lỗi → đo kết quả.
7. Dữ liệu PMS trễ → cảnh báo → người xử lý → đối soát → mở lại thao tác theo chính sách.
8. Bàn giao ca: công việc mở, tiền/chênh lệch và người tiếp nhận.

Hai sơ đồ FigJam được báo cáo chưa đủ để kết luận đã bao phủ tất cả hành trình/ngoại lệ này. Cần so với các Mermaid trong `docs/diagrams/` và [quy tắc vận hành](OPERATING-RULES.md).

## 5. Checklist để thiết kế đủ điều kiện giao code

- Truy cập file qua công cụ/phiên được cấp quyền; lấy danh mục page/frame/node và version hoặc mốc thay đổi có thể truy nguyên.
- Gán UI01–UI09 cho các frame cụ thể; phân biệt chín màn tổng quan với panel/form/trang con còn cần vẽ.
- Rà bố cục desktop, mobile tác vụ thực tế; kiểm tra lịch phòng lớn và danh sách công việc dùng trên điện thoại.
- Ghi rõ hành động từng nút, trạng thái chuyển, quyền, loading/empty/error/stale/denied và xung đột.
- Kiểm tra prototype tương tác hoặc bảng chuyển màn hình nếu chưa có prototype; không coi hình tĩnh là luồng đã chạy.
- Đối chiếu số liệu mẫu với fixture và quy tắc; không dùng số ROI, giá SaaS hoặc hạng sao làm bằng chứng hiệu quả thật.
- Tách phần đã chấp nhận vào phạm vi triển khai, phần còn mở và đề xuất giai đoạn sau.
- Sau khi xác nhận nguồn thiết kế: thống nhất data contract và nghiệm thu theo từng hành trình; cập nhật Mermaid/Archify tương ứng.

Chưa có mục nào trong danh sách này được đánh dấu đạt chỉ dựa trên báo cáo chuyển tiếp. Đọc/nhập snapshot qua nguồn được hỗ trợ không yêu cầu chép token hoặc dữ liệu khách vào repo.

## 6. Cách lưu bằng chứng sau khi đọc được

Dùng `design/figma/` khi có export thật: chỉ mục frame chứa ID, tên, UI liên quan, version/thời điểm kiểm tra, ảnh/SVG/PDF nếu quyền cho phép và ghi nhận người duyệt. Không tạo tệp ảnh trống hay JSON giả để biểu diễn việc đã sync Figma.

Nếu Figma và đặc tả khác nhau, ghi diff và quyết định ở [DECISIONS](DECISIONS.md) trước khi sửa luồng nghiệp vụ. Không tự cho một nguồn thắng vì đẹp hơn, mới hơn hoặc có nhiều khung hơn.

## 7. Hướng dẫn Claude khi đến lượt đối chiếu

> Đọc resort-management/CLAUDE.md, docs/FIGMA-HANDOFF.md, SCREEN-SPECIFICATIONS.md, SCREEN-COVERAGE.md và OPERATING-RULES.md. Dùng quyền/công cụ Figma hiện có để đọc hai file liên kết, lấy page/frame/node và version nếu nguồn hỗ trợ. Lập mapping UI01–UI09 và các hành trình; ghi đủ/chưa đủ/chưa xác minh với bằng chứng. Chưa triển khai backend, đổi phạm vi sang SaaS, áp giá bán thật hoặc sửa dữ liệu production. Nếu không đọc được thì báo đúng blocker và tiếp tục phần đối chiếu từ tài liệu có sẵn; không suy đoán nội dung frame.

Hiện chưa gửi thông báo hoặc giao việc cho Claude/MrAiTiNiuBi.
