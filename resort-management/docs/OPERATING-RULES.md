# Quy tắc vận hành cần dùng khi thiết kế backend

**Trạng thái:** đề xuất kỹ thuật/nghiệp vụ để xác nhận, chưa phải chính sách resort đã duyệt. Các ID Dxx nằm trong [DECISIONS](DECISIONS.md).

## 1. Trạng thái booking và nhiều phòng

- Hold chưa hết hạn giữ tồn theo chính sách; xác nhận booking và thu tiền là hai trạng thái khác nhau. Có cọc không tự chứng minh còn phòng.
- Booking nhiều phòng cần trạng thái và lịch sử ở từng dòng lưu trú. Trạng thái tổng hợp có thể gồm nhận/trả một phần; danh sách trạng thái reservation hiện tại trong PRODUCT-MAP chưa phải state machine đầy đủ.
- Đổi ngày/loại/phòng và gia hạn phải kiểm tra phần tồn bị ảnh hưởng; thành công toàn bộ hoặc giữ nguyên trạng thái trước thao tác. Phí, hoàn tiền và tác động kênh ngoài cần theo dõi riêng.
- Sự kiện thu tiền sau khi hold hết hạn cần đối soát và xử lý theo chính sách, không tự xác nhận vào phòng đã bán cho khách khác.

## 2. Khả dụng và dọn phòng

- Tồn loại phòng theo từng ngày = công suất vật lý bán được − chặn bán theo chính sách − hold còn hiệu lực − booking giữ tồn. Booking chưa gán phòng vẫn tiêu thụ tồn loại phòng.
- Một chặn vật lý có nhiều lý do hoặc chồng khoảng thời gian chỉ được loại trừ một lần cho cùng đơn vị phòng/ngày. Phòng đang có khách không được tự chuyển sang bảo trì mà bỏ qua xung đột.
- Lịch phòng vật lý còn phải kiểm tra khả năng gán xuyên suốt kỳ ở; tổng tồn theo loại dương chưa chứng minh luôn gán được một phòng cho toàn kỳ.
- Không clamp tồn âm về 0 rồi che mất lỗi. Dữ liệu bán vượt tồn phải tạo cảnh báo và đối soát; không tự hủy khách.
- `inspected` thể hiện đã kiểm tra, chưa đủ nghĩa nếu chưa có kết quả. Chỉ thành `ready` khi đạt kiểm tra và không có chặn ảnh hưởng; nếu lỗi thì quay lại xử lý tương ứng.
- Trạng thái ở, dọn và chặn là dữ liệu độc lập. Trường hợp đang ở nhưng có cờ vệ sinh hoặc bảo trì tương lai không được đếm thành hai phòng.

## 3. Ngày, chỉ số và tiền

- Thống nhất ngày kinh doanh, timezone và chốt ngày (D04). Không suy đêm phòng từ số giây chia 24 giờ hoặc từ trạng thái “đang ở” lúc xem.
- Tức thời: số phòng có khách / số phòng có thể khai thác tại thời điểm, theo chính sách chặn. Theo kỳ: tổng đêm phòng bán / tổng đêm phòng có thể bán từng ngày; không trộn hai tỷ lệ.
- Tồn bán trong tương lai dựa trên cả booking đã xác nhận và hold hợp lệ; không dùng ô “sạch” làm số phòng còn bán.
- Không có mẫu số hợp lệ thì trả `null`/“Không áp dụng”; thiếu dữ liệu khác với giá trị 0. Có thể giữ dấu vết dữ liệu cũ với nhãn trễ và `asOf`.
- Doanh thu phòng, khoản đã thu, cọc và khoản phải thu là các đại lượng khác nhau. Phân bổ doanh thu theo đêm/dịch vụ, thuế/phí, hủy và hoàn theo D06; ADR/RevPAR phải có cùng quy ước.
- Dự kiến phòng sẵn sàng chỉ là ước lượng; ghi rõ nguồn giờ trả và thời gian dọn. Không trình bày thành cam kết nếu chưa kiểm tra.
- Trong app, số phút còn lại tính từ cùng `asOf`/clock; không gắn chuỗi đếm ngược cố định như dữ liệu demo.

## 4. Ma trận quyền đề xuất

| Hành động | Quản lý | Lễ tân | Buồng phòng | Bảo trì | Kế toán | Kinh doanh |
| --- | --- | --- | --- | --- | --- | --- |
| Xem lịch/phòng trong phạm vi được giao | Có | Có | Phần việc | Phần việc | Theo nhu cầu | Theo nhu cầu |
| Tạo/sửa/nhận/trả booking | Có | Có theo chính sách | Không | Không | Không | Chưa mặc định |
| Dọn và kiểm tra phòng | Có | Xem | Cập nhật theo phân công; quyền kiểm tra tách nếu cần | Không | Không | Không |
| Đề nghị/thực hiện bảo trì | Có | Đề nghị | Đề nghị | Thực hiện; không tự ghi đè booking | Không | Không |
| Thu tiền theo booking | Theo quyền | Theo quyền | Không | Không | Theo quyền | Không |
| Duyệt hoàn tiền/giảm giá vượt hạn mức | Phải được cấp riêng | Không mặc định | Không | Không | Phải được cấp riêng | Không mặc định |
| Báo cáo tài chính/xuất dữ liệu | Theo quyền | Giới hạn | Không | Không | Theo quyền | Tổng hợp theo quyền |
| Duyệt và chi ngân sách quảng cáo | Phải được cấp riêng | Không | Không | Không | Không mặc định | Đề xuất, không tự duyệt |
| Quản trị tài khoản/tích hợp | Quyền quản trị được cấp riêng | Không | Không | Không | Không | Không |

Ma trận này chưa được người dùng phê duyệt. Role chỉ là bộ quyền; kiểm tra membership cơ sở và quyền trên tài nguyên ở mọi API, kể cả export, cập nhật hàng loạt và công cụ AI. Buồng phòng/bảo trì không cần xem giấy tờ, số điện thoại hay số tiền của khách. Mọi thao tác tài chính/đổi giá/chặn phòng cần người thực hiện, thời điểm và lý do trong nhật ký; không cho sửa lịch sử im lặng.

## 5. Đồng bộ và mất kết nối

- Xác định hệ thống sở hữu từng nhóm dữ liệu và mapping ID trước khi nối. Import CSV cũng phải có kiểm tra/lỗi theo dòng và tránh tạo trùng khi import lại.
- Xác thực nguồn sự kiện theo cơ chế nhà cung cấp, chống lặp bằng khóa sự kiện/thao tác, xử lý phiên bản/thứ tự, chỉ ghi đã xử lý sau khi cập nhật thành công.
- Retry lỗi tạm thời có giới hạn và hàng đợi lỗi cần xử lý; không lặp vô hạn hoặc tự giải quyết xung đột bằng ghi đè.
- Định kỳ đối soát booking, tồn, giá và tiền theo phạm vi tích hợp. Dữ liệu nhận từ hệ thống ngoài không tự được tin là đúng khi lệch với nguồn chính.
- Khi dữ liệu trễ/mất mạng: hiện tuổi dữ liệu, trạng thái đồng bộ và tác vụ đang chờ. Không mặc định cho bán phòng từ cache cũ; quy trình ngoại tuyến phải được chốt riêng (D08/D09).

Các quy tắc trên chưa chọn giao thức/API cụ thể. Không suy repo hiện tại có OAuth, webhook hay tài khoản OTA hoạt động.
