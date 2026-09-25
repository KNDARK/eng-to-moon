/* Bài nghe: kịch bản được đọc bằng giọng máy (Text-to-Speech) của trình duyệt.
 * Mỗi bài mô phỏng một Section của IELTS Listening. */
window.LISTENING = [
  {
    id: 'l1', section: 1, title: 'Đăng ký phòng ký túc xá', level: '5.0–6.0',
    desc: 'Hội thoại đời thường giữa sinh viên và nhân viên — dạng Form completion. Chú ý chính tả tên riêng và con số.',
    script: [
      { s: 'Officer', t: 'Good morning, Riverside Student Accommodation. How can I help you?' },
      { s: 'Student', t: 'Hi. I’m a new international student and I’d like to apply for a room for next semester.' },
      { s: 'Officer', t: 'Of course. Can I take your full name, please?' },
      { s: 'Student', t: 'Yes, it’s Minh Tran. That’s T, R, A, N.' },
      { s: 'Officer', t: 'Thank you. And which course will you be studying?' },
      { s: 'Student', t: 'I’m doing a Master’s in Environmental Engineering.' },
      { s: 'Officer', t: 'Great. What type of room are you looking for? We have shared rooms and single rooms.' },
      { s: 'Student', t: 'I’d prefer a single room, if possible. I need a quiet place to study.' },
      { s: 'Officer', t: 'Single rooms are one hundred and forty-five pounds per week, and that includes electricity and internet.' },
      { s: 'Student', t: 'That’s fine. Is there a kitchen?' },
      { s: 'Officer', t: 'Yes, each floor has a shared kitchen. Now, when would you like to move in?' },
      { s: 'Student', t: 'My course starts on the twentieth of September, so I’d like to arrive on the seventeenth.' },
      { s: 'Officer', t: 'The seventeenth of September. No problem. Could I have a contact phone number?' },
      { s: 'Student', t: 'Sure. It’s zero seven nine four, three six two, eight five one.' },
      { s: 'Officer', t: 'Lovely. And finally, we require a deposit of three hundred pounds to reserve the room. You can pay it online.' },
      { s: 'Student', t: 'OK. Is there anything else I should bring?' },
      { s: 'Officer', t: 'Just bring a copy of your passport and your university offer letter when you check in.' }
    ],
    questions: [
      {
        instr: 'Hoàn thành form. Viết KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT SỐ cho mỗi câu.', type: 'text', items: [
          { q: 'Surname: ___', a: ['Tran'] },
          { q: 'Course: Master’s in ___ Engineering', a: ['Environmental'] },
          { q: 'Room type: ___ room', a: ['single'] },
          { q: 'Weekly rent: £ ___', a: ['145', '145.00'] },
          { q: 'Rent includes electricity and ___', a: ['internet', 'the internet'] },
          { q: 'Move-in date: ___ September', a: ['17', '17th', 'seventeenth', 'the 17th'] },
          { q: 'Phone number: ___', a: ['0794362851', '0794 362 851'] },
          { q: 'Deposit: £ ___', a: ['300'] },
          { q: 'Bring a copy of your passport and your university ___', a: ['offer letter'] }
        ]
      }
    ]
  },
  {
    id: 'l2', section: 2, title: 'Giới thiệu thư viện trường', level: '5.5–6.5',
    desc: 'Độc thoại về dịch vụ công cộng — dạng Multiple choice và Note completion. Chú ý các từ chỉ sự thay đổi (however, actually).',
    script: [
      { s: 'Guide', t: 'Welcome, everyone, to the university’s main library. I’m Sarah, and I’ll give you a quick overview of our facilities before you start your studies.' },
      { s: 'Guide', t: 'First of all, opening hours. During term time, the library is open twenty-four hours a day from Monday to Friday. At weekends, however, it closes at ten p.m.' },
      { s: 'Guide', t: 'On the ground floor you’ll find the help desk and the café. Many students assume the computers are also on the ground floor, but actually they have been moved to the second floor, next to the silent study area.' },
      { s: 'Guide', t: 'The first floor is for group study. You can book a group room for up to three hours using the library app. Please note that rooms that are not claimed within fifteen minutes are released to other students.' },
      { s: 'Guide', t: 'Undergraduate students can borrow up to twelve books at a time, while postgraduates can borrow twenty. The standard loan period is three weeks, and you can renew books online as long as nobody else has requested them.' },
      { s: 'Guide', t: 'We no longer charge fines for late returns. Instead, if an item is more than a week overdue, your borrowing rights will be suspended until it is returned.' },
      { s: 'Guide', t: 'Finally, we run free workshops every Wednesday afternoon on topics such as academic writing and referencing. I strongly recommend the referencing workshop, as plagiarism is taken very seriously here.' }
    ],
    questions: [
      {
        instr: 'Chọn đáp án đúng A, B hoặc C.', type: 'choice', items: [
          { q: 'At weekends, the library', options: ['A. is open 24 hours.', 'B. closes at 10 p.m.', 'C. is closed all day.'], a: 'B. closes at 10 p.m.' },
          { q: 'The computers are now located', options: ['A. on the ground floor.', 'B. on the first floor.', 'C. on the second floor.'], a: 'C. on the second floor.', explain: 'Bẫy: nhiều người nghĩ ở tầng trệt, "but actually" chúng đã chuyển lên tầng 2.' },
          { q: 'A group room booking is cancelled if students', options: ['A. arrive more than 15 minutes late.', 'B. book for more than three hours.', 'C. do not use the library app.'], a: 'A. arrive more than 15 minutes late.' },
          { q: 'What happens if a book is more than a week late?', options: ['A. You pay a fine.', 'B. You cannot borrow more books.', 'C. You lose your library card.'], a: 'B. You cannot borrow more books.' }
        ]
      },
      {
        instr: 'Hoàn thành ghi chú. Viết MỘT TỪ HOẶC MỘT SỐ.', type: 'text', items: [
          { q: 'Postgraduates can borrow up to ___ books.', a: ['20', 'twenty'] },
          { q: 'Standard loan period: ___ weeks', a: ['3', 'three'] },
          { q: 'Free workshops are held every ___ afternoon.', a: ['Wednesday'] },
          { q: 'Recommended workshop: ___', a: ['referencing'] }
        ]
      }
    ]
  },
  {
    id: 'l3', section: 3, title: 'Thảo luận đề tài nghiên cứu', level: '6.0–7.0',
    desc: 'Hội thoại học thuật giữa hai sinh viên và giảng viên. Khó hơn vì có nhiều ý kiến trái chiều — cần xác định ai đồng ý với điều gì.',
    script: [
      { s: 'Tutor', t: 'So, Emma and Jack, how is your research project on students’ sleep habits coming along?' },
      { s: 'Emma', t: 'Quite well, I think. We’ve finished collecting the questionnaires. We got responses from about two hundred students in the end.' },
      { s: 'Jack', t: 'Although we originally hoped for three hundred. The response rate was lower than expected, mainly because we sent it out during the exam period.' },
      { s: 'Tutor', t: 'That’s a common mistake. Still, two hundred is a reasonable sample. What were your main findings?' },
      { s: 'Emma', t: 'The most surprising thing was that students who worked part-time actually slept longer on average than those who didn’t.' },
      { s: 'Jack', t: 'I’m not sure that’s really significant, though. The difference was only about twelve minutes, and it might be because working students have more structured routines.' },
      { s: 'Tutor', t: 'That’s a good point, Jack. You should mention that as a possible explanation, but be careful not to present it as a conclusion.' },
      { s: 'Emma', t: 'We also found a strong link between screen time before bed and poor sleep quality. That one seemed very clear.' },
      { s: 'Tutor', t: 'Good. For the next stage, I’d suggest interviewing a small group of participants to get more detailed data. Numbers alone won’t tell you why students behave as they do.' },
      { s: 'Jack', t: 'Should we interview people from the original survey?' },
      { s: 'Tutor', t: 'Yes, that would be best, so you can compare their answers. And please remember that the deadline for the draft report is the fifth of May, not the end of May as some groups seem to think.' }
    ],
    questions: [
      {
        instr: 'Chọn đáp án đúng A, B hoặc C.', type: 'choice', items: [
          { q: 'Why was the response rate lower than expected?', options: ['A. The questionnaire was too long.', 'B. It was sent during exams.', 'C. Too few students were contacted.'], a: 'B. It was sent during exams.' },
          { q: 'What did Emma find surprising?', options: ['A. Working students slept longer.', 'B. Most students slept less than six hours.', 'C. Students disliked the questionnaire.'], a: 'A. Working students slept longer.' },
          { q: 'What is Jack’s opinion of this finding?', options: ['A. It proves their hypothesis.', 'B. It may not be important.', 'C. It should be removed from the report.'], a: 'B. It may not be important.' },
          { q: 'Which finding does Emma consider clearest?', options: ['A. The link between screen time and sleep quality.', 'B. The effect of part-time work.', 'C. The impact of exams on sleep.'], a: 'A. The link between screen time and sleep quality.' },
          { q: 'Why does the tutor suggest interviews?', options: ['A. To increase the sample size.', 'B. To understand the reasons behind behaviour.', 'C. To replace the questionnaire.'], a: 'B. To understand the reasons behind behaviour.' }
        ]
      },
      {
        instr: 'Viết KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT SỐ.', type: 'text', items: [
          { q: 'Number of questionnaire responses: ___', a: ['200', 'two hundred', 'about 200'] },
          { q: 'Deadline for the draft report: ___ May', a: ['5', '5th', 'fifth', 'the fifth', 'the 5th'] }
        ]
      }
    ]
  },
  {
    id: 'l4', section: 4, title: 'Bài giảng: Hiệu ứng đảo nhiệt đô thị', level: '6.5–7.5',
    desc: 'Bài giảng học thuật một người nói — dạng Note completion. Tốc độ và mật độ thông tin cao nhất.',
    script: [
      { s: 'Lecturer', t: 'Today I’m going to talk about a phenomenon known as the urban heat island effect. Simply put, cities tend to be significantly warmer than the surrounding countryside, especially at night.' },
      { s: 'Lecturer', t: 'In large cities, the difference can reach as much as seven degrees Celsius. So what causes this?' },
      { s: 'Lecturer', t: 'The main factor is the materials we build with. Concrete and asphalt absorb heat during the day and release it slowly after sunset. Dark surfaces, such as roads and roofs, are particularly effective at storing heat.' },
      { s: 'Lecturer', t: 'A second factor is the lack of vegetation. Trees cool the air through a process called evapotranspiration, and they also provide shade. When green spaces are replaced by buildings, this natural cooling is lost.' },
      { s: 'Lecturer', t: 'Third, human activity itself generates heat. Air conditioners, vehicles and factories all release what we call waste heat into the atmosphere. Ironically, air conditioners make the outdoor environment even hotter.' },
      { s: 'Lecturer', t: 'The consequences are serious. Higher temperatures increase energy consumption, worsen air quality, and put vulnerable groups, particularly the elderly, at risk of heat-related illness.' },
      { s: 'Lecturer', t: 'Fortunately, there are solutions. One of the cheapest is the use of reflective or cool roofs, which are painted white to reflect sunlight. Another is the creation of green roofs, which are covered with plants.' },
      { s: 'Lecturer', t: 'Cities such as Singapore have also invested heavily in urban forests and vertical gardens. Research suggests that increasing tree cover by just ten percent can reduce surface temperatures by around one degree.' }
    ],
    questions: [
      {
        instr: 'Hoàn thành ghi chú. Viết CHỈ MỘT TỪ HOẶC MỘT SỐ.', type: 'text', items: [
          { q: 'Cities are warmer than the countryside, especially at ___.', a: ['night'] },
          { q: 'Temperature difference in large cities: up to ___ °C', a: ['7', 'seven'] },
          { q: 'Concrete and ___ absorb heat during the day.', a: ['asphalt'] },
          { q: 'Trees cool the air and also provide ___.', a: ['shade'] },
          { q: 'Machines and vehicles release ___ heat.', a: ['waste'] },
          { q: 'Group most at risk: the ___', a: ['elderly'] },
          { q: 'Cheap solution: roofs painted ___ to reflect sunlight.', a: ['white'] },
          { q: 'Green roofs are covered with ___.', a: ['plants'] },
          { q: 'Increasing tree cover by ___ % can lower temperatures by about 1°C.', a: ['10', 'ten'] }
        ]
      }
    ]
  }
];

/* Câu chép chính tả (dictation) — tăng dần độ dài */
window.DICTATION = [
  'The lecture has been moved to room twelve.',
  'Please submit your assignment before Friday.',
  'The library is closed on public holidays.',
  'Most students prefer to study in the evening.',
  'The survey was completed by two hundred participants.',
  'Renewable energy accounts for a quarter of total production.',
  'The government has introduced new measures to reduce traffic congestion.',
  'Researchers found a strong link between diet and academic performance.',
  'Applicants must provide evidence of their English language proficiency.',
  'Although the results were encouraging, further research is needed to confirm them.',
  'The number of international students has increased steadily over the past decade.',
  'Deforestation not only destroys habitats but also contributes significantly to climate change.',
  'It is widely believed that bilingual children develop stronger problem solving skills.',
  'Participants who slept for less than six hours performed considerably worse on memory tests.',
  'Unless urgent action is taken, many coastal cities could be underwater by the end of the century.'
];
