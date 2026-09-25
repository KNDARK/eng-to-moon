/* Chiến lược: cấu trúc đề, yêu cầu band 7, từ nối, ngôn ngữ Task 1, mẹo ngày thi, tài nguyên. */
Pages.tips = {
  render(el) {
    el.innerHTML = `
      <div class="page-head"><h1>💡 Chiến lược & tiêu chí IELTS</h1>
        <p>Hiểu rõ đề thi và giám khảo chấm gì là bước đầu tiên để lên band 7.</p></div>

      <div class="card"><h2>📋 Cấu trúc bài thi IELTS Academic</h2>
        <div class="table-wrap"><table>
          <tr><th>Kỹ năng</th><th>Thời gian</th><th>Nội dung</th><th>Band 7 cần</th></tr>
          <tr><td>🎧 Listening</td><td>~30 phút (+2 phút kiểm tra trên máy / 10 phút chép trên giấy)</td><td>4 section, 40 câu</td><td>~30/40 câu đúng</td></tr>
          <tr><td>📖 Reading</td><td>60 phút</td><td>3 passage học thuật, 40 câu</td><td>~30/40 câu đúng</td></tr>
          <tr><td>✍️ Writing</td><td>60 phút</td><td>Task 1 (≥150 từ) + Task 2 (≥250 từ)</td><td>7.0 ở cả 4 tiêu chí</td></tr>
          <tr><td>🎤 Speaking</td><td>11–14 phút</td><td>Part 1, 2, 3 — phỏng vấn trực tiếp</td><td>7.0 ở cả 4 tiêu chí</td></tr>
        </table></div>
      </div>

      <div class="grid grid-2">
        <div class="card"><h2>✍️ Writing band 7 khác band 6 ở đâu?</h2><ul>
          <li><b>Task Response:</b> trả lời <u>mọi phần</u> của đề; quan điểm rõ ràng từ mở bài đến kết bài; ý được mở rộng bằng giải thích + ví dụ (không chỉ liệt kê).</li>
          <li><b>Coherence:</b> mỗi đoạn một ý trung tâm (topic sentence); từ nối đa dạng nhưng không máy móc; dùng đại từ tham chiếu (this, such, these).</li>
          <li><b>Lexical:</b> dùng từ ít phổ biến và <b>collocation</b> chính xác; chỉ thỉnh thoảng sai chính tả/từ loại.</li>
          <li><b>Grammar:</b> nhiều loại câu phức; <b>phần lớn câu không có lỗi</b>.</li>
          <li><b>Task 1:</b> phải có <b>Overview</b> rõ ràng và chọn lọc các đặc điểm chính.</li></ul></div>
        <div class="card"><h2>🎤 Speaking band 7 khác band 6 ở đâu?</h2><ul>
          <li><b>Fluency:</b> nói dài mà không mất nhiều công sức; ngập ngừng chỉ để tìm ý, không phải tìm từ.</li>
          <li><b>Lexical:</b> dùng linh hoạt, có idiom và cụm từ tự nhiên; paraphrase tốt khi bí từ.</li>
          <li><b>Grammar:</b> dùng câu phức thường xuyên, nhiều câu không lỗi.</li>
          <li><b>Pronunciation:</b> dễ hiểu suốt bài; kiểm soát trọng âm, ngữ điệu; giọng Việt nhẹ không bị trừ điểm.</li></ul>
          <div class="callout small">Không cần học thuộc bài mẫu — giám khảo nhận ra và sẽ đổi câu hỏi. Hãy chuẩn bị <b>ý tưởng + từ vựng</b>, không phải câu chữ.</div></div>
      </div>

      <div class="card"><h2>🔗 Từ nối theo chức năng (Coherence & Cohesion)</h2>
        <div class="table-wrap"><table>
          <tr><th>Chức năng</th><th>Từ / cụm từ</th></tr>
          <tr><td>Thêm ý</td><td>Furthermore, Moreover, In addition, Not only… but also, Another key factor is…</td></tr>
          <tr><td>Tương phản</td><td>However, Nevertheless, On the other hand, In contrast, Whereas, Although, Despite + N/V-ing</td></tr>
          <tr><td>Nguyên nhân – kết quả</td><td>Therefore, Consequently, As a result, Thus, This leads to…, owing to / due to + N</td></tr>
          <tr><td>Ví dụ</td><td>For example, For instance, such as, A case in point is…, This is exemplified by…</td></tr>
          <tr><td>Nhượng bộ</td><td>Admittedly, It is true that… however…, While it is undeniable that…</td></tr>
          <tr><td>Nêu quan điểm</td><td>In my view, I would argue that, I am convinced that, From my perspective</td></tr>
          <tr><td>Kết luận</td><td>In conclusion, To conclude, To sum up, All things considered</td></tr>
        </table></div>
        <p class="small muted mt">Đừng bắt đầu mọi câu bằng từ nối — band 7 yêu cầu liên kết <i>tự nhiên</i>, có thể dùng đại từ và mệnh đề quan hệ thay thế.</p>
      </div>

      <div class="card"><h2>📈 Ngôn ngữ mô tả số liệu (Task 1)</h2>
        <div class="grid grid-3 small">
          <div><b>Tăng</b><br>rise, increase, grow, climb, surge, soar, rocket</div>
          <div><b>Giảm</b><br>fall, decrease, decline, drop, dip, plummet, plunge</div>
          <div><b>Ổn định / dao động</b><br>remain stable, level off, plateau, fluctuate, stabilise</div>
          <div><b>Mức độ mạnh</b><br>dramatically, sharply, significantly, substantially, considerably</div>
          <div><b>Mức độ nhẹ</b><br>slightly, marginally, gradually, steadily, modestly</div>
          <div><b>Tỉ lệ</b><br>account for, make up, constitute, a third of, the majority of, just under/over</div>
        </div>
        <div class="callout small mt">Mẫu Overview: <i>Overall, it is clear that X rose significantly over the period, while Y remained the least popular throughout.</i></div>
      </div>

      <div class="grid grid-2">
        <div class="card"><h2>📅 Ngày thi</h2><ul>
          <li>Mang <b>CCCD/hộ chiếu</b> đúng loại đã đăng ký. Đến sớm ít nhất 30 phút.</li>
          <li>Listening: đọc trước câu hỏi trong thời gian cho phép; chú ý chính tả và số ít/số nhiều.</li>
          <li>Reading: không dành quá 20 phút cho một passage; đừng để trống câu nào (không trừ điểm câu sai).</li>
          <li>Writing: làm <b>Task 2 trước</b> nếu bạn hay thiếu thời gian (Task 2 chiếm 2/3 điểm Writing). Dành 5 phút soát lỗi.</li>
          <li>Speaking: hỏi lại nếu không nghe rõ ("Could you repeat the question, please?") — không bị trừ điểm.</li></ul></div>
        <div class="card"><h2>📚 Tài nguyên nên dùng thêm</h2><ul>
          <li><b>Cambridge IELTS</b> (sách đề thi thật, cuốn 10 trở đi) — luyện đề chuẩn.</li>
          <li><b>ielts.org</b> và trang của IDP / British Council — band descriptors chính thức, đề mẫu.</li>
          <li><b>BBC Learning English</b>, <b>TED Talks</b>, podcast <b>6 Minute English</b> — luyện nghe.</li>
          <li><b>The Guardian</b>, <b>The Economist</b>, <b>National Geographic</b> — luyện đọc học thuật.</li>
          <li><b>Oxford Collocations Dictionary</b> — tra collocation khi viết.</li></ul></div>
      </div>`;
  }
};
