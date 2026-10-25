# 05 — Đề xuất doanh thu, người duyệt và AI

**Trạng thái:** kế hoạch giai đoạn sau. Chưa có dữ liệu thật, mô hình dự báo, ngân sách hoặc tích hợp quảng cáo.

```mermaid
flowchart TD
    DATA[Booking / giá / phí kênh / chi phí phục vụ] --> QUALITY{Dữ liệu đủ và đã đối soát?}
    QUALITY -->|Chưa| MISSING[Báo dữ liệu thiếu hoặc trễ]
    QUALITY -->|Có| CALC[Backend tính khoảng trống và lợi nhuận đóng góp]
    CALC --> RULE[Quy tắc đề xuất giá hoặc gói khuyến mãi]
    RULE --> EXPLAIN[Giải thích căn cứ và giới hạn; AI là tùy chọn]
    EXPLAIN --> REVIEW{Quản lý duyệt?}
    REVIEW -->|Không| EDIT[Sửa hoặc bỏ phương án]
    REVIEW -->|Có| GUARD{Quyền, giá sàn, ngân sách và thời hạn hợp lệ?}
    GUARD -->|Không| STOP[Dừng và trả lý do, không thực thi]
    GUARD -->|Có| EXECUTE[Thực thi qua tích hợp được hỗ trợ]
    EXECUTE --> LOG[Ghi kết quả và nhật ký]
    LOG --> EVALUATE[Đánh giá lợi nhuận tăng thêm và chi phí]
    EVALUATE --> RULE
```

Không dùng LLM làm nguồn tính tồn phòng, tiền hoặc quyết định quyền. Báo cáo attribution quảng cáo không tự chứng minh toàn bộ booking là tăng thêm. Thiết kế AI sau này cần bộ tình huống đánh giá, giới hạn chi phí và đường xử lý khi dữ liệu không đủ.

[Quay lại danh mục](README.md)
