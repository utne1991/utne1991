# Bản đồ sản phẩm Resort 100

## 1. Phạm vi và mục tiêu

Một cơ sở 100 phòng. Giao diện tiếng Việt, tiền VND, múi giờ cơ sở cấu hình được; bản mẫu dùng Asia/Ho_Chi_Minh. Suite/Villa/Deluxe/Standard là phân loại minh họa, cần đối chiếu danh mục thật.

Mục tiêu: biết phòng nào có thể bán và vào ngày nào, phục vụ khách đúng hạn, tối ưu lợi nhuận sau chi phí thay vì chỉ tăng công suất. Không cam kết AI sẽ lấp đầy phòng.

## 2. Bản đồ màn hình

```mermaid
flowchart TD
    LOGIN[Đăng nhập và phân quyền] --> HOME[Dashboard theo vai trò]
    HOME --> TODAY[Hôm nay: công suất và công việc]
    HOME --> CAL[Lịch phòng 7 / 30 / 90 ngày]
    HOME --> BOOK[Đặt phòng]
    HOME --> HK[Buồng phòng và bảo trì]
    HOME --> REV[Doanh thu và chiến dịch]
    HOME --> REPORT[Báo cáo]
    HOME --> SETTINGS[Cài đặt]
    TODAY --> ROOM[Chi tiết phòng]
    TODAY --> RES[Chi tiết đặt phòng]
    CAL --> RES
    CAL --> ROOM
    BOOK --> RES
    RES --> PAY[Đặt cọc / thanh toán / hoàn tiền]
    HK --> TASK[Phân công / cập nhật / kiểm tra]
    REV --> SUGGEST[Đề xuất giá và khuyến mãi]
    SUGGEST --> APPROVE[Quản lý duyệt]
    APPROVE --> CAMPAIGN[Chiến dịch và theo dõi kết quả]
    REPORT --> CHANNEL[Hiệu quả kênh / chi phí / công suất]
    SETTINGS --> MASTER[Loại phòng / giá / nhân sự / chính sách]
    SETTINGS --> SYNC[Tích hợp PMS hoặc channel manager]
```

## 3. Dashboard đầu tiên

Thứ tự ưu tiên: công việc hôm nay → phòng sẵn sàng → khoảng trống trong lịch bán → đề xuất hành động.

| Vùng | Nội dung | Hành động khi làm app thật |
| --- | --- | --- |
| Thanh trên | Cơ sở, ngày, thời điểm đồng bộ, tạo đặt phòng | Đổi ngày/cơ sở; mở form |
| Cảnh báo | Đồng bộ lỗi, khách đến nhưng phòng chưa sẵn sàng | Mở danh sách có bộ lọc |
| 4 thẻ KPI | Công suất, phòng sạch trống, trả hôm nay, công suất đã đặt D+7 | Xem nguồn số liệu |
| Công việc hôm nay | Sắp trả / sắp đến / cần dọn | Xem booking hoặc công việc |
| Biểu đồ 7 ngày | Số phòng đã đặt so với phòng có thể bán | Mở lịch đúng ngày |
| Sơ đồ 100 phòng | Trạng thái hiện tại; bộ lọc trạng thái | Mở chi tiết phòng |
| Đề xuất doanh thu | Ngày yếu, phương án, căn cứ và điều kiện | Xem đề xuất rồi duyệt |
| Hiệu quả kênh | Đêm phòng, doanh thu, hoa hồng, quảng cáo | Mở báo cáo |

Bản HTML là mẫu cho chủ resort/quản lý. Vai trò buồng phòng chỉ thấy công việc và trạng thái phòng cần thiết, không thấy doanh thu hay thông tin khách không liên quan.

## 4. Ngữ nghĩa dữ liệu — bắt buộc giữ đúng

- `Room`: phòng vật lý; `RoomType`: loại phòng. Không gộp hai khái niệm.
- `Reservation` chứa một hoặc nhiều `ReservationRoom`; mỗi dòng có loại phòng, thời gian và giá. Có thể chưa gán phòng vật lý khi mới đặt.
- Trạng thái reservation: tentative, confirmed, checked_in, checked_out, cancelled, no_show. Chỉ hold chưa hết hạn và booking hợp lệ mới giữ tồn theo chính sách.
- Trạng thái housekeeping: dirty, cleaning, inspected, ready. Bảo trì là một khoảng chặn phòng riêng; trạng thái ở của khách được suy ra từ lưu trú.
- Ô phòng có nhãn hiển thị tổng hợp; dữ liệu backend vẫn tách booking, dọn phòng và bảo trì.
- Dùng khoảng lưu trú `[check_in, check_out)` để cho phép trả và nhận cùng ngày; giờ sẵn sàng thực tế còn phụ thuộc dọn phòng và chính sách.
- Ngăn xếp lịch phòng ở backend, kể cả hai nhân viên đặt cùng lúc. Khi bán theo loại phòng, kiểm tra cả tồn loại phòng và phân bổ phòng vật lý.
- Không lưu số thẻ thanh toán. Thông tin khách phải phân quyền, ghi nhật ký truy cập phù hợp và có chính sách lưu trữ.

