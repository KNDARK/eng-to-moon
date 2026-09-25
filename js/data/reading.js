/* Bài đọc Academic Reading. Mỗi passage nên làm trong 20 phút. */
window.READING = [
  {
    id: 'r1', title: 'The Benefits of Being Bilingual', minutes: 20, level: '6.0–6.5',
    focus: 'TRUE / FALSE / NOT GIVEN, Sentence completion',
    paragraphs: [
      ['A', 'For much of the twentieth century, educators and psychologists believed that raising children with two languages was harmful. It was widely assumed that a second language would confuse young learners, delay their speech and ultimately reduce their intelligence. Parents of immigrant families were frequently advised to speak only the language of their new country at home, even if they themselves spoke it poorly.'],
      ['B', 'This view began to change in 1962, when researchers Elizabeth Peal and Wallace Lambert published a study of ten-year-old children in Montreal. Contrary to their expectations, they found that bilingual children outperformed their monolingual peers on a range of verbal and non-verbal tests. Although later scholars criticised aspects of the study’s design, it prompted a wave of new research into how knowing two languages affects the brain.'],
      ['C', 'One of the most consistent findings concerns what psychologists call executive function: the set of mental skills that allows us to plan, focus attention and switch between tasks. Because both languages are active in a bilingual speaker’s mind at the same time, the brain must constantly suppress one language while using the other. This continuous exercise appears to strengthen the brain’s control system. In experiments requiring participants to ignore misleading information, bilingual adults often respond faster than monolinguals.'],
      ['D', 'The advantages may extend into old age. A frequently cited Canadian study led by Ellen Bialystok examined the records of patients diagnosed with dementia. It found that bilingual patients developed symptoms, on average, around four years later than monolingual patients with similar levels of education and income. Researchers suggest that a lifetime of managing two languages builds a “cognitive reserve” that helps the brain cope with damage for longer.'],
      ['E', 'Not all scientists are convinced, however. In recent years, several large-scale studies have failed to replicate the so-called bilingual advantage in executive function. Critics argue that earlier positive results may have been influenced by small sample sizes and by the tendency of journals to publish exciting findings rather than negative ones. Others point out that bilingual groups often differ from monolingual groups in cultural background and socio-economic status, making fair comparisons difficult.'],
      ['F', 'What is beyond dispute is that bilingualism does not cause the harm once feared. Children exposed to two languages may initially have a slightly smaller vocabulary in each language, but their total vocabulary across both languages is typically equal to or greater than that of monolingual children. Moreover, the social and economic benefits of speaking another language — from access to wider job markets to deeper connections with other cultures — are clear, regardless of any effect on the brain.']
    ],
    questions: [
      {
        instr: 'Câu 1–6: Thông tin sau có khớp với bài đọc không? Chọn TRUE / FALSE / NOT GIVEN.', type: 'choice', options: 'TFNG', items: [
          { q: 'In the past, immigrant parents were often told to avoid using their first language at home.', a: 'TRUE', explain: 'Đoạn A: "advised to speak only the language of their new country at home".' },
          { q: 'Peal and Lambert expected bilingual children to perform better than monolingual children.', a: 'FALSE', explain: 'Đoạn B: "Contrary to their expectations" → họ KHÔNG kỳ vọng như vậy.' },
          { q: 'The Montreal study included children from several different countries.', a: 'NOT GIVEN', explain: 'Bài chỉ nói "children in Montreal", không nói quốc tịch.' },
          { q: 'Bilingual speakers only activate one language at a time.', a: 'FALSE', explain: 'Đoạn C: "both languages are active ... at the same time".' },
          { q: 'Bilingualism prevents people from developing dementia.', a: 'FALSE', explain: 'Đoạn D: chỉ làm triệu chứng xuất hiện muộn hơn (delay), không ngăn chặn.' },
          { q: 'Bilingual children usually learn to read earlier than monolingual children.', a: 'NOT GIVEN', explain: 'Không có thông tin về thời điểm biết đọc.' }
        ]
      },
      {
        instr: 'Câu 7–10: Hoàn thành câu. Viết KHÔNG QUÁ HAI TỪ từ bài đọc.', type: 'text', items: [
          { q: 'The mental skills that help us plan and switch tasks are known as ___.', a: ['executive function'] },
          { q: 'Bilingual dementia patients showed symptoms about ___ later than monolinguals.', a: ['four years', '4 years'] },
          { q: 'A lifetime of using two languages may create a cognitive ___.', a: ['reserve'] },
          { q: 'Critics say early results may have been affected by small ___.', a: ['sample sizes'] }
        ]
      },
      {
        instr: 'Câu 11–13: Đoạn nào chứa thông tin sau? (A–F)', type: 'choice', select: true, options: ['A', 'B', 'C', 'D', 'E', 'F'], items: [
          { q: 'a reason why comparing bilingual and monolingual groups may be unfair', a: 'E' },
          { q: 'a reference to the total number of words children know', a: 'F' },
          { q: 'an explanation of why bilingual people may ignore distractions more easily', a: 'C' }
        ]
      }
    ]
  },
  {
    id: 'r2', title: 'Vertical Farming: The Future of Food?', minutes: 20, level: '6.5–7.0',
    focus: 'Matching headings, Multiple choice, Summary completion',
    paragraphs: [
      ['A', 'By 2050, the world’s population is expected to approach ten billion, with around two-thirds of people living in cities. Feeding this population with conventional agriculture will be a formidable challenge. Farmland is already under pressure from soil erosion, water shortages and extreme weather, while expanding it further would mean clearing forests that play a vital role in regulating the climate.'],
      ['B', 'Vertical farming offers one possible response. Instead of spreading crops across fields, vertical farms grow plants in stacked layers inside buildings, often in the heart of cities. Most use hydroponics, a technique in which plant roots sit in nutrient-rich water rather than soil. LED lights, tuned to the wavelengths plants use most efficiently, replace the sun, and computers control temperature and humidity around the clock.'],
      ['C', 'Supporters highlight impressive efficiency gains. Because water is recycled within a closed system, vertical farms can use up to 95 per cent less water than traditional fields. Crops are protected from pests, so pesticides are rarely needed, and harvests are not affected by droughts or storms. With several harvests possible each year, a single vertical farm can produce as much as a far larger outdoor farm on a fraction of the land.'],
      ['D', 'Yet the technology has a significant weakness: energy. Replacing free sunlight with artificial lighting is expensive, and in regions where electricity comes mainly from fossil fuels, the carbon footprint of a vertical farm can exceed that of conventional agriculture. Several high-profile companies in Europe and the United States have gone bankrupt in recent years, partly because of rising energy prices.'],
      ['E', 'For now, vertical farms are best suited to a narrow range of crops. Leafy greens such as lettuce and herbs grow quickly, are light and sell for high prices, which makes them profitable. Staple crops such as wheat, rice and maize, which provide most of the world’s calories, require far more space and light and are unlikely to be grown indoors economically in the near future.'],
      ['F', 'Most experts therefore see vertical farming not as a replacement for traditional agriculture but as a complement to it. Its greatest potential may lie in places where land and water are scarce, such as Singapore or the Gulf states, or in supplying fresh produce to cities while reducing transport distances. As renewable energy becomes cheaper, its environmental case is likely to grow stronger.']
    ],
    questions: [
      {
        instr: 'Câu 1–5: Chọn tiêu đề đúng cho các đoạn B–F từ danh sách i–viii.', type: 'choice', select: true,
        list: ['i. A costly limitation', 'ii. How the system works', 'iii. The history of indoor growing', 'iv. A supporting role rather than a substitute', 'v. The pressure on global food supply', 'vi. Advantages over traditional farming', 'vii. Crops that suit the method', 'viii. Government support for new farms'],
        options: ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii'],
        items: [
          { q: 'Paragraph B', a: 'ii' },
          { q: 'Paragraph C', a: 'vi' },
          { q: 'Paragraph D', a: 'i' },
          { q: 'Paragraph E', a: 'vii' },
          { q: 'Paragraph F', a: 'iv' }
        ]
      },
      {
        instr: 'Câu 6–8: Chọn đáp án đúng.', type: 'choice', items: [
          { q: 'According to paragraph A, expanding farmland is problematic because', options: ['A. it would require destroying forests.', 'B. cities are growing too quickly.', 'C. farmers lack modern technology.', 'D. soil is too expensive.'], a: 'A. it would require destroying forests.' },
          { q: 'Why can vertical farms have a large carbon footprint?', options: ['A. They transport food long distances.', 'B. They use pesticides.', 'C. Their lighting may rely on fossil-fuel electricity.', 'D. They need a lot of water.'], a: 'C. Their lighting may rely on fossil-fuel electricity.' },
          { q: 'Leafy greens are profitable because they', options: ['A. provide most of the world’s calories.', 'B. grow fast and sell at high prices.', 'C. need no light.', 'D. can be grown outdoors.'], a: 'B. grow fast and sell at high prices.' }
        ]
      },
      {
        instr: 'Câu 9–12: Hoàn thành tóm tắt. Viết CHỈ MỘT TỪ từ bài đọc.', type: 'text', items: [
          { q: 'Most vertical farms grow plants using a method called ___.', a: ['hydroponics'] },
          { q: 'Instead of sunlight, farms use ___ lights.', a: ['LED'] },
          { q: 'Because crops are protected from pests, ___ are rarely needed.', a: ['pesticides'] },
          { q: 'Staple crops like wheat need much more space and ___.', a: ['light'] }
        ]
      }
    ]
  },
  {
    id: 'r3', title: 'The Psychology of Procrastination', minutes: 20, level: '7.0+',
    focus: 'YES / NO / NOT GIVEN (quan điểm tác giả), Matching features',
    paragraphs: [
      ['A', 'Almost everyone puts things off from time to time, but for an estimated twenty per cent of adults, procrastination is a chronic habit that damages their careers, finances and health. Among university students, the figure is thought to be considerably higher. For a long time, procrastination was dismissed as a simple matter of laziness or poor time management. Psychologists now believe this explanation is not only inaccurate but also unhelpful.'],
      ['B', 'According to Tim Pychyl, a psychologist at Carleton University in Canada, procrastination is fundamentally an emotional problem rather than a time-management one. When a task makes us feel anxious, bored or insecure, avoiding it provides immediate relief. The brain, in effect, prioritises short-term mood repair over long-term goals. The irony is that the relief is temporary, and the guilt that follows often makes the task seem even more unpleasant.'],
      ['C', 'Research by Fuschia Sirois at the University of Sheffield supports this view. Her studies link chronic procrastination to higher levels of stress and to health problems such as poor sleep and heart disease. Sirois argues that people who procrastinate are not indifferent to their responsibilities; on the contrary, they often care a great deal, and it is precisely this concern, combined with a fear of failure, that makes starting so difficult.'],
      ['D', 'Perfectionism is frequently mentioned in this context, although the evidence is mixed. Some researchers, including Piers Steel of the University of Calgary, have found only a weak connection between perfectionism and procrastination. Steel instead emphasises impulsiveness: people who are easily distracted and who value immediate rewards are the most likely to delay important work. In my view, this finding deserves more attention than it currently receives in popular advice on the subject.'],
      ['E', 'If procrastination is emotional, then the most effective remedies may also be emotional. One surprisingly powerful strategy is self-compassion. In a study of students preparing for exams, those who forgave themselves for procrastinating on the first test were less likely to procrastinate on the next one. Harsh self-criticism, it seems, simply adds to the negative feelings that caused the delay in the first place.'],
      ['F', 'Practical techniques can help too. Breaking a large task into very small steps reduces the anxiety associated with it, and committing to work for just five or ten minutes is often enough to overcome initial resistance. Removing distractions, such as keeping a phone in another room, makes the impulsive choice less available. None of these methods is a cure, but together they suggest that the problem is far from hopeless.']
    ],
    questions: [
      {
        instr: 'Câu 1–5: Các nhận định có khớp với quan điểm của tác giả không? Chọn YES / NO / NOT GIVEN.', type: 'choice', options: 'YNNG', items: [
          { q: 'Describing procrastination as laziness is misleading.', a: 'YES', explain: 'Đoạn A: "this explanation is not only inaccurate but also unhelpful".' },
          { q: 'Procrastination is more common among university students than other adults.', a: 'YES', explain: 'Đoạn A: "the figure is thought to be considerably higher".' },
          { q: 'The role of impulsiveness is given too little attention in popular advice.', a: 'YES', explain: 'Đoạn D: "In my view, this finding deserves more attention...".' },
          { q: 'Self-compassion is less effective than practical techniques.', a: 'NOT GIVEN', explain: 'Tác giả không so sánh hai phương pháp.' },
          { q: 'Practical techniques can completely cure procrastination.', a: 'NO', explain: 'Đoạn F: "None of these methods is a cure".' }
        ]
      },
      {
        instr: 'Câu 6–9: Nối mỗi ý với nhà nghiên cứu tương ứng.', type: 'choice', select: true,
        list: ['A. Tim Pychyl', 'B. Fuschia Sirois', 'C. Piers Steel'],
        options: ['A', 'B', 'C'],
        items: [
          { q: 'Procrastinators often worry a lot about their responsibilities.', a: 'B' },
          { q: 'Avoiding a task improves our mood in the short term.', a: 'A' },
          { q: 'There is little link between perfectionism and procrastination.', a: 'C' },
          { q: 'Procrastination is associated with physical health problems.', a: 'B' }
        ]
      },
      {
        instr: 'Câu 10–12: Hoàn thành câu. Viết KHÔNG QUÁ HAI TỪ.', type: 'text', items: [
          { q: 'Students who showed ___ after the first test procrastinated less later.', a: ['self-compassion', 'self compassion'] },
          { q: 'Working for only five or ten minutes can help overcome initial ___.', a: ['resistance'] },
          { q: 'Keeping your ___ in another room reduces distraction.', a: ['phone'] }
        ]
      }
    ]
  }
];
