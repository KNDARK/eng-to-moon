# 🚀 Eng to Moon — Lộ trình IELTS 7.0

Ứng dụng **web tĩnh** giúp sinh viên đại học (đã có nền tảng tiếng Anh cơ bản, khoảng 5.0–5.5) luyện đủ 4 kỹ năng **Nghe – Nói – Đọc – Viết**, mục tiêu **IELTS Academic 7.0**.
Chỉ dùng HTML/CSS/JavaScript thuần: không cần cài đặt, không cần build, không cần server.

## Chạy ứng dụng

- **Cách nhanh nhất:** mở file `index.html` bằng Chrome hoặc Edge.
- **Khuyến nghị** (để dùng micro ổn định): chạy một server tĩnh rồi mở `http://localhost:8000`
  ```bash
  python3 -m http.server 8000
  ```
- **Đưa lên mạng:** đẩy thư mục này lên GitHub Pages, Netlify hoặc Vercel (không cần cấu hình gì thêm).

> Ghi âm và nhận diện giọng nói cần trình duyệt Chrome/Edge và được chạy qua `https://` hoặc `localhost`.

## Tính năng

| Mục | Nội dung |
|---|---|
| 🏠 Tổng quan | Chuỗi ngày học, % lộ trình, band ước lượng từng kỹ năng, overall, kế hoạch học mỗi ngày, lịch sử bài làm |
| 🗺️ Lộ trình 12 tuần | 4 giai đoạn (Nền tảng → Phát triển → Nâng cao → Luyện đề), nhiệm vụ từng tuần có đánh dấu hoàn thành |
| 🎧 Listening | 4 bài mô phỏng Section 1–4 (đọc bằng giọng máy), chế độ thi (nghe 1 lần) / luyện tập, chấm điểm & quy đổi band, transcript; **chép chính tả** 15 câu với so khớp từng từ |
| 📖 Reading | 3 passage học thuật: TRUE/FALSE/NOT GIVEN, YES/NO/NOT GIVEN, Matching headings, Matching features, Sentence/Summary completion; đếm ngược 20 phút, tô sáng văn bản, giải thích đáp án |
| ✍️ Writing | 4 đề Task 1 (biểu đồ đường, cột, bảng, quy trình — vẽ bằng SVG) và 6 đề Task 2 (đủ 5 dạng), bấm giờ, tự lưu bản nháp, **phân tích bài viết tự động** (độ dài, từ nối, lặp từ, văn phong, câu phức…), bài mẫu, **tự chấm theo 4 tiêu chí** |
| 🎤 Speaking | Part 1 ngẫu nhiên, 8 cue card Part 2 (1 phút chuẩn bị + 2 phút nói) kèm câu hỏi Part 3, **ghi âm & nghe lại**, chuyển giọng nói thành chữ, đo tốc độ nói (WPM) và từ đệm, luyện phát âm/shadowing có chấm độ khớp, cụm từ hữu ích, tự chấm band |
| 🧠 Từ vựng | ~130 từ theo 11 chủ đề IELTS + Academic Word List + từ mô tả xu hướng Task 1; flashcard **lặp lại ngắt quãng (SRS, SM-2)**, phím tắt, quiz, phát âm |
| 🧩 Ngữ pháp | 10 chủ điểm band 7 (thì, mệnh đề quan hệ, bị động, điều kiện, so sánh, đảo ngữ, mệnh đề danh từ, phân từ, hoà hợp chủ–vị, mạo từ) giải thích bằng tiếng Việt + quiz |
| 🎯 Tính band | Quy đổi số câu đúng → band, tính overall theo quy tắc làm tròn IELTS, lưu kết quả thi thử |
| 💡 Chiến lược | Cấu trúc đề, band 7 khác band 6 ở đâu, bảng từ nối, ngôn ngữ số liệu, mẹo ngày thi, tài nguyên |
| ⚙️ Cài đặt | Hồ sơ & ngày thi, chọn giọng đọc/tốc độ, sao lưu – khôi phục dữ liệu (JSON), chế độ sáng/tối |

Tiến độ được lưu bằng `localStorage` ngay trên trình duyệt của người học — không có tài khoản, không gửi dữ liệu đi đâu.

## Cấu trúc thư mục

```
index.html            # Khung trang + menu
css/style.css         # Giao diện (sáng/tối, responsive)
js/
  store.js            # Lưu tiến độ (localStorage)
  utils.js            # DOM, TTS, nhận diện giọng nói, ghi âm, hẹn giờ, quy đổi band
  quiz.js             # Bộ dựng câu hỏi dùng chung
  app.js              # Hash router
  data/               # Học liệu: roadmap, vocab, grammar, listening, reading, writing, speaking
  pages/              # Mỗi trang một file
```

## Thêm học liệu

Toàn bộ nội dung nằm trong `js/data/*.js` dưới dạng mảng/đối tượng JavaScript, có chú thích định dạng ở đầu mỗi file.
Ví dụ, để thêm một bài đọc mới, thêm một phần tử vào `window.READING` với `paragraphs` và `questions` — trang Reading sẽ tự hiển thị.

## Lưu ý

- Bảng quy đổi band và phần tự chấm chỉ mang tính **ước lượng** để theo dõi tiến bộ; điểm thật do giám khảo IELTS chấm.
- Công cụ phân tích Writing chỉ kiểm tra các dấu hiệu hình thức, không thay thế việc được giáo viên chữa bài.
- Giọng đọc phụ thuộc hệ điều hành/trình duyệt; nên dùng Chrome/Edge để có giọng Anh–Anh tự nhiên.
