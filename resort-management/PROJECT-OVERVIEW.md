# Tổng quan dự án quản lý resort 100 phòng

**Trạng thái:** thiết kế sản phẩm và xác định nghiệp vụ. Chưa có backend, cơ sở dữ liệu, tích hợp thật hoặc ứng dụng production.

**Chủ dự án:** utne1991. **Nơi lưu:** repository `utne1991/utne1991`, thư mục `resort-management/`.

## 1. Mục tiêu kinh doanh

Xây dựng một ứng dụng web để người quản lý trả lời nhanh:

1. Phòng nào đang có khách, sắp trả và sẵn sàng nhận khách mới?
2. Ngày nào còn nhiều phòng chưa bán, thuộc loại phòng nào?
3. Cần ưu tiên dọn phòng, bảo trì hay xử lý đặt phòng nào?
4. Kênh bán, mức giá và chương trình khuyến mãi nào mang lại lợi nhuận tốt hơn sau chi phí?

Tăng công suất phải đi cùng hiệu quả kinh doanh. Không đặt mục tiêu bán kín bằng mọi giá; không cam kết phần mềm hoặc AI bảo đảm lấp đầy resort.

## 2. Người sử dụng

| Vai trò | Nhu cầu chính |
| --- | --- |
| Chủ resort / quản lý | Tổng quan, lịch bán, doanh thu, chi phí, duyệt giá và chiến dịch |
| Lễ tân | Đặt phòng, khách đến/trả, gán/đổi phòng, đặt cọc và thanh toán theo quyền |
| Buồng phòng | Danh sách công việc, ưu tiên phòng có khách đến, cập nhật dọn và kiểm tra |
| Bảo trì | Nhận việc, chặn phòng theo thời gian, bàn giao phòng |
| Kế toán / kinh doanh | Đối soát, chi phí kênh, hiệu quả bán và chiến dịch theo quyền |

Mỗi vai trò chỉ xem và thao tác dữ liệu cần thiết. Phân quyền phải được thực thi ở backend khi triển khai, không chỉ ẩn nút trên giao diện.

## 3. Các phân hệ dự kiến

| Phân hệ | Kết quả cần đạt | Ưu tiên |
| --- | --- | --- |
| Dashboard | Biết tình hình hôm nay và việc cần xử lý | Giai đoạn giao diện đầu tiên |
| Lịch phòng | Xem khả dụng theo ngày, loại phòng và phòng vật lý | Nghiệp vụ cốt lõi |
| Đặt phòng | Booking nhiều phòng, nhận/trả, thay đổi/hủy, tránh bán trùng | Nghiệp vụ cốt lõi |
| Buồng phòng và bảo trì | Phân biệt khách đã trả với phòng thực sự sẵn sàng | Nghiệp vụ cốt lõi |
| Tài chính vận hành | Đặt cọc, thanh toán, hoàn tiền, đối soát | Nghiệp vụ cốt lõi; chi tiết cần xác nhận |
| Kết nối kênh bán | Nhận booking và đồng bộ tồn/giá qua tích hợp được hỗ trợ | Trước vận hành đa kênh |
| Báo cáo | Công suất, ADR, RevPAR, phí kênh và lợi nhuận đóng góp | Sau khi dữ liệu nền đáng tin cậy |
| Giá và khuyến mãi | Đề xuất có căn cứ, có giới hạn và người duyệt | Sau báo cáo |
| Quảng cáo và dự báo nâng cao | Đo hiệu quả tăng thêm, dự báo được đánh giá trên dữ liệu thật | Giai đoạn sau |

## 4. Sơ đồ tổng thể

```mermaid
flowchart TD
    OWNER[Chủ resort / quản lý] --> UI[Ứng dụng web theo vai trò]
    STAFF[Lễ tân / buồng phòng / kế toán] --> UI
    UI --> API[Backend nghiệp vụ và phân quyền]
    API --> RES[Đặt phòng và tồn phòng]
    API --> OPS[Buồng phòng và bảo trì]
    API --> FIN[Thanh toán và chi phí]
    API --> DATA[(Dữ liệu và nhật ký)]
    PMS[PMS / channel manager hiện có] <--> CONNECTOR[Lớp tích hợp và đối soát]
    CONNECTOR <--> API
    DATA --> REPORT[Báo cáo và chỉ số]
    REPORT --> SUGGEST[Đề xuất giá / khuyến mãi]
    SUGGEST --> REVIEW[Quản lý xem và duyệt]
```

Nếu resort đã có PMS, cần quyết định hệ thống nào giữ dữ liệu đặt phòng và tồn phòng chính trước khi triển khai. Không xây hai nguồn tồn phòng độc lập.

## 5. Dashboard đã thiết kế

Thứ tự nội dung:

1. Cơ sở, ngày kinh doanh, vai trò và trạng thái cập nhật dữ liệu.
2. Cảnh báo khách sắp đến nhưng phòng chưa sẵn sàng.
3. Công suất hiện tại, phòng sạch trống, số phòng trả hôm nay, lượng phòng đã đặt D+7.
4. Công việc sắp trả / sắp đến / cần dọn.
5. Sơ đồ trạng thái 100 phòng và bộ lọc.
6. Lượng phòng đã đặt trong 7 ngày tới.
7. Đề xuất doanh thu có người duyệt.
8. Hiệu quả kênh sau hoa hồng, quảng cáo và chi phí phục vụ.

