 Chế độ suy diễn
=======================

---

## 1. Điểm cuối API

- Truy cập [API Doc](https://professorparakeet.com/frontend/api/docs) để xem các lược đồ yêu cầu và phản hồi cụ thể của mỗi điểm cuối.

- Ví dụ Python cho chế độ chat:

```python
r = requests.post("https://professorparakeet.com/api/chat", headers={"Authorization": "Bearer str"}, 
json={"prompt": str,
      "model" : str,
      'top_k': int,
      'top_p': float,
      'best_of': int, 
      'max_tokens': int,
      'frequency_penalty': float,
      'presence_penalty': float,
      'temperature': float,
      'beam': bool,
      'early_stopping': bool,
      'length_penalty': float,
      'include_memory': bool
}) 
print(r.json())
```

- Ví dụ cURL cho hoàn thành văn bản:

```bash
curl "https://professorparakeet.com/api/completion" --request POST -H "Authorization: Bearer str" -H 'Content-Type: application/json' \
--data-binary '{"prompt": str, 
                "model" : str,
                "top_k": int,
                "top_p": float,
                "best_of": int,
                "max_tokens": int,
                "frequency_penalty": float,
                "presence_penalty": float,
                "temperature": float,
                "beam": bool,
                "early_stopping": bool,
                "length_penalty": float
              }'
```
- Phản hồi chat trực tuyến.


```python
r = requests.post("https://professorparakeet.com/api/chat", headers={"Authorization": "Bearer str"},  json={"prompt": "What is 1 + 1?", "model" : str, 'stream': True },  stream=True) 
for chunk in response.iter_lines():
    if chunk:
        print(chunk)
```

- Mẫu đầu ra trực tuyến:


```python
b"{'response': {'text': ['Below is an instruction that describes a task. Write a response that appropriately completes the request.\\n\\n\\n### Instruction:\\nwhat is 1 + 1?\\n\\n### Response:\\n\\n1']}, 'delta': '1'}"
b"{'response': {'text': ['Below is an instruction that describes a task. Write a response that appropriately completes the request.\\n\\n\\n### Instruction:\\nwhat is 1 + 1?\\n\\n### Response:\\n\\n1 +']}, 'delta': '1 +'}"
b"{'response': {'text': ['Below is an instruction that describes a task. Write a response that appropriately completes the request.\\n\\n\\n### Instruction:\\nwhat is 1 + 1?\\n\\n### Response:\\n\\n1 + 1']}, 'delta': '1 + 1'}"
b"{'response': {'text': ['Below is an instruction that describes a task. Write a response that appropriately completes the request.\\n\\n\\n### Instruction:\\nwhat is 1 + 1?\\n\\n### Response:\\n\\n1 + 1 is']}, 'delta': '1 + 1 is'}"
b"{'response': {'text': ['Below is an instruction that describes a task. Write a response that appropriately completes the request.\\n\\n\\n### Instruction:\\nwhat is 1 + 1?\\n\\n### Response:\\n\\n1 + 1 is equal']}, 'delta': '1 + 1 is equal'}"
b"{'response': {'text': ['Below is an instruction that describes a task. Write a response that appropriately completes the request.\\n\\n\\n### Instruction:\\nwhat is 1 + 1?\\n\\n### Response:\\n\\n1 + 1 is equal to']}, 'delta': '1 + 1 is equal to'}"
b"{'response': {'text': ['Below is an instruction that describes a task. Write a response that appropriately completes the request.\\n\\n\\n### Instruction:\\nwhat is 1 + 1?\\n\\n### Response:\\n\\n1 + 1 is equal to ']}, 'delta': '1 + 1 is equal to '}"
b"{'response': {'text': ['Below is an instruction that describes a task. Write a response that appropriately completes the request.\\n\\n\\n### Instruction:\\nwhat is 1 + 1?\\n\\n### Response:\\n\\n1 + 1 is equal to 2']}, 'delta': '1 + 1 is equal to 2'}"
b"{'response': {'text': ['Below is an instruction that describes a task. Write a response that appropriately completes the request.\\n\\n\\n### Instruction:\\nwhat is 1 + 1?\\n\\n### Response:\\n\\n1 + 1 is equal to 2.']}, 'delta': '1 + 1 is equal to 2.'}"
```

> - Trực tuyến chỉ có sẵn trong chế độ chat.
> - Nếu máy chủ hiện đang ngoại tuyến, bạn nên gửi một yêu cầu khởi động để khởi động nó, nếu không, bạn sẽ nhận được rất nhiều phản hồi trạng thái cho các lời nhắc của bạn.

---

## 2. Chế độ Chat Bot
- Chúng tôi cung cấp chế độ chatbot tiêu chuẩn với mẫu chat tùy chỉnh. Chúng tôi sử dụng cơ sở dữ liệu vector hóa và truy vấn 3 phản hồi của mô hình trước đó là phù hợp nhất để trả lời câu hỏi của bạn.
- Độ dài ngữ cảnh tối đa là 4096 token, vui lòng không nhập một cuốn sách dày 10000 trang vào phòng chat, mô hình sẽ không cho bạn bất cứ điều gì.
- Truy cập [Chat & Log](https://professorparakeet.com/frontend/hub) và chọn `Chat Bots` để trò chuyện với bot của chúng tôi.
- Người dùng có thể cấu hình nhiều tham số suy diễn trong `Chatbots`, bao gồm:
  - Top_p
  - Top_k
  - Temperature
  - Max_tokens
  - Presence Penalty
  - Frequency Penalty
  - Beam 
  - Length Penalty
  - Best of
  - Early Stopping
  - Length Penalty

## 3. Chế độ Agent

> Để kiểm tra cả Chatbots và Agents, người dùng có thể chọn `Hotpot Mode` trong [Bots & Agents](https://professorparakeet.com/frontend/hub)

- Chúng tôi chuyển đổi các mô hình ngôn ngữ lớn thành các đại lý có khả năng khởi tạo các hành động được định trước và có bộ nhớ làm việc của nhiều bước suy luận.
- Truy cập [Bots & Agents](https://professorparakeet.com/frontend/hub) và chọn `Agents` để trò chuyện với các đại lý của chúng tôi.
- Người dùng có thể chọn giữa các đại lý khác nhau và các động cơ khác nhau cho các đại lý
- Người dùng có thể tạo mẫu của riêng mình cho dự án cụ thể của họ.
- Người dùng có thể cấu hình nhiều tham số suy diễn trong `Chatbots`, bao gồm:
  - Top_p
  - Top_k
  - Temperature
  - Max_tokens
  - Presence Penalty
  - Frequency Penalty
  

## 4. Chức năng LLM Backend

Chúng tôi cung cấp nhiều chức năng ngôn ngữ, bao gồm:
- Dự đoán cảm xúc: dự đoán cảm xúc của các lời nhắc của người dùng trong danh sách cảm xúc có thể cấu hình.
- Dự đoán tình cảm: dự đoán tình cảm của các lời nhắc của người dùng.
- Phong cách lại: phong cách lại các lời nhắc của người dùng với một biến có thể cấu hình (ví dụ: chuyển đổi thành viết khoa học, tiểu thuyết, sáng tạo, cảm xúc)
- Tóm tắt: tóm tắt các lời nhắc của người dùng với một số lượng từ có thể cấu hình.
- Phân loại chủ đề: phân loại chủ đề của các lời nhắc của người dùng trong danh sách chủ đề có thể cấu hình.
- Paraphase: paraphase các lời nhắc của người dùng.

Người dùng có thể cấu hình nhiều tham số suy diễn trong `Chatbots`, bao gồm:
  - Top_p
  - Top_k
  - Temperature
  - Max_tokens
  - Presence Penalty
  - Frequency Penalty