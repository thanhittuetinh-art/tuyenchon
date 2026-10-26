/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RawQuestion } from '../types';

/**
 * Danh sách câu hỏi trích xuất trực tiếp từ file câu hỏi.pdf đính kèm của người dùng.
 * Các đáp án đúng có chữ màu đỏ trong file PDF được đánh dấu isCorrect: true.
 */
export const DEFAULT_QUESTIONS: RawQuestion[] = [
  {
    id: 1,
    category: "Kiến thức & Đạo đức",
    question: "Trong \"5 điều Bác Hồ dạy thiếu niên, nhi đồng\", điều thứ 5 nhắc nhở học sinh điều gì?",
    options: [
      {
        id: "q1_opt_a",
        text: "Đoàn kết tốt, kỷ luật tốt",
        isCorrect: true // Chữ màu đỏ trong file PDF
      },
      {
        id: "q1_opt_b",
        text: "Giữ gìn vệ sinh thật tốt",
        isCorrect: false
      },
      {
        id: "q1_opt_c",
        text: "Khiêm tốn, thật thà, dũng cảm",
        isCorrect: false
      },
      {
        id: "q1_opt_d",
        text: "Yêu Tổ quốc, yêu đồng bào",
        isCorrect: false
      }
    ],
    explanation: "Theo bản đề trong file câu hỏi.pdf (đáp án bôi chữ màu đỏ: Đoàn kết tốt, kỷ luật tốt)."
  },
  {
    id: 2,
    category: "Kiến thức & Đạo đức",
    question: "Thứ tự chính xác của điều thứ 2 trong \"5 điều Bác Hồ dạy\" là gì?",
    options: [
      {
        id: "q2_opt_a",
        text: "Học tập tốt, lao động tốt",
        isCorrect: true // Chữ màu đỏ trong file PDF
      },
      {
        id: "q2_opt_b",
        text: "Đoàn kết tốt, kỷ luật tốt",
        isCorrect: false
      },
      {
        id: "q2_opt_c",
        text: "Giữ gìn vệ sinh thật tốt",
        isCorrect: false
      },
      {
        id: "q2_opt_d",
        text: "Khiêm tốn, thật thà, dũng cảm",
        isCorrect: false
      }
    ],
    explanation: "5 điều Bác Hồ dạy: 1. Yêu Tổ quốc, yêu đồng bào; 2. Học tập tốt, lao động tốt; 3. Đoàn kết tốt, kỷ luật tốt; 4. Giữ gìn vệ sinh thật tốt; 5. Khiêm tốn, thật thà, dũng cảm."
  },
  {
    id: 3,
    category: "Giáo dục & Triết lý",
    question: "Câu khẩu hiệu quen thuộc trong các nhà trường \"Tiên học lễ, hậu học văn\" nhấn mạnh nguyên lý cốt lõi nào trong giáo dục?",
    options: [
      {
        id: "q3_opt_a",
        text: "Phải học giỏi môn Ngữ văn trước rồi mới học các môn khoa học khác",
        isCorrect: false
      },
      {
        id: "q3_opt_b",
        text: "Rèn luyện tư cách đạo đức, lễ phép là nền tảng trước khi trau dồi tri thức văn hóa",
        isCorrect: true // Chữ màu đỏ trong file PDF
      },
      {
        id: "q3_opt_c",
        text: "Cần học các nghi thức hành chính trước khi thi cử",
        isCorrect: false
      },
      {
        id: "q3_opt_d",
        text: "Chỉ cần có đạo đức tốt, việc học kiến thức không quá quan trọng",
        isCorrect: false
      }
    ],
    explanation: "\"Tiên học lễ, hậu học văn\": Học làm người, rèn luyện đạo đức, lễ nghĩa trước khi tiếp thu tri thức văn hóa."
  },
  {
    id: 4,
    category: "Lịch sử & Truyền thuyết",
    question: "Theo truyền thuyết \"Con Rồng cháu Tiên\", mẹ Âu Cơ và cha Lạc Long Quân chia 100 người con như thế nào?",
    options: [
      {
        id: "q4_opt_a",
        text: "50 con theo mẹ lên núi, 50 con theo cha xuống biển",
        isCorrect: true // Chữ màu đỏ trong file PDF
      },
      {
        id: "q4_opt_b",
        text: "40 con theo mẹ lên núi, 60 con theo cha xuống biển",
        isCorrect: false
      },
      {
        id: "q4_opt_c",
        text: "Toàn bộ 100 người con ở lại đồng bằng xây dựng đất nước",
        isCorrect: false
      },
      {
        id: "q4_opt_d",
        text: "70 con theo cha xuống biển, 30 con theo mẹ lên núi",
        isCorrect: false
      }
    ],
    explanation: "Mẹ Âu Cơ và cha Lạc Long Quân chia 50 con theo mẹ lên núi, 50 con theo cha xuống biển khai phá non sông."
  },
  {
    id: 5,
    category: "Văn học & Tiếng Anh",
    question: "In the famous Vietnamese song line: \"Khi tóc thầy bạc, tóc em vẫn còn xanh\", what color does the word \"xanh\" actually refer to in reality, and what does it represent?",
    options: [
      {
        id: "q5_opt_a",
        text: "Green; it represents the freshness of plants and nature.",
        isCorrect: false
      },
      {
        id: "q5_opt_b",
        text: "Blue; it represents peace, calmness, and hope.",
        isCorrect: false
      },
      {
        id: "q5_opt_c",
        text: "Black; it represents youthfulness, vitality, and the student's young age.",
        isCorrect: true // Chữ màu đỏ trong file PDF
      },
      {
        id: "q5_opt_d",
        text: "White; it represents purity, innocence, and moral clarity.",
        isCorrect: false
      }
    ],
    explanation: "\"Tóc xanh\" trong tiếng Việt dùng để chỉ mái tóc đen của tuổi trẻ, tượng trưng cho thanh xuân và tuổi học trò."
  },
  {
    id: 6,
    category: "Vật lý & Tự nhiên",
    question: "Hiện tượng cầu vồng xuất hiện trên bầu trời sau cơn mưa là kết quả của hai hiện tượng vật lý chính nào của ánh sáng mặt trời qua các giọt nước?",
    options: [
      {
        id: "q6_opt_a",
        text: "Khúc xạ và phản xạ toàn phần (tán sắc ánh sáng)",
        isCorrect: true // Chữ màu đỏ trong file PDF
      },
      {
        id: "q6_opt_b",
        text: "Nhiễu xạ và giao thoa ánh sáng",
        isCorrect: false
      },
      {
        id: "q6_opt_c",
        text: "Phản xạ gương và hấp thụ ánh sáng",
        isCorrect: false
      },
      {
        id: "q6_opt_d",
        text: "Hiện tượng quang điện ngoài",
        isCorrect: false
      }
    ],
    explanation: "Ánh sáng mặt trời khi đi qua các giọt nước mưa bị khúc xạ và phản xạ toàn phần (tán sắc) tạo thành dải quang phổ 7 sắc cầu vồng."
  },
  {
    id: 8,
    category: "Y học & Lịch sử",
    question: "Châm ngôn trị bệnh nổi tiếng gắn liền với sự nghiệp y học của Đại danh y Tuệ Tĩnh là gì?",
    options: [
      {
        id: "q8_opt_a",
        text: "\"Nam dược trị Nam nhân\"",
        isCorrect: true // Chữ màu đỏ trong file PDF
      },
      {
        id: "q8_opt_b",
        text: "\"Lương y như từ mẫu\"",
        isCorrect: false
      },
      {
        id: "q8_opt_c",
        text: "\"Phòng bệnh hơn chữa bệnh\"",
        isCorrect: false
      },
      {
        id: "q8_opt_d",
        text: "\"Bách bệnh quy nhất lý\"",
        isCorrect: false
      }
    ],
    explanation: "Đại danh y Thiền sư Tuệ Tĩnh đề ra phương châm bất hủ \"Nam dược trị Nam nhân\" (Thuốc Nam chữa bệnh cho người Nam)."
  },
  {
    id: 9,
    category: "Vật lý ứng dụng",
    question: "Tại sao đầu mũi đinh hoặc lưỡi dao gọt hoa quả luôn được mài rất nhọn và mỏng?",
    options: [
      {
        id: "q9_opt_a",
        text: "Giảm diện tích tiếp xúc để tăng áp suất tác dụng lên bề mặt cắt",
        isCorrect: true // Chữ màu đỏ trong file PDF
      },
      {
        id: "q9_opt_b",
        text: "Giảm khối lượng của đinh hoặc dao giúp dễ thao tác hơn",
        isCorrect: false
      },
      {
        id: "q9_opt_c",
        text: "Tăng lực tác dụng của bàn tay lên vật thể",
        isCorrect: false
      },
      {
        id: "q9_opt_d",
        text: "Tăng hệ số ma sát trượt khi đâm xuyên",
        isCorrect: false
      }
    ],
    explanation: "Công thức áp suất p = F / S. Khi diện tích tiếp xúc S nhỏ đi, áp suất p tác dụng lên bề mặt sẽ tăng lên rất nhiều giúp đinh đóng sâu hơn hoặc dao cắt bén hơn."
  },
  {
    id: 10,
    category: "Quang học & Vật lý",
    question: "Khi cắm một chiếc ống hút thẳng vào cốc nước trong suốt, ta nhìn từ bên ngoài thấy chiếc ống hút dường như bị \"gãy gập\" tại mặt phân cách giữa nước và không khí. Đó là do:",
    options: [
      {
        id: "q10_opt_a",
        text: "Sự phản xạ ánh sáng tại mặt nước",
        isCorrect: false
      },
      {
        id: "q10_opt_b",
        text: "Hiện tượng khúc xạ ánh sáng khi truyền qua hai môi trường có chiết suất khác nhau",
        isCorrect: true // Chữ màu đỏ trong file PDF
      },
      {
        id: "q10_opt_c",
        text: "Sự biến dạng cơ học của ống hút dưới tác dụng của áp suất nước",
        isCorrect: false
      },
      {
        id: "q10_opt_d",
        text: "Hiện tượng nhiễu xạ ánh sáng qua thành cốc cong",
        isCorrect: false
      }
    ],
    explanation: "Hiện tượng khúc xạ ánh sáng: Khi tia sáng truyền từ nước ra không khí (hai môi trường có chiết suất khác nhau), tia sáng bị đổi hướng tại mặt phân cách làm mắt nhìn thấy ảnh bị gãy khúc."
  },
  {
    id: 11,
    category: "Cơ học & Năng lượng",
    question: "Một chiếc lá rụng từ tầng thượng và một chậu cây rơi từ cùng độ cao đó xuống đất. Chậu cây gây ra sự nguy hiểm lớn hơn rất nhiều so với chiếc lá chủ yếu vì:",
    options: [
      {
        id: "q11_opt_a",
        text: "Chậu cây có khối lượng lớn hơn nhiều nên tích lũy thế năng trọng trường lớn hơn chiếc lá ở cùng độ cao",
        isCorrect: true // Chữ màu đỏ trong file PDF
      },
      {
        id: "q11_opt_b",
        text: "Chiếc lá không có thế năng trọng trường khi rơi",
        isCorrect: false
      },
      {
        id: "q11_opt_c",
        text: "Gia tốc rơi tự do của chậu cây lớn hơn nhiều so với chiếc lá",
        isCorrect: false
      },
      {
        id: "q11_opt_d",
        text: "Vận tốc chạm đất của chiếc lá luôn bằng 0",
        isCorrect: false
      }
    ],
    explanation: "Thế năng trọng trường Wt = m*g*h. Với cùng độ cao h, vật có khối lượng m càng lớn (chậu cây) thì tích lũy thế năng càng lớn, khi rơi va chạm sẽ sinh ra động năng và lực tác động hủy diệt cực lớn."
  },
  {
    id: 12,
    category: "Kỹ thuật & Năng lượng",
    question: "Trong các nhà máy thủy điện (như thủy điện Hòa Bình, Sơn La), quy trình biến đổi năng lượng để phát ra dòng điện diễn ra theo trình tự nào?",
    options: [
      {
        id: "q12_opt_a",
        text: "Nhiệt năng -> Động năng ->Điện năng",
        isCorrect: false
      },
      {
        id: "q12_opt_b",
        text: "Thế năng của dòng nước trên cao ->Động năng làm quay turbine ->Điện năng qua máy phát",
        isCorrect: true // Chữ màu đỏ trong file PDF
      },
      {
        id: "q12_opt_c",
        text: "Hóa năng ->Thế năng đàn hồi ->Điện năng",
        isCorrect: false
      },
      {
        id: "q12_opt_d",
        text: "Quang năng ->Cơ năng ->Điện năng",
        isCorrect: false
      }
    ],
    explanation: "Dòng nước ở trên đập cao chứa thế năng -> chảy xuống biến thành động năng làm quay tuabin -> máy phát điện chuyển động năng thành điện năng."
  }
];
