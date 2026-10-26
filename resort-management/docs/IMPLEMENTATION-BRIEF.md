# Phạm vi giao việc và tiêu chí nghiệm thu

Đây là đề xuất để chốt phạm vi, chưa phải lệnh bắt đầu code. Đọc cùng [sổ quyết định](DECISIONS.md) và [quy tắc vận hành](OPERATING-RULES.md).

**Căn cứ thị trường tiếp nhận sau audit 002:** dùng [working summary](research/MARKET-RESEARCH-WORKING-SUMMARY.md) để lập MVP kết nối PMS/CM, đọc/đối soát rồi ops/revenue có duyệt. Các đợt S3a–d bên dưới là cấu trúc demo/full PMS trước đó, chưa là backlog v1 được duyệt. Trước giao code cần chốt scope một connector, ownership từng dữ liệu và hành động ghi được hỗ trợ; form thu/hoàn/night audit trong prototype không cấp quyền thay nghiệp vụ nguồn chính.

**Cập nhật 26/10/2026:** thiết kế phải bao quát cả PMS trước khi chốt giao diện. [Chín đặc tả màn hình](SCREEN-SPECIFICATIONS.md), [các hành trình cần rà](SCREEN-COVERAGE.md) và [wireframe local audit 002](../design/pms-wireframes.html) là đầu vào chung. Các đợt S3 chia khối lượng code, không giới hạn thiết kế vào dashboard. Wireframe còn là phác thảo, chưa mọi biến thể; Figma 16 frame theo báo cáo ngoài cần node/version và đối chiếu theo [FIGMA-HANDOFF](FIGMA-HANDOFF.md).

## 1. S3a — PR dashboard mẫu đầu tiên

Gồm dashboard hiện tại, bộ lọc trạng thái, chuyển nhóm công việc, chi tiết phòng, các liên kết/ngày bấm được và form tạo booking mẫu. Các trang chưa làm hiển thị rõ trạng thái đang phát triển. Dữ liệu in-memory có thể reset; không nhận booking/tiền thật, không mô phỏng đăng nhập thành cơ chế bảo mật thật.

Không nằm trong PR này: lịch kéo thả đầy đủ, backend, database, PMS/OTA, thanh toán, AI hoặc chạy quảng cáo. Báo cáo kênh hiện là dữ liệu kỳ mẫu độc lập, phải ghi rõ.

Đầu ra: app chạy được theo hướng dẫn, ảnh ở các viewport đã kiểm tra, build/typecheck, kiểm thử có ý nghĩa và PR có phạm vi rõ. Theo tiêu chí chi tiết trong [CLAUDE-HANDOFF](CLAUDE-HANDOFF.md).

## 2. S3b — Lịch phòng và booking demo, PR sau

- Lịch theo phòng vật lý và theo loại; 7/30/90 ngày; phân biệt phòng sẵn sàng ngay với tồn bán của ngày tương lai.
- Xem ngày/phòng → mở booking hoặc khoảng chặn; tạo/đổi ngày/hủy/gia hạn booking mẫu có kiểm tra xung đột.
- Fixture thể hiện booking chưa gán phòng, đổi phòng giữa kỳ, hủy một dòng khách đoàn và bảo trì tương lai.
- Động tác kéo thả nếu có phải hiển thị lỗi và hoàn nguyên khi không hợp lệ; cũng có form dùng bằng bàn phím.
- Chưa gọi dịch vụ thật, chưa được giới thiệu là đã ngăn bán trùng ở backend.

Cần chốt bản vẽ và hợp đồng dữ liệu riêng trước PR này. Chưa có thiết kế giao diện chi tiết cho toàn bộ các trang lịch/form trong bản HTML hiện tại.

## 3. S3c — Buồng phòng, bảo trì và khách demo

UI04/UI05: bảng việc, phân công, kiểm tra chất lượng, lỗi/chặn phòng, hồ sơ khách tối thiểu và yêu cầu. Dùng cùng fixture booking/phòng với S3b; thay đổi giờ đến/trả ảnh hưởng ưu tiên việc. Kiểm tra nhận/trả → việc dọn → sẵn sàng và yêu cầu khách → người xử lý → xác minh. Chưa có dữ liệu khách thật hay cơ chế gửi tin thật.

## 4. S3d — Thu chi, doanh thu, báo cáo và cấu hình demo

UI06–UI09: folio/cọc/thu/hoàn/phải thu minh họa, bàn giao ca, báo cáo, phương án giá/gói/chiến dịch có duyệt, danh mục/quyền/kết nối giả lập. Cần phân biệt doanh thu và dòng tiền, dữ liệu cùng kỳ/khác kỳ, phương án dự kiến/đã thực thi. Không thu tiền, phát hành chứng từ hợp lệ hay chi quảng cáo thật.

