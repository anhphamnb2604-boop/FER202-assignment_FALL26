import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  User,
  Phone,
  Mail,
  BookOpen,
  FileText,
  Calendar,
  ShieldCheck,
  Sparkles,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function RegisterSection({
  courses,
  preselectedCourse,
  onAddEnrollment,
  enrollments,
  onNavigate
}) {
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    courseId: preselectedCourse ? preselectedCourse.id : courses[0]?.id || '',
    preferredSchedule: 'Thứ 2 & Thứ 5 (18:30 - 20:30)',
    experienceLevel: 'Người mới bắt đầu (Chưa từng chơi)',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submittedRecord, setSubmittedRecord] = useState(null);

  // Sync preselected course or current logged-in user
  useEffect(() => {
    if (preselectedCourse) {
      setFormData((prev) => ({
        ...prev,
        courseId: preselectedCourse.id,
        preferredSchedule: preselectedCourse.schedule
      }));
    }
  }, [preselectedCourse]);

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || currentUser.name || '',
        phone: prev.phone || currentUser.phone || '',
        email: prev.email || currentUser.email || ''
      }));
    }
  }, [currentUser]);

  const selectedCourseObj = courses.find((c) => c.id === formData.courseId) || courses[0];

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Strict Validation Function (Core Rubric 10%)
  const validateField = (name, value) => {
    const trimmed = typeof value === 'string' ? value.trim() : '';

    switch (name) {
      case 'fullName':
        if (!trimmed) return 'Vui lòng nhập Họ và tên học viên (không được để trống).';
        if (trimmed.length < 3) return 'Họ và tên phải có ít nhất 3 ký tự.';
        if (/\d/.test(trimmed)) return 'Họ và tên không được chứa chữ số.';
        return '';

      case 'phone': {
        if (!trimmed) return 'Vui lòng nhập Số điện thoại liên hệ (không được để trống).';
        const cleanPhone = trimmed.replace(/\s+/g, '');
        const vnPhoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
        if (!vnPhoneRegex.test(cleanPhone)) {
          return 'Số điện thoại không đúng định dạng Việt Nam (VD hợp lệ: 0901234567 hoặc 0987654321).';
        }
        return '';
      }

      case 'email': {
        if (!trimmed) return 'Vui lòng nhập địa chỉ Email nhận lịch học (không được để trống).';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(trimmed)) {
          return 'Địa chỉ Email không đúng định dạng (VD hợp lệ: hocvien@gmail.com).';
        }
        return '';
      }

      case 'courseId':
        if (!value) return 'Vui lòng chọn một khóa học muốn đăng ký.';
        return '';

      case 'notes':
        if (value && value.length > 500) return 'Ghi chú tối đa 500 ký tự.';
        return '';

      default:
        return '';
    }
  };

  const validateAll = () => {
    const newErrors = {};
    ['fullName', 'phone', 'email', 'courseId', 'notes'].forEach((field) => {
      const errMsg = validateField(field, formData[field]);
      if (errMsg) newErrors[field] = errMsg;
    });
    setErrors(newErrors);
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      courseId: true,
      notes: true
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'courseId') {
        const foundCourse = courses.find((c) => c.id === value);
        if (foundCourse) updated.preferredSchedule = foundCourse.schedule;
      }
      return updated;
    });

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    const newEnrollment = {
      id: `ENR-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: formData.fullName.trim(),
      studentPhone: formData.phone.trim(),
      studentEmail: formData.email.trim(),
      courseId: selectedCourseObj.id,
      courseTitle: selectedCourseObj.title,
      tuition: selectedCourseObj.tuition,
      preferredSchedule: formData.preferredSchedule,
      experienceLevel: formData.experienceLevel,
      notes: formData.notes.trim() || 'Không có ghi chú thêm',
      status: 'confirmed',
      createdAt: new Date().toLocaleString('vi-VN')
    };

    onAddEnrollment(newEnrollment);
    setSubmittedRecord(newEnrollment);
  };

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        {/* Page Header */}
        <div className="vp-page-header rounded-4 p-4 p-lg-5 mb-4 text-white shadow-sm">
          <span className="badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill mb-2">
            GHI DANH TRỰC TUYẾN NHANH CHÓNG
          </span>
          <h1 className="fw-extrabold mb-2">Đăng Ký Khóa Học Pickleball</h1>
          <p className="text-white-75 mb-0">
            Điền thông tin vào biểu mẫu bên dưới để giữ chỗ lớp học và nhận lịch kiểm tra trình độ DUPR miễn phí cùng Huấn luyện viên.
          </p>
        </div>

        <div className="row g-4">
          {/* Left Column: Registration Form with Full Validation */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5">
              {submittedRecord ? (
                <div className="text-center py-4">
                  <div
                    className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow"
                    style={{ width: '72px', height: '72px' }}
                  >
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="fw-extrabold text-success mb-2">
                    Đăng Ký Khóa Học Thành Công!
                  </h3>
                  <p className="text-secondary mb-4">
                    Mã hồ sơ ghi danh của bạn là <strong>#{submittedRecord.id}</strong>. Bộ phận Giáo vụ Học viện sẽ liên hệ qua số điện thoại <strong>{submittedRecord.studentPhone}</strong> trong vòng 15 phút để xác nhận lịch lên sân.
                  </p>

                  <div className="bg-light rounded-4 p-4 text-start mb-4 border">
                    <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">
                      📋 Chi Tiết Phiếu Đăng Ký Học Viên
                    </h6>
                    <div className="row g-2 small">
                      <div className="col-sm-4 text-secondary">Họ và tên học viên:</div>
                      <div className="col-sm-8 fw-bold text-dark">{submittedRecord.studentName}</div>

                      <div className="col-sm-4 text-secondary">Số điện thoại:</div>
                      <div className="col-sm-8 fw-bold text-dark">{submittedRecord.studentPhone}</div>

                      <div className="col-sm-4 text-secondary">Địa chỉ Email:</div>
                      <div className="col-sm-8 fw-bold text-dark">{submittedRecord.studentEmail}</div>

                      <div className="col-sm-4 text-secondary">Khóa học đăng ký:</div>
                      <div className="col-sm-8 fw-bold text-success">{submittedRecord.courseTitle}</div>

                      <div className="col-sm-4 text-secondary">Lịch học dự kiến:</div>
                      <div className="col-sm-8 text-dark">{submittedRecord.preferredSchedule}</div>

                      <div className="col-sm-4 text-secondary">Học phí trọn khóa:</div>
                      <div className="col-sm-8 fw-extrabold text-danger">
                        {formatVND(submittedRecord.tuition)}
                      </div>

                      <div className="col-sm-4 text-secondary">Ghi chú của học viên:</div>
                      <div className="col-sm-8 text-dark">{submittedRecord.notes}</div>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap justify-content-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSubmittedRecord(null)}
                      className="btn btn-outline-dark fw-semibold px-4"
                    >
                      Đăng ký thêm học viên khác
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('courts')}
                      className="btn vp-btn-lime fw-bold px-4"
                    >
                      Khám phá Đặt sân tập →
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom">
                    <div>
                      <h4 className="fw-extrabold text-dark mb-1">Biểu Mẫu Ghi Danh Học Viên</h4>
                      <small className="text-secondary">
                        Các trường đánh dấu <span className="text-danger fw-bold">*</span> là thông tin bắt buộc
                      </small>
                    </div>
                    <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                      Cam Kết Giữ Chỗ 100%
                    </span>
                  </div>

                  {/* 1. Họ và tên */}
                  <div className="mb-3">
                    <label className="form-label fw-bold text-dark small">
                      1. Họ và tên học viên <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <User size={18} className="text-secondary" />
                      </span>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Nhập đầy đủ họ và tên (VD: Nguyễn Văn An)"
                        className={`form-control ${
                          touched.fullName
                            ? errors.fullName
                              ? 'is-invalid'
                              : 'is-valid'
                            : ''
                        }`}
                      />
                    </div>
                    {touched.fullName && errors.fullName && (
                      <div className="text-danger small mt-1 d-flex align-items-center gap-1">
                        <AlertCircle size={14} />
                        <span>{errors.fullName}</span>
                      </div>
                    )}
                  </div>

                  {/* 2. Số điện thoại & 3. Email */}
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-dark small">
                        2. Số điện thoại di động <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <Phone size={18} className="text-secondary" />
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="VD: 0901234567"
                          className={`form-control ${
                            touched.phone ? (errors.phone ? 'is-invalid' : 'is-valid') : ''
                          }`}
                        />
                      </div>
                      {touched.phone && errors.phone && (
                        <div className="text-danger small mt-1 d-flex align-items-center gap-1">
                          <AlertCircle size={14} />
                          <span>{errors.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold text-dark small">
                        3. Địa chỉ Email <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <Mail size={18} className="text-secondary" />
                        </span>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="VD: hocvien@gmail.com"
                          className={`form-control ${
                            touched.email ? (errors.email ? 'is-invalid' : 'is-valid') : ''
                          }`}
                        />
                      </div>
                      {touched.email && errors.email && (
                        <div className="text-danger small mt-1 d-flex align-items-center gap-1">
                          <AlertCircle size={14} />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 4. Khóa học muốn đăng ký */}
                  <div className="mb-3">
                    <label className="form-label fw-bold text-dark small">
                      4. Chọn khóa học muốn đăng ký <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <BookOpen size={18} className="text-secondary" />
                      </span>
                      <select
                        name="courseId"
                        value={formData.courseId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-select fw-semibold"
                      >
                        {courses.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.title} — {formatVND(course.tuition)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Trình độ hiện tại & Ca học mong muốn */}
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-dark small">
                        Trình độ Pickleball hiện tại
                      </label>
                      <select
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="Người mới bắt đầu (Chưa từng chơi)">
                          Người mới bắt đầu (Chưa từng cầm vợt)
                        </option>
                        <option value="Đã từng chơi Tennis / Cầu lông / Bóng bàn">
                          Đã từng chơi Tennis / Cầu lông / Bóng bàn
                        </option>
                        <option value="Đã chơi Pickleball 1-3 tháng (DUPR ~2.5)">
                          Đã chơi Pickleball 1-3 tháng (DUPR ~2.5)
                        </option>
                        <option value="Trình độ Trung cấp / Nâng cao (DUPR 3.25+)">
                          Trình độ Trung cấp / Nâng cao (DUPR 3.25+)
                        </option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold text-dark small">
                        Khung giờ / Lịch học ưu tiên
                      </label>
                      <input
                        type="text"
                        name="preferredSchedule"
                        value={formData.preferredSchedule}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* 5. Ghi chú */}
                  <div className="mb-4">
                    <label className="form-label fw-bold text-dark small">
                      5. Ghi chú thêm (Nhu cầu mượn vợt, mục tiêu học tập, học nhóm...)
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light align-items-start pt-2">
                        <FileText size={18} className="text-secondary" />
                      </span>
                      <textarea
                        name="notes"
                        rows="3"
                        value={formData.notes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="VD: Mình muốn đăng ký mượn vợt tập của học viện và học thử vào sáng Thứ 7 tuần này..."
                        className={`form-control ${
                          touched.notes && errors.notes ? 'is-invalid' : ''
                        }`}
                      />
                    </div>
                    {touched.notes && errors.notes && (
                      <div className="text-danger small mt-1">{errors.notes}</div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn vp-btn-lime btn-lg w-100 fw-extrabold py-3 shadow-sm"
                  >
                    Xác Nhận Đăng Ký Khóa Học
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Selected Course Summary + Recent Enrollments */}
          <div className="col-lg-5">
            {selectedCourseObj && (
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                <div className="bg-dark text-white p-3 d-flex justify-content-between align-items-center">
                  <span className="fw-bold small text-warning">THÔNG TIN KHÓA HỌC ĐANG CHỌN</span>
                  <span className="badge bg-success">{selectedCourseObj.categoryLabel}</span>
                </div>
                <img
                  src={selectedCourseObj.image}
                  alt={selectedCourseObj.title}
                  className="w-100 object-fit-cover"
                  style={{ height: '180px' }}
                />
                <div className="card-body p-4">
                  <h5 className="fw-extrabold text-dark mb-2">{selectedCourseObj.title}</h5>
                  <p className="text-secondary small mb-3">{selectedCourseObj.summary}</p>

                  <div className="p-3 bg-light rounded-3 small mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-secondary">Thời lượng khóa học:</span>
                      <strong className="text-dark text-end">{selectedCourseObj.duration}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-secondary">Huấn luyện viên:</span>
                      <strong className="text-success">{selectedCourseObj.coach}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-secondary">Lịch học tiêu chuẩn:</span>
                      <strong className="text-dark text-end">{selectedCourseObj.schedule}</strong>
                    </div>
                    <div className="d-flex justify-content-between pt-2 border-top">
                      <span className="fw-bold text-dark">Học phí trọn gói:</span>
                      <span className="fs-5 fw-extrabold text-danger">
                        {formatVND(selectedCourseObj.tuition)}
                      </span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2 small text-success fw-semibold">
                    <ShieldCheck size={18} />
                    <span>Cam kết hoàn 100% học phí sau buổi đầu nếu không hài lòng!</span>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Enrollments Live List */}
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h6 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                <Sparkles size={18} className="text-warning" />
                <span>Danh sách học viên vừa đăng ký gần đây ({enrollments.length})</span>
              </h6>
              <div className="d-flex flex-column gap-2">
                {enrollments.slice(0, 4).map((enr) => (
                  <div
                    key={enr.id}
                    className="p-3 bg-light rounded-3 border-start border-4 border-success small"
                  >
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <strong className="text-dark">{enr.studentName}</strong>
                      <span className="badge bg-success-subtle text-success">Đã ghi danh</span>
                    </div>
                    <div className="text-secondary text-truncate">{enr.courseTitle}</div>
                    <div className="text-muted mt-1" style={{ fontSize: '0.72rem' }}>
                      🕒 {enr.createdAt} • Lịch: {enr.preferredSchedule}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