### KPI và số liệu minh họa

100 phòng: 74 đang ở + 10 sẵn sàng + 6 chờ dọn + 4 đang dọn + 6 bảo trì = 100.

- Công suất vận hành tại thời điểm mẫu = 74 / (100 − 6 bảo trì) = **78,7%**. Đây là tỷ lệ tại thời điểm, không phải công suất đêm đã chốt sổ.
- Báo cáo theo kỳ: đêm phòng bán / đêm phòng có thể bán; cộng theo từng ngày, không lấy trung bình đơn giản của tỷ lệ.
- Phòng trống có thể nhận khách ngay: 10. Không đồng nhất với 20 phòng chưa có khách nhưng không bảo trì.
- Trả hôm nay: 12; đến hôm nay: 8. Hai số là luồng công việc, không cộng vào tổng trạng thái phòng.
- D+7: 79 / 94 = 84,0% đã đặt, giả sử 6 phòng bảo trì suốt kỳ. Là booking hiện có, không phải dự báo nhu cầu.
- ADR = doanh thu phòng / đêm phòng bán. RevPAR = doanh thu phòng / đêm phòng có thể bán. Thống nhất cách xử lý VAT, phí dịch vụ, hủy và hoàn tiền.
- Lợi nhuận đóng góp kênh = doanh thu phòng sau giảm giá − hoa hồng − chi phí quảng cáo phân bổ − chi phí biến đổi phục vụ. Đây chưa phải lợi nhuận toàn resort sau chi phí cố định.

Không suy doanh thu hoặc ROI thật từ các con số minh họa. Báo cáo kênh trong bản mẫu là một tập số liệu ví dụ độc lập theo kỳ; không dùng để đối soát với công suất tại thời điểm.

## 5. Bản đồ dữ liệu và tích hợp

```mermaid
flowchart LR
    DIRECT[Website / lễ tân / khách đoàn] --> CORE[Backend nghiệp vụ]
    OTA[Booking.com / Agoda / kênh khác] <--> CM[PMS / Channel manager được hỗ trợ]
    CM <--> ADAPTER[Lớp tích hợp và đối soát]
    ADAPTER <--> CORE
    CORE --> DB[(Cơ sở dữ liệu)]
    CORE --> AUDIT[Nhật ký và phân quyền]
    DB --> METRIC[Chỉ số / lịch bán / công việc]
    METRIC --> DASH[Dashboard]
    DB --> RULE[Đề xuất theo quy tắc]
    ADS[Chi phí quảng cáo được cấp quyền] --> RULE
    RULE --> HUMAN[Quản lý duyệt ngân sách và giá]
    HUMAN --> EXEC[Thực thi qua tích hợp có hỗ trợ]
```

Nếu đã có PMS, chọn nguồn dữ liệu chính trước khi code. Không để app mới và PMS cùng giữ hai bộ tồn phòng độc lập. Webhook cần idempotency, xử lý sự kiện đến sai thứ tự, hàng đợi retry và đối soát định kỳ. Hiển thị lần đồng bộ thành công cuối và dữ liệu trễ.

## 6. Lộ trình triển khai

1. **Giao diện mẫu:** dashboard, lịch phòng, chi tiết phòng, dữ liệu giả nhất quán. Chưa có tác động tài chính.
2. **Nghiệp vụ cốt lõi:** đăng nhập/phân quyền, booking, tồn phòng, dọn phòng, bảo trì, nhật ký, sao lưu và kiểm thử khôi phục.
3. **Tích hợp và chạy thử:** chọn nguồn chính; đồng bộ kênh bán; đối soát booking/tồn phòng; chạy thử song song có kiểm soát trước khi nhận vận hành thật.
4. **Doanh thu:** giá và khuyến mãi theo quy tắc; phí kênh và chi phí phục vụ; quản lý duyệt.
5. **Tối ưu nâng cao:** đánh giá dự báo trên dữ liệu lịch sử, đo hiệu quả tăng thêm của chiến dịch; tự động hóa trong giới hạn có thể thu hồi.

## 7. Quyết định còn cần xác nhận trước backend

PMS/channel manager hiện tại; kênh bán; danh mục 100 phòng thật; giờ nhận/trả; chính sách giá/thuế; nguồn chi phí; vai trò nhân viên; yêu cầu dữ liệu cá nhân; nhà cung cấp hosting. Các quyết định này không chặn việc dựng giao diện mẫu.
