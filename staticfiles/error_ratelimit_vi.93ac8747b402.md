
 Lỗi Thông Thường và Giới Hạn Tần Suất
=======================

---

## 1. Lỗi Thông Thường

Máy chủ phản hồi yêu cầu của người dùng bằng cách phát hành mã trạng thái khi yêu cầu được gửi đến máy chủ. Vui lòng tham khảo bảng dưới đây để hiểu rõ hơn về mã trạng thái khi chỉ ra thành công hoặc thất bại của một lời gọi API.

| Điểm Cuối                   | Mô Tả                                                                                                                                                                                                           |
| --------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400 (Bad Request)           | Điều này do yêu cầu không hợp lệ và máy chủ không thể xử lý yêu cầu của người dùng                                                                                                                              |
| 401 (Unauthorized)          | Điều này do thiếu thông tin xác thực hợp lệ cho tài nguyên được yêu cầu bởi người dùng                                                                                                                          |
| 403 (Forbidden)             | Điều này có thể cho thấy rằng truy cập của bạn bị chặn bởi máy chủ của chúng tôi, và chúng tôi không thể ủy quyền cho yêu cầu của bạn                                                                           |
| 429 (Too many requests)     | Điều này có thể cho thấy rằng đã đạt đến giới hạn tần suất. Người dùng nên giảm số lượng lời gọi được thực hiện, hoặc xem xét nâng cấp kế hoạch dịch vụ của họ có giới hạn tần suất và tín dụng lời gọi cao hơn |
| 500 (Internal Server Error) | Đây là phản hồi lỗi chung cho thấy máy chủ đã gặp phải một vấn đề bất ngờ đã ngăn nó thực hiện yêu cầu                                                                                                          |
| 503 (Service Unavailable)   | Dịch vụ hiện tại không khả dụng.                                                                                                                                                                                |


---

## 2. Giới Hạn Tần Suất

Có nhiều giới hạn tần suất được áp dụng cho các điểm cuối khác nhau

### 2.1 Các điểm cuối Frontend

>Các điểm cuối Frontend được dự định để sử dụng qua trình duyệt web. Tuy nhiên, nếu bạn cố tình, bạn có thể cung cấp cookie lấy từ trình duyệt của bạn để tự động tạo và quản lý Khóa của bạn.

| Điểm Cuối                         | Mô Tả                                                      | Giới Hạn Tần Suất |
| --------------------------------- | :--------------------------------------------------------- | :---------------- |
| /frontend-api/model/              | Lấy thông tin cho các mô hình được lưu trữ và giá cả       | 20/s              |
| /frontend-api/generate-key        | Tạo một Khóa API mới                                       | 100/ngày          |
| /frontend-api/check-credit        | Kiểm tra tín dụng của một Khóa API                         | 100/giờ           |
| /frontend-api/get-xmr-wallet      | Lấy thông tin cho ví XMR tích hợp của bạn với mỗi Khóa API | 100/ngày          |
| /frontend-api/confirm-xmr-payment | Xác nhận thanh toán đã gửi đến ví XMR tích hợp của bạn     | 100/ngày          |
| /frontend-api/send-mail           | Email liên hệ với chúng tôi                                | 1/ngày            |

### 2.2 Các điểm cuối Suy Luận


| Điểm Cuối              | Mô Tả                                                          | Giới Hạn Tần Suất |
| ---------------------- | :------------------------------------------------------------- | :---------------- |
| /api/completion        | Hoàn thiện một câu cho trước                                   | 5/s               |
| /api/chat              | Trả lời một câu cho trước                                      | 5/s               |
| /api/predict/sentiment | Dự đoán tình cảm của một câu cho trước                         | 5/s               |
| /api/predict/emotion   | Dự đoán cảm xúc của một câu cho trước từ một danh sách cảm xúc | 5/s               |
| /api/predict/paraphase | Diễn đạt lại một câu cho trước                                 | 5/s               |
| /api/tasks/summarize   | Tóm tắt một câu cho trước                                      | 5/s               |
| /api/tasks/classify    | Phân loại một câu cho trước với một danh sách các loại         | 5/s               |
| /api/tasks/restyle     | Điều chỉnh lại một câu cho trước theo một danh sách phong cách | 5/s               |
| /api/responselog       | Lấy nhật ký                                                    | 10/phút           |