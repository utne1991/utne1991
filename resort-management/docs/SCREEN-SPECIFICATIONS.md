# Đặc tả bố cục chín phân hệ PMS

**Bản thiết kế bằng văn bản ngày 26/10/2026.** Chưa phải chín giao diện đã được vẽ/chạy; HTML hiện tại chỉ là dashboard mẫu. Đặc tả này là đầu vào để vẽ các trang liên kết và xuất Archify sau khi các quyết định liên quan được xác nhận.

Bộ Figma/FigJam BeeSmart HotelOS bên ngoài đã được người dùng báo cáo tạo thành công, nhưng chưa đối chiếu nội dung trong phiên này. Xem [FIGMA-HANDOFF](FIGMA-HANDOFF.md); không tự đổi trạng thái các yêu cầu thành đạt từ số lượng khung hoặc tiêu đề báo cáo.

## Thành phần dùng chung

Sidebar chín phân hệ; header có cơ sở, ngày/khoảng ngày, người dùng và trạng thái dữ liệu. Bộ lọc trong URL khi phù hợp để giữ ngữ cảnh giữa các trang. Panel chi tiết phòng/booking dùng cùng ID và nguồn dữ liệu; thao tác xong phản ánh ở các trang liên quan.

Mọi trang có trạng thái loading, không có dữ liệu, không có kết quả lọc, lỗi, thiếu quyền và dữ liệu trễ. Nút ghi có trạng thái đang gửi, thành công, lỗi và xung đột phiên bản; không báo thành công chỉ vì đóng form. Có nhãn văn bản ngoài màu, keyboard/focus rõ; di động có danh sách thay cho lịch lớn khi cần. Thông tin khách và tiền hiển thị theo quyền.

## UI01 — Tổng quan

```text
[Cơ sở] [Hôm nay / ngày mẫu] [Tuổi dữ liệu] [Tạo booking]
[Công suất] [Phòng sẵn sàng] [Sắp trả] [Khách đến]
[Việc cần xử lý có người phụ trách] [Khả dụng 7/30 ngày]
[Sơ đồ trạng thái phòng] [Cơ hội doanh thu theo quyền]
```

- Quản lý thấy vận hành/kinh doanh theo quyền; lễ tân ưu tiên khách đến/trả; buồng phòng nhận màn việc của UI04.
- Bấm KPI/việc/ngày mở danh sách hoặc lịch với bộ lọc tương ứng; cảnh báo có nguyên nhân, người phụ trách và hạn.
- Bản mẫu hiện có thẻ D+7; lựa chọn bộ KPI cố định/cấu hình theo vai trò cần được duyệt khi vẽ lại.
- Nghiệm thu: số liệu truy nguyên được, không cộng luồng khách đến/trả vào tổng trạng thái; dữ liệu trễ không được gắn nhãn realtime.

## UI02 — Lịch phòng

```text
[Ngày] [7 / 30 / 90 ngày] [Loại phòng] [Khu] [Trạng thái]
[Tổng tồn theo loại / ngày] [Booking chưa gán cần xử lý]
[Phòng ↓ | Ngày → | Thanh lưu trú | Khoảng bảo trì]
[Chi tiết phòng / booking / khoảng chặn]
```

- Có hai góc nhìn: tồn loại phòng để bán và phòng vật lý để gán/vận hành. Hàng chưa gán không biến mất khỏi tồn bán.
- Bấm khoảng trống để tìm/tạo booking; bấm thanh để xem/đổi ngày/gán/đổi phòng theo quyền. Tất cả thao tác kéo có form thay thế.
- Nhìn được ngày trống tiếp theo của phòng và khoảng khả dụng đủ dài cho nhu cầu. Phòng sạch hôm nay không chứng minh trống cho cả kỳ.
- Cảnh báo chồng lịch, phòng chưa sạch, phòng bảo trì và booking cần gán; khi thao tác thất bại giữ nguyên lịch cũ.
- Nghiệm thu: trả/nhận cùng ngày không chồng đêm; đổi/gia hạn kiểm tra tồn cả kỳ; room type và room allocation khớp quy tắc.

## UI03 — Đặt phòng

```text
[Tìm mã / khách] [Ngày đến-trả] [Kênh] [Trạng thái] [Tạo]
[Danh sách: mã | khách theo quyền | ngày | loại/số phòng | cọc/phải thu]
[Chi tiết: Tóm tắt | Phòng | Khách | Giá/dịch vụ | Tiền | Lịch sử]
```

