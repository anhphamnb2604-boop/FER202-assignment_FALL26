import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Award,
  CheckCircle2,
  Send,
  AlertCircle,
  ShieldCheck,
  Users,
  Trophy,
  Building2
} from 'lucide-react';

export default function AboutContactSection({ onAddContactMessage, showToast }) {
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Tư vấn chọn khóa học phù hợp trình độ',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const milestones = [
    {
      year: '2022',
      title: 'Khởi nguồn Câu lạc bộ Tiên phong',
      desc: 'Thành lập CLB Pickleball Sala với 3 sân ngoài trời đầu tiên tại TP. Thủ Đức, quy tụ hơn 200 thành viên đam mê bộ môn thể thao mới từ Mỹ.'
    },
    {
      year: '2023',
      title: 'Chuẩn hóa Giáo trình Quốc tế PPR (USA)',
      desc: 'Hợp tác cùng Hiệp hội Huấn luyện viên Pickleball Chuyên nghiệp (PPR) & IPTPA Hoa Kỳ để xây dựng giáo trình đào tạo bài bản từ cấp độ 2.0 đến 5.0.'
    },
    {
      year: '2024',
      title: 'Khánh thành Tổ hợp 12 Sân Indoor Máy Lạnh',
      desc: 'Nâng cấp thành VN Pickleball Academy với 6 sân Indoor điều hòa trung tâm và 6 sân mái che chuẩn thi đấu PPA Tour, tích hợp hệ thống phân tích video AI.'
    },
    {
      year: '2025 - 2026',
      title: 'Học viện Đào tạo Pickleball Hàng đầu Việt Nam',
      desc: 'Đào tạo thành công hơn 2,500 học viên mọi lứa tuổi, tổ chức 18 giải đấu tính điểm DUPR quốc tế và trở thành đối tác chính thức của JOOLA & Selkirk.'
    }
  ];

  const validateContact = () => {
    const newErrors = {};
    if (!contactForm.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ và tên của bạn.';
    }
    const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
    if (!contactForm.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại.';
    } else if (!phoneRegex.test(contactForm.phone.trim().replace(/\s+/g, ''))) {
      newErrors.phone = 'Số điện thoại không đúng định dạng 10 số Việt Nam.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!contactForm.email.trim()) {
      newErrors.email = 'Vui lòng nhập địa chỉ email.';
    } else if (!emailRegex.test(contactForm.email.trim())) {
      newErrors.email = 'Email không hợp lệ.';
    }
    if (!contactForm.message.trim() || contactForm.message.trim().length < 10) {
      newErrors.message = 'Vui lòng nhập nội dung liên hệ tối thiểu 10 ký tự.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateContact()) return;
    if (onAddContactMessage) {
      onAddContactMessage({
        id: `CNT-${Math.floor(1000 + Math.random() * 9000)}`,
        name: contactForm.name.trim(),
        phone: contactForm.phone.trim(),
        email: contactForm.email.trim(),
        subject: contactForm.subject,
        message: contactForm.message.trim(),
        status: 'new',
        createdAt: new Date().toLocaleString('vi-VN')
      });
    }
    setSubmitted(true);
    if (showToast) {
      showToast('Đã gửi tin nhắn liên hệ thành công! Chúng tôi sẽ phản hồi sớm nhất.', 'success');
    }
  };

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        {/* Page Header */}
        <div className="vp-page-header rounded-4 p-4 p-lg-5 mb-5 text-white shadow-sm">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <span className="badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill mb-2">
                VỀ CHÚNG TÔI & KẾT NỐI
              </span>
              <h1 className="fw-extrabold mb-2">Giới Thiệu Học Viện & Liên Hệ</h1>
              <p className="text-white-75 mb-0">
                Tìm hiểu lịch sử hình thành, sứ mệnh phát triển cộng đồng Pickleball Việt Nam và liên hệ trực tiếp với VN Pickleball Academy.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div className="d-inline-flex align-items-center gap-3 bg-white bg-opacity-10 p-3 rounded-4">
                <Trophy size={36} className="text-warning" />
                <div className="text-start">
                  <div className="fw-extrabold fs-5">Top 1 Academy</div>
                  <small className="text-white-75">Chứng nhận USAPA & PPR 2026</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 1. LỊCH SỬ HÌNH THÀNH & SỨ MỆNH */}
        <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5 mb-5 bg-white">
          <div className="row g-4 align-items-center mb-4">
            <div className="col-lg-6">
              <span className="badge bg-success-subtle text-success fw-bold px-3 py-2 rounded-pill mb-2">
                CÂU CHUYỆN & LỊCH SỬ HÌNH THÀNH
              </span>
              <h2 className="fw-extrabold text-dark mb-3">
                Hành Trình Kiến Tạo Học Viện Pickleball Chuẩn Quốc Tế Đầu Tiên
              </h2>
              <p className="text-secondary mb-3">
                Ra đời từ niềm đam mê mãnh liệt với bộ môn thể thao có tốc độ phát triển nhanh nhất hành tinh, <strong>VN Pickleball Academy</strong> được sáng lập bởi các vận động viên kiện tướng quốc gia và chuyên gia huấn luyện quốc tế PPR (Hoa Kỳ).
              </p>
              <p className="text-secondary mb-4">
                Chúng tôi tin rằng bất kỳ ai — từ trẻ nhỏ 6 tuổi, dân văn phòng bận rộn đến người lớn tuổi — đều có thể làm chủ kỹ thuật Pickleball bài bản, rèn luyện sức khỏe tim mạch và phòng tránh chấn thương khi được hướng dẫn đúng phương pháp ngay từ buổi đầu tiên.
              </p>
              <div className="row g-3">
                <div className="col-6">
                  <div className="p-3 bg-light rounded-3 border-start border-4 border-success">
                    <div className="fw-extrabold fs-4 text-dark">10,000 m²</div>
                    <small className="text-secondary">Tổng diện tích tổ hợp sân & Pro Shop</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-light rounded-3 border-start border-4 border-warning">
                    <div className="fw-extrabold fs-4 text-dark">98.6%</div>
                    <small className="text-secondary">Học viên hài lòng & giới thiệu bạn bè</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="row g-3">
                {milestones.map((m, idx) => (
                  <div className="col-12" key={idx}>
                    <div className="p-3 rounded-4 bg-light border d-flex align-items-start gap-3">
                      <span className="badge bg-dark text-warning fw-extrabold px-3 py-2 rounded-3 fs-6 flex-shrink-0">
                        {m.year}
                      </span>
                      <div>
                        <h6 className="fw-bold text-dark mb-1">{m.title}</h6>
                        <p className="text-secondary small mb-0">{m.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. FORM LIÊN HỆ & BẢN ĐỒ VỊ TRÍ GOOGLE MAPS IFRAME */}
        <div className="row g-4">
          {/* Contact Info & Google Maps Iframe */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white d-flex flex-column">
              <h4 className="fw-extrabold text-dark mb-3">Thông Tin Liên Hệ & Bản Đồ Vị Trí</h4>
              <p className="text-secondary small mb-4">
                Mời bạn ghé thăm trực tiếp tổ hợp sân của Học viện để trải nghiệm mặt sân thảm Acrylic 9 lớp và test vợt miễn phí tại Pro Shop.
              </p>

              <div className="d-flex flex-column gap-3 mb-4">
                <div className="d-flex align-items-start gap-3">
                  <div className="vp-icon-box rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="fw-bold text-dark small">Địa chỉ Học viện (Cơ sở chính):</div>
                    <div className="text-secondary small">
                      Số 10 Mai Chí Thọ, Khu đô thị Sala, Phường Thủ Thiêm, TP. Thủ Đức, TP. Hồ Chí Minh
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="vp-icon-box rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="fw-bold text-dark small">Tổng đài Tư vấn & Đặt sân:</div>
                    <div className="text-secondary small">
                      Hotline: <strong>1900 6886</strong> • Zalo Giáo vụ: <strong>0901 234 567</strong>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="vp-icon-box rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="fw-bold text-dark small">Email Liên hệ & Hợp tác:</div>
                    <div className="text-secondary small">
                      tuyensinh@pickleball.edu.vn • admin@pickleball.edu.vn
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="vp-icon-box rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="fw-bold text-dark small">Giờ mở cửa hoạt động:</div>
                    <div className="text-secondary small">
                      05:30 - 22:30 (Tất cả các ngày trong tuần, kể cả Lễ & Tết)
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps Iframe (Core Requirement #4) */}
              <div className="mt-auto rounded-4 overflow-hidden border shadow-sm">
                <iframe
                  title="Bản đồ vị trí VN Pickleball Academy Sala Thủ Thiêm"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.477506378353!2d106.72185107586868!3d10.774692559223718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4670702e31%3A0xa5777fb3853e32ec!2sSala%20Urban%20Area!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s"
                  width="100%"
                  height="280"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 h-100 bg-white">
              <h4 className="fw-extrabold text-dark mb-2">Gửi Yêu Cầu Tư Vấn Hoặc Hợp Tác</h4>
              <p className="text-secondary small mb-4">
                Bạn cần tư vấn lộ trình học cá nhân, đặt lịch tổ chức giải đấu công ty (Corporate Event) hay câu hỏi về khóa học? Hãy để lại lời nhắn bên dưới!
              </p>

              {submitted ? (
                <div className="text-center py-5 my-auto">
                  <div
                    className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: '64px', height: '64px' }}
                  >
                    <CheckCircle2 size={36} />
                  </div>
                  <h5 className="fw-bold text-success mb-2">Đã Gửi Liên Hệ Thành Công!</h5>
                  <p className="text-secondary small mb-4">
                    Cảm ơn <strong>{contactForm.name}</strong>. Chuyên viên tư vấn của Học viện đã nhận được câu hỏi và sẽ phản hồi qua SĐT <strong>{contactForm.phone}</strong> hoặc Email của bạn sớm nhất.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setContactForm({
                        name: '',
                        phone: '',
                        email: '',
                        subject: 'Tư vấn chọn khóa học phù hợp trình độ',
                        message: ''
                      });
                    }}
                    className="btn btn-outline-dark btn-sm px-4"
                  >
                    Gửi tin nhắn khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-dark">
                      Họ và tên của bạn <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Nhập họ và tên..."
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-sm-6">
                      <label className="form-label fw-bold small text-dark">
                        Số điện thoại <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        placeholder="VD: 0901234567"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>

                    <div className="col-sm-6">
                      <label className="form-label fw-bold small text-dark">
                        Địa chỉ Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="email@domain.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold small text-dark">Chủ đề cần hỗ trợ</label>
                    <select
                      className="form-select"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    >
                      <option value="Tư vấn chọn khóa học phù hợp trình độ">
                        Tư vấn chọn khóa học phù hợp trình độ
                      </option>
                      <option value="Đăng ký học thử & Kiểm tra trình độ DUPR">
                        Đăng ký học thử & Kiểm tra trình độ DUPR
                      </option>
                      <option value="Thuê cụm sân tổ chức Giải đấu Công ty / CLB">
                        Thuê cụm sân tổ chức Giải đấu Công ty / CLB
                      </option>
                      <option value="Tư vấn mua vợt & dụng cụ Pro Shop">
                        Tư vấn mua vợt & dụng cụ Pro Shop
                      </option>
                      <option value="Góp ý chất lượng dịch vụ">Góp ý chất lượng dịch vụ</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold small text-dark">
                      Nội dung tin nhắn <span className="text-danger">*</span>
                    </label>
                    <textarea
                      rows="4"
                      className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                      placeholder="Nhập chi tiết câu hỏi hoặc yêu cầu của bạn..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    />
                    {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                  </div>

                  <button
                    type="submit"
                    className="btn vp-btn-lime btn-lg w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
                  >
                    <Send size={18} />
                    <span>Gửi Tin Nhắn Liên Hệ</span>
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
