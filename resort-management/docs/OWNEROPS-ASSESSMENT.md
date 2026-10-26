# Đánh giá đề xuất OwnerOps

Ngày đánh giá: 26/10/2026. Đầu vào: [báo cáo đầy đủ](research/OWNEROPS-PROPOSAL-2026-10-26.md), [nguyên văn](research/OWNEROPS-PROPOSAL-2026-10-26.raw.txt), cùng [nghiên cứu thị trường đang dùng](research/MARKET-RESEARCH-WORKING-SUMMARY.md). Người dùng yêu cầu đánh giá và lưu, chưa yêu cầu code hoặc chốt toàn bộ đề xuất.

## 1. Kết luận

**OwnerOps là ứng viên MVP phù hợp để thu hẹp lớp Operations & Revenue Control**, tập trung owner visibility và trách nhiệm công việc. Nó không mâu thuẫn với việc giữ PMS/CM làm nguồn booking/tồn chính. Nên đưa vào bước chọn scope pilot, chưa thay định hướng đã lưu thành full PMS replacement hoặc mặc định bắt đầu các task HOTEL-*.

Điểm đáng giữ: phân biệt nộp việc/nghiệm thu; quản lý chịu trách nhiệm chất lượng; nhân viên có giao diện gọn; chủ xem tổng hợp/ngoại lệ; hiển thị mức đầy đủ của số tài chính; có pilot và chỉ số đo trước/sau.

Điểm chưa được chứng minh: khách hàng chịu trả giá OwnerOps; thời gian quản lý được tiết kiệm; việc duyệt không gây nghẽn; dữ liệu thu/chi đủ để tính lãi; kết nối PMS thực tế. Không gọi đây là product-market fit hoặc sản phẩm sẵn sàng bán.

## 2. Đối chiếu và các điều cần chỉnh

| Chủ đề | Đánh giá | Cách dùng trong dự án |
| --- | --- | --- |
| Chuỗi Chủ → Quản lý → Nhân viên → Kiểm tra | Hợp lý để thiết kế trải nghiệm; không thay RBAC chi tiết | Ba góc nhìn, cùng dữ liệu nhưng khác quyền; FO/FIN/QA/IT vẫn là các chức năng riêng |
| OwnerOps dùng kèm PMS | Khớp control layer và giảm scope ban đầu | Giữ nguồn chính; local task có ownership riêng; cập nhật phòng vào PMS qua contract/quyền |
| Nhân viên nộp, quản lý nghiệm thu | Giúp bảo vệ chất lượng | Kiểm tra người, phiên bản, checklist/minh chứng và nhật ký; không tự duyệt trái policy |
| Chỉ báo cáo ngoại lệ cho chủ | Tránh quá tải nhưng cần policy escalation | Có owner xử lý, hạn, ngưỡng và người thay thế; chủ không nhận mọi sự kiện |
| Dashboard tiền/lãi | Tốt khi phân loại và chỉ rõ kỳ/nguồn | Tách doanh thu, tiền thu, chi phí phát sinh, khoản phải trả và coverage; chưa đủ chi phí thì không gọi lãi ròng |
| “92% đạt kiểm tra/đúng hạn” | Đang trộn chất lượng với thời hạn | Tách tỷ lệ nộp đúng hạn, nghiệm thu đúng hạn, đạt ngay lần đầu và số chờ kiểm tra |
| HOTEL-CORE-005 nằm sau dashboard/mobile/finance | ID task không nên quyết định thứ tự dependency | Discovery, nguồn dữ liệu, room mapping và contract đọc làm từ đầu; code full core không mặc định nằm trong OwnerOps |
| HOTEL-SAAS-006 | Billing có thể để sau, isolation không thể đợi tới khi có dữ liệu khách thật | Chốt identity/tenant/property/membership và media/export boundaries trước backend/pilot |
| HOTEL-FIN-004 có “thu tiền” | Vượt read/summary/reconcile nếu hiểu là xử lý giao dịch | MVP ưu tiên nguồn tiền và nhập chi phí có kiểm soát; thu/hoàn thật chỉ khi D06/provider/quyền được chốt riêng |
| Giá 990k–1,99m và 3,49m | Là giả thuyết gói khác nhau, chưa có margin/WTP | Không thay bảng giá trong nghiên cứu bằng số mới; tách quota/support/onboarding/custom connector |
| Demo 14 ngày, pilot 30–45 ngày | Có thể thử nhưng khác pilot 8–12 tuần trong nghiên cứu | Giữ hai đề xuất; chốt mục tiêu, baseline/stabilization, thời gian đo và scope trước lịch cam kết |
| Tool GG / Social Go / VPS | Chỉ được đề cập như khả năng tương lai | Chưa xem source/API/quyền hoặc trạng thái VPS; không nhận là tích hợp/triển khai đã có |