- Form theo bước: ngày/số khách → loại và số lượng phòng → giá/điều kiện → thông tin khách cần thiết → cọc/xác nhận.
- Danh sách có nhóm khách đến, đang ở, trả hôm nay, chờ cọc, hold sắp hết hạn, hủy/no-show và ngoại lệ. Nhiều dòng phòng có trạng thái riêng.
- Nhận/trả, đổi ngày, gia hạn, đổi phòng và hủy có preview thay đổi tồn/tiền/chính sách trước xác nhận; người dùng thấy bước nào còn chờ xử lý.
- Không xem trạng thái “đã thu cọc” là bằng chứng booking đã xác nhận; không tự nhận khách khi phòng chưa đủ điều kiện.
- Nghiệm thu: INV01–INV06/FIN01 trong IMPLEMENTATION-BRIEF; kết quả thao tác đồng bộ với lịch, công việc và sổ tiền theo phạm vi nguồn chính.

## UI04 — Buồng phòng và bảo trì

```text
[Dọn phòng | Kiểm tra | Bảo trì] [Ngày/ca] [Khu] [Người phụ trách]
[Cần giao] → [Đã giao] → [Đang làm] → [Chờ kiểm tra] → [Hoàn tất]
[Phòng | Giờ khách đến | Ưu tiên/lý do | Hạn | Khối lượng | Vướng mắc]
```

- Trưởng ca phân công theo khu/kỹ năng/khối lượng; nhân viên dùng danh sách việc di động. Dọn phòng trong kỳ ở là tác vụ khác với dọn sau trả.
- Bắt đầu, tạm vướng, hoàn tất, kiểm tra đạt/không đạt; ghi người và thời gian. Người kiểm tra được phân quyền riêng nếu quy trình yêu cầu.
- Bảo trì có sự cố, mức độ, người nhận, khoảng chặn, ảnh hưởng booking và bàn giao. Không tự chặn đè booking xác nhận.
- Hoàn tất việc dọn không tự biến phòng đang có khách thành phòng trống. Có thể phát sinh việc làm lại khi kiểm tra không đạt.
- Nghiệm thu: chủ nhiệm và trạng thái rõ; đổi giờ đến/trả cập nhật ưu tiên; không lộ thông tin khách không cần thiết; trạng thái đồng bộ về UI01/UI02.

## UI05 — Khách và yêu cầu

```text
[Tìm khách theo quyền] [Khách đang ở | Sắp đến | Yêu cầu mở]
[Hồ sơ tối thiểu | Booking liên quan | Yêu cầu và người phụ trách]
[Yêu cầu → Phân công → Đang xử lý → Xác minh hoàn tất]
```

- Lưu liên hệ và dữ liệu cần thiết theo chính sách D07; phân biệt khách đặt, người ở và đầu mối đoàn.
- Yêu cầu như đưa đón, giường phụ, sửa thiết bị, dị ứng ăn uống chỉ xử lý/lưu theo nhu cầu và quyền phù hợp; dữ liệu nhạy cảm không mặc định chia sẻ cho mọi bộ phận.
- Yêu cầu có thời hạn, người phụ trách, tình trạng và chi phí nếu phát sinh; dịch vụ tính tiền cần ghi đúng vào folio/quy trình nguồn chính.
- Chưa làm chương trình điểm thưởng, CRM marketing toàn diện hoặc gửi tin hàng loạt trong bản đầu. Khả năng tiếp thị cần điều kiện dữ liệu/liên hệ được phép.
- Nghiệm thu: quyền chi tiết và export đúng; truy vết yêu cầu gắn booking, không tạo hồ sơ trùng tùy tiện hoặc gửi tin ra ngoài khi chưa cấu hình.

## UI06 — Thu chi và đối soát booking

```text
[Ngày kinh doanh / ca] [Thu ngân] [Chờ xử lý] [Chênh lệch]
[Folio booking: dịch vụ/đêm phòng | cọc | thu | phải thu | hoàn]
[Phương thức | Mã giao dịch | Nguồn | Trạng thái | Nhật ký]
[Bàn giao ca / đối soát / các khoản lệch chưa giải quyết]
```

- Tách doanh thu phòng theo kỳ lưu trú với tiền thu theo ngày giao dịch; cọc, công nợ, thu/hoàn không bị cộng thành doanh thu hai lần.
- Ghi thu theo quyền; các khoản điều chỉnh/giảm/hoàn vượt quyền đi qua duyệt. Giữ lịch sử; không xóa giao dịch để làm số liệu khớp.
- Hóa đơn điện tử, cổng thanh toán và sổ kế toán chỉ kết nối khi chốt nhà cung cấp/phạm vi; không nhận lưu số thẻ.
- Bàn giao thể hiện dự kiến, ghi nhận, thực nhận theo phương thức và phần chênh; người nhận xác nhận theo quy trình đã chốt.
- Nghiệm thu: tiền nguyên đơn vị đã thống nhất, webhook/import chống trùng, truy nguyên tới giao dịch/booking; nghiệp vụ thuế chưa chốt không được giả lập thành chứng từ hợp lệ.

