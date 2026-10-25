# Hướng dẫn bàn giao cho Claude

## Prompt có thể dùng ngay

Chỉ sử dụng khi chủ dự án yêu cầu triển khai. Hiện tại chưa giao việc cho Claude.

Trước khi dùng prompt, đọc [CLAUDE.md của dự án](../CLAUDE.md), [các bước thực hiện](IMPLEMENTATION-STEPS.md), [danh mục sơ đồ](diagrams/README.md) và [quy định dùng nguồn ngoài](TOOLING-AND-SOURCES.md). Không tự cài công cụ hoặc coi các bước chưa làm là đã hoàn thành.

Phạm vi dưới đây là **S3a dashboard demo** theo [IMPLEMENTATION-BRIEF](IMPLEMENTATION-BRIEF.md). Lịch phòng/booking demo đầy đủ là S3b, đợt riêng. Xem [rà soát thiết kế](DESIGN-REVIEW.md) và [sổ quyết định](DECISIONS.md); chưa có baseline được chủ dự án xác nhận.

> Dự án nằm trong thư mục resort-management/ của repository utne1991/utne1991. Hãy đọc resort-management/README.md, resort-management/PROJECT-OVERVIEW.md, resort-management/docs/PRODUCT-MAP.md và resort-management/design/dashboard.html trước khi làm. Triển khai giai đoạn giao diện mẫu: dashboard quản lý resort 100 phòng dựa trên bản thiết kế này, giữ ngôn ngữ tiếng Việt và các định nghĩa KPI. Đây là giao diện dùng dữ liệu giả; không trình bày nó như hệ thống đã tích hợp PMS, quảng cáo hoặc AI thật. Giữ mã dự án trong resort-management/, không ghi đè README hồ sơ ở gốc repo. Nếu đã có framework, theo framework và quy ước hiện có. Nếu chưa có app, đề xuất dùng Next.js + TypeScript, Tailwind và Recharts; ghi rõ lựa chọn trước khi triển khai. Không sửa các tài liệu thiết kế để làm biến mất tiêu chí chưa đạt. Không tự kết nối hay chi tiền vào tài khoản quảng cáo. Làm một pull request có ảnh màn hình, hướng dẫn chạy và kết quả kiểm tra.

## Phạm vi pull request giao diện đầu tiên

- Tách AppShell, Header, KpiCard, TodayTasks, BookingOutlook, RoomGrid, RevenueSuggestion, ChannelTable.
- Bản rộng: sidebar + dashboard hai cột. Tablet: thu sidebar, một cột khi cần. Mobile: điều hướng thu gọn, KPI 2 cột, bảng có cuộn ngang có nhãn.
- Cài bộ lọc trạng thái phòng, nhóm công việc, mở panel chi tiết phòng; điều hướng đến các màn hình ngoài phạm vi có nhãn “Đang phát triển”.
- Nút tạo booking mở form mẫu; thông báo rõ dữ liệu chỉ lưu tạm trong bản demo, không nhận booking thật. Không làm nút bấm im lặng.
- Có loading, empty, error, stale và permission-denied states. Hiển thị thời điểm cập nhật và nhãn dữ liệu mẫu.
- Không tự ý thêm AI chat nổi hoặc hiệu ứng làm giảm khả năng đọc lịch phòng.

## Hợp đồng dữ liệu gợi ý cho lớp giao diện

```ts
type Housekeeping = 'dirty' | 'cleaning' | 'inspected' | 'ready';
type DisplayStatus = 'occupied' | 'ready' | 'dirty' | 'cleaning' | 'maintenance';
interface RoomSummary {
  id: string;
  number: string;
  roomTypeId: string;
  displayStatus: DisplayStatus;
  housekeepingStatus: Housekeeping;
  expectedCheckoutAt: string | null; // ISO 8601 có offset
  expectedReadyAt: string | null;
}
interface DailyInventory {
  date: string; // YYYY-MM-DD theo ngày kinh doanh tại cơ sở
  physicalRooms: number;
  blockedRooms: number;
  sellableRooms: number;
  bookedRooms: number;
  availableToSell: number;
}
interface DashboardPayload {
  propertyId: string;
  timezone: string;
  asOf: string;
  source: 'demo' | 'live';
  lastSuccessfulSyncAt: string | null;
  rooms: RoomSummary[];
  outlook: DailyInventory[];
  arrivalsToday: number;
  departuresToday: number;
}
```

Đây là dữ liệu đọc cho dashboard, chưa phải schema đầy đủ của backend. Tiền dùng số nguyên theo đơn vị tiền tệ đã thống nhất, không dùng float cho thanh toán. Trạng thái hiển thị phải được suy ra bằng một quy tắc thống nhất, không cập nhật độc lập với dữ liệu nguồn.

## Tiêu chí nghiệm thu

1. Có 100 phòng duy nhất; tổng trạng thái và KPI khớp quy tắc trong PRODUCT-MAP.
2. Lọc từng trạng thái trả đúng danh sách và số lượng; trạng thái rỗng có hướng dẫn rõ.
3. Chart ghi “đã đặt”, không gắn nhãn “AI dự báo” cho booking hiện có.
4. Bấm phòng mở đúng chi tiết; ngày và giờ hiển thị theo múi giờ cơ sở.
5. Tất cả nút có hành vi rõ; nút ngoài phạm vi được đánh dấu.
6. Dùng được bằng bàn phím, có focus rõ, nhãn văn bản ngoài màu sắc; chart có dữ liệu thay thế.
7. Kiểm tra ở 1440, 1024, 768 và 390px; không tràn ngang toàn trang.
8. Kiểm thử có ý nghĩa cho công thức công suất, loại trừ phòng bảo trì, bộ lọc và thao tác xem phòng. Chạy typecheck/build theo framework.
9. Không đưa secrets, dữ liệu khách thật hoặc cấu hình production vào repo.
10. Khi mẫu số công suất bằng 0, dữ liệu thiếu hoặc dữ liệu trễ, hiển thị đúng “Không áp dụng”/trạng thái thiếu/trễ; không thay mọi trường hợp bằng 0%.
11. Thời gian còn lại tính theo cùng `asOf` và timezone; không dùng chuỗi đếm ngược cố định trong app. Chỉ số tiền thu/cọc không bị gắn nhãn doanh thu phòng.

## Quy tắc làm việc

Đọc AGENTS.md nếu có. Mỗi cloud task đã có môi trường riêng; dùng checkout hiện tại, không tạo Git worktree trừ khi người dùng yêu cầu. Giữ thay đổi người dùng có sẵn. Pull request mô tả rõ phần đã hoạt động, phần mock và tích hợp chưa thực hiện.
