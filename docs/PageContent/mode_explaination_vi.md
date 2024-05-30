### Chế độ Chat Bot

Chế độ này định dạng lời nhắc của người dùng thành mẫu trò chuyện của mô hình được chọn và truy vấn lịch sử trò chuyện trong vectordb để tạo ra, hy vọng là, các phản hồi tốt hơn.

&nbsp; 

---

### Chế độ Agent

Một cách triển khai của React agent có khả năng suy luận và hành động trong nhiều vòng lặp nhắc - phản hồi (mặc định là 4). Các agent được giao nhiệm vụ với các mẫu đã được xác định trước (ví dụ, bài tập viết, viết tài liệu quảng cáo, hoặc bảo vệ mèo). Người dùng có thể thiết kế mẫu của riêng mình cho các agent của họ. Sau khi vòng lặp nhắc - phản hồi kết thúc, agent xuất kết quả cuối cùng vào trình soạn thảo văn bản để chỉnh sửa thêm.

&nbsp; 

--- 

### Chế độ Hotpot

Chế độ này đặt agent và chatbot vào 1 trang để mục đích kiểm tra.

&nbsp; 

---

### Các chức năng LLM

Chế độ này hiển thị các chức năng backend được sử dụng cho nhiều nhiệm vụ (ví dụ, phân loại, dự đoán cảm xúc). Các chức năng backend được sử dụng trong cả chế độ chatbot và agent để cải thiện ngữ cảnh của lời nhắc của người dùng.

