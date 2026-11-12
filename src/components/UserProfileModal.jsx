import React, { useState, useEffect } from 'react';
import {
  User,
  GraduationCap,
  Calendar,
  ShoppingBag,
  Award,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function UserProfileModal({
  isOpen,
  onClose,
  enrollments,
  courtBookings,
  onCancelCourtBooking,
  shopOrders
}) {
  const { currentUser, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('learning');
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    address: '',
    level: ''
  });

  useEffect(() => {
    if (currentUser) {
      setProfileForm({
        name: currentUser.name || '',
        phone: currentUser.phone || '',
        address: currentUser.address || '',
        level: currentUser.level || 'DUPR 2.5 - Beginner'
      });
    }
  }, [currentUser]);

  if (!isOpen || !currentUser) return null;

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Filter personal records for Student, or show all for Admin/Coach
  const myEnrollments =
    currentUser.role === 'student'
      ? enrollments.filter(
          (e) =>
            e.studentEmail?.toLowerCase() === currentUser.email.toLowerCase() ||
            e.studentPhone === currentUser.phone ||
            e.studentName?.toLowerCase() === currentUser.name.toLowerCase()
        )
      : enrollments;

  const myCourtBookings =
    currentUser.role === 'student'
      ? courtBookings.filter(
          (c) =>
            c.customerEmail?.toLowerCase() === currentUser.email.toLowerCase() ||
            c.customerPhone === currentUser.phone ||
            c.customerName?.toLowerCase() === currentUser.name.toLowerCase()
        )
      : courtBookings;

  const myShopOrders =
    currentUser.role === 'student'
      ? shopOrders.filter(
          (o) =>
            o.customerEmail?.toLowerCase() === currentUser.email.toLowerCase() ||
            o.customerPhone === currentUser.phone ||
            o.customerName?.toLowerCase() === currentUser.name.toLowerCase()
        )
      : shopOrders;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.78)', zIndex: 1060 }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 rounded-4 overflow-hidden shadow-lg">
          <div className="modal-header bg-dark text-white border-0 p-4">
            <div className="d-flex align-items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="rounded-circle object-fit-cover border border-2 border-warning"
                width="60"
                height="60"
              />
              <div>
                <span className="badge bg-warning text-dark fw-bold mb-1">
                  🏆 {currentUser.level}
                </span>
                <h5 className="modal-title fw-extrabold mb-0">{currentUser.name}</h5>
                <small className="text-white-50">
                  {currentUser.email} • SĐT: {currentUser.phone}
                </small>
              </div>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} />
          </div>

          <div className="modal-body p-4">
            {/* Tabs */}
            <div className="nav nav-pills gap-2 mb-4 border-bottom pb-3">
              <button
                type="button"
                className={`btn btn-sm fw-bold d-flex align-items-center gap-1 ${
                  activeTab === 'learning' ? 'btn-dark text-warning' : 'btn-outline-secondary'
                }`}
                onClick={() => setActiveTab('learning')}
              >
                <GraduationCap size={16} /> Tiến Độ & Khóa Học ({myEnrollments.length})
              </button>
              <button
                type="button"
                className={`btn btn-sm fw-bold d-flex align-items-center gap-1 ${
                  activeTab === 'courts' ? 'btn-dark text-warning' : 'btn-outline-secondary'
                }`}
                onClick={() => setActiveTab('courts')}
              >
                <Calendar size={16} /> Lịch Đặt Sân Tập ({myCourtBookings.length})
              </button>
              <button
                type="button"
                className={`btn btn-sm fw-bold d-flex align-items-center gap-1 ${
                  activeTab === 'orders' ? 'btn-dark text-warning' : 'btn-outline-secondary'
                }`}
                onClick={() => setActiveTab('orders')}
              >
                <ShoppingBag size={16} /> Đơn Hàng Dụng Cụ ({myShopOrders.length})
              </button>
              <button
                type="button"
                className={`btn btn-sm fw-bold d-flex align-items-center gap-1 ${
                  activeTab === 'info' ? 'btn-dark text-warning' : 'btn-outline-secondary'
                }`}
                onClick={() => setActiveTab('info')}
              >
                <User size={16} /> Hồ Sơ Cá Nhân
              </button>
            </div>

            {/* Tab 1: Learning History & Coach Feedback */}
            {activeTab === 'learning' && (
              <div>
                <h6 className="fw-bold text-dark mb-3">
                  Hồ Sơ Học Tập, Điểm Danh Chuyên Cần & Nhận Xét Từ Huấn Luyện Viên
                </h6>
                {myEnrollments.length === 0 ? (
                  <p className="text-secondary small">
                    Bạn chưa có khóa học nào. Hãy đăng ký khóa học để bắt đầu lộ trình nâng hạng DUPR!
                  </p>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {myEnrollments.map((enr) => (
                      <div key={enr.id} className="p-3 bg-light rounded-4 border">
                        <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                          <span className="fw-extrabold text-success fs-6">{enr.courseTitle}</span>
                          <span
                            className={`badge ${
                              enr.status === 'completed'
                                ? 'bg-primary'
                                : enr.status === 'confirmed'
                                ? 'bg-success'
                                : 'bg-warning text-dark'
                            }`}
                          >
                            {enr.status === 'completed'
                              ? 'Đã tốt nghiệp'
                              : enr.status === 'confirmed'
                              ? 'Đang theo học'
                              : 'Chờ xác nhận'}
                          </span>
                        </div>
                        <div className="row g-2 small text-secondary mb-2">
                          <div className="col-sm-6">
                            <strong>Mã hồ sơ:</strong> #{enr.id} ({enr.studentName})
                          </div>
                          <div className="col-sm-6">
                            <strong>Lịch học:</strong> {enr.preferredSchedule}
                          </div>
                          <div className="col-sm-6">
                            <strong>Chuyên cần:</strong>{' '}
                            <span className="badge bg-info text-dark">
                              {enr.attendance || 'Mới ghi danh'}
                            </span>
                          </div>
                          <div className="col-sm-6">
                            <strong>Đánh giá DUPR:</strong>{' '}
                            <strong className="text-primary">
                              {enr.duprEvaluation || 'Sẽ kiểm tra ở buổi học đầu'}
                            </strong>
                          </div>
                        </div>
                        {enr.coachFeedback && (
                          <div className="p-2 bg-white rounded-3 border small text-dark">
                            <strong>📋 Nhận xét của HLV:</strong>{' '}
                            <span className="fst-italic">"{enr.coachFeedback}"</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Court Bookings */}
            {activeTab === 'courts' && (
              <div>
                <h6 className="fw-bold text-dark mb-3">Lịch Sử Đặt Sân Tập Theo Giờ</h6>
                {myCourtBookings.length === 0 ? (
                  <p className="text-secondary small">Bạn chưa có lịch đặt sân tập nào.</p>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {myCourtBookings.map((cb) => (
                      <div key={cb.id} className="p-3 bg-light rounded-4 border">
                        <div className="d-flex flex-wrap justify-content-between align-items-center mb-1">
                          <strong className="text-dark">{cb.courtName}</strong>
                          <div className="d-flex align-items-center gap-2">
                            <span
                              className={`badge ${
                                cb.status === 'cancelled' ? 'bg-danger' : 'bg-success'
                              }`}
                            >
                              {cb.status === 'cancelled' ? 'Đã hủy' : `Mã sân #${cb.id}`}
                            </span>
                            {cb.status !== 'cancelled' && onCancelCourtBooking && (
                              <button
                                type="button"
                                onClick={() => onCancelCourtBooking(cb.id)}
                                className="btn btn-sm btn-outline-danger py-0 px-2"
                              >
                                Hủy lịch
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="small text-secondary">
                          📅 Ngày: <strong>{cb.date}</strong> • 🕒 Ca: <strong>{cb.time}</strong> •
                          Tổng phí: <strong className="text-danger">{formatVND(cb.totalPrice)}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Pro Shop Orders */}
            {activeTab === 'orders' && (
              <div>
                <h6 className="fw-bold text-dark mb-3">Đơn Mua Dụng Cụ Pro Shop</h6>
                {myShopOrders.length === 0 ? (
                  <p className="text-secondary small">Bạn chưa có đơn hàng dụng cụ nào.</p>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {myShopOrders.map((ord) => (
                      <div key={ord.id} className="p-3 bg-light rounded-4 border small">
                        <div className="d-flex justify-content-between mb-1">
                          <strong>Mã đơn #{ord.id}</strong>
                          <span className="badge bg-success">
                            {ord.status === 'delivered'
                              ? 'Đã giao thành công'
                              : ord.status === 'shipping'
                              ? 'Đang giao hàng'
                              : 'Đã xác nhận'}
                          </span>
                        </div>
                        <div>Người nhận: {ord.customerName} ({ord.customerPhone})</div>
                        <div>Địa chỉ nhận: {ord.address}</div>
                        <div className="mt-1">
                          {ord.items?.map((it, idx) => (
                            <div key={idx} className="text-secondary">
                              • {it.product.name} (x{it.quantity})
                            </div>
                          ))}
                        </div>
                        <div className="fw-bold text-danger mt-2 pt-2 border-top">
                          Tổng thanh toán: {formatVND(ord.totalAmount)} ({ord.paymentMethod})
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 4: Update Personal Info */}
            {activeTab === 'info' && (
              <form onSubmit={handleSaveProfile}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Họ và tên</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Số điện thoại</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Địa chỉ liên hệ / Nhận dụng cụ</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn vp-btn-lime fw-bold px-4">
                  Lưu Thay Đổi Hồ Sơ
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