Cấu hình/fixture và định nghĩa quyền chung phải có ngay khi làm nền giao diện các đợt trước; việc để UI09 ở đợt S3d không có nghĩa trì hoãn quyết định nguồn dữ liệu hoặc quyền đến cuối.

## 5. S4/S5 — Backend và tích hợp

Trước khi code: chốt các D01–D07, ERD vật lý, API đọc/ghi, ràng buộc dữ liệu, source ownership và chính sách nghiệp vụ. Khi thêm tích hợp, chốt D08 và chạy thử bằng môi trường/quyền phù hợp.

## 6. Tình huống nghiệm thu bắt buộc khi có nghiệp vụ thật

| ID | Tình huống | Kết quả cần kiểm tra |
| --- | --- | --- |
| INV01 | Hai yêu cầu tranh phòng cuối cùng cùng lúc | Tối đa một yêu cầu giữ/xác nhận thành công theo chính sách; không có tồn âm bị giấu |
| INV02 | Hold đã hết hạn rồi thanh toán thành công đến muộn | Ghi nhận tiền idempotent, kiểm tra lại tồn; đưa vào xử lý nếu không thể nhận booking, không tự phục hồi hold |
| INV03 | Khách trả và khách mới nhận cùng ngày | Đêm phòng tính đúng; chỉ cho nhận khi phòng sạch, gán hợp lệ và đúng chính sách giờ |
| INV04 | Đổi ngày, gia hạn hoặc đổi phòng vướng booking khác | Giữ nguyên booking cũ nếu cập nhật thất bại; không làm mất tồn; nhật ký đầy đủ |
| INV05 | Booking nhiều phòng nhận/trả/hủy một phần | Cập nhật đúng từng dòng và tiền liên quan; không giải phóng toàn booking |
| INV06 | Tạo chặn bảo trì đè lên lượt ở đã xác nhận | Báo xung đột để xử lý; không âm thầm đẩy khách ra hoặc xóa booking |
| OPS01 | Khách đã trả nhưng phòng còn bẩn; phòng sạch nhưng đã được đặt | Hai trường hợp không bị hiểu là cùng một trạng thái khả dụng |
| SYNC01 | Webhook lặp, đến sai thứ tự hoặc retry | Không tạo booking/thu tiền hai lần; không để sự kiện cũ ghi đè trạng thái mới |
| SYNC02 | PMS mất kết nối hoặc số liệu lệch | Có trạng thái dữ liệu trễ/lỗi, hàng đợi và đối soát; không ghi “đồng bộ thành công” khi chỉ gửi request |
| AUTH01 | Buồng phòng hoặc tài khoản khác cơ sở gọi API trực tiếp | Server từ chối đúng quyền, không rò dữ liệu khách hoặc báo cáo tiền |
| FIN01 | Cọc, thu thêm, hoàn một phần và webhook thanh toán lặp | Không tính doanh thu phòng bằng tổng tiền thu; số tiền không nhân đôi; truy nguyên được |
| KPI01 | Không có phòng có thể bán, dữ liệu thiếu, booking chưa gán | Không chia cho 0; trả không áp dụng/chưa đủ dữ liệu; đếm đúng tồn loại phòng |
| DATE01 | Booking qua tháng/năm và giờ trả qua ngày | Tính theo ngày kinh doanh và múi giờ cơ sở, không theo timezone máy chủ |
| REC01 | Khôi phục backup và phát lại sự kiện | Đạt RPO/RTO đã chốt, đối soát trước mở ghi lại; không thu tiền hoặc gửi sự kiện hai lần |

Chỉ chạy và báo đạt các tình huống khi có implementation thực. Hiện bảng này là tiêu chí thiết kế, chưa có bài test đã thực thi.

## 7. Cổng trước vận hành production

- Có người phụ trách vận hành, staging riêng và cấu hình production không nằm trong repo.
- Hoàn tất kiểm tra quyền, kết nối, migration, backup/restore theo phạm vi đã chốt.
- Đối soát booking/tồn/tiền của giai đoạn chạy thử; nhân viên dùng được các quy trình thường gặp.
- Giám sát lỗi và dữ liệu trễ; quy trình khi mất mạng; chỉ mở ghi khi đủ điều kiện đã thống nhất.
- Có kế hoạch quay lui cả app và dữ liệu. Restore không có nghĩa có thể bỏ qua các giao dịch đã phát sinh ở hệ thống ngoài.

Chưa chọn con số RPO/RTO, tần suất backup hoặc thời gian dữ liệu trễ tối đa vì đó là quyết định vận hành/chi phí, không phải số mặc định từ bản mẫu.
