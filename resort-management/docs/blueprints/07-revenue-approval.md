# B07 — Giá, khuyến mãi và quảng cáo

Đề xuất cho S6, không phải quyền cho phép chi tiền. Có thể vận hành rule-based trước AI; nguồn số và tính tiền là backend xác định.

```mermaid
flowchart TD
    DATA[Booking, tồn, pickup, hủy, giá và chi phí] --> VALID{Đủ mới và đã đối soát?}
    VALID -->|Không| MISSING[Báo thiếu dữ liệu, không bịa phương án tài chính]
    VALID -->|Có| OPTIONS[So giữ giá, giá mới, gói lợi ích hoặc kênh/quảng cáo]
    OPTIONS --> DRAFT[Draft: ngày/loại, quota, giá sàn, ngân sách, điều kiện dừng]
    DRAFT --> REVIEW{Người có quyền duyệt?}
    REVIEW -->|Không| REVISE[Sửa/bỏ, không thực thi]
    REVIEW -->|Có| RECHECK{Version, tồn, policy và ngân sách còn hợp lệ?}
    RECHECK -->|Không| HOLD[Dừng, trả lý do hoặc yêu cầu duyệt lại]
    RECHECK -->|Có| APPLY[Thực thi qua adapter hoặc bàn giao có xác minh]
    APPLY --> RESULT{Đã xác nhận kết quả?}
    RESULT -->|Chưa| RECON[Chờ/lỗi/đối soát, tránh gửi lặp]
    RESULT -->|Có| MONITOR[Theo dõi quota, chi phí, booking và dừng đúng điều kiện]
    MONITOR --> EVAL[Đánh giá đóng góp/tăng thêm và lưu bài học]
```

State đề xuất của phương án: draft → pending_approval → approved → scheduled/applying → active → paused/ended; rejected/failed có nguyên nhân, không nhảy thẳng “active” từ bấm duyệt. Thay nội dung đã duyệt phải có revision và kiểm tra lại.

Quảng cáo được attribution không tự chứng minh tăng thêm. KPI so chi phí kênh, giảm giá, dịch vụ gói, ads và biến phí; chưa phải lợi nhuận toàn doanh nghiệp. Nghiệm thu REV01/02, SYNC01, FIN01, AUTH01.
