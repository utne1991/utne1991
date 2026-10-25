# Mô hình vận hành đề xuất — Resort 100 Property Management

Ngày cập nhật: 26/10/2026. Đây là thiết kế nghiệp vụ để thảo luận và xác nhận; không có giả định resort đã áp dụng quy trình này. Yêu cầu hiện tại là thiết kế toàn bộ PMS trước khi chia đợt code, không chỉ chốt dashboard.

## 1. Cách tổ chức sản phẩm

PMS là nơi phối hợp booking, tồn phòng, khách, buồng phòng, thanh toán và bàn giao ca. Dashboard chỉ tổng hợp dữ liệu và đưa người dùng tới nơi xử lý. Mỗi vấn đề phải có một chủ nhiệm, trạng thái và thời điểm cần xử lý; không chỉ xuất hiện dưới dạng thẻ cảnh báo.

Chọn một nguồn ghi chính cho booking/tồn phòng (D01/D02). Nếu PMS hiện có vẫn là nguồn chính, app mới phải đi qua tích hợp được hỗ trợ; nút ghi bị giới hạn hoặc thay bằng liên kết bàn giao khi chưa có quyền/API. Không tạo một bộ booking song song rồi gọi là đã đồng bộ.

## 2. Chín phân hệ chính

| ID | Phân hệ | Vai trò chính | Đầu ra vận hành |
| --- | --- | --- | --- |
| UI01 | Tổng quan | Quản lý, lễ tân theo quyền | Biết việc cần làm và mở đúng màn hình xử lý |
| UI02 | Lịch phòng | Lễ tân, kinh doanh theo quyền | Biết loại/phòng nào bán được cho một khoảng ngày |
| UI03 | Đặt phòng | Lễ tân, bộ phận đặt phòng | Booking và thay đổi được kiểm tra tồn, chính sách và tiền |
| UI04 | Buồng phòng và bảo trì | Trưởng ca, nhân viên được phân công | Phòng sạch được kiểm tra, lỗi được sửa, sẵn sàng đúng ưu tiên |
| UI05 | Khách và yêu cầu | Lễ tân, chăm sóc khách | Theo dõi nhu cầu và giải quyết yêu cầu có người chịu trách nhiệm |
| UI06 | Thu chi và đối soát booking | Thu ngân, kế toán, quản lý theo quyền | Tách doanh thu, cọc, tiền thu, phải thu và hoàn; bàn giao ca đúng |
| UI07 | Doanh thu và chiến dịch | Quản lý, kinh doanh | Giá/gói/chiến dịch có căn cứ, hạn mức, người duyệt và kết quả |
| UI08 | Báo cáo | Quản lý, kế toán theo quyền | Công suất, hiệu quả kênh, chi phí và vận hành có định nghĩa rõ |
| UI09 | Cấu hình và kết nối | Người có quyền quản trị tương ứng | Danh mục, quyền, chính sách, nguồn dữ liệu và đồng bộ được kiểm soát |

Buồng phòng và bảo trì chung phân hệ nhưng là hai bảng việc/phân quyền khác nhau. Thu chi booking không có nghĩa đã thay hệ thống kế toán, lương, mua hàng hoặc thuế của doanh nghiệp.

## 3. Quy trình trước ngày khách đến

1. Nhận yêu cầu từ lễ tân, website, đại lý hoặc kênh bán qua nguồn được hỗ trợ.
2. Kiểm tra ngày, số khách, loại phòng, sức chứa, giá, điều kiện và tồn của cả kỳ lưu trú.
3. Tạo hold có hạn hoặc xác nhận theo chính sách; ghi mã nguồn booking để chống trùng.
4. Theo dõi cọc/phải thu độc lập với trạng thái booking; nhắc việc theo điều kiện được chốt, không tự gửi thông tin ra ngoài khi chưa cấu hình/quyền.
5. Chuẩn bị khách đến: giờ dự kiến, yêu cầu đặc biệt, phòng chưa gán và khả năng phòng kịp sẵn sàng. Gán phòng theo điều kiện đã biết, không đoán sở thích hoặc tình trạng sức khỏe khách.
6. Trưởng buồng phòng nhận danh sách phòng cần ưu tiên; lỗi bảo trì có nguy cơ ảnh hưởng khách được bàn giao cho quản lý.

