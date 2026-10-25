# Công cụ và nguồn tham khảo

## 1. Mục đích

Đây là danh mục nguồn giúp Claude hiểu cách thiết kế và xây sản phẩm. Các nguồn không phải ba module đã được cài trong resort. Chưa thêm submodule hay dependency chạy app. Archify đã được chạy từ checkout ngoài repo để tạo artifact HTML; license và notice đi kèm artifact được giữ trong `diagrams/vendor-notices/archify/`.

Kiểm tra tài liệu và mã định danh nguồn ngày 25/10/2026. Đã chạy Archify, xem [quy trình cloud](ARCHIFY-WORKFLOW.md) và [bằng chứng](diagrams/VERIFICATION.md). Chưa cài ECC hoặc chạy ví dụ Hello-Agents. Thông tin phiên bản bên dưới chỉ mô tả snapshot đã đọc; không phải chỉ dẫn luôn dùng bản mới nhất.

| Nguồn | Vai trò | Lựa chọn cho dự án |
| --- | --- | --- |
| [tt-a1i/archify](https://github.com/tt-a1i/archify) | Skill và công cụ tạo sơ đồ tương tác HTML | Dùng khi được giao xuất sơ đồ tương tác; trước mắt Mermaid đủ để xem trên GitHub |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | Skills, quy tắc, review, kiểm thử và hooks cho trợ lý lập trình | Chọn phần phù hợp lúc Claude Code bắt đầu code; không cài tất cả vào app |
| [datawhalechina/hello-agents](https://github.com/datawhalechina/hello-agents) | Giáo trình, ví dụ về AI agent, công cụ, bộ nhớ và đánh giá | Tham khảo phương pháp khi thiết kế trợ lý AI; không coi là PMS hoặc module resort có sẵn |

## 2. Archify

- Snapshot: `81c6be8d87090670c45d08a8f97f9d29c5af0bec`.
- [README tại snapshot](https://github.com/tt-a1i/archify/blob/81c6be8d87090670c45d08a8f97f9d29c5af0bec/README.md); tài liệu ghi stable v3.2.0, công cụ yêu cầu Node.js >=18.
- [Giấy phép tại snapshot](https://github.com/tt-a1i/archify/blob/81c6be8d87090670c45d08a8f97f9d29c5af0bec/LICENSE): Apache-2.0, kèm NOTICE và điều kiện của thành phần bên thứ ba khi phân phối.
- Hỗ trợ architecture, workflow, sequence, data flow, lifecycle, ERD và một số loại sơ đồ khác; đầu ra có thể là HTML độc lập.
- Không phải công cụ thiết kế UI kéo thả; tài liệu hiện tại loại trừ tự nhập Mermaid và hosted sharing khỏi phạm vi.

### Cách áp dụng sau này

1. Xác nhận agent đang dùng có thể chạy công cụ và đọc skill; xem hướng dẫn cài của đúng phiên bản.
2. Tạo nguồn có cấu trúc theo schema Archify dựa trên các sơ đồ nghiệp vụ ở `docs/diagrams/`; không giả định đổi đuôi `.md` thành `.json` là chuyển đổi được.
3. Ghi nguồn ở `docs/diagrams/sources/`, HTML ở `docs/diagrams/exports/`. Hiện đã có sáu nguồn JSON và HTML tương ứng.
4. Chạy validator của phiên bản đã chọn; kiểm tra đọc, điều hướng và bố cục trên trình duyệt.
5. Lưu nguồn, HTML và bằng chứng kiểm tra cùng commit; giữ bản Mermaid dễ đọc trên GitHub.

GitHub hiển thị sơ đồ Mermaid trong Markdown. File HTML thông thường được xem như mã nguồn; muốn xem tương tác thì tải/mở bằng trình duyệt hoặc triển khai hosting riêng. Chưa bật GitHub Pages trong dự án này.

## 3. ECC

- Snapshot: `90606c8315ee09cafc303515c5f33024db6b9882`.
- [README tại snapshot](https://github.com/affaan-m/ECC/blob/90606c8315ee09cafc303515c5f33024db6b9882/README.md); package ghi phiên bản 2.2.3.
- [Giấy phép tại snapshot](https://github.com/affaan-m/ECC/blob/90606c8315ee09cafc303515c5f33024db6b9882/LICENSE): MIT.
- Công cụ phục vụ môi trường trợ lý viết code, không phải một thành phần backend phục vụ khách resort.

### Cách áp dụng sau này

1. Xác định Claude Code, Codex CLI hay giao diện chat; không giả định chúng hỗ trợ plugin/hooks giống nhau.
2. Kiểm tra cấu hình có sẵn và chọn một đường cài cho mỗi agent, theo tài liệu bản đã chọn; tránh cài chồng plugin và bản manual vào cùng môi trường.
3. Bắt đầu từ quy tắc chung và ngôn ngữ/framework đã chốt, cùng workflow review/verification cần thiết.
4. Đánh giá riêng hooks và MCP: chúng có thể chạy lệnh hoặc truy cập dịch vụ. Chỉ bật phần phù hợp với nhiệm vụ và quyền đã có.
5. Kiểm tra một tác vụ nhỏ, ghi bản cài và kết quả; không suy ra “đã có ECC” từ việc chỉ thêm liên kết này.

Luồng dự kiến: đọc yêu cầu → làm thay đổi nhỏ → kiểm tra nghiệp vụ phù hợp → review diff → báo kết quả. Không bắt buộc multi-agent để hoàn thành luồng này.

## 4. Hello-Agents

- Snapshot: `36f583c233ea5cee4537ef93455702b55053af18`.
- [README tại snapshot](https://github.com/datawhalechina/hello-agents/blob/36f583c233ea5cee4537ef93455702b55053af18/README.md).
- [Giấy phép gốc tại snapshot](https://github.com/datawhalechina/hello-agents/blob/36f583c233ea5cee4537ef93455702b55053af18/LICENSE.txt): **CC BY-NC-SA 4.0**, có điều kiện phi thương mại. Một số thư mục có giấy phép riêng; cần kiểm tra đúng phần muốn dùng. Việc repo công khai không tự cấp quyền sao chép mọi phần vào sản phẩm kinh doanh.
- Giáo trình liên kết tới framework HelloAgents ở repo khác. Không đánh đồng giấy phép, độ sẵn sàng hoặc API của framework đó với repo giáo trình đã đọc.

### Cách áp dụng sau này

Tham khảo chủ đề công cụ, ngữ cảnh, bộ nhớ, MCP và đánh giá để tự thiết kế trợ lý hỏi đáp hoạt động resort. Chưa chọn framework agent và chưa thêm Python service.

Thử nghiệm đầu tiên nên chỉ đọc: hỏi “ngày nào còn nhiều phòng?” → backend tính từ booking → AI giải thích và nêu ngày dữ liệu. Nếu thiếu dữ liệu hoặc quyền thì thông báo rõ; không tự đoán số. Bổ sung ghi log, bộ câu hỏi đánh giá, giới hạn chi phí và kiểm soát dữ liệu cá nhân trước khi mở rộng.

Đổi giá, hủy booking, hoàn tiền hoặc chạy quảng cáo cần luồng duyệt và quyền nghiệp vụ riêng. Tham khảo giáo trình không phải bằng chứng các năng lực đó đã có.

## 5. Phân biệt các lớp

| Lớp | Ví dụ | Không được nhầm với |
| --- | --- | --- |
| Tài liệu dự án | Tổng quan, Mermaid, hướng dẫn Claude | App đã chạy |
| Skill / plugin phát triển | Archify, ECC | Module vận hành của resort |
| MCP | Cầu nối công cụ/dịch vụ được cấp quyền | Điều kiện bắt buộc để đọc Markdown hoặc vẽ Mermaid |
| AI trong sản phẩm | Trợ lý phân tích dữ liệu resort | Claude Code đang xây sản phẩm |

Khi cần cập nhật snapshot, đọc thay đổi nguồn, đánh giá ảnh hưởng rồi cập nhật tài liệu có chủ đích. Không tự chạy nội dung cài đặt từ liên kết chỉ vì nó xuất hiện trong file.
