export const INITIAL_COURTS = [
  {
    id: 'court-1',
    name: 'Sân Trung Tâm Championship #1 (Indoor Pro)',
    type: 'Indoor VIP (Có điều hòa)',
    surface: 'Thảm Acrylic 9 lớp chuẩn PPA Tour (Chống lóa, giảm chấn khớp gối)',
    pricePerHour: 280000,
    peakPricePerHour: 350000,
    lighting: 'Hệ thống đèn LED chống chói 1000 Lux chuẩn truyền hình',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80',
    amenities: ['Điều hòa trung tâm', 'Camera AI quay highlight', 'Khán đài 60 chỗ', 'Ghế nghỉ VIP'],
    status: 'available'
  },
  {
    id: 'court-2',
    name: 'Sân Indoor Tiêu Chuẩn #2 (Air-Conditioned)',
    type: 'Indoor VIP (Có điều hòa)',
    surface: 'Thảm Acrylic 9 lớp chuẩn USA Pickleball',
    pricePerHour: 260000,
    peakPricePerHour: 320000,
    lighting: 'Đèn LED chống chói 800 Lux',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop&q=80',
    amenities: ['Điều hòa mát lạnh', 'Bảng điểm lật tay', 'Khu vực khởi động rộng', 'Tủ Locker miễn phí'],
    status: 'available'
  },
  {
    id: 'court-3',
    name: 'Sân Indoor Huấn Luyện #3 (Air-Conditioned)',
    type: 'Indoor VIP (Có điều hòa)',
    surface: 'Thảm Acrylic 9 lớp chuẩn USA Pickleball',
    pricePerHour: 260000,
    peakPricePerHour: 320000,
    lighting: 'Đèn LED chống chói 800 Lux',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
    amenities: ['Điều hòa mát lạnh', 'Gương chỉnh động tác', 'Rổ bóng tập 100 quả', 'Phòng tắm nước nóng'],
    status: 'available'
  },
  {
    id: 'court-4',
    name: 'Sân Mái Che Khí Động Học #4 (Covered Roof)',
    type: 'Sân Mái Che Cao Cấp',
    surface: 'Sơn phủ Laykold Cushion Plus 7 lớp đàn hồi cao',
    pricePerHour: 190000,
    peakPricePerHour: 240000,
    lighting: 'Đèn LED chiếu sáng 750 Lux',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&auto=format&fit=crop&q=80',
    amenities: ['Mái che chống mưa nắng 100%', 'Quạt công nghiệp làm mát', 'Nước uống miễn phí'],
    status: 'available'
  },
  {
    id: 'court-5',
    name: 'Sân Mái Che Kỹ Thuật #5 (Máy Bắn Bóng Titan)',
    type: 'Sân Tập Kỹ Thuật & Thi Đấu',
    surface: 'Sơn phủ Laykold Cushion Plus 7 lớp',
    pricePerHour: 210000,
    peakPricePerHour: 260000,
    lighting: 'Đèn LED chiếu sáng 750 Lux',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80',
    amenities: ['Hỗ trợ thuê máy bắn bóng Titan', 'Rổ 100 bóng tập', 'Mái che thoáng mát'],
    status: 'available'
  },
  {
    id: 'court-6',
    name: 'Sân Giao Lưu Cộng Đồng #6 (Outdoor Breezy)',
    type: 'Sân Mái Che Tiêu Chuẩn',
    surface: 'Sơn phủ Acrylic 7 lớp tiêu chuẩn USAPA',
    pricePerHour: 170000,
    peakPricePerHour: 220000,
    lighting: 'Đèn LED chống lóa 700 Lux',
    image: 'https://images.unsplash.com/photo-1560012057-4372e14c5085?w=800&auto=format&fit=crop&q=80',
    amenities: ['Không gian thoáng đãng', 'Khu vực Cafe & Lounge sát sân', 'Bãi đỗ xe ô tô miễn phí'],
    status: 'available'
  }
];

export const TIME_SLOTS = [
  { id: 'slot-1', time: '06:00 - 07:30', label: 'Ca Sáng Sớm', isPeak: false },
  { id: 'slot-2', time: '07:30 - 09:00', label: 'Ca Sáng', isPeak: false },
  { id: 'slot-3', time: '09:00 - 10:30', label: 'Ca Sáng Muộn', isPeak: false },
  { id: 'slot-4', time: '14:30 - 16:00', label: 'Ca Chiều', isPeak: false },
  { id: 'slot-5', time: '16:00 - 17:30', label: 'Ca Chiều Mát', isPeak: false },
  { id: 'slot-6', time: '17:30 - 19:00', label: 'Giờ Vàng (Peak)', isPeak: true },
  { id: 'slot-7', time: '19:00 - 20:30', label: 'Giờ Vàng (Peak)', isPeak: true },
  { id: 'slot-8', time: '20:30 - 22:00', label: 'Ca Tối', isPeak: true }
];

const todayDate = new Date().toISOString().split('T')[0];

export const INITIAL_COURT_BOOKINGS = [
  {
    id: 'CB-1001',
    courtId: 'court-1',
    courtName: 'Sân Trung Tâm Championship #1 (Indoor Pro)',
    date: todayDate,
    slotId: 'slot-6',
    time: '17:30 - 19:00',
    customerName: 'Lê Minh Anh',
    customerPhone: '0987654321',
    customerEmail: 'student@pickleball.edu.vn',
    rentPaddleCount: 2,
    rentBallMachine: false,
    totalPrice: 625000,
    status: 'confirmed',
    createdAt: '09/11/2026 14:20'
  },
  {
    id: 'CB-1002',
    courtId: 'court-2',
    courtName: 'Sân Indoor Tiêu Chuẩn #2 (Air-Conditioned)',
    date: todayDate,
    slotId: 'slot-7',
    time: '19:00 - 20:30',
    customerName: 'Phạm Gia Huy',
    customerPhone: '0933445566',
    customerEmail: 'huy.pham@gmail.com',
    rentPaddleCount: 0,
    rentBallMachine: true,
    totalPrice: 630000,
    status: 'confirmed',
    createdAt: '09/11/2026 18:05'
  },
  {
    id: 'CB-1003',
    courtId: 'court-4',
    courtName: 'Sân Mái Che Khí Động Học #4 (Covered Roof)',
    date: todayDate,
    slotId: 'slot-2',
    time: '07:30 - 09:00',
    customerName: 'Nguyễn Minh Đức',
    customerPhone: '0908112233',
    customerEmail: 'duc.nguyen@doanhnghiep.vn',
    rentPaddleCount: 4,
    rentBallMachine: false,
    totalPrice: 485000,
    status: 'confirmed',
    createdAt: '10/11/2026 06:45'
  },
  {
    id: 'CB-1004',
    courtId: 'court-5',
    courtName: 'Sân Mái Che Kỹ Thuật #5 (Máy Bắn Bóng Titan)',
    date: todayDate,
    slotId: 'slot-5',
    time: '16:00 - 17:30',
    customerName: 'Trần Thanh Tâm',
    customerPhone: '0977889900',
    customerEmail: 'tam.tran@techcorp.vn',
    rentPaddleCount: 1,
    rentBallMachine: true,
    totalPrice: 515000,
    status: 'confirmed',
    createdAt: '10/11/2026 10:15'
  }
];
