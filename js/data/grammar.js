/* Ngữ pháp trọng tâm cho band 7 (tiêu chí Grammatical Range & Accuracy).
 * content: HTML (giải thích tiếng Việt + ví dụ); quiz: nhóm câu hỏi dùng Quiz.render */
window.GRAMMAR = [
  {
    id: 'g1', title: 'Các thì hoàn thành & tiếp diễn', tag: 'Nền tảng',
    content: `
      <p>Band 7 yêu cầu dùng thì <b>chính xác và linh hoạt</b>. Các thì hay bị dùng sai nhất là hiện tại hoàn thành và quá khứ hoàn thành.</p>
      <h3>1. Present Perfect — have/has + V3</h3>
      <p>Dùng cho hành động bắt đầu trong quá khứ và còn liên quan tới hiện tại; kinh nghiệm; xu hướng tới nay.</p>
      <div class="example-box"><div class="en">The number of online learners <b>has risen</b> dramatically over the past decade.</div><div class="vi">Số người học trực tuyến đã tăng mạnh trong thập kỷ qua.</div></div>
      <h3>2. Present Perfect Continuous — have/has been + V-ing</h3>
      <p>Nhấn mạnh tính liên tục của hành động tới hiện tại (hay dùng trong Speaking Part 1).</p>
      <div class="example-box"><div class="en">I<b>'ve been studying</b> economics for three years.</div><div class="vi">Tôi đã học kinh tế được ba năm rồi (và vẫn đang học).</div></div>
      <h3>3. Past Perfect — had + V3</h3>
      <p>Hành động xảy ra trước một mốc/hành động khác trong quá khứ. Rất hữu ích trong Writing Task 1 với "by + năm".</p>
      <div class="example-box"><div class="en">By 2010, the figure <b>had doubled</b>.</div><div class="vi">Đến năm 2010, con số này đã tăng gấp đôi.</div></div>
      <h3>4. Future Perfect — will have + V3</h3>
      <p>Dùng cho dự đoán trong biểu đồ tương lai.</p>
      <div class="example-box"><div class="en">By 2050, the elderly population <b>will have reached</b> 20 million.</div></div>
      <div class="callout warn">⚠️ Lỗi thường gặp: <i>"Since 2000, the rate increased"</i> → phải là <b>has increased</b>. "Since/for" + đến nay → dùng hoàn thành.</div>`,
    quiz: [{
      instr: 'Chọn dạng đúng của động từ.', type: 'choice', items: [
        { q: 'Since 2015, the government ___ (invest) heavily in public transport.', options: ['invested', 'has invested', 'had invested', 'invests'], a: 'has invested', explain: '"Since + mốc" kéo dài tới hiện tại → hiện tại hoàn thành.' },
        { q: 'By the end of 1990, sales ___ (fall) to their lowest point.', options: ['fell', 'have fallen', 'had fallen', 'were falling'], a: 'had fallen', explain: '"By + mốc quá khứ" → quá khứ hoàn thành.' },
        { q: 'I ___ (learn) English for ten years, but I still find listening difficult.', options: ['learn', 'am learning', 'have been learning', 'had learnt'], a: 'have been learning', explain: 'Hành động kéo dài liên tục tới hiện tại.' },
        { q: 'It is predicted that by 2040 the figure ___ (triple).', options: ['will triple', 'will have tripled', 'has tripled', 'triples'], a: 'will have tripled', explain: '"By + mốc tương lai" → tương lai hoàn thành.' },
        { q: 'When I arrived at the lecture hall, the talk ___ already ___.', options: ['has / started', 'had / started', 'was / starting', 'did / start'], a: 'had / started', explain: 'Bài giảng bắt đầu trước khi tôi tới → quá khứ hoàn thành.' }
      ]
    }]
  },
  {
    id: 'g2', title: 'Mệnh đề quan hệ (Relative clauses)', tag: 'Câu phức',
    content: `
      <p>Mệnh đề quan hệ giúp gộp hai câu đơn thành một câu phức — cách nhanh nhất để tăng điểm Grammatical Range.</p>
      <h3>1. Mệnh đề xác định (defining) — không dùng dấu phẩy</h3>
      <div class="example-box"><div class="en">Students <b>who work part-time</b> often develop better time management skills.</div><div class="vi">Những sinh viên làm thêm thường có kỹ năng quản lý thời gian tốt hơn.</div></div>
      <h3>2. Mệnh đề không xác định (non-defining) — có dấu phẩy, không dùng "that"</h3>
      <div class="example-box"><div class="en">Hanoi, <b>which is the capital of Vietnam</b>, has a population of over eight million.</div></div>
      <h3>3. Which thay cho cả mệnh đề trước</h3>
      <div class="example-box"><div class="en">Many graduates cannot find jobs, <b>which</b> leads to frustration.</div><div class="vi">Nhiều cử nhân không tìm được việc, điều này dẫn đến sự thất vọng.</div></div>
      <h3>4. Giới từ + whom/which</h3>
      <div class="example-box"><div class="en">This is the issue <b>to which</b> the government must pay attention.</div></div>
      <h3>5. Whose — sở hữu</h3>
      <div class="example-box"><div class="en">Parents <b>whose</b> children use smartphones excessively should set limits.</div></div>
      <div class="callout warn">⚠️ Không dùng <b>that</b> sau dấu phẩy và sau giới từ: <s>..., that is ...</s>, <s>in that</s> → <b>in which</b>.</div>`,
    quiz: [{
      instr: 'Chọn đại từ quan hệ đúng.', type: 'choice', items: [
        { q: 'Da Nang, ___ is famous for its beaches, attracts millions of tourists.', options: ['that', 'which', 'who', 'where'], a: 'which', explain: 'Mệnh đề không xác định (có dấu phẩy) → which, không dùng that.' },
        { q: 'The professor ___ lecture I attended yesterday is an expert in AI.', options: ['who', 'whom', 'whose', 'which'], a: 'whose', explain: 'Sở hữu: lecture của professor.' },
        { q: 'This is the city ___ I was born.', options: ['which', 'where', 'that', 'whose'], a: 'where', explain: 'Chỉ nơi chốn, sau đó là mệnh đề đầy đủ → where (= in which).' },
        { q: 'Fewer people are reading books, ___ is a worrying trend.', options: ['that', 'what', 'which', 'it'], a: 'which', explain: 'Which thay cho cả mệnh đề phía trước.' },
        { q: 'The person to ___ you should send your application is the dean.', options: ['who', 'whom', 'that', 'which'], a: 'whom', explain: 'Sau giới từ, chỉ người → whom.' }
      ]
    }]
  },
  {
    id: 'g3', title: 'Câu bị động (Passive voice)', tag: 'Học thuật',
    content: `
      <p>Văn phong học thuật ưa dùng bị động để nhấn mạnh hành động/kết quả thay vì người thực hiện — đặc biệt trong Task 1 dạng <b>Process</b>.</p>
      <h3>1. Cấu trúc: be + V3</h3>
      <div class="example-box"><div class="en">The raw materials <b>are transported</b> to the factory, where they <b>are crushed</b> into small pieces.</div></div>
      <h3>2. Bị động với các thì</h3>
      <table><tr><th>Thì</th><th>Cấu trúc</th><th>Ví dụ</th></tr>
      <tr><td>Hiện tại hoàn thành</td><td>has/have been + V3</td><td>Many measures have been introduced.</td></tr>
      <tr><td>Động từ khuyết thiếu</td><td>modal + be + V3</td><td>Stricter laws should be enforced.</td></tr>
      <tr><td>Tiếp diễn</td><td>is being + V3</td><td>A new bridge is being built.</td></tr></table>
      <h3>3. Bị động khách quan (Impersonal passive)</h3>
      <p>Dùng để nêu quan điểm chung, rất "academic".</p>
      <div class="example-box"><div class="en"><b>It is widely believed that</b> technology improves education.</div><div class="en">Technology <b>is widely believed to</b> improve education.</div></div>
      <div class="callout">💡 Mẫu câu hay: <i>It is often argued that… / It has been suggested that… / It is estimated that…</i></div>`,
    quiz: [{
      instr: 'Chọn dạng bị động đúng.', type: 'choice', items: [
        { q: 'After harvesting, the tea leaves ___ in the sun.', options: ['dry', 'are dried', 'are drying', 'have dried'], a: 'are dried', explain: 'Mô tả quy trình → bị động hiện tại đơn.' },
        { q: 'More funding should ___ to rural schools.', options: ['allocate', 'be allocated', 'been allocated', 'allocated'], a: 'be allocated', explain: 'Modal + be + V3.' },
        { q: 'It ___ that over 1 billion people lack clean water.', options: ['estimates', 'is estimated', 'has estimated', 'estimated'], a: 'is estimated', explain: 'Bị động khách quan: It is estimated that...' },
        { q: 'Since 2010, three new hospitals ___ in the city.', options: ['built', 'were built', 'have been built', 'are built'], a: 'have been built', explain: 'Since → hiện tại hoàn thành bị động.' },
        { q: 'Smoking ___ to cause many serious diseases.', options: ['knows', 'is known', 'has known', 'knew'], a: 'is known', explain: 'S + is known to + V.' }
      ]
    }]
  },
  {
    id: 'g4', title: 'Câu điều kiện (Conditionals)', tag: 'Câu phức',
    content: `
      <p>Câu điều kiện rất hữu ích để đưa ra <b>giải pháp và hệ quả</b> trong Writing Task 2 và Speaking Part 3.</p>
      <table><tr><th>Loại</th><th>Cấu trúc</th><th>Dùng khi</th></tr>
      <tr><td>0</td><td>If + hiện tại, hiện tại</td><td>Sự thật hiển nhiên</td></tr>
      <tr><td>1</td><td>If + hiện tại, will + V</td><td>Có thể xảy ra</td></tr>
      <tr><td>2</td><td>If + quá khứ, would + V</td><td>Giả định, không có thật ở hiện tại</td></tr>
      <tr><td>3</td><td>If + had V3, would have V3</td><td>Giả định về quá khứ</td></tr>
      <tr><td>Hỗn hợp</td><td>If + had V3, would + V</td><td>Quá khứ ảnh hưởng hiện tại</td></tr></table>
      <div class="example-box"><div class="en">If governments <b>imposed</b> higher taxes on fast food, obesity rates <b>would</b> fall.</div></div>
      <div class="example-box"><div class="en">If I <b>had studied</b> harder at school, I <b>would be</b> more confident now.</div></div>
      <h3>Biến thể nâng cao</h3>
      <ul>
        <li><b>Unless</b> = if not: <i>Unless action is taken, the problem will worsen.</i></li>
        <li><b>Provided that / As long as</b>: <i>Online learning is effective provided that students are self-disciplined.</i></li>
        <li><b>Đảo ngữ</b>: <i>Were the government to invest more, ... / Had I known, ... / Should you need help, ...</i></li>
      </ul>`,
    quiz: [{
      instr: 'Chọn đáp án đúng.', type: 'choice', items: [
        { q: 'If more people used public transport, there ___ less congestion.', options: ['will be', 'would be', 'would have been', 'is'], a: 'would be', explain: 'Loại 2: If + quá khứ, would + V.' },
        { q: '___ the government to ban cars in city centres, air quality would improve.', options: ['If', 'Were', 'Had', 'Should'], a: 'Were', explain: 'Đảo ngữ loại 2: Were + S + to V.' },
        { q: '___ I known about the scholarship, I would have applied.', options: ['Had', 'If', 'Were', 'Did'], a: 'Had', explain: 'Đảo ngữ loại 3: Had + S + V3.' },
        { q: '___ measures are taken, many species will become extinct.', options: ['If', 'Unless', 'Provided', 'As long as'], a: 'Unless', explain: 'Unless = if not.' },
        { q: 'If she had taken the job in Singapore, she ___ there now.', options: ['would live', 'would have lived', 'will live', 'lived'], a: 'would live', explain: 'Hỗn hợp: quá khứ → kết quả hiện tại ("now").' }
      ]
    }]
  },
  {
    id: 'g5', title: 'So sánh & cấu trúc mô tả số liệu', tag: 'Task 1',
    content: `
      <p>Writing Task 1 bắt buộc phải có <b>so sánh</b>. Đa dạng cách so sánh = điểm cao hơn.</p>
      <ul>
        <li>So sánh hơn/nhất: <i>higher than, the most popular</i></li>
        <li>Gấp số lần: <i>Spending on food was <b>twice as high as</b> that on clothing.</i></li>
        <li>Mức độ: <i>considerably / significantly / slightly higher</i></li>
        <li>Kép: <i><b>The more</b> people earn, <b>the more</b> they spend.</i></li>
        <li>Tương phản: <i>..., <b>whereas</b> / <b>while</b> ...; <b>compared with</b>...; <b>in contrast</b>, ...</i></li>
      </ul>
      <h3>Hai mẫu câu mô tả xu hướng</h3>
      <div class="example-box"><div class="en">(1) Verb + adverb: Car ownership <b>rose sharply</b> to 60%.</div><div class="en">(2) Adjective + noun: There was <b>a sharp rise</b> in car ownership.</div></div>
      <div class="callout warn">⚠️ So sánh hai đối tượng cùng loại: <i>The price of tea was higher than <b>that</b> of coffee</i> (không viết <s>than coffee</s>).</div>`,
    quiz: [{
      instr: 'Chọn đáp án đúng.', type: 'choice', items: [
        { q: 'The population of London is larger than ___ of Paris.', options: ['it', 'that', 'those', 'this'], a: 'that', explain: 'Dùng "that" thay cho "the population".' },
        { q: 'Exports in 2020 were three times ___ in 2000.', options: ['as high as', 'higher as', 'as higher than', 'more high'], a: 'as high as', explain: 'Cấu trúc: số lần + as + adj + as.' },
        { q: 'The more you practise, ___ you become.', options: ['the more confident', 'more confident', 'the most confident', 'most confident'], a: 'the more confident', explain: 'So sánh kép: The more..., the more...' },
        { q: 'There was ___ in the unemployment rate.', options: ['a dramatic decrease', 'a dramatically decrease', 'dramatic decreased', 'decreased dramatic'], a: 'a dramatic decrease', explain: 'Mẫu adjective + noun.' },
        { q: 'Men spent more on sport, ___ women spent more on books.', options: ['whereas', 'despite', 'however', 'in spite of'], a: 'whereas', explain: 'Whereas nối hai mệnh đề tương phản.' }
      ]
    }]
  },
  {
    id: 'g6', title: 'Đảo ngữ & câu nhấn mạnh', tag: 'Band 7+',
    content: `
      <p>Dùng 1–2 cấu trúc nhấn mạnh <b>tự nhiên</b> trong bài giúp thể hiện "a variety of complex structures". Đừng lạm dụng.</p>
      <h3>1. Đảo ngữ với trạng từ phủ định</h3>
      <div class="example-box"><div class="en"><b>Not only does</b> exercise improve physical health, <b>but it also</b> boosts mental well-being.</div></div>
      <div class="example-box"><div class="en"><b>Rarely do</b> students receive enough career guidance.</div></div>
      <div class="example-box"><div class="en"><b>Only by</b> investing in education <b>can</b> a country develop sustainably.</div></div>
      <h3>2. Câu chẻ (Cleft sentences)</h3>
      <div class="example-box"><div class="en"><b>It is</b> the government <b>that</b> should take responsibility.</div></div>
      <div class="example-box"><div class="en"><b>What</b> concerns me most <b>is</b> the rising cost of living.</div></div>
      <div class="callout">💡 Speaking: <i>"What I really love about my hometown is..."</i> nghe rất tự nhiên!</div>`,
    quiz: [{
      instr: 'Chọn đáp án đúng.', type: 'choice', items: [
        { q: 'Not only ___ pollution, but it also wastes energy.', options: ['traffic causes', 'does traffic cause', 'traffic does cause', 'causes traffic'], a: 'does traffic cause', explain: 'Not only + trợ động từ + S + V.' },
        { q: 'Seldom ___ such a brilliant performance.', options: ['I have seen', 'have I seen', 'I saw', 'saw I'], a: 'have I seen', explain: 'Seldom đầu câu → đảo ngữ.' },
        { q: '___ I like most about university is the freedom.', options: ['That', 'What', 'Which', 'It'], a: 'What', explain: 'Câu chẻ với What.' },
        { q: 'Only by working together ___ solve climate change.', options: ['we can', 'can we', 'we could', 'do we can'], a: 'can we', explain: 'Only by + V-ing + đảo ngữ.' },
        { q: 'It was in 2019 ___ the company went bankrupt.', options: ['which', 'when', 'that', 'what'], a: 'that', explain: 'Câu chẻ: It was ... that ...' }
      ]
    }]
  },
  {
    id: 'g7', title: 'Mệnh đề danh từ & câu tường thuật', tag: 'Câu phức',
    content: `
      <p>Mệnh đề danh từ đóng vai trò chủ ngữ/tân ngữ, giúp câu học thuật hơn.</p>
      <div class="example-box"><div class="en"><b>Whether</b> homework is beneficial remains controversial.</div><div class="vi">Việc bài tập về nhà có lợi hay không vẫn còn gây tranh cãi.</div></div>
      <div class="example-box"><div class="en"><b>How</b> children spend their free time affects their development.</div></div>
      <div class="example-box"><div class="en">Research shows <b>that</b> bilingual people are better at multitasking.</div></div>
      <h3>Câu hỏi gián tiếp — không đảo ngữ</h3>
      <div class="example-box"><div class="en">I'm not sure <b>what the answer is</b>. (không phải <s>what is the answer</s>)</div></div>
      <div class="callout">💡 Speaking Part 3 khi cần thời gian suy nghĩ: <i>"That's an interesting question. I've never really thought about <b>why people do that</b>, but..."</i></div>`,
    quiz: [{
      instr: 'Chọn đáp án đúng.', type: 'choice', items: [
        { q: '___ we should ban advertising to children is a matter of debate.', options: ['If', 'Whether', 'That if', 'What'], a: 'Whether', explain: 'Whether (không dùng if) làm chủ ngữ.' },
        { q: 'Could you tell me where ___?', options: ['is the library', 'the library is', 'does the library', 'library is it'], a: 'the library is', explain: 'Câu hỏi gián tiếp giữ trật tự S + V.' },
        { q: '___ he said surprised everyone.', options: ['That', 'What', 'Which', 'It'], a: 'What', explain: 'What = the thing that.' },
        { q: 'It is undeniable ___ technology has changed our lives.', options: ['what', 'that', 'which', 'whether'], a: 'that', explain: 'It is + adj + that-clause.' },
        { q: 'I wonder why ___ so expensive in big cities.', options: ['is housing', 'housing is', 'does housing', 'housing being'], a: 'housing is', explain: 'Mệnh đề danh từ không đảo ngữ.' }
      ]
    }]
  },
  {
    id: 'g8', title: 'Mệnh đề phân từ & rút gọn', tag: 'Band 7+',
    content: `
      <p>Mệnh đề phân từ giúp câu <b>ngắn gọn mà vẫn phức tạp</b>, rất được đánh giá cao.</p>
      <h3>1. Hiện tại phân từ (V-ing) — chủ động</h3>
      <div class="example-box"><div class="en"><b>Realising</b> the importance of English, many students attend extra classes.</div></div>
      <h3>2. Quá khứ phân từ (V3) — bị động</h3>
      <div class="example-box"><div class="en"><b>Built</b> in 1010, Hanoi is over a thousand years old.</div></div>
      <h3>3. Phân từ hoàn thành (Having V3) — xảy ra trước</h3>
      <div class="example-box"><div class="en"><b>Having completed</b> their degree, graduates often struggle to find work.</div></div>
      <h3>4. Rút gọn mệnh đề quan hệ</h3>
      <div class="example-box"><div class="en">People <s>who live</s> <b>living</b> in cities suffer from pollution.</div><div class="en">The data <s>which was collected</s> <b>collected</b> in 2020 shows...</div></div>
      <div class="callout warn">⚠️ Lỗi "dangling participle": <s>Walking to school, the rain started.</s> → Chủ ngữ phải khớp: <i>Walking to school, <b>I</b> got caught in the rain.</i></div>`,
    quiz: [{
      instr: 'Chọn đáp án đúng.', type: 'choice', items: [
        { q: '___ by the results, the researchers repeated the experiment.', options: ['Surprising', 'Surprised', 'Having surprised', 'To surprise'], a: 'Surprised', explain: 'Nhà nghiên cứu bị làm cho ngạc nhiên → V3.' },
        { q: '___ his homework, he went out with friends.', options: ['Finishing', 'Having finished', 'Finished', 'To finish'], a: 'Having finished', explain: 'Hành động xảy ra trước → Having V3.' },
        { q: 'Students ___ abroad often become more independent.', options: ['study', 'studied', 'studying', 'are studying'], a: 'studying', explain: 'Rút gọn mệnh đề quan hệ chủ động.' },
        { q: 'The products ___ in this factory are exported to Japan.', options: ['making', 'made', 'make', 'are made'], a: 'made', explain: 'Rút gọn bị động.' },
        { q: '___ in a small village, I didn’t have access to many books.', options: ['Growing up', 'Grown up', 'Having grown', 'To grow up'], a: 'Growing up', explain: 'Chủ động, cùng thời điểm.' }
      ]
    }]
  },
  {
    id: 'g9', title: 'Hoà hợp chủ – vị & danh từ đếm được', tag: 'Accuracy',
    content: `
      <p>Band 7 yêu cầu "<b>frequent error-free sentences</b>". Đây là nhóm lỗi người Việt hay mắc nhất.</p>
      <ul>
        <li>Chủ ngữ dài: <i>The number of students who study abroad <b>has</b> increased.</i> (chủ ngữ chính là "the number")</li>
        <li><b>The number of</b> + N số nhiều + V số ít; <b>A number of</b> + N số nhiều + V số nhiều.</li>
        <li>Danh từ không đếm được: <b>information, advice, research, knowledge, equipment, furniture, evidence, traffic</b> → không thêm "s", không dùng "a/many".</li>
        <li><b>Everyone / each / every</b> + V số ít.</li>
        <li><b>People</b> là số nhiều: <i>People <b>are</b>...</i></li>
      </ul>
      <div class="callout warn">⚠️ <s>many researches, an advice, informations</s> → <b>much research, a piece of advice, information</b></div>`,
    quiz: [{
      instr: 'Chọn đáp án đúng.', type: 'choice', items: [
        { q: 'The number of cars on the roads ___ doubled.', options: ['have', 'has', 'are', 'were'], a: 'has', explain: 'The number of → động từ số ít.' },
        { q: 'A number of students ___ complained about the fees.', options: ['has', 'have', 'is', 'was'], a: 'have', explain: 'A number of → số nhiều.' },
        { q: 'She gave me some useful ___.', options: ['advices', 'advice', 'an advice', 'advise'], a: 'advice', explain: 'Advice không đếm được.' },
        { q: 'Recent ___ suggests that sleep affects memory.', options: ['researches', 'research', 'a research', 'researchs'], a: 'research', explain: 'Research không đếm được, V số ít.' },
        { q: 'Everyone in my class ___ to pass IELTS.', options: ['want', 'wants', 'are wanting', 'have wanted'], a: 'wants', explain: 'Everyone + V số ít.' }
      ]
    }]
  },
  {
    id: 'g10', title: 'Mạo từ (a / an / the / Ø)', tag: 'Accuracy',
    content: `
      <p>Tiếng Việt không có mạo từ nên đây là lỗi phổ biến nhất ảnh hưởng tới band Grammar.</p>
      <ul>
        <li><b>a/an</b>: danh từ đếm được số ít, nhắc lần đầu, chung chung: <i>a university</i>, <i>an hour</i> (theo âm, không theo chữ).</li>
        <li><b>the</b>: đã xác định, duy nhất, so sánh nhất, nhạc cụ, đại dương/sông, tên nước có Republic/Kingdom/States: <i>the Internet, the environment, the UK</i>.</li>
        <li><b>Ø (không mạo từ)</b>: danh từ số nhiều/không đếm được mang nghĩa chung: <i><b>Technology</b> has changed <b>education</b>. <b>Children</b> need <b>love</b>.</i></li>
        <li>Nhóm người: <b>the elderly, the young, the poor, the unemployed</b>.</li>
      </ul>
      <div class="callout warn">⚠️ <s>The technology is important in the modern life.</s> → <b>Technology is important in modern life.</b></div>`,
    quiz: [{
      instr: 'Chọn mạo từ đúng (Ø = không cần mạo từ).', type: 'choice', items: [
        { q: '___ government should help ___ elderly.', options: ['The / the', 'A / the', 'The / Ø', 'Ø / the'], a: 'The / the', explain: 'Chính phủ (xác định) và nhóm người the elderly.' },
        { q: 'It took me ___ hour to finish ___ essay.', options: ['a / an', 'an / the', 'an / an', 'a / the'], a: 'an / the', explain: 'Hour bắt đầu bằng nguyên âm; the essay (đã xác định).' },
        { q: '___ pollution is a serious problem in many cities.', options: ['The', 'A', 'Ø', 'An'], a: 'Ø', explain: 'Danh từ không đếm được mang nghĩa chung.' },
        { q: 'She is studying at ___ university in ___ United States.', options: ['an / the', 'a / Ø', 'a / the', 'the / Ø'], a: 'a / the', explain: '"university" đọc /juː/ → a; the United States.' },
        { q: 'This is ___ most important decision of my life.', options: ['a', 'Ø', 'the', 'an'], a: 'the', explain: 'So sánh nhất → the.' }
      ]
    }]
  }
];
