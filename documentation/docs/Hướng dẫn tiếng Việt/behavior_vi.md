
 Hành vi của trang web này
==========================

---

##  Quản lý suy luận
- Trang web này tự động khởi động máy chủ GPU theo yêu cầu của người dùng
- 1200 giây sau phản hồi cuối cùng, máy chủ GPU sẽ tự động tắt.
- Máy chủ GPU sẽ tiếp tục hoạt động nếu có nhu cầu liên tục.

##  Quản lý Khóa
- Khóa chưa nạp tiền bị xóa sau 7 ngày, khóa có tín dụng không hết hạn.
- Chỉ có các khóa đã được băm được lưu trữ trong cơ sở dữ liệu của chúng tôi, hãy tham khảo bảng dưới đây.
- Một mô hình Người dùng tên người dùng = mật khẩu = hashkey được sử dụng để duy trì phiên đăng nhập.

| Khóa               | Mô tả                                                                             | Ví dụ                         |
| ------------------ | :-------------------------------------------------------------------------------- | :---------------------------- |
| user               | tham chiếu đến Mô hình Người dùng nơi user.username = user.password = hashed(key) | `pbkdf2_sha256$***`           |
| name               | tên của khóa do người dùng đặt                                                    | `key_1`                       |
| credit             | Số tín dụng bằng USD cho khóa.                                                    | `0.0`                         |
| monero_credit      | Số tín dụng bằng XMR cho khóa.                                                    | `0.0`                         |
| created_at         | Thời gian tạo khóa (hết hạn trong 7 ngày chỉ khi credit = monero_credit = 0)      | `2024-05-12T16:20:00.141838Z` |
| updated_at         | Thời gian cập nhật khóa.                                                          | `2024-05-12T16:20:00.141838Z` |
| integrated_address | Ví XMR được tự động tạo khi tạo khóa                                              | `4LHcvZ1EWX1Z***`             |
| payment_id         | ID thanh toán XMR được tự động tạo khi tạo khóa                                   | `bb9***`                      |

##  Quản lý Lịch sử Trò chuyện
- Người dùng có thể chuyển đổi tùy chọn ```Use Memory``` trong phòng chat để truy vấn các cuộc hội thoại trước đó vào ngữ cảnh.
- Khi ```Use Memory``` được bật, tất cả các tin nhắn trò chuyện đều được nhúng và lưu trữ trong cơ sở dữ liệu.
- Mỗi lời nhắc mới được nhúng để tính điểm tương đồng với những lời nhắc trong cơ sở dữ liệu và các cuộc hội thoại có điểm cao nhất được sắp xếp và đưa vào ngữ cảnh của lời nhắc mới.
- Khi ```Use Memory``` được tắt, mỗi lời nhắc mới được xem như là cuộc hội thoại đầu tiên.
- Lịch sử Trò chuyện được đặt trong một Cây nơi nút bắt đầu phiên được tham chiếu đến nút tương tự nhất trước đó trong khi các nút trong một phiên được tham chiếu đến nút trước đó trong phiên.

| Memory Tree           | Mô tả                                            |
| --------------------- | :----------------------------------------------- |
| parent                | Cuộc hội thoại cũ hơn được dùng làm nút cha.     |
| prompt                | Nội dung văn bản của lời nhắc.                   |
| response              | Nội dung văn bản của lời nhắc.                   |
| model                 | Mô hình được chọn                                |
| key                   | Tham chiếu đến mô hình Khóa                      |
| created_at            | Thời gian của cuộc hội thoại                     |
| type                  | Loại suy luận (ví dụ: open_ai, chatroom, hotpot) |
| is_session_start_node | Dấu hiệu của phiên trò chuyện                    |

- Lời nhắc và phản hồi được nối và/hoặc cắt để nhúng và lưu trữ tiếp trong cơ sở dữ liệu vector
