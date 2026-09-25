/* Đề Writing Task 1 (Academic) & Task 2, bài mẫu, tiêu chí chấm, danh sách từ nối. */
window.WRITING = {
  task1: [
    {
      id: 'w1-line', type: 'Line graph', title: 'Tỉ lệ hộ gia đình có Internet',
      prompt: 'The graph below shows the percentage of households with internet access in three countries between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      chart: {
        kind: 'line', unit: '%', labels: ['2000', '2005', '2010', '2015', '2020'],
        series: [
          { name: 'South Korea', data: [45, 78, 90, 96, 99] },
          { name: 'Vietnam', data: [2, 8, 25, 50, 72] },
          { name: 'Brazil', data: [10, 18, 35, 55, 78] }
        ]
      },
      model: `The line graph illustrates the proportion of households with access to the internet in South Korea, Vietnam and Brazil over a twenty-year period from 2000.

Overall, internet access rose in all three countries, with South Korea consistently recording the highest figures. The most dramatic growth, however, was seen in Vietnam, which started from an extremely low base.

In 2000, 45% of South Korean households were connected to the internet, compared with just 10% in Brazil and a mere 2% in Vietnam. Over the following decade, the figure for South Korea doubled to 90%, before levelling off at almost universal coverage (99%) by 2020.

Brazil and Vietnam followed a similar upward trajectory, although at a slower pace. Brazil’s figure climbed steadily to 55% in 2015 and reached 78% by the end of the period. Vietnam, meanwhile, saw modest growth in the first five years, rising to only 8%, but access then accelerated sharply, reaching half of all households in 2015 and 72% in 2020. As a result, the gap between Vietnam and Brazil narrowed to just six percentage points.`
    },
    {
      id: 'w1-bar', type: 'Bar chart', title: 'Chi tiêu trung bình mỗi tháng của sinh viên',
      prompt: 'The chart below shows the average monthly spending of university students in a city in 2010 and 2020 across five categories. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      chart: {
        kind: 'bar', unit: 'USD', labels: ['Rent', 'Food', 'Transport', 'Entertainment', 'Books'],
        series: [
          { name: '2010', data: [120, 90, 30, 25, 40] },
          { name: '2020', data: [210, 130, 35, 60, 15] }
        ]
      },
      model: null
    },
    {
      id: 'w1-table', type: 'Table', title: 'Phương tiện đi lại của sinh viên',
      prompt: 'The table below shows the main means of transport used by students to travel to university in 2005 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      table: {
        head: ['Means of transport', '2005 (%)', '2025 (%)'],
        rows: [['Motorbike', '62', '41'], ['Bus', '15', '22'], ['Bicycle', '18', '6'], ['Ride-hailing app', '0', '19'], ['Walking', '5', '12']]
      },
      model: null
    },
    {
      id: 'w1-process', type: 'Process', title: 'Quy trình sản xuất cà phê hoà tan',
      prompt: 'The diagram below shows the stages in the production of instant coffee. Summarise the information by selecting and reporting the main features.',
      steps: ['Coffee beans are harvested', 'Beans are dried in the sun', 'Beans are roasted', 'Roasted beans are ground', 'Ground coffee is mixed with hot water', 'Liquid is filtered', 'Liquid is freeze-dried into granules', 'Granules are packed into jars'],
      model: `The diagram illustrates how instant coffee is manufactured, from the harvesting of coffee beans to the packaging of the final product.

Overall, the process consists of eight stages, beginning with the collection of raw beans and ending with the coffee granules being packed into jars. The key transformation occurs when liquid coffee is freeze-dried.

First, coffee beans are harvested and then dried in the sun. Once dried, they are roasted, after which the roasted beans are ground into a fine powder.

In the next stage, the ground coffee is mixed with hot water to produce liquid coffee, which is subsequently filtered to remove any solid particles. The filtered liquid is then freeze-dried, turning it into small granules. Finally, these granules are packed into jars, ready to be distributed to shops.`
    }
  ],
  task2: [
    {
      id: 'w2-edu', type: 'Opinion (Agree/Disagree)', title: 'Đại học miễn phí',
      prompt: 'Some people believe that university education should be free for all students, regardless of their financial background. To what extent do you agree or disagree?',
      ideas: [
        'Đồng ý: cơ hội bình đẳng, thu hút nhân tài, lợi ích lâu dài cho nền kinh tế (lao động có kỹ năng, thuế cao hơn).',
        'Phản đối: gánh nặng ngân sách, người nộp thuế trả tiền cho người sẽ có thu nhập cao, sinh viên có thể thiếu trách nhiệm.',
        'Quan điểm cân bằng: miễn phí cho sinh viên có hoàn cảnh khó khăn + vay học phí trả theo thu nhập.'
      ],
      model: `It is often argued that higher education should be provided free of charge to every student, irrespective of their family’s income. While I accept that removing tuition fees would widen access, I believe that a completely free system is neither fair nor financially sustainable, and that targeted support is a more effective solution.

Admittedly, free university education has clear benefits. When cost is no longer a barrier, talented young people from low-income households can pursue degrees that would otherwise be out of reach, which promotes social mobility. Moreover, a society with more graduates tends to enjoy higher productivity and innovation, so public investment in education can eventually be repaid through economic growth and increased tax revenue.

However, making university free for everyone would place an enormous burden on public finances. Governments that pay all tuition costs must either raise taxes or divert money from other vital services such as healthcare and primary education. It also seems unfair that ordinary taxpayers, many of whom never attended university, should subsidise the studies of wealthy students who will go on to earn above-average salaries. In addition, when education is completely free, some students may take their studies less seriously, leading to higher drop-out rates.

A more balanced approach would be to offer full scholarships to students from disadvantaged backgrounds, while other students take out government loans that are repaid only once their income exceeds a certain threshold. This model, used in countries such as Australia, preserves access for the poorest while ensuring that those who benefit most contribute to the cost.

In conclusion, although free higher education is an attractive ideal, I disagree that it should be granted to all students. Means-tested grants combined with income-contingent loans would achieve fairness without draining public resources.`
    },
    {
      id: 'w2-tech', type: 'Discussion (Discuss both views)', title: 'Học trực tuyến vs. học trên lớp',
      prompt: 'Some people think that online learning will soon replace traditional classroom learning, while others believe that face-to-face teaching will always be necessary. Discuss both views and give your own opinion.',
      ideas: [
        'Online: linh hoạt, chi phí thấp, tiếp cận khoá học toàn cầu, AI cá nhân hoá.',
        'Trực tiếp: tương tác xã hội, kỷ luật, thực hành (y khoa, kỹ thuật), phản hồi tức thời.',
        'Ý kiến: mô hình kết hợp (blended learning) là xu hướng.'
      ],
      model: null
    },
    {
      id: 'w2-env', type: 'Problem – Solution', title: 'Rác thải nhựa',
      prompt: 'Plastic waste is causing serious damage to the environment. What are the main causes of this problem, and what measures could be taken to solve it?',
      ideas: [
        'Nguyên nhân: đồ nhựa dùng một lần rẻ & tiện, hệ thống tái chế kém, ý thức người tiêu dùng thấp.',
        'Giải pháp: thuế/cấm túi nhựa, trách nhiệm mở rộng của nhà sản xuất (EPR), đầu tư tái chế, giáo dục.'
      ],
      model: null
    },
    {
      id: 'w2-work', type: 'Advantages – Disadvantages', title: 'Làm việc từ xa',
      prompt: 'More and more people are working from home rather than in an office. Do the advantages of this development outweigh the disadvantages?',
      ideas: [
        'Lợi: tiết kiệm thời gian đi lại, linh hoạt, giảm khí thải, doanh nghiệp giảm chi phí văn phòng.',
        'Hại: cô lập xã hội, ranh giới công việc – cuộc sống mờ nhạt, khó hợp tác, khó giám sát.',
        'Kết luận: lợi > hại nếu áp dụng mô hình hybrid.'
      ],
      model: null
    },
    {
      id: 'w2-society', type: 'Two-part question', title: 'Người trẻ rời quê lên thành phố',
      prompt: 'In many countries, young people are leaving rural areas to live and work in cities. Why is this happening? Is this a positive or negative development?',
      ideas: [
        'Lý do: việc làm & thu nhập cao hơn, giáo dục, tiện ích, lối sống hiện đại.',
        'Đánh giá: tích cực cho cá nhân và kinh tế; tiêu cực: nông thôn già hoá, đô thị quá tải.'
      ],
      model: null
    },
    {
      id: 'w2-health', type: 'Opinion (Agree/Disagree)', title: 'Thuế đồ ăn nhanh',
      prompt: 'Governments should tax unhealthy foods such as fast food and sugary drinks in order to encourage people to eat more healthily. To what extent do you agree or disagree?',
      ideas: [
        'Đồng ý: giá tác động hành vi (ví dụ thuế đường ở Anh), nguồn thu cho y tế.',
        'Hạn chế: ảnh hưởng người thu nhập thấp nhiều hơn, cần kết hợp giáo dục dinh dưỡng và trợ giá thực phẩm lành mạnh.'
      ],
      model: null
    }
  ],
  // Tiêu chí chấm rút gọn (dựa trên IELTS Writing band descriptors công khai, diễn giải tiếng Việt)
  rubric: [
    {
      key: 'TR', name: 'Task Response / Achievement', bands: {
        5: 'Trả lời đề một phần; quan điểm chưa rõ; ý phát triển sơ sài, có thể lạc đề.',
        6: 'Trả lời đủ các phần; có quan điểm nhưng kết luận có thể chưa rõ; một số ý chưa phát triển đầy đủ.',
        7: 'Trả lời đầy đủ mọi phần của đề; quan điểm rõ ràng xuyên suốt; ý chính được mở rộng và hỗ trợ tốt.',
        8: 'Trả lời đầy đủ, sâu sắc; ý phát triển tốt với lập luận và ví dụ phù hợp.'
      }
    },
    {
      key: 'CC', name: 'Coherence & Cohesion', bands: {
        5: 'Có tổ chức nhưng thiếu mạch lạc; từ nối dùng thiếu, sai hoặc lặp lại máy móc.',
        6: 'Sắp xếp mạch lạc; dùng từ nối hiệu quả nhưng đôi khi máy móc; chia đoạn chưa luôn hợp lý.',
        7: 'Tổ chức hợp lý, tiến triển rõ ràng; dùng đa dạng từ nối phù hợp (có thể hơi lạm dụng); mỗi đoạn có ý trung tâm rõ ràng.',
        8: 'Trình tự logic; liên kết tự nhiên, khéo léo; chia đoạn hợp lý.'
      }
    },
    {
      key: 'LR', name: 'Lexical Resource', bands: {
        5: 'Vốn từ hạn chế, lặp từ; lỗi chính tả/cấu tạo từ gây khó hiểu.',
        6: 'Vốn từ đủ dùng; có cố gắng dùng từ ít phổ biến nhưng còn sai; lỗi chính tả không cản trở giao tiếp.',
        7: 'Vốn từ linh hoạt, chính xác; dùng từ ít phổ biến, có ý thức về văn phong và collocation; thỉnh thoảng sai.',
        8: 'Vốn từ phong phú, dùng tự nhiên và tinh tế; rất ít lỗi.'
      }
    },
    {
      key: 'GRA', name: 'Grammatical Range & Accuracy', bands: {
        5: 'Cấu trúc hạn chế; câu phức cố gắng dùng nhưng hay sai; lỗi thường xuyên.',
        6: 'Kết hợp câu đơn và câu phức; có lỗi nhưng hiếm khi cản trở giao tiếp.',
        7: 'Đa dạng cấu trúc phức; nhiều câu không có lỗi; kiểm soát tốt ngữ pháp và dấu câu.',
        8: 'Đa dạng cấu trúc; phần lớn câu không lỗi; chỉ sai rất nhỏ, không hệ thống.'
      }
    }
  ],
  // Từ nối để nhận diện trong bài viết
  linking: [
    'firstly', 'secondly', 'finally', 'furthermore', 'moreover', 'in addition', 'additionally', 'besides',
    'however', 'nevertheless', 'nonetheless', 'on the other hand', 'in contrast', 'by contrast', 'whereas', 'while', 'although', 'even though', 'despite', 'in spite of',
    'therefore', 'thus', 'consequently', 'as a result', 'hence', 'accordingly', 'for this reason',
    'for example', 'for instance', 'such as', 'in particular', 'notably', 'namely',
    'in conclusion', 'to conclude', 'to sum up', 'overall', 'in summary',
    'admittedly', 'undoubtedly', 'arguably', 'in fact', 'indeed', 'similarly', 'likewise', 'meanwhile', 'subsequently', 'as well as', 'not only', 'because', 'since', 'unless', 'provided that'
  ],
  // Từ/cụm quá phổ biến nên thay thế
  weakWords: {
    'very': 'extremely / highly / considerably',
    'big': 'substantial / significant / considerable',
    'good': 'beneficial / advantageous / positive',
    'bad': 'detrimental / harmful / adverse',
    'a lot of': 'a considerable number of / a great deal of',
    'lots of': 'numerous / a wide range of',
    'things': 'aspects / factors / issues',
    'thing': 'aspect / factor / issue',
    'get': 'obtain / acquire / gain',
    'nowadays': 'in contemporary society / at present',
    'i think': 'I would argue / In my view',
    'kids': 'children',
    'stuff': 'materials / items',
    'so': 'therefore / consequently (khi dùng làm từ nối)',
    'show': 'illustrate / demonstrate / depict',
    'important': 'crucial / vital / essential',
    'help': 'facilitate / assist / enable'
  }
};