## UI07 — Doanh thu và chiến dịch

```text
[Khoảng ngày / loại phòng] [Tồn bán] [Tốc độ đặt] [Giá và biên đóng góp]
[Lịch giá/điều kiện] [Gói khuyến mãi] [Chiến dịch] [Chờ duyệt]
[Phương án | Căn cứ | Chi phí dự kiến | Giới hạn | Người duyệt]
[Kết quả: đêm phòng / thuần kênh / chi phí / tác động tăng thêm]
```

- Tách ba phần liên quan: giá/điều kiện bán, gói/khuyến mãi và quảng cáo. Mỗi phần có draft/duyệt/lên lịch/áp dụng hoặc lỗi/dừng/hết hạn phù hợp.
- Gói nêu quyền lợi, chi phí, số phòng/ngày/loại tối đa, thời hạn đặt và ở, điều kiện hủy. Chưa chốt dữ liệu không tự đề xuất phần trăm giảm giá.
- Chiến dịch có mục tiêu, kênh, nội dung, đối tượng được phép, ngân sách, người duyệt, kết nối và điều kiện dừng; tạo draft không có nghĩa ads đã chạy.
- Trước thực thi kiểm tra lại tồn, giá sàn, quyền, phiên bản và ngân sách. Kênh không hỗ trợ tự động thì bàn giao thủ công có xác minh kết quả.
- Nghiệm thu: không tự chi tiền, không lấy ROAS làm lợi nhuận ròng; phân biệt dự kiến/đã ghi nhận, attribution/tăng thêm và đồng bộ thành công/chờ xử lý.

## UI08 — Báo cáo

```text
[Kỳ / ngày kinh doanh] [Loại phòng] [Kênh] [Nguồn và độ mới dữ liệu]
[Công suất] [ADR] [RevPAR] [Doanh thu phòng] [Lợi nhuận đóng góp]
[Xu hướng | Hiệu quả kênh | Buồng phòng/bảo trì | Chi phí]
[Định nghĩa chỉ số | Xem dữ liệu nguồn | Xuất theo quyền]
```

- Phân biệt thực tế đã chốt, on-the-books tương lai và dự báo. Phí kênh, quảng cáo và chi phí phục vụ phải chỉ rõ nguồn/phân bổ.
- Vận hành gồm thời gian trả→sẵn sàng, việc quá hạn, kiểm tra không đạt, thời gian phòng bị chặn và lỗi lặp; không dùng tốc độ dọn đơn độc để xếp hạng nhân viên.
- Thiếu dữ liệu là thiếu dữ liệu; mẫu số 0 không biến thành 0% có nghĩa. Số liệu tài chính phải đối soát với UI06/nguồn chính.
- Nghiệm thu: bộ lọc áp dụng nhất quán, công thức hiển thị và truy nguyên; export kiểm tra quyền và chỉ chứa phần cần thiết.

## UI09 — Cấu hình và kết nối

```text
[Cơ sở/loại/phòng] [Chính sách và giá] [Nhân sự/quyền] [Kết nối] [Nhật ký]
[Nguồn dữ liệu chính | Mapping ID | Lần đồng bộ | Lỗi | Hàng đợi]
[Thay đổi cấu hình → Kiểm tra ảnh hưởng → Duyệt/lưu theo quyền]
```

- Phòng/loại/sức chứa, giờ và ngày kinh doanh, điều kiện giữ/xác nhận/hủy, thuế/phí; thay đổi có hiệu lực từ đâu và ảnh hưởng booking cũ ra sao phải rõ.
- Quyền quản trị tài khoản tách quyền tài chính/quảng cáo; kiểm tra tài nguyên ở backend. Bí mật lưu trong nơi quản lý secrets, không hiện giá trị trong màn tổng quan/log/export.
- Kết nối có nguồn ghi chính, mapping, last-success, tuổi dữ liệu, retry, đối soát và người xử lý lỗi. Có trạng thái chưa cấu hình/chưa có quyền.
- Backup/giám sát có thể thuộc nền tảng hosting; UI thể hiện trạng thái khi có nguồn hỗ trợ, không tạo nút “sao lưu thành công” giả.
- Nghiệm thu: cấu hình sai có lỗi hữu ích, không ghi đè dữ liệu nguồn chính, lịch sử thay đổi có người/lý do; test nguồn kết nối không làm thay dữ liệu khách.

## Những phần cần tách riêng nếu phát sinh

POS nhà hàng/spa, kho và mua hàng, lương/chấm công, kế toán tổng hợp, hệ thống khóa cửa, điện năng/IoT và booking engine công khai là phạm vi tích hợp hoặc giai đoạn bổ sung. Chúng không mặc nhiên được coi là đã có chỉ vì gọi sản phẩm là PMS hoàn chỉnh.
