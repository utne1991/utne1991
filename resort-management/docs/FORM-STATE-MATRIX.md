# Form, dữ liệu và trạng thái UI — audit 002

Bản nháp thiết kế. [Wireframe HTML cục bộ](../design/pms-wireframes.html) có 9 góc nhìn desktop, 4 góc nhìn mobile và form ví dụ. Đây là nguồn độc lập, **không phải export hoặc sửa Figma**. Các form là phác thảo để rà, chưa bao phủ mọi trang con/biến thể và chưa là wizard hoàn chỉnh/backend.

Mọi form hiện chỉ lưu bản nháp vào danh sách trong bộ nhớ phiên xem; không thay đổi tồn, folio hoặc quyền. Đóng/hủy bỏ form không lưu. Checkbox giả lập xung đột giữ form và dữ liệu nhập. Date/required/số tiền là validation demo, không thay validation server.

## Hợp đồng thiết kế từng phân hệ

| UI | Form/hành động phác thảo | Input | Output nghiệp vụ cần có khi code thật | Quyền / test |
| --- | --- | --- | --- | --- |
| UI01 | Giao việc từ cảnh báo, mở phòng | Resource ID, owner, hạn, version | Task mới/cập nhật và audit, cảnh báo được bàn giao | Theo phần việc; OPS01/AUTH01 |
| UI02 | Tìm/đặt, đổi ngày/phòng, đề nghị block | Ngày/khoảng, loại/phòng, quantity, version | Quote/availability; booking hoặc xung đột không mất trạng thái cũ | FO/MT theo quyền; INV01/04/06 |
| UI03 | Phác thảo wizard, nhận/trả/no-show, hủy từng dòng | Các dòng phòng, guest ref, giá/policy, cọc riêng | Booking/line state, inventory claims, allocation, outbox và khoản tiền cần xử lý | FO, policy/duyệt; INV02/03/05 |
| UI04 | Phân công, checklist/QA, báo hỏng | Phòng/asset, owner, hạn, checklist/kết quả, ảnh hưởng | Task/history/inspection/block hợp lệ; readiness suy đúng | HK/QA/MT; MOB01/02, OPS01 |
| UI05 | Guest tối thiểu, service/concierge/khiếu nại | Booking/guest, nội dung cần thiết, SLA, bộ phận/owner | Ticket, trạng thái/owner, kết quả/chi phí cần duyệt | GS theo quyền; MOB03, OPS02 |
| UI06 | Thu/cọc/hoàn/chia khoản, night-audit checklist | Folio, amount/currency, method/ref, business date, reason/version | Ledger/payment/allocation/reversal, audit run/report; không lặp posting | FIN/quyền riêng; FIN01/02/03 |
| UI07 | Giá/gói/ads, đề nghị duyệt | Dates/type, quota, floor/budget, revision, stop conditions | Proposal approval/execution state, external result và spend được đối soát | RM đề nghị, người duyệt riêng; REV01/02 |
| UI08 | Bộ lọc, drill-down/đối soát | Period/property/channel/metric, nguồn | Chỉ số có định nghĩa/source/asOf, data quality, export theo quyền | GM/FIN/RM scoped; KPI01/AUTH01 |
| UI09 | Membership/role, mapping/kết nối | Member/principal, scope, action/reason/version, mapping ref | Thay đổi có quyền, audit, lỗi kết nối/đối soát rõ | IT không mặc định có tiền/ads; TEN01/02 |

## Sáu trạng thái trang để rà trong wireframe

`Có dữ liệu`, `Loading`, `Empty`, `Error`, `Stale`, `Denied` có thể chọn trên mọi góc nhìn. Loading/error/empty/denied thay vùng nội dung; stale có cảnh báo và khóa nút mẫu. Đây là chuyển trạng thái mô phỏng để xem layout/copy, không phải network hoặc authorization thật. Cần thêm retry, toast, conflict resolution và các biến thể từng form trong thiết kế được duyệt.

## Bốn mobile view riêng

| View | Hành trình | Kích thước/điều kiện khi rà | Nghiệm thu |
| --- | --- | --- | --- |
| `mobile-hk` | Nhận việc → checklist → chờ QA/làm lại | Bản phone max 420px; thử 390px và thiết bị thực khi có browser | MOB01 |
| `mobile-mt` | Nhận lỗi → ảnh hưởng booking → bàn giao | Form asset/khoảng chặn, không tự block khi xung đột | MOB02 |
| `mobile-gs` | Nhận yêu cầu → SLA/escalation → xác minh | Chỉ thông tin khách cần thiết; khoản bồi hoàn phải duyệt | MOB03/OPS02 |
| `mobile-gm` | Xem ngoại lệ → phân công/đề nghị duyệt | Không tự nhận là người duyệt chỉ từ role dropdown | MOB04 |

Chưa có PWA manifest/service worker, cài đặt, offline sync, camera upload, notification hoặc API trên điện thoại. Không dùng nhãn “mobile PWA hoàn tất” cho các bản vẽ này.

## Chưa xong trước khóa UI

Frame/node/version Figma, component/Auto Layout, prototype transitions, form chi tiết cho mọi nhánh, ma trận hành vi theo role, visual/a11y review trên browser và D13 chưa hoàn tất. Các module SaaS billing, POS/ERP/CMMS và trải nghiệm luxury nâng cao chưa được tự đưa vào v1.