Báo cáo đọc repo ở `b6397d8`; khi tiếp nhận, HEAD là `ce8710a` đã lưu định vị thị trường mới. Đánh giá phải đọc cả hai nguồn thay vì coi báo cáo này đã kiểm tra mọi thay đổi sau snapshot đó.

## 3. Ứng viên scope OwnerOps để thảo luận

### Có thể ưu tiên

- Dashboard chủ theo nguồn/kỳ/asOf; bấm tới dữ liệu và việc cần quyết định.
- Work engine dùng chung phòng/bộ phận: giao người, hạn, checklist, trạng thái, nghiệm thu/làm lại, sự cố và bàn giao ca.
- Mobile web cho nhân viên với “Việc của tôi — Báo sự cố — Lịch sử”; quản lý có hàng đợi xét việc/ngoại lệ riêng.
- Nhập chi phí/tổng hợp tài chính từ nguồn hợp lệ, có người xác nhận, chứng từ/tham chiếu, trạng thái đối soát và cảnh báo thiếu dữ liệu.
- Một nguồn PMS/import được chọn, mapping và đối soát, không tự biến task local thành trạng thái tồn/booking thật.

### Không mặc định thuộc scope đầu

Full booking/OTA, sổ cái/thanh toán/hóa đơn, HR/payroll toàn diện, SaaS billing/portfolio, auto pricing/ads, offline sync/camera/push hoàn chỉnh hoặc các dịch vụ luxury đầy đủ. Chỉ đưa vào khi có yêu cầu, dữ liệu, quyền và tiêu chí riêng.

Đây là đề xuất backlog tối thiểu, chưa là cam kết tính năng hoặc baseline được chốt.

## 4. Những điều phải mô tả rõ cho work engine

| Thành phần | Thiết kế cần có |
| --- | --- |
| Dữ liệu việc | Tenant/property/resource, loại việc, nguồn tạo/event ID, người giao, người thực hiện, reviewer, ưu tiên, hạn, version và lịch sử |
| Trạng thái | Draft/assigned/in_progress/blocked/submitted/in_review/accepted/rework/cancelled hoặc mô hình tương đương; chuyển trạng thái có điều kiện và actor |
| Nộp lại | Giữ các lần nộp và kết quả review; reviewer chỉ duyệt đúng revision; approval cũ không tự áp lên nội dung mới |
| Nghiệm thu | Quyền theo tài nguyên, mức rủi ro và policy; không mặc định ai hoàn tất cũng được duyệt. Việc critical không bypass chỉ vì ảnh đã tải lên |
| Chống nghẽn | Review queue có hạn, escalation và reviewer dự phòng theo quyền; đo thời gian chờ review riêng với thời gian làm |
| Tự tạo việc | Sự kiện checkout/đổi giờ/idempotency để tránh nhiều task trùng; nguồn sự kiện phải hợp lệ, không tự tạo từ booking chưa xác nhận |
| Room readiness | Accepted của việc dọn không tự chứng minh phòng có thể nhận khách; còn occupancy, QA, block và khả năng cập nhật nguồn chính |
| Minh chứng | Ảnh theo nhu cầu/rủi ro; scope, quyền truy cập, retention và ràng buộc phòng/việc. Ảnh/QR không tự chứng minh công việc làm đúng hoặc không lộ thông tin khách |
| Mạng yếu | Giữ draft, trạng thái gửi/chưa gửi, retry chống trùng, phản hồi conflict; chưa gọi là offline/PWA hoàn chỉnh khi chưa thiết kế đồng bộ |
| Bàn giao | Owner và reviewer chuyển ca, lý do, việc mở/quá hạn và người nhận có lịch sử; không âm thầm chuyển trách nhiệm |

Không cần chủ tự nghiệm thu mọi task. Người có quyền IT cũng không mặc nhiên được xem dữ liệu tài chính hoặc duyệt chi. Trình tự trách nhiệm không tự tạo quyền truy cập vượt tenant/property.

## 5. Định nghĩa số liệu trước khi vẽ lại dashboard