## 4. Một ngày vận hành

Không ấn định giờ giao ca/nhận/trả cứng vì D04 chưa chốt. Các việc được kích hoạt theo sự kiện và thời hạn thực tế.

| Thời điểm / sự kiện | Người chịu trách nhiệm | Màn hình | Việc cần làm và điểm bàn giao |
| --- | --- | --- | --- |
| Nhận ca | Lễ tân / quản lý ca | UI01, UI03, UI06 | Nhận việc tồn, khách đến/trả, cọc/phải thu, lỗi đồng bộ; ghi người tiếp nhận |
| Chuẩn bị trả phòng | Lễ tân / thu ngân | UI03, UI06 | Kiểm tra hóa đơn dịch vụ, thanh toán theo chính sách, thay đổi giờ trả |
| Khách đã trả | Lễ tân → trưởng buồng phòng | UI03 → UI04 | Cập nhật lưu trú, phát sinh việc dọn, người nhận và mức ưu tiên |
| Dọn và kiểm tra | Buồng phòng / người kiểm tra | UI04 | Ghi bắt đầu/kết thúc, lỗi và kết quả; không chỉ bấm “đã dọn” là đủ sẵn sàng |
| Có hỏng hóc | Buồng phòng → bảo trì → quản lý khi xung đột | UI04, UI02 | Chặn theo khoảng thời gian và ảnh hưởng booking; sửa rồi kiểm tra bàn giao |
| Chuẩn bị nhận khách | Lễ tân phối hợp buồng phòng | UI02, UI03, UI04 | Gán phòng phù hợp và sạch; xử lý thiếu phòng sớm trước giờ đến |
| Trong kỳ ở | Lễ tân / bộ phận phục vụ | UI05, UI04, UI06 | Nhận yêu cầu, ghi người xử lý, dịch vụ và chi phí hợp lệ; xử lý gia hạn/đổi phòng |
| Trong ca có bất thường | Quản lý ca | UI01, UI09 | Việc quá hạn, chồng lịch, thanh toán treo, dữ liệu trễ; phân công xử lý |
| Bàn giao ca / chốt ngày | Lễ tân, thu ngân, quản lý | UI06, UI08 | Đối soát, ghi lệch và công việc mở; chuyển ngày kinh doanh theo D04 |

Khách trả muộn, nhận sớm hoặc gia hạn có thể làm trễ việc dọn và ảnh hưởng lượt đến. Thay đổi phải cập nhật cả lịch, công việc và cảnh báo, không chỉ sửa giờ trên booking.

## 5. Ưu tiên công việc để giảm thời gian phòng chưa bán được

Đề xuất thứ tự: sự cố an toàn/cần ngưng sử dụng → phòng có khách sắp đến và chưa sẵn sàng → phòng cần hoàn tất để đáp ứng booking đã xác nhận → công việc thường lệ → bảo trì phòng ngừa theo kế hoạch. Mức độ và thời hạn cần được quản lý xác nhận; không dùng một số phút mặc định cho mọi loại phòng.

Gom việc theo khu/tầng, kỹ năng và khối lượng dự kiến để giảm đi lại. Hiển thị năng lực ca và việc đang làm trước khi giao thêm. Gợi ý phân công phải cho trưởng ca điều chỉnh; chưa tự suy ra số nhân sự tối ưu khi không có dữ liệu thời gian phục vụ và chất lượng.

Mỗi việc có: cơ sở/phòng, loại việc, mức ưu tiên, lý do, người phụ trách, hạn, trạng thái, nhật ký và kết quả kiểm tra. Ghi lịch sử bàn giao, không tạo nhiều cảnh báo trùng cho cùng một vấn đề mà không có người xử lý.

## 6. Chu trình doanh thu và chiến dịch

