# Đối chiếu mã nguồn PMS — audit 002

Ngày đọc: 26/10/2026. Đã clone snapshot vào thư mục tạm ngoài dự án, đọc README, manifest, giấy phép và các file được liệt kê. **Chưa cài dependency, chạy app/test, thử migration hoặc kiểm toán bảo mật đầy đủ. Không sao chép mã của ba repo vào sản phẩm.**

## Snapshot và cách dùng

| Repo | Commit đã đọc | Stack/giấy phép xác minh từ file | Mục đích đề xuất |
| --- | --- | --- | --- |
| [Open Hotel PMS](https://github.com/peeraseepat-cell/open-hotel-pms) | `3f6956a54aa9faef44311f9e943ce7d44b6934e3` | Next.js 14/React 18, TypeScript, Supabase; MIT | Tham khảo mô hình reservation-night, front-office và tổ chức API gần stack dự kiến |
| [Kamra PMS](https://github.com/Kamra-PMS/kamra-pms) | `956cd12742e3d397a5b89429b55e44a8324e1545` | Frappe/Python, frontend React; AGPL-3.0 | Benchmark service operations, folio/night audit, quyền và AI gọi API nghiệp vụ |
| [QloApps](https://github.com/Qloapps/QloApps) | `10251e3591f4e0528a34e1bcf99c30594a93055a` | PHP/MySQL; core OSL-3.0, module theo license riêng | Benchmark direct booking, chặn phòng theo ngày và giá; chưa ghép vào lõi Next.js |

## Bằng chứng đã đọc

### Open Hotel PMS

- [README cố định](https://github.com/peeraseepat-cell/open-hotel-pms/blob/3f6956a54aa9faef44311f9e943ce7d44b6934e3/README.md): mô tả vận hành, yêu cầu Supabase, bản public snapshot tháng 6 cộng maintenance. Việc chạy thực tế từ tháng 3/2026 là tuyên bố tác giả, chưa được kiểm thử độc lập.
- [package.json](https://github.com/peeraseepat-cell/open-hotel-pms/blob/3f6956a54aa9faef44311f9e943ce7d44b6934e3/package.json): script dev/build/typecheck và các dependency. Sự tương đồng stack không chứng minh có thể đem nguyên backend vào BeeSmart.
- [Capacity guard migration](https://github.com/peeraseepat-cell/open-hotel-pms/blob/3f6956a54aa9faef44311f9e943ce7d44b6934e3/supabase/migrations/20260309999999_phase19_reservation_capacity_guard.sql#L15): trigger kiểm tra reservation-night; xử lý floating room type, ngày bị OOO và booking active. Không suy từ tên “Hard Stop” rằng mọi trường hợp đặt đồng thời đã được chứng minh an toàn; cần đọc toàn bộ chuỗi migration và thử concurrency khi đánh giá tái sử dụng.
- [server-auth.ts](https://github.com/peeraseepat-cell/open-hotel-pms/blob/3f6956a54aa9faef44311f9e943ce7d44b6934e3/src/lib/server-auth.ts#L94): có gate xác thực và allow/deny role. Đoạn đã đọc chưa chứng minh đầy đủ tenant isolation cho một SaaS nhiều khách hàng.
- [MIT](https://github.com/peeraseepat-cell/open-hotel-pms/blob/3f6956a54aa9faef44311f9e943ce7d44b6934e3/LICENSE): cho phép dùng/sửa/phân phối theo điều kiện giữ copyright và license. Cần kiểm tra dependency/assets riêng nếu lấy mã.

**Điểm cần lưu ý:** README mô tả một số chức năng mới hơn như maintenance mobile, deep-clean review và water meter ở bản phát triển riêng. Không gắn toàn bộ khả năng đó cho public snapshot hoặc bảng so sánh chỉ vì README nhắc tới.

### Kamra

- [README cố định](https://github.com/Kamra-PMS/kamra-pms/blob/956cd12742e3d397a5b89429b55e44a8324e1545/README.md): nhiều nhóm nghiệp vụ, API/MCP, country packs và go-live. Danh sách feature là mô tả dự án; không phải kết quả tự chạy toàn bộ.
- [authz.py](https://github.com/Kamra-PMS/kamra-pms/blob/956cd12742e3d397a5b89429b55e44a8324e1545/kamra/authz.py#L70): mapping tài nguyên về property; `restricted_properties`, `assert_property_access` và scope khách. Strict property scope có điều kiện cấu hình. Không đồng nhất scope nhiều property trong một site với cô lập tenant độc lập của BeeSmart.
- [mcp_tools.py](https://github.com/Kamra-PMS/kamra-pms/blob/956cd12742e3d397a5b89429b55e44a8324e1545/kamra/mcp_tools.py#L1): registry ghi rõ tool bọc API, module/role và thuộc tính mutating; tham số idempotency cho booking. Cần kiểm tra đường thực thi cụ thể trước khi kết luận mọi tool được bảo vệ.
- [night_audit.py](https://github.com/Kamra-PMS/kamra-pms/blob/956cd12742e3d397a5b89429b55e44a8324e1545/kamra/night_audit.py#L1): checklist, blocker/warning, report pack và điều kiện xử lý ngày kinh doanh. Không chép giờ lịch chạy hoặc policy quốc gia sang resort Việt Nam.
- [AGPL-3.0](https://github.com/Kamra-PMS/kamra-pms/blob/956cd12742e3d397a5b89429b55e44a8324e1545/license.txt): khi sửa phần mềm thuộc giấy phép và cung cấp tương tác mạng, điều khoản tương ứng có thể yêu cầu cung cấp Corresponding Source cho người dùng đó. Rà nghĩa vụ của cách tích hợp/phân phối trước tái sử dụng; không kết luận đơn giản mọi phần của một hệ thống độc lập đều phải mở mã.

### QloApps

- [README cố định](https://github.com/Qloapps/QloApps/blob/10251e3591f4e0528a34e1bcf99c30594a93055a/README.md): booking engine, website và quản lý booking; PHP/MySQL và module.
- [HotelRoomDisableDates.php](https://github.com/Qloapps/QloApps/blob/10251e3591f4e0528a34e1bcf99c30594a93055a/modules/hotelreservationsystem/classes/HotelRoomDisableDates.php#L24): lưu room/type, khoảng ngày và lý do; có kiểm tra khoảng giao nhau.
- [HotelRoomTypeFeaturePricing.php](https://github.com/Qloapps/QloApps/blob/10251e3591f4e0528a34e1bcf99c30594a93055a/modules/hotelreservationsystem/classes/HotelRoomTypeFeaturePricing.php#L24): mô hình giá tăng/giảm/cố định và phần trăm/số tiền. Không áp nguyên kiểu tiền FLOAT vào thiết kế thanh toán mới.
- [OSL-3.0 core](https://github.com/Qloapps/QloApps/blob/10251e3591f4e0528a34e1bcf99c30594a93055a/LICENSE.md): phải đánh giá cả External Deployment và nghĩa vụ source/attribution khi lấy mã, cùng license module/thành phần cụ thể. Chưa chọn hình thức tích hợp hoặc phân phối.

## Kết luận cho BeeSmart

1. Ưu tiên đọc sâu Open Hotel PMS để học cấu trúc gần stack; **chưa chọn nó làm nền code hoặc chọn Supabase chính thức**.
2. Dùng Kamra làm benchmark nghiệp vụ, đặc biệt finance/ops/AI; không copy wholesale hoặc bật MCP trên dữ liệu thật.
3. Dùng QloApps làm benchmark direct booking và điều kiện giá; chưa đưa PHP vào app mới.
4. Nếu quyết định lấy mã: lập danh mục file/commit/license/notice, rà dependency, cấu hình secrets, quyền, schema/source ownership và chạy bài test tương ứng trước merge.
5. Mức readiness của cả ba trong đánh giá này là “đã đọc source có chọn lọc”, không phải “đã cài chạy”, “đã audit bảo mật” hoặc “đã sẵn sàng dùng production”.