[Bản HTML](design/dashboard.html) có tương tác lọc phòng, chuyển nhóm công việc và mở chi tiết mẫu. Điều hướng và các thao tác nghiệp vụ còn là điểm thiết kế, chưa kết nối hệ thống thật.

## 6. Những nguyên tắc không được làm sai

- Booking tương lai là dữ liệu đã biết; dự báo nhu cầu là ước lượng. Phải ghi nhãn khác nhau.
- Phòng khách vừa trả chưa chắc đã sạch và có thể bán ngay.
- Phòng vật lý, loại phòng và lượt đặt phòng là các đối tượng khác nhau.
- Công suất báo cáo dùng số đêm phòng có thể bán làm mẫu số; phải công bố cách tính phòng bảo trì.
- Lợi nhuận đóng góp sau chi phí biến đổi chưa phải lợi nhuận ròng toàn resort.
- Thay đổi giá, ngân sách quảng cáo và giao dịch tài chính cần quyền hạn, nhật ký và cơ chế kiểm soát.
- Không dùng dữ liệu khách thật hoặc secrets trong repo, ảnh mẫu và dữ liệu demo.

Chi tiết công thức và trạng thái nằm trong [PRODUCT-MAP](docs/PRODUCT-MAP.md).

## 7. Lộ trình và điều kiện chuyển bước

| Bước | Công việc | Điều kiện hoàn thành |
| --- | --- | --- |
| 0 — Hiện tại | Tổng quan, sơ đồ chức năng, bản mẫu dashboard | Chủ dự án có tài liệu chung để thảo luận và điều chỉnh |
| 1 — Chốt giao diện | Xác nhận bố cục và màn hình ưu tiên | Mỗi phần có hành động và tiêu chí nghiệm thu rõ |
| 2 — Claude triển khai giao diện | Chuyển bản mẫu thành app dùng dữ liệu giả | Có PR, chạy được, kiểm tra responsive và số liệu |
| 3 — Backend nghiệp vụ | Đăng nhập, booking, tồn phòng, dọn phòng, quyền và nhật ký | Kiểm thử chồng lịch/đặt đồng thời, phân quyền, sao lưu/khôi phục |
| 4 — Kết nối và chạy thử | PMS/kênh bán, đối soát, quy trình vận hành | Dữ liệu khớp; lỗi đồng bộ được phát hiện và xử lý; có phương án quay lui |
| 5 — Tối ưu doanh thu | Báo cáo thật, giá/khuyến mãi có người duyệt | Chỉ số được đối soát và kết quả chiến dịch đo được |

Chưa giao việc cho Claude, chưa ấn định ngân sách hoặc lịch hoàn thành khi chưa biết hệ thống hiện tại và phạm vi tích hợp.

## 8. Lựa chọn kỹ thuật đang đề xuất, chưa chốt

- Giao diện: Next.js + TypeScript, Tailwind, Recharts nếu bắt đầu app mới. Theo framework sẵn có nếu chọn mở rộng một hệ thống.
- Backend và cơ sở dữ liệu: quyết định sau khi xác nhận PMS, luồng đặt phòng và yêu cầu vận hành. PostgreSQL là một lựa chọn để đánh giá, chưa phải cấu hình đã cài.
- GitHub: lưu thiết kế, mã nguồn, issue và PR trong thư mục dự án hiện tại.
- Môi trường production: hosting riêng có HTTPS, cơ sở dữ liệu, sao lưu và giám sát. Codex Cloud là nơi phát triển; chưa có dịch vụ chạy liên tục cho resort.
- MCP: chưa cần cho bước thiết kế. GitHub/Figma/Playwright có thể bổ sung theo công cụ và quyền truy cập thực tế.

## 9. Thông tin cần thu thập trước khi code nghiệp vụ

- Resort hiện dùng PMS hoặc channel manager nào? Có API/export dữ liệu không?
- Danh sách 100 phòng, loại phòng, giá, thời gian nhận/trả và chính sách bảo trì.
- Các kênh bán, phí kênh, quy trình khách đoàn và nguồn booking trực tiếp.
- Quy trình đặt cọc, thu tiền, hủy/hoàn và cách tính thuế/phí.
- Vai trò nhân viên, thiết bị dùng tại quầy và trong buồng phòng.
- Dữ liệu chi phí và lịch sử booking có thể sử dụng hợp lệ.
- Ngân sách vận hành, hosting và yêu cầu bảo vệ/lưu trữ dữ liệu khách.

Các câu hỏi này không chặn việc xem và chỉnh bản thiết kế hiện tại; chúng chặn quyết định backend và vận hành thật.

## 10. Tài liệu và cách làm việc tiếp theo

- [Bắt đầu và công cụ](README.md)
- [Bản đồ màn hình, nghiệp vụ và dữ liệu](docs/PRODUCT-MAP.md)
- [Bản mẫu dashboard](design/dashboard.html)
- [Hướng dẫn bàn giao cho Claude khi chủ dự án quyết định triển khai](docs/CLAUDE-HANDOFF.md)

Trước mắt tiếp tục hoàn thiện thiết kế và chốt phạm vi. Bản hướng dẫn Claude là tài liệu dự phòng, không phải thông báo đã giao hoặc đã hoàn thành code.
