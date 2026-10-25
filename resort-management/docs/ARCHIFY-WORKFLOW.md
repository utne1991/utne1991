# Dùng Archify trong ChatGPT Cloud và bàn giao cho Claude

## 1. Repo lưu gì, agent làm gì?

Repo lưu ngữ cảnh lâu dài: yêu cầu, quy tắc nghiệp vụ, nguồn sơ đồ, kết quả HTML và bằng chứng kiểm tra. Agent trong cloud cần quyền đọc repo, công cụ thực thi và một nhiệm vụ cụ thể để tạo hoặc sửa các tệp đó.

**Push lên GitHub không tự kích hoạt Claude hoặc một AI agent.** Chưa cấu hình GitHub Actions hay tự động giao việc. Phiên sau cần mở/checkout repo và yêu cầu agent đọc `resort-management/CLAUDE.md`.

Không đưa dữ liệu khách thật, khóa API, mật khẩu hoặc thông tin thẻ vào repo. Số liệu hiện tại đều là minh họa.

## 2. Cách đã chạy trong phiên cloud này

- Dùng Node.js và CLI từ checkout Archify tại commit `81c6be8d87090670c45d08a8f97f9d29c5af0bec`.
- Checkout công cụ được đặt ngoài repo dự án; không thêm cả Archify như một dependency chạy app.
- Đọc skill, schema và ví dụ; tự viết JSON phù hợp từ tài liệu thiết kế. Không tự nhập Mermaid.
- Chạy `finalize` để kiểm tra, xuất HTML và thử kiểm tra bằng Chromium.
- Tắt bước kiểm tra cập nhật tùy chọn bằng `ARCHIFY_UPDATE_CHECK_DISABLED=1`; không thay đổi cơ chế xác minh artifact.
- Chưa cài skill/plugin toàn cục hoặc đăng ký Archify thành MCP trong ChatGPT.

Đầu ra nằm ở `docs/diagrams/sources/` và `docs/diagrams/exports/`. Trình xem Archify có một số nút/chú giải tiếng Anh vì phiên bản dùng ở đây chưa có catalog tiếng Việt; nội dung sơ đồ do dự án viết bằng tiếng Việt. Không coi đây là giao diện đã được dịch đầy đủ.

## 3. Cách chạy lại

Cần Git, Node.js >=18 và Chrome/Chromium có sandbox hoạt động để chạy đủ các cổng kiểm tra. Mã công cụ được cố định ở snapshot đã đọc; kiểm tra thay đổi trước khi chọn phiên bản khác.

Từ checkout `utne1991/utne1991`, lấy công cụ vào một thư mục mới ngoài repo:

```bash
git clone --filter=blob:none --sparse https://github.com/tt-a1i/archify.git /tmp/resort-archify-tool
git -C /tmp/resort-archify-tool sparse-checkout set archify
git -C /tmp/resort-archify-tool checkout 81c6be8d87090670c45d08a8f97f9d29c5af0bec
cd resort-management
node scripts/render-diagrams.mjs /tmp/resort-archify-tool/archify/bin/archify.mjs
```

Nếu thư mục đích đã có, kiểm tra nguồn, revision và thay đổi của nó trước; không ghi đè hoặc xóa tùy tiện. Đây là hướng dẫn chạy lại, chưa được thử trong một máy cloud mới.

Script tạo thư mục evidence riêng cho mỗi lần chạy, giữ exit code lỗi nếu bất kỳ sơ đồ nào chưa đạt. Các receipt chứa đường dẫn của máy chạy; không tự sửa receipt để giả lập kết quả ở máy khác. Nguồn JSON ghim tài liệu tại một commit; khi thay đổi nội dung thiết kế, commit tài liệu trước rồi cập nhật nguồn và revision cho đúng bằng chứng mới.

## 4. Đã kiểm tra đến đâu?

Xem [báo cáo hiện tại](diagrams/VERIFICATION.md). Sáu artifact đã đạt validate, deliver và strict check; browser-check đã thử nhưng thất bại do môi trường Chromium. Chưa có kết luận duyệt trực quan. Không hạ mức kiểm tra hoặc tắt browser sandbox để gọi kết quả là đạt.

## 5. Prompt cho lần chỉnh sửa sau

> Đọc resort-management/CLAUDE.md, docs/IMPLEMENTATION-STEPS.md, docs/PRODUCT-MAP.md và các nguồn JSON trong docs/diagrams/sources/. Hãy dùng Archify chỉnh sơ đồ [tên sơ đồ] theo yêu cầu [thay đổi]. Giữ đây là thiết kế đề xuất; cập nhật tài liệu và source revision tương ứng, chạy kiểm tra và báo đúng phần đạt/chưa đạt. Chưa triển khai backend hoặc tự kết nối quảng cáo.

Prompt trên dùng được với agent có quyền truy cập repo và thực thi công cụ. Chat thông thường không có các quyền đó không tự chạy Archify chỉ từ liên kết GitHub.
