# Feature × Role × Service Profile × Release

Đề xuất cho audit 002; chưa là baseline đã duyệt. Profile Essential/Professional/Luxury mô tả mức dịch vụ, không chứng nhận sao và không giới hạn quyền theo hạng sao. Bất kỳ cơ sở nào cũng có thể chọn module phù hợp nếu được chốt. Không suy một khách sạn 2 sao không được dùng concierge hoặc một khách sạn 5 sao bắt buộc mua mọi module.

Vai trò: FO lễ tân/đặt phòng; HK buồng phòng; QA kiểm tra; MT bảo trì; GS dịch vụ khách; FIN thu ngân/kế toán; RM kinh doanh; GM quản lý; IT quản trị kỹ thuật. “Duyệt” đòi quyền riêng, không mặc định đi cùng chức danh.

Release: S3a–d là demo; P1 là backend pilot đề xuất thuộc S4/S5; P2 là mở rộng sau pilot; S6/S7 là doanh thu/AI. P1/P2 không thay số giai đoạn cũ. Mọi policy thực tế chờ DECISIONS.

| Feature / action | Người thực hiện | Duyệt / kiểm soát | Profile khởi điểm | Đợt demo → vận hành dự kiến | Tiêu chí liên quan |
| --- | --- | --- | --- | --- | --- |
| Xem dashboard và drill-down | Theo vai trò | Scope dữ liệu | Essential | S3a → P1 | KPI01, AUTH01 |
| Tìm tồn theo loại và ngày | FO, RM theo quyền | Backend nguồn chính | Essential | S3b → P1 | INV01, DATE01 |
| Tạo hold/booking nhiều phòng | FO | Policy D05 | Essential | S3b → P1 | INV01/02/05 |
| Nhận/trả từng phòng | FO | Room readiness, tiền theo D06 | Essential | S3b → P1 | INV03/05 |
| Đổi ngày/phòng/gia hạn | FO | Hạn mức và chính sách | Essential | S3b → P1 | INV04 |
| Hủy/no-show | FO/GM theo quyền | Policy phí/giải phóng tồn | Essential | S3b → P1 | INV02/05 |
| Phân công việc dọn | Trưởng HK | Năng lực/ưu tiên | Essential | S3c → P1 | OPS01 |
| Làm việc dọn trên mobile | HK | Người được phân công | Essential | S3c → P1 | MOB01 |
| Kiểm tra đạt/làm lại | QA | Quyền kiểm tra riêng | Essential | S3c → P1 | OPS01, MOB01 |
| Báo hỏng/chặn bảo trì | HK/FO đề nghị, MT xử lý | GM khi ảnh hưởng khách | Essential | S3c → P1 | INV06, MOB02 |
| Hồ sơ khách tối thiểu | FO/GS theo quyền | D07 và log export | Essential | S3c → P1 | AUTH01 |
| Service desk/SLA | GS/FO, bộ phận nhận | Trưởng bộ phận | Professional | S3c → P1 cơ bản/P2 nâng cao | MOB03 |
| Concierge/itinerary | GS theo quyền | Liên hệ/dịch vụ được phép | Luxury | S3c mẫu → P2 | MOB03, AUTH01 |
| Khiếu nại và khôi phục dịch vụ | GS/GM | Bồi hoàn theo hạn mức | Professional | S3c mẫu → P2 | OPS02 |
| Folio và ghi dịch vụ | FO/FIN | Hạn mức, source ownership | Essential | S3d → P1 | FIN01 |
| Thu/cọc/chia khoản | FIN/FO theo quyền | Không vượt quyền | Essential | S3d → P1 theo D06 | FIN01/02 |
| Hoàn/void/điều chỉnh | FIN đề nghị | Người có quyền duyệt | Essential | S3d → P1 | FIN01/02 |
| Bàn giao ca/night audit | FIN/auditor | GM khi ngoại lệ theo policy | Essential | S3d → P1 | FIN03 |
| Giá và gói khuyến mãi | RM | GM/quyền giá riêng | Essential | S3d → S6 | REV01 |
| Quảng cáo và thực thi | RM đề nghị | Quyền ngân sách riêng | Professional | S3d mẫu → S6 | REV01/02 |
| Báo cáo/đối soát kênh | GM/FIN/RM theo quyền | Nguồn/công thức minh bạch | Essential | S3d → P1 cơ bản/S6 | KPI01 |
| User/role/integration | IT theo quyền | Quyền IT tách tài chính | Essential | S3d → P1 | AUTH01, TEN01 |
| POS/spa/room service posting | Bộ phận phục vụ | Đối soát nguồn ngoài | Professional | Giai đoạn tích hợp P2 | FIN02, SYNC01 |
| MICE/lost & found/QA nhiều cấp | Bộ phận được cấp quyền | Người quản lý nghiệp vụ | Luxury | P2, chưa chốt | Tiêu chí riêng trước scope |
| Tài sản/điện nước/hồ bơi/kho | MT/đơn vị vận hành | GM/FIN | Theo cơ sở | P1 ticket cơ bản, P2 ERP/CMMS | Tiêu chí riêng trước scope |
| Tenant isolation + membership | Backend/IT | Không do UI lựa chọn | Mọi profile nếu D11 chọn | Thiết kế trước schema → P1 | TEN01/02 |
| SaaS billing/superadmin | Nhà cung cấp được cấp quyền | D11, tách scope khách sạn | Không phụ thuộc profile | Ngoài pilot, chưa chốt | Tiêu chí riêng |
| AI đọc và gợi ý | Người được cấp quyền | Cùng RBAC, dữ liệu tối thiểu | Tùy chọn | S7 | TEN01, AUTH01, REV01 |

Các ID mới MOB01–04/FIN02–03/OPS02/TEN01–02/REV01–02 được định nghĩa trong [gói audit 002](TASK-RESORT-DESIGN-AUDIT-002.md). Không có test backend tương ứng đã chạy.