1. Xem tồn bán và tốc độ đặt thêm cho từng ngày/loại phòng; tách booking đã có khỏi dự báo.
2. Đánh giá lượng hủy, lead time, mùa/ngày trong tuần và hiệu quả kênh khi có dữ liệu đủ chất lượng.
3. Ưu tiên rà soát phòng bị chặn không còn cần thiết, mapping/sự cố kênh bán và khả năng nhận booking trước khi dùng giảm giá để giải quyết mọi khoảng trống.
4. So phương án: giữ giá, gói gia tăng giá trị, ưu đãi theo điều kiện, đẩy kênh trực tiếp hoặc chiến dịch quảng cáo.
5. Tính chi phí: giảm giá, quyền lợi gói, hoa hồng, quảng cáo và chi phí phục vụ tăng thêm; kiểm tra giới hạn tồn/giá/ngân sách.
6. Người có quyền duyệt; thực thi qua tích hợp được hỗ trợ và xác minh kết quả. Có giới hạn số phòng/ngày/loại và điều kiện dừng/hoàn tác.
7. Theo dõi kết quả, lợi nhuận đóng góp và bằng chứng tăng thêm; không dùng chỉ số click hoặc công suất cao để kết luận có lãi.

Chưa đặt ngưỡng như “trống hơn 30% là tự giảm 20%”. Các ngưỡng phải theo dữ liệu, giá sàn và chính sách resort (D10). Chưa cấp ngân sách quảng cáo hoặc cho phép công cụ tự thực thi tài chính.

## 7. Chi phí nên quản lý tới đâu?

| Nhóm | Dữ liệu cần | Ứng dụng trong PMS |
| --- | --- | --- |
| Phí bán phòng | Hoa hồng, khuyến mãi, phí giao dịch, quảng cáo | So sánh lợi nhuận đóng góp theo kênh và gói |
| Phục vụ khách | Dọn, giặt, ăn sáng, vật tư theo mức chi tiết có thể thu thập | Ước tính chi phí biến đổi và kiểm tra giá/gói |
| Nhân lực vận hành | Phân công, giờ việc, chuẩn chất lượng, lịch ca nếu có | Gợi ý ưu tiên và cân bằng công việc; chưa tự thay hệ thống chấm công/lương |
| Bảo trì | Sự cố, downtime, chi phí sửa và lịch ngừa lỗi | Giảm thời gian ngưng khai thác và lỗi lặp |
| Điện/nước, kho, nhà hàng/spa | Đồng hồ/POS/ERP hoặc nguồn ghi nhận thực tế | Tích hợp hoặc báo cáo giai đoạn sau; không suy tiết kiệm thật chỉ từ công suất |

Tối ưu lợi nhuận toàn resort cần cả chi phí cố định và bộ phận ngoài phòng; PMS hiện tại không tự cung cấp dữ liệu đó. Chốt nguồn và phạm vi rồi mới chọn tích hợp hoặc module riêng.

## 8. Chu trình quản lý theo tuần/tháng

Rà soát ngày yếu trong 7/30/90 ngày, kết quả kênh/chiến dịch, nguyên nhân hủy/no-show, thời gian phòng ngưng bán, việc quá hạn và phản hồi khách. Giao hành động cho người phụ trách, hạn hoàn thành và chỉ số cần cải thiện. Đối chiếu với kỳ/mùa phù hợp; không kết luận từ một tuần dữ liệu thiếu.

## 9. Thiết kế trước, chia đợt code sau

Trước khi chốt giao diện, cần bao quát UI01–UI09, quan hệ giữa màn hình, trạng thái rỗng/lỗi/trễ, vai trò và điểm bàn giao. Sau đó mới chia PR theo [IMPLEMENTATION-BRIEF](IMPLEMENTATION-BRIEF.md). Việc tách PR không phải bỏ qua thiết kế các phân hệ còn lại.

Xem [đặc tả từng màn hình](SCREEN-SPECIFICATIONS.md), [bảng bao phủ](SCREEN-COVERAGE.md) và [sơ đồ vận hành](diagrams/11-resort-operating-cycle.md).
