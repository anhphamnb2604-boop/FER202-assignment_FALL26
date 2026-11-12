export const COURSE_CATEGORIES = [
  { id: 'all', name: 'Tất cả khóa học', badge: '8 lớp' },
  { id: 'basic', name: 'Cơ bản (Beginner)', badge: 'DUPR 2.0 - 3.0' },
  { id: 'advanced', name: 'Nâng cao & Chiến thuật', badge: 'DUPR 3.5+' },
  { id: 'kids', name: 'Trẻ em (Kids Junior)', badge: '6 - 15 tuổi' },
  { id: 'private', name: 'Huấn luyện 1 Kèm 1', badge: 'Cá nhân hóa' },
  { id: 'tournament', name: 'Luyện thi đấu & Doanh nghiệp', badge: 'Chuyên sâu' }
];

export const INITIAL_COURSES = [
  {
    id: 'course-101',
    title: 'Pickleball Khởi Đầu Toàn Diện (Beginner Foundation 2.0 - 3.0)',
    category: 'basic',
    categoryLabel: 'Cơ bản (Beginner)',
    level: 'Người mới bắt đầu (Chưa từng cầm vợt)',
    duration: '8 buổi (4 tuần • 2 buổi/tuần • 120 phút/buổi)',
    tuition: 2400000,
    schedule: 'Thứ 2 & Thứ 5 (18:30 - 20:30) hoặc Thứ 7 & CN (07:30 - 09:30)',
    coach: 'HLV Vũ Minh Quân',
    coachAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    coachTitle: 'PPR Certified Coach • DUPR 4.65',
    maxStudents: 8,
    enrolledCount: 6,
    rating: 4.95,
    reviewsCount: 142,
    featured: true,
    badge: 'Phổ biến nhất',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80',
    summary: 'Nắm vững luật chơi quốc tế, cách cầm vợt Continental, giao bóng (Serve), trả giao bóng sâu và kỹ thuật Dink kiểm soát tại vạch Non-Volley Zone (Kitchen).',
    benefits: [
      'Miễn phí mượn vợt Carbon T700 và bóng thi đấu Franklin X-40 trong suốt khóa học',
      'Nắm chắc luật tính điểm, vị trí đứng Đôi/Đơn và quy tắc 2-Bounce Rule chuẩn USAPA',
      'Thực hành kỹ thuật Dink, Forehand/Backhand Drive, Volley và Footwork chuẩn y học thể thao',
      'Đánh giá trình độ đầu ra DUPR và cấp chứng nhận hoàn thành khóa học cơ bản'
    ],
    syllabus: [
      'Buổi 1-2: Làm quen vợt, tư thế chuẩn (Ready Position), Luật Kitchen & Kỹ thuật Dink cơ bản',
      'Buổi 3-4: Kỹ thuật Forehand & Backhand Groundstroke, Giao bóng (Serve) & Trả giao bóng sâu',
      'Buổi 5-6: Di chuyển lên lưới (Transition Zone), Punch Volley & Block Volley',
      'Buổi 7-8: Chiến thuật đánh đôi cơ bản, cách hô điểm 3 số và Thi đấu giao hữu cuối khóa'
    ]
  },
  {
    id: 'course-102',
    title: 'Làm Chủ Chiến Thuật & Kỹ Thuật Nâng Cao (Intermediate/Advanced 3.5+)',
    category: 'advanced',
    categoryLabel: 'Nâng cao (Advanced)',
    level: 'Trình độ DUPR 3.0 - 4.0',
    duration: '10 buổi (5 tuần • 2 buổi/tuần • 120 phút/buổi)',
    tuition: 3800000,
    schedule: 'Thứ 3 & Thứ 6 (19:00 - 21:00)',
    coach: 'HLV Nguyễn Hoàng Nam',
    coachAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&auto=format&fit=crop&q=80',
    coachTitle: 'Giám đốc Chuyên môn • DUPR 5.15',
    maxStudents: 6,
    enrolledCount: 5,
    rating: 5.0,
    reviewsCount: 98,
    featured: true,
    badge: 'Hot - Sắp kín chỗ',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop&q=80',
    summary: 'Chinh phục cú Third-Shot Drop chuẩn xác, kỹ thuật Reset bóng tốc độ cao ở Transition Zone, Spin Dink tấn công và chiến thuật Stacking trong đánh đôi.',
    benefits: [
      'Phân tích băng ghi hình chuyển động (Video Biomechanics Analysis) từng học viên',
      'Làm chủ cú 3rd Shot Drop, 3rd Shot Drive kết hợp 5th Shot Drop lên lưới an toàn',
      'Kỹ thuật phòng thủ Reset bóng mạnh vào vùng Kitchen và phản công tốc độ (Firefight)',
      'Cập nhật điểm trình độ chính thức lên hệ thống DUPR quốc tế sau giải nội bộ'
    ],
    syllabus: [
      'Buổi 1-2: Tối ưu hóa 3rd Shot Drop (Forehand & Backhand) từ cuối sân vào Kitchen',
      'Buổi 3-4: Di chuyển qua vùng Transition Zone & Kỹ thuật Reset bóng mạnh dưới chân',
      'Buổi 5-6: Aggressive Topspin Dink, ATP (Around The Post) và Erne trên lưới',
      'Buổi 7-8: Phản xạ tốc độ cao (Hand Speed Battle), Counter-attack & Nhử bóng (Poaching)',
      'Buổi 9-10: Chiến thuật Stacking đánh đôi, tâm lý thi đấu và Đánh xếp hạng DUPR'
    ]
  },
  {
    id: 'course-103',
    title: 'Huấn Luyện Cá Nhân 1 Kèm 1 (VIP Private Coaching 1-on-1)',
    category: 'private',
    categoryLabel: '1 Kèm 1 (Private VIP)',
    level: 'Mọi trình độ (Thiết kế giáo án riêng)',
    duration: '10 buổi (Linh hoạt giờ học theo lịch học viên • 90 phút/buổi)',
    tuition: 7500000,
    schedule: 'Linh hoạt lựa chọn khung giờ (06:00 - 22:00 tất cả các ngày)',
    coach: 'HLV Sarah Jenkins',
    coachAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    coachTitle: 'IPTPA Master Instructor • DUPR 5.00',
    maxStudents: 1,
    enrolledCount: 0,
    rating: 5.0,
    reviewsCount: 74,
    featured: true,
    badge: 'Cam kết tiến bộ x3',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&auto=format&fit=crop&q=80',
    summary: 'Chương trình huấn luyện cá nhân hóa 100% cùng chuyên gia quốc tế, tập trung sửa lỗi kỹ thuật chuyên sâu, sử dụng máy bắn bóng Titan Pro và đo lường hiệu suất.',
    benefits: [
      'Đã bao gồm 100% chi phí thuê sân Indoor VIP có điều hòa và máy bắn bóng tự động',
      'Chỉnh sửa chi tiết từng động tác vung vợt, góc mặt vợt và nhịp bước chân (Split-step)',
      'Linh hoạt đổi lịch học trước 6 tiếng mà không mất buổi',
      'Tặng 01 áo thi đấu Pro Performance của Học viện và quấn cán cao cấp'
    ],
    syllabus: [
      'Giai đoạn 1 (Buổi 1-2): Đánh giá toàn diện kỹ thuật hiện tại & Thiết lập mục tiêu cá nhân',
      'Giai đoạn 2 (Buổi 3-6): Sửa lỗi chuyên sâu với hơn 500 bóng/buổi cùng máy bắn bóng & HLV',
      'Giai đoạn 3 (Buổi 7-8): Tình huống mô phỏng thực chiến (Situational Drilling)',
      'Giai đoạn 4 (Buổi 9-10): Thực chiến đánh đơn/đôi cùng HLV và Tổng kết hồ sơ kỹ thuật'
    ]
  },
  {
    id: 'course-104',
    title: 'Trại Hè & Học Viện Pickleball Thiếu Nhi (Kids Junior Camp 6-15 Tuổi)',
    category: 'kids',
    categoryLabel: 'Trẻ em (Kids Junior)',
    level: 'Trẻ em từ 6 - 15 tuổi',
    duration: '12 buổi (6 tuần • Thứ 7 & Chủ Nhật • 90 phút/buổi)',
    tuition: 2600000,
    schedule: 'Thứ 7 & Chủ Nhật (08:30 - 10:00 hoặc 16:00 - 17:30)',
    coach: 'HLV Lê Phương Thảo',
    coachAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    coachTitle: 'PPR Youth Specialty Certified',
    maxStudents: 10,
    enrolledCount: 7,
    rating: 4.92,
    reviewsCount: 89,
    featured: false,
    badge: 'Phát triển thể chất',
    image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=800&auto=format&fit=crop&q=80',
    summary: 'Giúp trẻ rèn luyện thể lực, tăng cường phản xạ mắt - tay, tính kỷ luật và tinh thần đồng đội thông qua giáo trình Pickleball thiếu nhi chuẩn Mỹ vui nhộn, an toàn.',
    benefits: [
      'Trang bị sẵn vợt Pickleball trọng lượng nhẹ chuyên dụng cho cổ tay trẻ em',
      'Bài tập vận động đa hướng giúp tăng chiều cao, sự nhanh nhẹn và rời xa thiết bị điện tử',
      'Môi trường song ngữ Anh - Việt năng động, an toàn tuyệt đối trong sân mái che',
      'Giải đấu Junior Mini Cup cuối khóa với Huy chương và Giấy khen cho các bé'
    ],
    syllabus: [
      'Tuần 1-2: Trò chơi vận động phản xạ với bóng, cách cầm vợt và tâng bóng kiểm soát',
      'Tuần 3-4: Kỹ thuật đánh bóng qua lưới Forehand/Backhand và Giao bóng chuẩn',
      'Tuần 5: Học luật chơi, tinh thần Fair-play và phối hợp cùng bạn đồng hành',
      'Tuần 6: Giải đấu Junior Mini Cup & Lễ trao huy chương hoàn thành khóa học'
    ]
  },
  {
    id: 'course-105',
    title: 'Thực Chiến Giải Đấu & Nâng Hạng DUPR (Tournament Mastery Bootcamp)',
    category: 'tournament',
    categoryLabel: 'Luyện thi đấu (Pro)',
    level: 'VĐV Phong trào nâng cao & Bán chuyên (DUPR 3.75+)',
    duration: '6 buổi chuyên sâu (3 tuần • 150 phút/buổi)',
    tuition: 3200000,
    schedule: 'Thứ 4 (19:00 - 21:30) & Chủ Nhật (14:00 - 16:30)',
    coach: 'HLV David Trần',
    coachAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    coachTitle: 'USAPA Referee & PPR Pro • DUPR 4.90',
    maxStudents: 8,
    enrolledCount: 6,
    rating: 4.96,
    reviewsCount: 51,
    featured: false,
    badge: 'Chuyên sâu giải đấu',
    image: 'https://images.unsplash.com/photo-1560012057-4372e14c5085?w=800&auto=format&fit=crop&q=80',
    summary: 'Bootcamp cường độ cao chuẩn bị cho các giải đấu phong trào & chuyên nghiệp: Chiến thuật đọc điểm yếu đối thủ, kiểm soát nhịp độ trận đấu và xử lý điểm Time-out.',
    benefits: [
      'Thi đấu cọ xát tính điểm DUPR thực tế mỗi buổi học dưới sự giám sát của trọng tài USAPA',
      'Chiến thuật Đôi Nam, Đôi Nữ và Đôi Nam Nữ (Mixed Doubles) chuyên biệt',
      'Rèn luyện thể lực chuyên biệt (HIIT Footwork) và tâm lý bản lĩnh ở điểm Match Point',
      'Hỗ trợ đăng ký tham gia các giải đấu CLB và toàn quốc cùng đội tuyển Học viện'
    ],
    syllabus: [
      'Buổi 1: Phân tích chiến thuật Mixed Doubles vs Gender Doubles',
      'Buổi 2: Kỹ năng chuyển trạng thái Phòng thủ sang Tấn công (Counter-Punch)',
      'Buổi 3: Khai thác khoảng trống trung lộ (Middle Riddle) và góc chéo sân',
      'Buổi 4-5: Thi đấu mô phỏng áp lực cao (Pressure Drills) & Giải mã lối chơi đối phương',
      'Buổi 6: Giải đấu xếp hạng nội bộ có tính điểm DUPR quốc tế'
    ]
  },
  {
    id: 'course-106',
    title: 'Khóa Học Cấp Tốc Cuối Tuần Cho Doanh Nhân (Weekend Intensive Clinic)',
    category: 'basic',
    categoryLabel: 'Cơ bản (Beginner)',
    level: 'Người bận rộn muốn biết chơi ngay sau 2 tuần',
    duration: '4 buổi chuyên sâu (2 tuần cuối tuần • 180 phút/buổi)',
    tuition: 2200000,
    schedule: 'Thứ 7 & Chủ Nhật (15:00 - 18:00)',
    coach: 'HLV Sarah Jenkins',
    coachAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    coachTitle: 'IPTPA Master Instructor',
    maxStudents: 6,
    enrolledCount: 4,
    rating: 4.88,
    reviewsCount: 62,
    featured: false,
    badge: 'Tiết kiệm thời gian',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80',
    summary: 'Thiết kế cô đọng dành riêng cho người đi làm bận rộn: Chỉ sau 4 buổi chiều cuối tuần (12 giờ thực hành), học viên tự tin nắm luật và ra sân giao lưu đánh đôi.',
    benefits: [
      'Giáo trình cô đọng 80% thực hành đánh bóng thực tế, 20% lý thuyết cốt lõi',
      'Sân tập Indoor mát mẻ, phục vụ nước điện giải và khăn lạnh miễn phí',
      'Kết nối cộng đồng CLB Doanh nhân Pickleball giao lưu hàng tuần',
      'Hỗ trợ tư vấn chọn mua vợt phù hợp lối đánh với ưu đãi giảm 15% tại Pro Shop'
    ],
    syllabus: [
      'Buổi 1 (3h): Luật cốt lõi, Giao bóng, Trả giao bóng và Kiểm soát bóng vùng Kitchen',
      'Buổi 2 (3h): Kỹ thuật Drive cuối sân, Drop bỏ nhỏ và Di chuyển đồng bộ 2 người',
      'Buổi 3 (3h): Kỹ năng bắt lưới Volley, Smash bóng bổng và Phòng thủ cơ bản',
      'Buổi 4 (3h): Thực chiến thi đấu Đôi xoay vòng & Giao lưu kết nối thành viên'
    ]
  },
  {
    id: 'course-107',
    title: 'Lớp Pickleball Phái Đẹp & Giữ Dáng Năng Động (Ladies Fitness & Skill)',
    category: 'basic',
    categoryLabel: 'Cơ bản & Thể chất',
    level: 'Dành riêng cho Học viên Nữ mọi lứa tuổi',
    duration: '8 buổi (4 tuần • Thứ 3 & Thứ 5 • 90 phút/buổi)',
    tuition: 2100000,
    schedule: 'Ca sáng (08:30 - 10:00) hoặc Ca chiều (16:00 - 17:30)',
    coach: 'HLV Đỗ Hải Yến',
    coachAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    coachTitle: 'ISSA Sports Conditioning & PPR Coach',
    maxStudents: 8,
    enrolledCount: 5,
    rating: 4.95,
    reviewsCount: 78,
    featured: false,
    badge: 'Dành riêng Phái đẹp',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
    summary: 'Kết hợp hoàn hảo giữa đào tạo kỹ thuật Pickleball chuẩn xác và các bài tập Cardio đốt mỡ (500-700 kcal/buổi) trong sân Indoor máy lạnh mát mẻ, không lo nắng sạm da.',
    benefits: [
      'Học tập hoàn toàn trong sân Indoor điều hòa mát lạnh, không lo tia UV',
      'Kỹ thuật vung vợt nhẹ nhàng bằng lực hông và vai, không làm to cơ bắp tay',
      'Bài tập khởi động và giãn cơ chuyên sâu giúp săn chắc vòng eo và đôi chân',
      'Tặng bộ ảnh/video check-in thể thao chuyên nghiệp trên sân chuẩn quốc tế'
    ],
    syllabus: [
      'Buổi 1-2: Cardio Footwork, cách cầm vợt thẩm mỹ & Kỹ thuật Dink điều bóng nhẹ nhàng',
      'Buổi 3-4: Kỹ thuật Forehand/Backhand mượt mà & Giao bóng ổn định 100%',
      'Buổi 5-6: Phản xạ bắt lưới Volley & Cách di chuyển phối hợp ăn ý cùng đồng đội nữ',
      'Buổi 7-8: Thi đấu Đôi Nữ & Đôi Nam Nữ giao lưu vui vẻ'
    ]
  },
  {
    id: 'course-108',
    title: 'Đào Tạo & Tổ Chức Giải Đấu Pickleball Doanh Nghiệp (Corporate Team Building)',
    category: 'tournament',
    categoryLabel: 'Doanh nghiệp (Corporate)',
    level: 'Nhóm nhân sự Công ty / CLB (Từ 12 - 40 người)',
    duration: 'Trọn gói 1 ngày hoặc Khóa 4 buổi tại Học viện',
    tuition: 12500000,
    schedule: 'Thiết kế riêng theo lịch sự kiện của Doanh nghiệp',
    coach: 'HLV Nguyễn Hoàng Nam & Đội ngũ HLV',
    coachAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&auto=format&fit=crop&q=80',
    coachTitle: 'Ban Huấn luyện & Trọng tài USAPA',
    maxStudents: 32,
    enrolledCount: 16,
    rating: 5.0,
    reviewsCount: 29,
    featured: false,
    badge: 'Gói Doanh Nghiệp',
    image: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?w=800&auto=format&fit=crop&q=80',
    summary: 'Giải pháp Team Building thể thao xu hướng mới nhất cho doanh nghiệp: Huấn luyện cấp tốc cho toàn bộ nhân viên và tổ chức giải đấu nội bộ chuyên nghiệp có trọng tài, cúp & huy chương.',
    benefits: [
      'Bao trọn cụm 4-6 sân tiêu chuẩn cùng 4 Huấn luyện viên hướng dẫn trực tiếp',
      'Cung cấp toàn bộ 40 vợt tập, bóng thi đấu, bảng điểm điện tử và trọng tài điều hành',
      'Hỗ trợ thiết kế Backdrop giải đấu, Cúp vô địch, Huy chương và khu vực Teabreak',
      'Xuất hóa đơn VAT đầy đủ cho Doanh nghiệp và tập đoàn'
    ],
    syllabus: [
      'Phần 1 (90 phút): Khởi động tập thể, hướng dẫn luật chơi & Chia trạm tập kỹ thuật cơ bản',
      'Phần 2 (60 phút): Ghép đôi chiến thuật và thi đấu vòng bảng sôi nổi',
      'Phần 3 (60 phút): Vòng Bán kết, Chung kết có bình luận viên & Lễ trao Cúp vinh danh'
    ]
  }
];
