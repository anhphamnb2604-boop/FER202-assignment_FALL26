import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  Calendar,
  Clock,
  GraduationCap,
  Users,
  ShoppingBag,
  Mail,
  LogOut,
  PlusCircle,
  Edit3,
  Trash2,
  Wrench,
  Lock,
  Unlock,
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  Grid,
  List,
  Package,
  Trophy
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminPortalSection({
  courses,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse,
  courts,
  onAddCourt,
  onUpdateCourt,
  onDeleteCourt,
  timeSlots,
  onAddTimeSlot,
  onUpdateTimeSlot,
  onDeleteTimeSlot,
  enrollments,
  onUpdateEnrollment,
  onDeleteEnrollment,
  courtBookings,
  onAddCourtBooking,
  onUpdateCourtBooking,
  onDeleteCourtBooking,
  products,
  onAddProduct,
  onDeleteProduct,
  shopOrders,
  onUpdateShopOrderStatus,
  contactMessages,
  onUpdateContactStatus,
  onSwitchToPublicView
}) {
  const { users, currentUser, logout, toggleUserStatus, changeUserRole } = useAuth();
  const [activeMenu, setActiveMenu] = useState('court-matrix'); // Default to the interactive Court Date/Time Matrix!
  const todayStr = new Date().toISOString().split('T')[0];

  // =========================================================================
  // 1. STATE FOR INTERACTIVE COURT DATE/TIME MATRIX & BOOKING CRUD
  // =========================================================================
  const [matrixDate, setMatrixDate] = useState(todayStr);
  const [selectedCell, setSelectedCell] = useState(null); // { court, slot, booking }
  const [manualBookingForm, setManualBookingForm] = useState({
    customerName: '',
    customerPhone: '',
    rentPaddleCount: 0,
    rentBallMachine: false,
    noteType: 'walk-in' // 'walk-in' | 'blocked'
  });
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [editBookingForm, setEditBookingForm] = useState({
    courtId: '',
    date: '',
    slotId: '',
    customerName: '',
    customerPhone: '',
    status: 'confirmed'
  });

  // =========================================================================
  // 2. STATE FOR TIME SLOTS CRUD (QUẢN LÝ CA GIỜ SÂN)
  // =========================================================================
  const [newSlotForm, setNewSlotForm] = useState({
    time: '',
    label: 'Ca Tăng Cường',
    isPeak: false
  });
  const [editingSlotId, setEditingSlotId] = useState(null);
  const [slotEditForm, setSlotEditForm] = useState({
    time: '',
    label: '',
    isPeak: false
  });

  // =========================================================================
  // 3. STATE FOR COURTS FACILITY CRUD (QUẢN LÝ CỤM SÂN)
  // =========================================================================
  const [editingCourtId, setEditingCourtId] = useState(null);
  const [courtEditForm, setCourtEditForm] = useState({
    name: '',
    type: 'Indoor VIP (Có điều hòa)',
    surface: '',
    pricePerHour: 260000,
    peakPricePerHour: 320000,
    lighting: '',
    status: 'available'
  });
  const [newCourtForm, setNewCourtForm] = useState({
    name: '',
    type: 'Indoor VIP (Có điều hòa)',
    surface: 'Thảm Acrylic 9 lớp chuẩn USA Pickleball',
    pricePerHour: 260000,
    peakPricePerHour: 320000,
    lighting: 'Đèn LED chống chói 850 Lux',
    amenitiesText: 'Điều hòa mát lạnh, Ghế nghỉ VIP, Tủ Locker',
    status: 'available'
  });

  // =========================================================================
  // 4. STATE FOR COURSES, SHOP & USERS
  // =========================================================================
  const [searchUser, setSearchUser] = useState('');
  const [newCourse, setNewCourse] = useState({
    title: '',
    category: 'basic',
    categoryLabel: 'Cơ bản (Beginner)',
    duration: '8 buổi (4 tuần • 120 phút/buổi)',
    tuition: 2500000,
    schedule: 'Thứ 2 & Thứ 5 (18:30 - 20:30)',
    coach: 'HLV Nguyễn Hoàng Nam',
    summary: ''
  });
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    category: 'paddle',
    categoryLabel: 'Vợt Chuyên Nghiệp',
    price: 3900000,
    originalPrice: 4500000,
    stock: 20,
    specs: 'Mặt Raw Carbon T700 • Lõi 16mm • Chuẩn USAPA'
  });

  const formatVND = (amount) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  // Revenues
  const courseRevenue = enrollments
    .filter((e) => e.status !== 'cancelled')
    .reduce((s, e) => s + (e.tuition || 0), 0);
  const courtRevenue = courtBookings
    .filter((c) => c.status !== 'cancelled' && c.status !== 'blocked')
    .reduce((s, c) => s + (c.totalPrice || 0), 0);
  const shopRevenue = shopOrders
    .filter((o) => o.status !== 'cancelled')
    .reduce((s, o) => s + (o.totalAmount || 0), 0);
  const totalRevenue = courseRevenue + courtRevenue + shopRevenue;

  // Find booking for a specific (courtId, date, slotId)
  const getCellBooking = (courtId, date, slotId) => {
    return courtBookings.find(
      (b) =>
        b.courtId === courtId &&
        b.date === date &&
        b.slotId === slotId &&
        b.status !== 'cancelled'
    );
  };

  // Handle clicking a cell in the Court Matrix
  const handleCellClick = (court, slot) => {
    const existing = getCellBooking(court.id, matrixDate, slot.id);
    setSelectedCell({ court, slot, booking: existing || null });
    setManualBookingForm({
      customerName: '',
      customerPhone: '',
      rentPaddleCount: 0,
      rentBallMachine: false,
      noteType: 'walk-in'
    });
  };

  // Admin creates Walk-in Booking OR Blocks the Slot on that Date/Time
  const handleAdminCreateSlotBooking = (e) => {
    e.preventDefault();
    if (!selectedCell) return;
    const { court, slot } = selectedCell;

    const isBlock = manualBookingForm.noteType === 'blocked';
    const baseFee = slot.isPeak ? court.peakPricePerHour * 1.5 : court.pricePerHour * 1.5;
    const total = isBlock
      ? 0
      : baseFee +
        Number(manualBookingForm.rentPaddleCount) * 50000 +
        (manualBookingForm.rentBallMachine ? 150000 : 0);

    const newRec = {
      id: isBlock
        ? `BLK-${Math.floor(1000 + Math.random() * 9000)}`
        : `CB-${Math.floor(1000 + Math.random() * 9000)}`,
      courtId: court.id,
      courtName: court.name,
      date: matrixDate,
      slotId: slot.id,
      time: slot.time,
      customerName: isBlock
        ? '🔒 Khóa Ca Sân (Bảo trì / Giải nội bộ)'
        : manualBookingForm.customerName.trim() || 'Khách vãng lai tại quầy',
      customerPhone: isBlock ? 'Admin Khóa' : manualBookingForm.customerPhone.trim() || '0900000000',
      customerEmail: 'admin@pickleball.edu.vn',
      rentPaddleCount: Number(manualBookingForm.rentPaddleCount),
      rentBallMachine: manualBookingForm.rentBallMachine,
      totalPrice: total,
      status: isBlock ? 'blocked' : 'confirmed',
      createdAt: new Date().toLocaleString('vi-VN')
    };

    onAddCourtBooking(newRec);
    setSelectedCell({ court, slot, booking: newRec });
  };

  // Start editing a booking row (CRUD Update Date / Time / Court / Customer)
  const startEditBookingRow = (b) => {
    setEditingBookingId(b.id);
    setEditBookingForm({
      courtId: b.courtId,
      date: b.date,
      slotId: b.slotId,
      customerName: b.customerName,
      customerPhone: b.customerPhone,
      status: b.status || 'confirmed'
    });
  };

  const handleSaveBookingRow = (bId) => {
    const targetCourt = courts.find((c) => c.id === editBookingForm.courtId) || courts[0];
    const targetSlot = timeSlots.find((s) => s.id === editBookingForm.slotId) || timeSlots[0];
    onUpdateCourtBooking(bId, {
      courtId: targetCourt.id,
      courtName: targetCourt.name,
      date: editBookingForm.date,
      slotId: targetSlot.id,
      time: targetSlot.time,
      customerName: editBookingForm.customerName,
      customerPhone: editBookingForm.customerPhone,
      status: editBookingForm.status
    });
    setEditingBookingId(null);
  };

  // Time Slot CRUD Handlers
  const handleAddSlotSubmit = (e) => {
    e.preventDefault();
    if (!newSlotForm.time.trim()) return;
    onAddTimeSlot({
      id: `slot-${Date.now()}`,
      time: newSlotForm.time.trim(),
      label: newSlotForm.label.trim() || 'Ca Tiêu Chuẩn',
      isPeak: newSlotForm.isPeak
    });
    setNewSlotForm({ time: '', label: 'Ca Tăng Cường', isPeak: false });
  };

  const startEditSlot = (slot) => {
    setEditingSlotId(slot.id);
    setSlotEditForm({
      time: slot.time,
      label: slot.label,
      isPeak: slot.isPeak
    });
  };

  const saveEditSlot = (slotId) => {
    onUpdateTimeSlot(slotId, slotEditForm);
    setEditingSlotId(null);
  };

  // Court Facility CRUD Handlers
  const startEditCourt = (court) => {
    setEditingCourtId(court.id);
    setCourtEditForm({
      name: court.name,
      type: court.type,
      surface: court.surface,
      pricePerHour: court.pricePerHour,
      peakPricePerHour: court.peakPricePerHour,
      lighting: court.lighting,
      status: court.status || 'available'
    });
  };

  const handleSaveCourtEdit = (courtId) => {
    onUpdateCourt(courtId, {
      ...courtEditForm,
      pricePerHour: Number(courtEditForm.pricePerHour),
      peakPricePerHour: Number(courtEditForm.peakPricePerHour)
    });
    setEditingCourtId(null);
  };

  const handleCreateCourt = (e) => {
    e.preventDefault();
    if (!newCourtForm.name.trim()) return;
    onAddCourt({
      id: `court-${Date.now()}`,
      name: newCourtForm.name.trim(),
      type: newCourtForm.type,
      surface: newCourtForm.surface,
      pricePerHour: Number(newCourtForm.pricePerHour),
      peakPricePerHour: Number(newCourtForm.peakPricePerHour),
      lighting: newCourtForm.lighting,
      image:
        'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80',
      amenities: newCourtForm.amenitiesText
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),
      status: newCourtForm.status
    });
    setNewCourtForm({ ...newCourtForm, name: '' });
  };

  const sidebarMenus = [
    {
      id: 'court-matrix',
      label: ' Sơ Đồ Trống & CRUD Ngày Giờ',
      icon: Grid,
      badge: 'Live'
    },
    {
      id: 'courts-crud',
      label: `Cấu Hình Cụm Sân (${courts.length})`,
      icon: Building2
    },
    {
      id: 'slots-crud',
      label: `Quản Lý Khung Giờ (${timeSlots.length} Ca)`,
      icon: Clock
    },
    {
      id: 'courses',
      label: `Quản Lý Khóa Học (${courses.length})`,
      icon: GraduationCap
    },
    {
      id: 'enrollments',
      label: `Hồ Sơ Học Viên (${enrollments.length})`,
      icon: Users
    },
    {
      id: 'shop',
      label: `Kho Pro Shop & Đơn (${shopOrders.length})`,
      icon: ShoppingBag
    },
    {
      id: 'users',
      label: `Tài Khoản & Phân Quyền (${users.length})`,
      icon: ShieldCheck
    },
    {
      id: 'contacts',
      label: `Hộp Thư Liên Hệ (${contactMessages.length})`,
      icon: Mail
    }
  ];

  return (
    <div className="min-vh-100 d-flex flex-column flex-lg-row bg-light">
      {/* =====================================================================
          DEDICATED ADMIN SIDEBAR (LEFT NAVIGATION)
         ===================================================================== */}
      <aside
        className="text-white d-flex flex-column flex-shrink-0 shadow"
        style={{
          width: '100%',
          maxWidth: '280px',
          background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)'
        }}
      >
        {/* Brand Header */}
        <div className="p-3 border-bottom border-secondary border-opacity-50 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div className="vp-logo-icon d-flex align-items-center justify-content-center rounded-3">
              <Trophy size={20} className="text-dark" />
            </div>
            <div>
              <div className="fw-extrabold text-white lh-1">ADMIN PORTAL</div>
              <small className="text-warning" style={{ fontSize: '0.68rem' }}>
                VN PICKLEBALL ACADEMY
              </small>
            </div>
          </div>
        </div>

        {/* Admin User Card */}
        <div className="p-3 border-bottom border-secondary border-opacity-50 bg-white bg-opacity-10">
          <div className="d-flex align-items-center gap-2">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="rounded-circle object-fit-cover border border-warning"
              width="40"
              height="40"
            />
            <div className="min-w-0">
              <div className="fw-bold small text-white text-truncate">{currentUser?.name}</div>
              <span className="badge bg-danger" style={{ fontSize: '0.65rem' }}>
                Quản Trị Viên Hệ Thống
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="p-2 flex-grow-1 d-flex flex-row flex-lg-column gap-1 overflow-auto">
          {sidebarMenus.map((item) => {
            const Icon = item.icon;
            const active = activeMenu === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveMenu(item.id)}
                style={
                  active
                    ? { color: '#0f172a' }
                    : { color: '#f8fafc', backgroundColor: 'rgba(255, 255, 255, 0.04)' }
                }
                className={`btn btn-sm text-start d-flex align-items-center justify-content-between gap-2 px-3 py-2 rounded-3 fw-semibold flex-shrink-0 ${
                  active ? 'vp-nav-active shadow-sm' : 'text-white vp-nav-link'
                }`}
              >
                <div className="d-flex align-items-center gap-2">
                  <Icon size={16} className={active ? 'text-dark' : 'text-warning'} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="badge bg-danger text-white rounded-pill" style={{ fontSize: '0.62rem' }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Actions: View Public Website or Logout */}
        <div className="p-3 border-top border-secondary border-opacity-50 d-flex flex-column gap-2">
          <button
            type="button"
            onClick={onSwitchToPublicView}
            className="btn btn-sm btn-outline-warning w-100 d-flex align-items-center justify-content-center gap-2 fw-bold"
          >
            <Eye size={15} />
            <span>Xem Giao Diện Khách Hàng</span>
          </button>
          <button
            type="button"
            onClick={logout}
            className="btn btn-sm btn-danger w-100 d-flex align-items-center justify-content-center gap-2 fw-bold"
          >
            <LogOut size={15} />
            <span>Đăng Xuất Quản Trị</span>
          </button>
        </div>
      </aside>

      {/* =====================================================================
          MAIN ADMIN WORKSPACE CONTENT
         ===================================================================== */}
      <div className="flex-grow-1 p-3 p-lg-4 overflow-auto">
        {/* Top KPI Bar */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 border-start border-4 border-success">
              <div className="small text-secondary fw-bold">TRẠNG THÁI CỤM SÂN</div>
              <div className="fs-4 fw-extrabold text-dark">
                {courts.filter((c) => c.status !== 'maintenance').length}/{courts.length} Sân hoạt động
              </div>
              <small className="text-success fw-semibold">
                {timeSlots.length} ca/ngày • Doanh thu: {formatVND(courtRevenue)}
              </small>
            </div>
          </div>
          <div className="col-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 border-start border-4 border-primary">
              <div className="small text-secondary fw-bold">ĐÀO TẠO & GHI DANH</div>
              <div className="fs-4 fw-extrabold text-dark">
                {courses.length} Khóa • {enrollments.length} Học viên
              </div>
              <small className="text-primary fw-semibold">
                Doanh thu học phí: {formatVND(courseRevenue)}
              </small>
            </div>
          </div>
          <div className="col-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 border-start border-4 border-warning">
              <div className="small text-secondary fw-bold">KHO PRO SHOP</div>
              <div className="fs-4 fw-extrabold text-dark">
                {products.length} SP • {shopOrders.length} Đơn hàng
              </div>
              <small className="text-dark fw-semibold">
                Doanh thu Shop: {formatVND(shopRevenue)}
              </small>
            </div>
          </div>
          <div className="col-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 border-start border-4 border-danger">
              <div className="small text-secondary fw-bold">TỔNG DOANH THU HỌC VIỆN</div>
              <div className="fs-4 fw-extrabold text-danger">{formatVND(totalRevenue)}</div>
              <small className="text-secondary">
                {users.length} tài khoản • {contactMessages.length} thư tư vấn
              </small>
            </div>
          </div>
        </div>

        {/* ===================================================================
            MENU 1: SƠ ĐỒ TRỐNG & CRUD NGÀY GIỜ SÂN TẬP (COURT AVAILABILITY MATRIX)
           =================================================================== */}
        {activeMenu === 'court-matrix' && (
          <div>
            {/* Matrix Header & Date Picker */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3 pb-3 border-bottom">
                <div>
                  <span className="badge bg-success-subtle text-success fw-bold px-3 py-1 rounded-pill mb-1">
                    QUẢN LÝ SÂN TRỐNG THEO NGÀY & CA GIỜ THỰC TẾ
                  </span>
                  <h4 className="fw-extrabold text-dark mb-0">
                    Sơ Đồ Kiểm Soát Sân Trống & Đặt/Khóa Sân Theo Ngày Giờ
                  </h4>
                  <small className="text-secondary">
                    Nhấn trực tiếp vào bất kỳ ô <strong>[Sân × Khung Giờ]</strong> nào bên dưới để Đặt sân cho khách vãng lai, Khóa ca sân hoặc Hủy/Mở trống lại sân.
                  </small>
                </div>

                <div className="d-flex align-items-center gap-2 bg-light p-2 rounded-3 border">
                  <Calendar size={18} className="text-success" />
                  <span className="small fw-bold text-dark">Chọn ngày quản lý:</span>
                  <input
                    type="date"
                    className="form-control form-control-sm fw-bold"
                    style={{ width: '160px' }}
                    value={matrixDate}
                    onChange={(e) => {
                      setMatrixDate(e.target.value);
                      setSelectedCell(null);
                    }}
                  />
                </div>
              </div>

              {/* Legend */}
              <div className="d-flex flex-wrap gap-3 small mb-3">
                <span className="d-flex align-items-center gap-1">
                  <span className="badge bg-success-subtle text-success border border-success">
                    ✓ Sân Trống
                  </span>
                  <span className="text-secondary">Có thể nhận khách / Khóa ca</span>
                </span>
                <span className="d-flex align-items-center gap-1">
                  <span className="badge bg-primary text-white">Đã Đặt</span>
                  <span className="text-secondary">Khách đã giữ chỗ (Nhấn để sửa/hủy)</span>
                </span>
                <span className="d-flex align-items-center gap-1">
                  <span className="badge bg-danger text-white">🔒 Admin Khóa Ca</span>
                  <span className="text-secondary">Tạm khóa ca giờ này</span>
                </span>
                <span className="d-flex align-items-center gap-1">
                  <span className="badge bg-warning text-dark">🔧 Sân Bảo Trì</span>
                  <span className="text-secondary">Toàn bộ sân đang bảo trì</span>
                </span>
              </div>

              {/* Interactive Grid Table: Courts (Rows) x TimeSlots (Cols) */}
              <div className="table-responsive">
                <table className="table table-bordered align-middle text-center small mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th className="text-start" style={{ minWidth: '210px' }}>
                        Sân Tập \ Khung Giờ ({matrixDate})
                      </th>
                      {timeSlots.map((slot) => (
                        <th key={slot.id} style={{ minWidth: '130px' }}>
                          <div className="fw-bold text-warning">{slot.time}</div>
                          <div className="fw-normal text-white-50" style={{ fontSize: '0.68rem' }}>
                            {slot.label} {slot.isPeak ? '(Peak)' : ''}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {courts.map((court) => {
                      const isMaint = court.status === 'maintenance';
                      return (
                        <tr key={court.id}>
                          <td className="text-start bg-light">
                            <div className="fw-extrabold text-dark">{court.name}</div>
                            <div className="d-flex justify-content-between align-items-center mt-1">
                              <span className="badge bg-secondary" style={{ fontSize: '0.65rem' }}>
                                {court.type}
                              </span>
                              <span className="text-success fw-bold" style={{ fontSize: '0.72rem' }}>
                                {formatVND(court.pricePerHour)}/h
                              </span>
                            </div>
                          </td>

                          {timeSlots.map((slot) => {
                            if (isMaint) {
                              return (
                                <td key={slot.id} className="bg-warning-subtle text-muted">
                                  <span className="badge bg-warning text-dark">🔧 Bảo trì</span>
                                </td>
                              );
                            }

                            const booking = getCellBooking(court.id, matrixDate, slot.id);
                            const isSelected =
                              selectedCell?.court.id === court.id &&
                              selectedCell?.slot.id === slot.id;

                            if (booking) {
                              const isBlocked = booking.status === 'blocked';
                              return (
                                <td
                                  key={slot.id}
                                  onClick={() => handleCellClick(court, slot)}
                                  style={{ cursor: 'pointer' }}
                                  className={`p-2 transition-all ${
                                    isBlocked ? 'bg-danger-subtle' : 'bg-primary-subtle'
                                  } ${isSelected ? 'border-3 border-dark' : ''}`}
                                >
                                  <div
                                    className={`badge w-100 mb-1 ${
                                      isBlocked ? 'bg-danger' : 'bg-primary'
                                    }`}
                                  >
                                    {isBlocked ? '🔒 Đã Khóa Ca' : '✓ Đã Đặt'}
                                  </div>
                                  <div
                                    className="fw-bold text-dark text-truncate"
                                    style={{ maxWidth: '115px', margin: '0 auto', fontSize: '0.72rem' }}
                                  >
                                    {booking.customerName}
                                  </div>
                                  <div className="text-secondary" style={{ fontSize: '0.68rem' }}>
                                    {booking.customerPhone}
                                  </div>
                                </td>
                              );
                            }

                            return (
                              <td
                                key={slot.id}
                                onClick={() => handleCellClick(court, slot)}
                                style={{ cursor: 'pointer' }}
                                className={`p-2 bg-white hover-shadow ${
                                  isSelected ? 'border-3 border-success bg-success-subtle' : ''
                                }`}
                              >
                                <span className="badge bg-success-subtle text-success border border-success w-100 py-2">
                                  + Sân Trống
                                </span>
                                <small className="text-muted d-block mt-1" style={{ fontSize: '0.65rem' }}>
                                  Nhấn để đặt/khóa
                                </small>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Action Panel when a Matrix Cell is clicked */}
              {selectedCell && (
                <div className="mt-4 p-4 rounded-4 bg-light border border-2 border-dark">
                  <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                    <div>
                      <span className="badge bg-dark text-warning mb-1">
                        THAO TÁC Ô SÂN ĐANG CHỌN
                      </span>
                      <h5 className="fw-extrabold text-dark mb-0">
                        {selectedCell.court.name} — Ngày {matrixDate} ({selectedCell.slot.time})
                      </h5>
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => setSelectedCell(null)}
                    >
                      Đóng khung thao tác ✕
                    </button>
                  </div>

                  {selectedCell.booking ? (
                    <div className="row g-3 align-items-center">
                      <div className="col-md-8 small">
                        <div className="mb-1">
                          <strong>Mã phiếu:</strong> #{selectedCell.booking.id} •{' '}
                          <span className="badge bg-primary">
                            {selectedCell.booking.status === 'blocked'
                              ? 'Ca sân đang bị Admin khóa'
                              : 'Khách đã đặt'}
                          </span>
                        </div>
                        <div className="mb-1">
                          <strong>Người đặt / Ghi chú:</strong> {selectedCell.booking.customerName} (
                          {selectedCell.booking.customerPhone})
                        </div>
                        <div>
                          <strong>Dịch vụ kèm:</strong> Thuê {selectedCell.booking.rentPaddleCount} vợt{' '}
                          {selectedCell.booking.rentBallMachine ? '+ Máy bắn bóng Titan' : ''} —{' '}
                          <strong className="text-danger">
                            Tổng phí: {formatVND(selectedCell.booking.totalPrice)}
                          </strong>
                        </div>
                      </div>
                      <div className="col-md-4 text-md-end d-flex flex-wrap gap-2 justify-content-md-end">
                        <button
                          type="button"
                          onClick={() => {
                            onDeleteCourtBooking(selectedCell.booking.id);
                            setSelectedCell({ ...selectedCell, booking: null });
                          }}
                          className="btn btn-danger fw-bold btn-sm px-3 py-2"
                        >
                          🔓 Hủy Đặt / Mở Trống Lại Ca Sân Này
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleAdminCreateSlotBooking} className="row g-3 align-items-end small">
                      <div className="col-md-3">
                        <label className="form-label fw-bold mb-1">Loại thao tác trên ca trống</label>
                        <select
                          className="form-select form-select-sm fw-bold"
                          value={manualBookingForm.noteType}
                          onChange={(e) =>
                            setManualBookingForm({ ...manualBookingForm, noteType: e.target.value })
                          }
                        >
                          <option value="walk-in">➕ Tạo lịch đặt sân cho khách</option>
                          <option value="blocked">🔒 Khóa ca sân này (Không nhận khách)</option>
                        </select>
                      </div>

                      {manualBookingForm.noteType === 'walk-in' && (
                        <>
                          <div className="col-md-3">
                            <label className="form-label fw-bold mb-1">Tên khách hàng đặt sân</label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="Nhập tên khách..."
                              value={manualBookingForm.customerName}
                              onChange={(e) =>
                                setManualBookingForm({
                                  ...manualBookingForm,
                                  customerName: e.target.value
                                })
                              }
                              required
                            />
                          </div>
                          <div className="col-md-2">
                            <label className="form-label fw-bold mb-1">Số điện thoại</label>
                            <input
                              type="tel"
                              className="form-control form-control-sm"
                              placeholder="0901234567"
                              value={manualBookingForm.customerPhone}
                              onChange={(e) =>
                                setManualBookingForm({
                                  ...manualBookingForm,
                                  customerPhone: e.target.value
                                })
                              }
                              required
                            />
                          </div>
                          <div className="col-md-2">
                            <label className="form-label fw-bold mb-1">Thuê vợt / Máy bóng</label>
                            <div className="d-flex align-items-center gap-2">
                              <select
                                className="form-select form-select-sm"
                                value={manualBookingForm.rentPaddleCount}
                                onChange={(e) =>
                                  setManualBookingForm({
                                    ...manualBookingForm,
                                    rentPaddleCount: e.target.value
                                  })
                                }
                              >
                                <option value={0}>0 vợt</option>
                                <option value={2}>2 vợt</option>
                                <option value={4}>4 vợt</option>
                              </select>
                            </div>
                          </div>
                        </>
                      )}

                      <div className="col-md-2">
                        <button type="submit" className="btn vp-btn-lime btn-sm w-100 fw-extrabold py-2">
                          {manualBookingForm.noteType === 'blocked'
                            ? '🔒 Xác Nhận Khóa Ca'
                            : '✓ Lưu Đặt Sân'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Full CRUD Table for All Court Bookings (Edit Date, Edit Slot, Edit Court, Delete) */}
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-extrabold text-dark mb-3">
                Bảng CRUD Toàn Bộ Lịch Đặt Sân (Đổi Ngày, Đổi Giờ, Đổi Sân, Xóa Lịch)
              </h5>
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle small">
                  <thead className="table-dark">
                    <tr>
                      <th>Mã Phiếu</th>
                      <th>Sân Tập</th>
                      <th>Ngày Đặt</th>
                      <th>Khung Giờ (Ca)</th>
                      <th>Khách Hàng & SĐT</th>
                      <th>Tổng Tiền</th>
                      <th>Trạng Thái</th>
                      <th>Thao Tác CRUD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courtBookings.map((b) => {
                      const isEdit = editingBookingId === b.id;
                      return (
                        <tr key={b.id}>
                          <td className="fw-bold">{b.id}</td>
                          <td>
                            {isEdit ? (
                              <select
                                className="form-select form-select-sm"
                                value={editBookingForm.courtId}
                                onChange={(e) =>
                                  setEditBookingForm({ ...editBookingForm, courtId: e.target.value })
                                }
                              >
                                {courts.map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {c.name}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <span className="fw-bold text-dark">{b.courtName}</span>
                            )}
                          </td>
                          <td>
                            {isEdit ? (
                              <input
                                type="date"
                                className="form-control form-control-sm"
                                value={editBookingForm.date}
                                onChange={(e) =>
                                  setEditBookingForm({ ...editBookingForm, date: e.target.value })
                                }
                              />
                            ) : (
                              <strong>{b.date}</strong>
                            )}
                          </td>
                          <td>
                            {isEdit ? (
                              <select
                                className="form-select form-select-sm"
                                value={editBookingForm.slotId}
                                onChange={(e) =>
                                  setEditBookingForm({ ...editBookingForm, slotId: e.target.value })
                                }
                              >
                                {timeSlots.map((s) => (
                                  <option key={s.id} value={s.id}>
                                    {s.time} ({s.label})
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <span className="badge bg-success-subtle text-success fw-bold">
                                {b.time}
                              </span>
                            )}
                          </td>
                          <td>
                            {isEdit ? (
                              <div className="d-flex flex-column gap-1">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={editBookingForm.customerName}
                                  onChange={(e) =>
                                    setEditBookingForm({
                                      ...editBookingForm,
                                      customerName: e.target.value
                                    })
                                  }
                                />
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={editBookingForm.customerPhone}
                                  onChange={(e) =>
                                    setEditBookingForm({
                                      ...editBookingForm,
                                      customerPhone: e.target.value
                                    })
                                  }
                                />
                              </div>
                            ) : (
                              <>
                                <div className="fw-bold">{b.customerName}</div>
                                <div className="text-secondary">{b.customerPhone}</div>
                              </>
                            )}
                          </td>
                          <td className="fw-bold text-danger">{formatVND(b.totalPrice)}</td>
                          <td>
                            {isEdit ? (
                              <select
                                className="form-select form-select-sm"
                                value={editBookingForm.status}
                                onChange={(e) =>
                                  setEditBookingForm({ ...editBookingForm, status: e.target.value })
                                }
                              >
                                <option value="confirmed">Đã xác nhận</option>
                                <option value="blocked">Khóa ca sân</option>
                                <option value="completed">Đã hoàn thành</option>
                                <option value="cancelled">Đã hủy (Mở trống)</option>
                              </select>
                            ) : (
                              <span
                                className={`badge ${
                                  b.status === 'blocked'
                                    ? 'bg-danger'
                                    : b.status === 'cancelled'
                                    ? 'bg-secondary'
                                    : 'bg-success'
                                }`}
                              >
                                {b.status === 'blocked'
                                  ? '🔒 Đã khóa ca'
                                  : b.status === 'cancelled'
                                  ? 'Đã hủy'
                                  : 'Đã giữ sân'}
                              </span>
                            )}
                          </td>
                          <td>
                            {isEdit ? (
                              <div className="d-flex gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleSaveBookingRow(b.id)}
                                  className="btn btn-sm btn-success fw-bold"
                                >
                                  Lưu
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingBookingId(null)}
                                  className="btn btn-sm btn-outline-secondary"
                                >
                                  Hủy
                                </button>
                              </div>
                            ) : (
                              <div className="d-flex gap-1">
                                <button
                                  type="button"
                                  onClick={() => startEditBookingRow(b)}
                                  className="btn btn-sm btn-outline-dark d-flex align-items-center gap-1"
                                >
                                  <Edit3 size={13} /> Sửa ngày/giờ
                                </button>
                                <button
                                  type="button"
                                  onClick={() => onDeleteCourtBooking(b.id)}
                                  className="btn btn-sm btn-outline-danger"
                                  title="Xóa lịch đặt sân này"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            MENU 2: CẤU HÌNH CỤM SÂN TẬP (COURTS FACILITY CRUD)
           =================================================================== */}
        {activeMenu === 'courts-crud' && (
          <div className="row g-4">
            <div className="col-xl-8">
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-extrabold text-dark mb-1">
                  Quản Lý Cơ Sở Vật Chất Cụm Sân Tập ({courts.length} Sân)
                </h5>
                <small className="text-secondary d-block mb-3">
                  Thêm sân mới, chỉnh sửa mặt sân, đèn chiếu sáng, đơn giá thuê giờ thường / Peak và chế độ Bảo trì
                </small>

                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle small">
                    <thead className="table-dark">
                      <tr>
                        <th>Tên Sân & Chiếu Sáng</th>
                        <th>Loại Sân & Mặt Thảm</th>
                        <th>Đơn Giá Thường / Peak</th>
                        <th>Trạng Thái</th>
                        <th>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courts.map((court) => {
                        const isEdit = editingCourtId === court.id;
                        return (
                          <tr key={court.id}>
                            <td>
                              {isEdit ? (
                                <div className="d-flex flex-column gap-1">
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={courtEditForm.name}
                                    onChange={(e) =>
                                      setCourtEditForm({ ...courtEditForm, name: e.target.value })
                                    }
                                  />
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={courtEditForm.lighting}
                                    onChange={(e) =>
                                      setCourtEditForm({
                                        ...courtEditForm,
                                        lighting: e.target.value
                                      })
                                    }
                                  />
                                </div>
                              ) : (
                                <>
                                  <div className="fw-bold text-dark">{court.name}</div>
                                  <small className="text-muted">💡 {court.lighting}</small>
                                </>
                              )}
                            </td>
                            <td>
                              {isEdit ? (
                                <div className="d-flex flex-column gap-1">
                                  <select
                                    className="form-select form-select-sm"
                                    value={courtEditForm.type}
                                    onChange={(e) =>
                                      setCourtEditForm({ ...courtEditForm, type: e.target.value })
                                    }
                                  >
                                    <option value="Indoor VIP (Có điều hòa)">
                                      Indoor VIP (Có điều hòa)
                                    </option>
                                    <option value="Sân Mái Che Cao Cấp">Sân Mái Che Cao Cấp</option>
                                    <option value="Sân Tập Kỹ Thuật & Thi Đấu">
                                      Sân Tập Kỹ Thuật & Thi Đấu
                                    </option>
                                  </select>
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={courtEditForm.surface}
                                    onChange={(e) =>
                                      setCourtEditForm({
                                        ...courtEditForm,
                                        surface: e.target.value
                                      })
                                    }
                                  />
                                </div>
                              ) : (
                                <>
                                  <span className="badge bg-dark text-warning mb-1">
                                    {court.type}
                                  </span>
                                  <div className="text-secondary">{court.surface}</div>
                                </>
                              )}
                            </td>
                            <td>
                              {isEdit ? (
                                <div className="d-flex flex-column gap-1">
                                  <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    value={courtEditForm.pricePerHour}
                                    onChange={(e) =>
                                      setCourtEditForm({
                                        ...courtEditForm,
                                        pricePerHour: e.target.value
                                      })
                                    }
                                  />
                                  <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    value={courtEditForm.peakPricePerHour}
                                    onChange={(e) =>
                                      setCourtEditForm({
                                        ...courtEditForm,
                                        peakPricePerHour: e.target.value
                                      })
                                    }
                                  />
                                </div>
                              ) : (
                                <>
                                  <div className="text-success fw-bold">
                                    Thường: {formatVND(court.pricePerHour)}/h
                                  </div>
                                  <div className="text-danger fw-bold">
                                    Peak: {formatVND(court.peakPricePerHour)}/h
                                  </div>
                                </>
                              )}
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  court.status === 'maintenance'
                                    ? 'bg-warning text-dark'
                                    : 'bg-success'
                                }`}
                              >
                                {court.status === 'maintenance' ? '🔧 Bảo trì' : '✓ Hoạt động'}
                              </span>
                            </td>
                            <td>
                              {isEdit ? (
                                <div className="d-flex gap-1">
                                  <button
                                    type="button"
                                    onClick={() => handleSaveCourtEdit(court.id)}
                                    className="btn btn-sm btn-success fw-bold"
                                  >
                                    Lưu
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingCourtId(null)}
                                    className="btn btn-sm btn-outline-secondary"
                                  >
                                    Hủy
                                  </button>
                                </div>
                              ) : (
                                <div className="d-flex gap-1">
                                  <button
                                    type="button"
                                    onClick={() => startEditCourt(court)}
                                    className="btn btn-sm btn-outline-dark"
                                  >
                                    <Edit3 size={13} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      onUpdateCourt(court.id, {
                                        status:
                                          court.status === 'maintenance'
                                            ? 'available'
                                            : 'maintenance'
                                      })
                                    }
                                    className="btn btn-sm btn-outline-warning text-dark"
                                    title="Bật/Tắt Bảo trì"
                                  >
                                    <Wrench size={13} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => onDeleteCourt(court.id)}
                                    className="btn btn-sm btn-outline-danger"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-xl-4">
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-extrabold text-dark mb-3 d-flex align-items-center gap-2">
                  <PlusCircle size={20} className="text-success" />
                  <span>Thêm Sân Tập Mới</span>
                </h5>
                <form onSubmit={handleCreateCourt} className="small">
                  <div className="mb-2">
                    <label className="form-label fw-bold mb-1">Tên sân tập *</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="VD: Sân Thi Đấu VIP #7"
                      value={newCourtForm.name}
                      onChange={(e) => setNewCourtForm({ ...newCourtForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label fw-bold mb-1">Loại sân</label>
                    <select
                      className="form-select form-select-sm"
                      value={newCourtForm.type}
                      onChange={(e) => setNewCourtForm({ ...newCourtForm, type: e.target.value })}
                    >
                      <option value="Indoor VIP (Có điều hòa)">Indoor VIP (Có điều hòa)</option>
                      <option value="Sân Mái Che Cao Cấp">Sân Mái Che Cao Cấp</option>
                      <option value="Sân Tập Kỹ Thuật & Thi Đấu">Sân Tập Kỹ Thuật & Thi Đấu</option>
                    </select>
                  </div>
                  <div className="row g-2 mb-2">
                    <div className="col-6">
                      <label className="form-label fw-bold mb-1">Giá thường (VNĐ/h)</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={newCourtForm.pricePerHour}
                        onChange={(e) =>
                          setNewCourtForm({ ...newCourtForm, pricePerHour: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-bold mb-1">Giá Peak (VNĐ/h)</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={newCourtForm.peakPricePerHour}
                        onChange={(e) =>
                          setNewCourtForm({ ...newCourtForm, peakPricePerHour: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold mb-1">Tiện ích sân</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={newCourtForm.amenitiesText}
                      onChange={(e) =>
                        setNewCourtForm({ ...newCourtForm, amenitiesText: e.target.value })
                      }
                    />
                  </div>
                  <button type="submit" className="btn vp-btn-lime w-100 fw-bold py-2">
                    + Lưu Sân Tập Mới
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            MENU 3: QUẢN LÝ KHUNG GIỜ CA TẬP (TIME SLOTS CRUD)
           =================================================================== */}
        {activeMenu === 'slots-crud' && (
          <div className="row g-4">
            <div className="col-xl-8">
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-extrabold text-dark mb-1">
                  Cấu Hình Khung Giờ Hoạt Động Sân Tập ({timeSlots.length} Ca / Ngày)
                </h5>
                <small className="text-secondary d-block mb-3">
                  Thêm ca giờ mới (VD: Ca Đêm 22:00 - 23:30), chỉnh sửa khung giờ hoặc đổi phân loại Giờ thường / Giờ vàng (Peak)
                </small>

                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle small">
                    <thead className="table-dark">
                      <tr>
                        <th>Mã Ca</th>
                        <th>Khung Giờ Hoạt Động</th>
                        <th>Tên Ca Tập</th>
                        <th>Phân Loại Giá</th>
                        <th>Thao Tác CRUD</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timeSlots.map((slot) => {
                        const isEdit = editingSlotId === slot.id;
                        return (
                          <tr key={slot.id}>
                            <td className="fw-bold">{slot.id}</td>
                            <td>
                              {isEdit ? (
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={slotEditForm.time}
                                  onChange={(e) =>
                                    setSlotEditForm({ ...slotEditForm, time: e.target.value })
                                  }
                                />
                              ) : (
                                <strong className="text-dark fs-6">{slot.time}</strong>
                              )}
                            </td>
                            <td>
                              {isEdit ? (
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={slotEditForm.label}
                                  onChange={(e) =>
                                    setSlotEditForm({ ...slotEditForm, label: e.target.value })
                                  }
                                />
                              ) : (
                                slot.label
                              )}
                            </td>
                            <td>
                              {isEdit ? (
                                <select
                                  className="form-select form-select-sm"
                                  value={slotEditForm.isPeak ? 'peak' : 'normal'}
                                  onChange={(e) =>
                                    setSlotEditForm({
                                      ...slotEditForm,
                                      isPeak: e.target.value === 'peak'
                                    })
                                  }
                                >
                                  <option value="normal">Giờ thường (Standard)</option>
                                  <option value="peak">Giờ vàng cao điểm (Peak Hour)</option>
                                </select>
                              ) : (
                                <span
                                  className={`badge ${
                                    slot.isPeak ? 'bg-warning text-dark' : 'bg-success'
                                  }`}
                                >
                                  {slot.isPeak ? '⚡ Giờ Vàng (Peak)' : 'Giờ Thường'}
                                </span>
                              )}
                            </td>
                            <td>
                              {isEdit ? (
                                <div className="d-flex gap-1">
                                  <button
                                    type="button"
                                    onClick={() => saveEditSlot(slot.id)}
                                    className="btn btn-sm btn-success fw-bold"
                                  >
                                    Lưu
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingSlotId(null)}
                                    className="btn btn-sm btn-outline-secondary"
                                  >
                                    Hủy
                                  </button>
                                </div>
                              ) : (
                                <div className="d-flex gap-1">
                                  <button
                                    type="button"
                                    onClick={() => startEditSlot(slot)}
                                    className="btn btn-sm btn-outline-dark d-flex align-items-center gap-1"
                                  >
                                    <Edit3 size={13} /> Sửa giờ
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => onDeleteTimeSlot(slot.id)}
                                    className="btn btn-sm btn-outline-danger"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-xl-4">
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-extrabold text-dark mb-3 d-flex align-items-center gap-2">
                  <Clock size={20} className="text-success" />
                  <span>Thêm Ca Giờ Tập Mới</span>
                </h5>
                <form onSubmit={handleAddSlotSubmit} className="small">
                  <div className="mb-2">
                    <label className="form-label fw-bold mb-1">Khung giờ (VD: 22:00 - 23:30) *</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="VD: 10:30 - 12:00 hoặc 22:00 - 23:30"
                      value={newSlotForm.time}
                      onChange={(e) => setNewSlotForm({ ...newSlotForm, time: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label fw-bold mb-1">Tên gọi ca tập</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="VD: Ca Trưa / Ca Đêm Muộn"
                      value={newSlotForm.label}
                      onChange={(e) => setNewSlotForm({ ...newSlotForm, label: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold mb-1">Áp dụng bảng giá</label>
                    <select
                      className="form-select form-select-sm"
                      value={newSlotForm.isPeak ? 'peak' : 'normal'}
                      onChange={(e) =>
                        setNewSlotForm({ ...newSlotForm, isPeak: e.target.value === 'peak' })
                      }
                    >
                      <option value="normal">Đơn giá Giờ Thường</option>
                      <option value="peak">Đơn giá Giờ Vàng (Peak Hour)</option>
                    </select>
                  </div>
                  <button type="submit" className="btn vp-btn-lime w-100 fw-bold py-2">
                    + Thêm Khung Giờ Mới
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            MENU 4: QUẢN LÝ KHÓA HỌC
           =================================================================== */}
        {activeMenu === 'courses' && (
          <div className="row g-4">
            <div className="col-xl-8">
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-extrabold text-dark mb-3">
                  Quản Lý Chương Trình Khóa Học ({courses.length} Lớp)
                </h5>
                <div className="table-responsive">
                  <table className="table table-hover align-middle small">
                    <thead className="table-dark">
                      <tr>
                        <th>Tên Khóa Học</th>
                        <th>Cấp Độ</th>
                        <th>HLV Phụ Trách</th>
                        <th>Lịch Học</th>
                        <th>Học Phí</th>
                        <th>Xóa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((c) => (
                        <tr key={c.id}>
                          <td className="fw-bold">{c.title}</td>
                          <td>
                            <span className="badge bg-success-subtle text-success">
                              {c.categoryLabel}
                            </span>
                          </td>
                          <td>{c.coach}</td>
                          <td>{c.schedule}</td>
                          <td className="text-danger fw-bold">{formatVND(c.tuition)}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => onDeleteCourse(c.id)}
                              className="btn btn-sm btn-outline-danger"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-xl-4">
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-extrabold text-dark mb-3">Mở Khóa Đào Tạo Mới</h5>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newCourse.title.trim()) return;
                    onAddCourse({
                      id: `course-${Date.now()}`,
                      ...newCourse,
                      tuition: Number(newCourse.tuition),
                      level: 'Mọi trình độ',
                      coachAvatar:
                        'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&auto=format&fit=crop&q=80',
                      coachTitle: 'PPR Certified Coach',
                      maxStudents: 8,
                      enrolledCount: 0,
                      rating: 5.0,
                      reviewsCount: 10,
                      featured: true,
                      badge: 'Khóa Mới',
                      image:
                        'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80',
                      benefits: ['Giáo trình chuẩn USA Pickleball', 'Miễn phí mượn vợt & bóng'],
                      syllabus: ['Phần 1: Kỹ thuật nền tảng', 'Phần 2: Chiến thuật thực chiến']
                    });
                    setNewCourse({ ...newCourse, title: '', summary: '' });
                  }}
                  className="small"
                >
                  <div className="mb-2">
                    <label className="form-label fw-bold mb-1">Tên khóa học *</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={newCourse.title}
                      onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label fw-bold mb-1">Học phí (VNĐ)</label>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      value={newCourse.tuition}
                      onChange={(e) => setNewCourse({ ...newCourse, tuition: e.target.value })}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label fw-bold mb-1">HLV phụ trách</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={newCourse.coach}
                      onChange={(e) => setNewCourse({ ...newCourse, coach: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold mb-1">Lịch học</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={newCourse.schedule}
                      onChange={(e) => setNewCourse({ ...newCourse, schedule: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn vp-btn-lime w-100 fw-bold py-2">
                    + Thêm Khóa Học
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            MENU 5: HỒ SƠ HỌC VIÊN GHI DANH
           =================================================================== */}
        {activeMenu === 'enrollments' && (
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h5 className="fw-extrabold text-dark mb-3">
              Quản Lý Hồ Sơ Học Viên Ghi Danh ({enrollments.length} Hồ Sơ)
            </h5>
            <div className="table-responsive">
              <table className="table table-bordered align-middle small">
                <thead className="table-dark">
                  <tr>
                    <th>Mã Hồ Sơ</th>
                    <th>Họ Tên Học Viên</th>
                    <th>Khóa Học Đăng Ký</th>
                    <th>Học Phí</th>
                    <th>Trạng Thái</th>
                    <th>Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((enr) => (
                    <tr key={enr.id}>
                      <td className="fw-bold">{enr.id}</td>
                      <td>
                        <div className="fw-bold">{enr.studentName}</div>
                        <div className="text-secondary">
                          {enr.studentPhone} • {enr.studentEmail}
                        </div>
                      </td>
                      <td>{enr.courseTitle}</td>
                      <td className="fw-bold text-danger">{formatVND(enr.tuition)}</td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={enr.status || 'confirmed'}
                          onChange={(e) => onUpdateEnrollment(enr.id, { status: e.target.value })}
                        >
                          <option value="pending">Chờ duyệt</option>
                          <option value="confirmed">Đang theo học</option>
                          <option value="completed">Đã tốt nghiệp</option>
                          <option value="cancelled">Đã hủy</option>
                        </select>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => onDeleteEnrollment(enr.id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================================================================
            MENU 6: KHO PRO SHOP & ĐƠN HÀNG
           =================================================================== */}
        {activeMenu === 'shop' && (
          <div className="row g-4">
            <div className="col-xl-8">
              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                <h5 className="fw-extrabold text-dark mb-3">
                  Đơn Đặt Mua Dụng Cụ Pro Shop ({shopOrders.length})
                </h5>
                <div className="table-responsive">
                  <table className="table table-bordered align-middle small">
                    <thead className="table-dark">
                      <tr>
                        <th>Mã Đơn</th>
                        <th>Khách Hàng</th>
                        <th>Sản Phẩm</th>
                        <th>Tổng Tiền</th>
                        <th>Trạng Thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shopOrders.map((ord) => (
                        <tr key={ord.id}>
                          <td className="fw-bold">{ord.id}</td>
                          <td>
                            <div className="fw-bold">{ord.customerName}</div>
                            <div className="text-secondary">{ord.customerPhone}</div>
                          </td>
                          <td>
                            {ord.items.map((it, i) => (
                              <div key={i}>
                                • {it.product.name} (x{it.quantity})
                              </div>
                            ))}
                          </td>
                          <td className="fw-bold text-danger">{formatVND(ord.totalAmount)}</td>
                          <td>
                            <select
                              className="form-select form-select-sm"
                              value={ord.status || 'processing'}
                              onChange={(e) => onUpdateShopOrderStatus(ord.id, e.target.value)}
                            >
                              <option value="processing">Đang chuẩn bị</option>
                              <option value="shipping">Đang giao</option>
                              <option value="delivered">Đã giao</option>
                              <option value="cancelled">Đã hủy</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-extrabold text-dark mb-3">
                  Danh Sách Dụng Cụ Trong Kho ({products.length})
                </h5>
                <div className="table-responsive">
                  <table className="table table-hover align-middle small">
                    <thead className="table-light">
                      <tr>
                        <th>Tên Sản Phẩm</th>
                        <th>Danh Mục</th>
                        <th>Giá Bán</th>
                        <th>Tồn Kho</th>
                        <th>Xóa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id}>
                          <td className="fw-bold">{p.name}</td>
                          <td>{p.categoryLabel}</td>
                          <td className="text-danger fw-bold">{formatVND(p.price)}</td>
                          <td>{p.stock}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => onDeleteProduct(p.id)}
                              className="btn btn-sm btn-outline-danger"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-xl-4">
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-extrabold text-dark mb-3">Thêm Sản Phẩm Mới</h5>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newProductForm.name.trim()) return;
                    onAddProduct({
                      id: `prod-${Date.now()}`,
                      ...newProductForm,
                      price: Number(newProductForm.price),
                      originalPrice: Number(newProductForm.originalPrice),
                      stock: Number(newProductForm.stock),
                      rating: 5.0,
                      reviews: 10,
                      badge: 'Mới',
                      image:
                        'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&auto=format&fit=crop&q=80',
                      description: 'Dụng cụ Pickleball chính hãng phân phối tại Học viện.'
                    });
                    setNewProductForm({ ...newProductForm, name: '' });
                  }}
                  className="small"
                >
                  <div className="mb-2">
                    <label className="form-label fw-bold mb-1">Tên dụng cụ *</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={newProductForm.name}
                      onChange={(e) =>
                        setNewProductForm({ ...newProductForm, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label fw-bold mb-1">Giá bán (VNĐ)</label>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      value={newProductForm.price}
                      onChange={(e) =>
                        setNewProductForm({ ...newProductForm, price: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold mb-1">Tồn kho</label>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      value={newProductForm.stock}
                      onChange={(e) =>
                        setNewProductForm({ ...newProductForm, stock: e.target.value })
                      }
                    />
                  </div>
                  <button type="submit" className="btn vp-btn-lime w-100 fw-bold py-2">
                    + Lưu Sản Phẩm
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            MENU 7: TÀI KHOẢN & PHÂN QUYỀN
           =================================================================== */}
        {activeMenu === 'users' && (
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h5 className="fw-extrabold text-dark mb-3">
              Quản Lý Tài Khoản Thành Viên & Phân Quyền ({users.length})
            </h5>
            <div className="table-responsive">
              <table className="table table-hover align-middle small">
                <thead className="table-dark">
                  <tr>
                    <th>Họ Tên</th>
                    <th>Email / SĐT</th>
                    <th>Vai Trò (Role)</th>
                    <th>Trạng Thái</th>
                    <th>Khóa / Mở Khóa</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td className="fw-bold">{u.name}</td>
                      <td>
                        {u.email} • {u.phone}
                      </td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={u.role}
                          onChange={(e) => changeUserRole(u.id, e.target.value)}
                        >
                          <option value="student">Học viên (Student)</option>
                          <option value="coach">Huấn luyện viên (Coach)</option>
                          <option value="admin">Quản trị viên (Admin)</option>
                        </select>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            u.status === 'active' ? 'bg-success' : 'bg-danger'
                          }`}
                        >
                          {u.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => toggleUserStatus(u.id)}
                          className={`btn btn-sm ${
                            u.status === 'active' ? 'btn-outline-danger' : 'btn-outline-success'
                          }`}
                        >
                          {u.status === 'active' ? 'Khóa TK' : 'Mở TK'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================================================================
            MENU 8: HỘP THƯ LIÊN HỆ
           =================================================================== */}
        {activeMenu === 'contacts' && (
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h5 className="fw-extrabold text-dark mb-3">
              Hộp Thư Tư Vấn & Hợp Tác Doanh Nghiệp ({contactMessages.length})
            </h5>
            <div className="table-responsive">
              <table className="table table-bordered align-middle small">
                <thead className="table-dark">
                  <tr>
                    <th>Mã</th>
                    <th>Khách Hàng</th>
                    <th>Chủ Đề</th>
                    <th>Nội Dung</th>
                    <th>Trạng Thái</th>
                  </tr>
                </thead>
                <tbody>
                  {contactMessages.map((msg) => (
                    <tr key={msg.id}>
                      <td className="fw-bold">{msg.id}</td>
                      <td>
                        <div className="fw-bold">{msg.name}</div>
                        <div>{msg.phone}</div>
                      </td>
                      <td className="fw-bold text-success">{msg.subject}</td>
                      <td>{msg.message}</td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={msg.status || 'new'}
                          onChange={(e) => onUpdateContactStatus(msg.id, e.target.value)}
                        >
                          <option value="new">Mới tiếp nhận</option>
                          <option value="replied">Đã phản hồi</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
