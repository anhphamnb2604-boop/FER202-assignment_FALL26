import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Zap,
  Sparkles,
  User,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { TIME_SLOTS } from '../data/courts';
import { useAuth } from '../context/AuthContext';

export default function CourtBookingSection({
  courts,
  timeSlots = TIME_SLOTS,
  courtBookings,
  onAddCourtBooking,
  showToast
}) {
  const { currentUser } = useAuth();
  const todayStr = new Date().toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedCourtId, setSelectedCourtId] = useState(courts[0]?.id || 'court-1');
  const [selectedSlotId, setSelectedSlotId] = useState('slot-5');
  const [rentPaddleCount, setRentPaddleCount] = useState(0);
  const [rentBallMachine, setRentBallMachine] = useState(false);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [bookingSuccess, setBookingSuccess] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setCustomerName((prev) => prev || currentUser.name);
      setCustomerPhone((prev) => prev || currentUser.phone);
    }
  }, [currentUser]);

  const selectedCourt = courts.find((c) => c.id === selectedCourtId) || courts[0];
  const selectedSlot = timeSlots.find((s) => s.id === selectedSlotId) || timeSlots[0];

  const isSlotBooked = (courtId, date, slotId) => {
    return courtBookings.some(
      (b) => b.courtId === courtId && b.date === date && b.slotId === slotId && b.status !== 'cancelled'
    );
  };

  // Calculate Total Price (1.5 hour slot)
  const baseSlotPrice = selectedSlot.isPeak
    ? selectedCourt.peakPricePerHour * 1.5
    : selectedCourt.pricePerHour * 1.5;
  const paddleFee = rentPaddleCount * 50000;
  const ballMachineFee = rentBallMachine ? 150000 : 0;
  const totalPrice = baseSlotPrice + paddleFee + ballMachineFee;

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!customerName.trim()) {
      newErrors.customerName = 'Vui lòng nhập họ tên người đặt sân.';
    }
    const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
    if (!customerPhone.trim()) {
      newErrors.customerPhone = 'Vui lòng nhập số điện thoại.';
    } else if (!phoneRegex.test(customerPhone.trim().replace(/\s+/g, ''))) {
      newErrors.customerPhone = 'Số điện thoại không đúng định dạng 10 số Việt Nam.';
    }

    if (isSlotBooked(selectedCourtId, selectedDate, selectedSlotId)) {
      newErrors.slot = 'Khung giờ này vừa có người đặt. Vui lòng chọn khung giờ khác!';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const newBooking = {
      id: `CB-${Math.floor(1000 + Math.random() * 9000)}`,
      courtId: selectedCourt.id,
      courtName: selectedCourt.name,
      date: selectedDate,
      slotId: selectedSlot.id,
      time: selectedSlot.time,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: currentUser ? currentUser.email : 'khach@pickleball.edu.vn',
      rentPaddleCount,
      rentBallMachine,
      totalPrice,
      status: 'confirmed',
      createdAt: new Date().toLocaleString('vi-VN')
    };

    onAddCourtBooking(newBooking);
    setBookingSuccess(newBooking);
    if (showToast) {
      showToast(`Đặt sân thành công! Mã phiếu #${newBooking.id}`, 'success');
    }
  };

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="vp-page-header rounded-4 p-4 p-lg-5 mb-4 text-white shadow-sm">
          <div className="row align-items-center g-3">
            <div className="col-lg-8">
              <span className="badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill mb-2">
                HỆ THỐNG ĐẶT SÂN TRỰC TUYẾN • REAL-TIME COURT BOOKING
              </span>
              <h1 className="fw-extrabold mb-2">Hệ Thống Đặt Sân Tập Pickleball Theo Giờ</h1>
              <p className="text-white-75 mb-0">
                Chọn sân Indoor máy lạnh hoặc sân mái che, kiểm tra khung giờ trống trực quan theo thời gian thực và tùy chọn thuê thêm vợt Carbon hoặc máy bắn bóng Titan Pro.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div className="bg-white bg-opacity-10 p-3 rounded-3 d-inline-block text-start small">
                <div className="text-warning fw-bold">⚡ Bảng giá tiêu chuẩn (Ca 90 phút):</div>
                <div>• Giờ thường (06:00 - 17:30): Từ 190.000đ/giờ</div>
                <div>• Giờ vàng Peak (17:30 - 22:00): Từ 240.000đ/giờ</div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Left: Select Court & Time Slot */}
          <div className="col-lg-8">
            {/* Step 1: Choose Court */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-extrabold text-dark mb-3">
                Bước 1: Chọn Sân Tập Tiêu Chuẩn Quốc Tế
              </h5>
              <div className="row g-3">
                {courts.map((court) => {
                  const isSelected = court.id === selectedCourtId;
                  const isMaint = court.status === 'maintenance';
                  return (
                    <div className="col-md-6" key={court.id}>
                      <div
                        onClick={() => {
                          if (!isMaint) {
                            setSelectedCourtId(court.id);
                            setBookingSuccess(null);
                          }
                        }}
                        style={{ cursor: isMaint ? 'not-allowed' : 'pointer' }}
                        className={`card h-100 rounded-4 overflow-hidden transition-all ${
                          isMaint
                            ? 'border opacity-50 bg-light'
                            : isSelected
                            ? 'border-2 border-success shadow'
                            : 'border shadow-sm opacity-85'
                        }`}
                      >
                        <div className="position-relative">
                          <img
                            src={court.image}
                            alt={court.name}
                            className="w-100 object-fit-cover"
                            style={{ height: '145px' }}
                          />
                          <span className="position-absolute top-0 start-0 m-2 badge bg-dark text-warning">
                            {court.type}
                          </span>
                          {isMaint ? (
                            <span className="position-absolute top-0 end-0 m-2 badge bg-danger">
                              🔧 Đang bảo trì
                            </span>
                          ) : (
                            isSelected && (
                              <span className="position-absolute top-0 end-0 m-2 badge bg-success">
                                ✓ Đang chọn
                              </span>
                            )
                          )}
                        </div>
                        <div className="card-body p-3">
                          <h6 className="fw-bold text-dark mb-1">{court.name}</h6>
                          <p className="text-secondary small mb-2">{court.surface}</p>
                          <div className="d-flex flex-wrap gap-1 mb-2">
                            {court.amenities.map((am, i) => (
                              <span
                                key={i}
                                className="badge bg-light text-secondary border"
                                style={{ fontSize: '0.68rem' }}
                              >
                                {am}
                              </span>
                            ))}
                          </div>
                          <div className="d-flex justify-content-between align-items-center pt-2 border-top small">
                            <span className="text-muted">Giá giờ thường / Peak:</span>
                            <strong className="text-success">
                              {formatVND(court.pricePerHour)} / {formatVND(court.peakPricePerHour)}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Date & Time Slot */}
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
                <h5 className="fw-extrabold text-dark mb-0">
                  Bước 2: Chọn Ngày & Khung Giờ Tập (90 Phút / Ca)
                </h5>
                <div className="d-flex align-items-center gap-2">
                  <Calendar size={18} className="text-success" />
                  <input
                    type="date"
                    className="form-control form-control-sm fw-bold"
                    min={todayStr}
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setBookingSuccess(null);
                    }}
                  />
                </div>
              </div>

              <div className="row g-3 mb-4">
                {timeSlots.map((slot) => {
                  const booked = isSlotBooked(selectedCourtId, selectedDate, slot.id);
                  const active = selectedSlotId === slot.id && !booked;
                  return (
                    <div className="col-6 col-sm-4 col-md-3" key={slot.id}>
                      <button
                        type="button"
                        disabled={booked}
                        onClick={() => {
                          setSelectedSlotId(slot.id);
                          setBookingSuccess(null);
                        }}
                        className={`btn w-100 p-3 rounded-3 text-start position-relative border ${
                          booked
                            ? 'btn-light text-muted opacity-50'
                            : active
                            ? 'vp-slot-active shadow-sm'
                            : 'btn-outline-dark'
                        }`}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <Clock size={14} />
                          {booked ? (
                            <span className="badge bg-secondary" style={{ fontSize: '0.62rem' }}>
                              Đã kín
                            </span>
                          ) : slot.isPeak ? (
                            <span className="badge bg-warning text-dark" style={{ fontSize: '0.62rem' }}>
                              Peak
                            </span>
                          ) : (
                            <span className="badge bg-success-subtle text-success" style={{ fontSize: '0.62rem' }}>
                              Trống
                            </span>
                          )}
                        </div>
                        <div className="fw-bold small">{slot.time}</div>
                        <small className="d-block opacity-75" style={{ fontSize: '0.7rem' }}>
                          {slot.label}
                        </small>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Add-on Equipment Rental */}
              <div className="p-3 bg-light rounded-4 border">
                <h6 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                  <Sparkles size={17} className="text-warning" />
                  <span>Dịch Vụ Tiện Ích Đi Kèm Tại Sân (Tùy chọn)</span>
                </h6>
                <div className="row g-3 align-items-center">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold mb-1">
                      Thuê Vợt Carbon Joola/Selkirk (+50.000đ/cây)
                    </label>
                    <select
                      className="form-select form-select-sm"
                      value={rentPaddleCount}
                      onChange={(e) => setRentPaddleCount(Number(e.target.value))}
                    >
                      <option value={0}>Không thuê vợt (Tự mang vợt)</option>
                      <option value={1}>Thuê 01 Vợt Carbon (+50.000đ)</option>
                      <option value={2}>Thuê 02 Vợt Carbon (+100.000đ)</option>
                      <option value={4}>Thuê 04 Vợt Carbon cho cả sân (+200.000đ)</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check form-switch mt-md-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="ballMachineSwitch"
                        checked={rentBallMachine}
                        onChange={(e) => setRentBallMachine(e.target.checked)}
                      />
                      <label className="form-check-label small fw-semibold" htmlFor="ballMachineSwitch">
                        Thuê Máy Bắn Bóng Tự Động Titan Pro + 100 bóng (+150.000đ/ca)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Summary & Customer Booking Form */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 sticky-lg-top" style={{ top: '90px' }}>
              <h5 className="fw-extrabold text-dark pb-3 mb-3 border-bottom">
                Phiếu Xác Nhận Đặt Sân
              </h5>

              {bookingSuccess ? (
                <div className="text-center py-3">
                  <CheckCircle2 size={48} className="text-success mb-2" />
                  <h5 className="fw-extrabold text-success">Đặt Sân Thành Công!</h5>
                  <p className="small text-secondary mb-3">
                    Mã đặt sân: <strong>#{bookingSuccess.id}</strong>. Vui lòng đọc số điện thoại tại quầy Lễ tân trước giờ chơi 10 phút.
                  </p>
                  <div className="bg-light p-3 rounded-3 text-start small mb-3 border">
                    <div className="mb-1">
                      <strong>Sân:</strong> {bookingSuccess.courtName}
                    </div>
                    <div className="mb-1">
                      <strong>Ngày & Ca:</strong> {bookingSuccess.date} ({bookingSuccess.time})
                    </div>
                    <div className="mb-1">
                      <strong>Người đặt:</strong> {bookingSuccess.customerName} ({bookingSuccess.customerPhone})
                    </div>
                    <div className="text-danger fw-extrabold mt-2 pt-2 border-top">
                      Tổng thanh toán: {formatVND(bookingSuccess.totalPrice)}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBookingSuccess(null)}
                    className="btn btn-outline-dark btn-sm w-100"
                  >
                    Đặt thêm ca khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConfirmBooking} noValidate>
                  <div className="bg-light rounded-3 p-3 small mb-3">
                    <div className="fw-bold text-dark mb-2">{selectedCourt.name}</div>
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-secondary">Ngày đặt sân:</span>
                      <strong className="text-dark">{selectedDate}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-secondary">Khung giờ (90p):</span>
                      <strong className="text-success">{selectedSlot.time}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-secondary">Tiền sân (1.5 giờ):</span>
                      <span>{formatVND(baseSlotPrice)}</span>
                    </div>
                    {rentPaddleCount > 0 && (
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-secondary">Thuê {rentPaddleCount} vợt:</span>
                        <span>{formatVND(paddleFee)}</span>
                      </div>
                    )}
                    {rentBallMachine && (
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-secondary">Máy bắn bóng Titan:</span>
                        <span>{formatVND(ballMachineFee)}</span>
                      </div>
                    )}
                    <div className="d-flex justify-content-between pt-2 mt-2 border-top">
                      <span className="fw-bold text-dark">Tổng cộng:</span>
                      <span className="fs-5 fw-extrabold text-danger">{formatVND(totalPrice)}</span>
                    </div>
                  </div>

                  {errors.slot && (
                    <div className="alert alert-danger py-2 small">{errors.slot}</div>
                  )}

                  <div className="mb-3">
                    <label className="form-label small fw-bold">
                      Họ tên người đặt sân <span className="text-danger">*</span>
                    </label>
                    <div className="input-group input-group-sm">
                      <span className="input-group-text bg-light">
                        <User size={15} />
                      </span>
                      <input
                        type="text"
                        className={`form-control ${errors.customerName ? 'is-invalid' : ''}`}
                        placeholder="Nhập họ và tên..."
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                    </div>
                    {errors.customerName && (
                      <div className="text-danger small mt-1">{errors.customerName}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">
                      Số điện thoại nhận mã sân <span className="text-danger">*</span>
                    </label>
                    <div className="input-group input-group-sm">
                      <span className="input-group-text bg-light">
                        <Phone size={15} />
                      </span>
                      <input
                        type="tel"
                        className={`form-control ${errors.customerPhone ? 'is-invalid' : ''}`}
                        placeholder="VD: 0901234567"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                      />
                    </div>
                    {errors.customerPhone && (
                      <div className="text-danger small mt-1">{errors.customerPhone}</div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn vp-btn-lime w-100 fw-extrabold py-2 shadow-sm"
                  >
                    Xác Nhận Đặt Sân Ngay
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