- “Kiếm được bao nhiêu” cần tách doanh thu ghi nhận theo kỳ với tiền thu/hoàn theo ngày giao dịch.
- Chi phí cần phân biệt đã phát sinh/ước tính, đã thanh toán/còn phải trả, được phân bổ theo kỳ hay chưa. Tránh đếm trùng chứng từ và lần thanh toán của cùng một khoản.
- Chênh lệch thu/chi, lợi nhuận đóng góp và lợi nhuận vận hành/ròng không là một chỉ số. Có danh sách nguồn/nhóm chi phí thiếu và nhãn confidence/coverage; nhập chi phí đơn giản chưa tự tạo kế toán đầy đủ.
- Tỷ lệ nộp đúng hạn và tỷ lệ nghiệm thu đúng hạn có mốc khác nhau. Ghi rõ mẫu số, kỳ/cohort, công việc bị hủy, đổi hạn và việc chưa review; không dùng thời gian chờ reviewer để kết luận nhân viên làm kém.
- “Đạt lần đầu” cần dựa vào lượt kiểm tra và lịch sử làm lại; tỷ lệ xong cao không tự chứng minh chất lượng cao.
- Mục tiêu “xem trong 30 giây” là mục tiêu usability cần thử với người dùng, chưa là nghiệm thu đã đạt.

Các số 84,5 triệu/49,2 triệu, 68/100 và 92% trong báo cáo chỉ là ví dụ mới, không cùng fixture với wireframe 74/100 trước đó. Không trộn để đối soát hoặc tự ghi đè số liệu mẫu đã có.

## 6. Giá, chi phí và pilot

Phép tính mẫu 5 × 3,49 = 17,45; 4 + 5 × 0,8 = 8; chênh lệch 9,45 triệu là đúng số học. Đây chưa là lợi nhuận công ty: chưa trừ phát triển, bán hàng, quản lý, thuế và tác động tải/infra/support tăng theo quy mô. Chưa chứng minh shared infra 4 triệu đáp ứng số khách giả định hoặc chi phí support luôn là 0,8 triệu/property.

Giá OwnerOps có thể thấp hơn Connect/Revenue vì scope nhỏ hơn, nhưng cần xác định số phòng/nhân viên, quota ảnh, storage/retention, số integration, AI/SMS, thời gian hỗ trợ và onboarding. Các chi phí trong nghiên cứu trước có phần còn cao hơn giá gói mới; chưa thể tuyên bố biên lợi nhuận tốt nếu chưa có số đo/quote.

Các bảng giá ezCloud/Skyhotel và Vercel/Supabase trong bản dán chưa có URL bảng giá chi tiết. Link favicon chỉ giúp nhận diện tên miền, không chứng minh đúng gói, thời điểm, VAT, kỳ thanh toán hoặc add-on. Không tự thay số nghiên cứu trước hoặc dùng làm báo giá hiện hành.

Demo có thể dùng dữ liệu giả mà chưa nối PMS. Pilot thật cần baseline, một nguồn được cấp quyền và policy ghi/đối soát. Pilot 30–45 ngày của đề xuất mới và 8–12 tuần của nghiên cứu được giữ như hai phương án, chưa tự chọn lịch ngắn hơn hoặc hứa ROI.

## 7. Trình tự lập kế hoạch đề xuất

| Chặng | Công việc cần trước | Liên quan task trong báo cáo |
| --- | --- | --- |
| Discovery và contract | Nguồn PMS/import, ownership, định nghĩa KPI/tiền, roles, tenant/property và policy review | Một phần CORE-005, FIN-004, SAAS-006 và PILOT-007 phải thiết kế từ đây |
| Demo trọng tâm | Một hành trình giao việc → nộp → làm lại/duyệt → dashboard chủ, dữ liệu giả | OWNER-001, WORK-002, MOBILE-003 ở phạm vi demo |
| Backend nhỏ và an toàn | Work engine, quyền server, lịch sử/version, evidence và retry; scope tài chính tối thiểu | WORK-002/MOBILE-003 + các phần nền cần thiết |
| Pilot một bộ phận | Baseline, import/connector, QA/đối soát, hỗ trợ và đo review queue | PILOT-007 cùng nguồn đã chốt |
| Mở rộng theo bằng chứng | Bộ phận tiếp theo, tài chính/nguồn sâu hơn, revenue rồi AI nếu cần | Các phần còn lại không tự được giao hoặc chạy theo số thứ tự ID |

Chưa tạo GitHub Issues, gửi việc cho agent khác, code các task HOTEL-*, kết nối VPS/PMS hay chi tiền. Đề xuất cần D14 về OwnerOps và các D01/D02/D06/D07/D11 còn mở.

## 8. Kết quả tiếp nhận

Đã lưu nguyên văn, bản dễ đọc, manifest và đánh giá này. Chỉ kiểm tra tính toàn vẹn, liên kết và số học của mô phỏng nêu trên. Chưa thực hiện nghiên cứu giá mới, kiểm toán nguồn MacBook/VPS hoặc xác nhận khách hàng sẵn sàng trả tiền.

Khi dùng cho phiên sau: đọc cùng research working summary, coi OwnerOps là ứng viên MVP trong control layer; chưa tự chốt giá, đổi baseline, thu/hoàn tiền, thay PMS hoặc code toàn HotelOS từ lời đề xuất của tác giả bên ngoài.
