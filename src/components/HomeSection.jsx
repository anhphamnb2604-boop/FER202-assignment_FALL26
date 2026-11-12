import React from 'react';
import {
  Award,
  CheckCircle2,
  Clock,
  Users,
  Star,
  ArrowRight,
  Calendar,
  ShieldCheck,
  Sparkles,
  PlayCircle,
  MapPin,
  Trophy,
  Zap
} from 'lucide-react';

export default function HomeSection({
  courses,
  coaches,
  testimonials,
  onNavigate,
  onSelectCourseForRegister,
  onViewCourseDetail
}) {
  const featuredCourses = courses.slice(0, 3);

  const facilityHighlights = [
    {
      icon: ShieldCheck,
      title: '12 Sân Chuẩn Quốc Tế USAPA',
      desc: 'Tổ hợp 6 sân Indoor có điều hòa trung tâm mát lạnh & 6 sân mái che khí động học, mặt thảm Acrylic 9 lớp giảm chấn thương khớp gối.'
    },
    {
      icon: Award,
      title: '100% HLV Chứng Chỉ PPR & IPTPA',
      desc: 'Đội ngũ huấn luyện viên quốc tế & VĐV Quốc gia trực tiếp đứng lớp, giáo trình chuẩn hóa từ Cơ bản (2.0) đến Thi đấu chuyên nghiệp (5.0+).'
    },
    {
      icon: Zap,
      title: 'Công Nghệ Phân Tích AI & Máy Bắn Bóng',
      desc: 'Trang bị hệ thống máy bắn bóng Titan Pro thế hệ mới và Camera AI phân tích kỹ thuật Biomechanics giúp học viên tiến bộ nhanh gấp 3 lần.'
    },
    {
      icon: Trophy,
      title: 'Cấp Điểm Xếp Hạng DUPR Chính Thức',
      desc: 'Tổ chức giải đấu nội bộ hàng tháng, hỗ trợ học viên cọ xát thực chiến và cập nhật điểm trình độ lên hệ thống DUPR toàn cầu.'
    }
  ];

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div>
      {/* 1. HERO BANNER */}
      <section className="vp-hero position-relative overflow-hidden py-5">
        <div className="container py-lg-4 position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center g-4">
            <div className="col-lg-7 text-white">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill vp-badge-hero mb-3">
                <Sparkles size={16} className="text-warning" />
                <span className="small fw-semibold">
                  HỌC VIỆN ĐÀO TẠO PICKLEBALL SỐ 1 VIỆT NAM • CHUẨN USA PICKLEBALL
                </span>
              </div>

              <h1 className="display-5 fw-extrabold mb-3 lh-sm">
                Làm Chủ Kỹ Thuật & Đam Mê <span className="vp-text-lime">Pickleball</span> Cùng Chuyên Gia Quốc Tế
              </h1>

              <p className="lead text-white-75 mb-4" style={{ maxWidth: '620px' }}>
                Hệ thống đào tạo bài bản từ người mới bắt đầu đến vận động viên thi đấu. Trải nghiệm tổ hợp 12 sân Indoor máy lạnh tiêu chuẩn PPA Tour, miễn phí mượn vợt Carbon và cam kết vững kỹ thuật chỉ sau 4 tuần!
              </p>

              {/* CTA Buttons */}
              <div className="d-flex flex-wrap gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => onNavigate('register')}
                  className="btn vp-btn-lime btn-lg fw-bold px-4 d-flex align-items-center gap-2 shadow"
                >
                  <span>Đăng Ký Học Ngay</span>
                  <ArrowRight size={19} />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('courts')}
                  className="btn vp-btn-glass btn-lg text-white fw-semibold px-4 d-flex align-items-center gap-2"
                >
                  <Calendar size={19} className="vp-text-lime" />
                  <span>Đặt Sân Tập Theo Giờ</span>
                </button>
              </div>

              {/* Quick Stats */}
              <div className="row g-3 pt-2 border-top border-secondary border-opacity-50">
                <div className="col-4 col-sm-3">
                  <div className="h3 fw-extrabold vp-text-lime mb-0">2,500+</div>
                  <small className="text-white-50">Học viên tốt nghiệp</small>
                </div>
                <div className="col-4 col-sm-3">
                  <div className="h3 fw-extrabold vp-text-lime mb-0">12 Sân</div>
                  <small className="text-white-50">Indoor & Mái che VIP</small>
                </div>
                <div className="col-4 col-sm-3">
                  <div className="h3 fw-extrabold vp-text-lime mb-0">15+ HLV</div>
                  <small className="text-white-50">Chứng chỉ PPR / DUPR 5.0</small>
                </div>
              </div>
            </div>

            {/* Hero Image Collage Card */}
            <div className="col-lg-5">
              <div className="vp-hero-card p-3 rounded-4 shadow-lg position-relative">
                <img
                  src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=900&auto=format&fit=crop&q=80"
                  alt="Huấn luyện Pickleball chuyên nghiệp"
                  className="img-fluid rounded-4 w-100 object-fit-cover"
                  style={{ height: '360px' }}
                />
                <div className="vp-hero-floating-badge p-3 rounded-4 shadow d-flex align-items-center gap-3">
                  <div className="bg-success text-white rounded-3 p-2 d-flex align-items-center justify-content-center">
                    <PlayCircle size={28} />
                  </div>
                  <div>
                    <div className="fw-bold text-dark small">Đăng ký học thử & Test DUPR</div>
                    <div className="text-success fw-extrabold small">MIỄN PHÍ 100% CUỐI TUẦN NÀY</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ĐIỂM NỔI BẬT: CƠ SỞ VẬT CHẤT & CÔNG NGHỆ ĐÀO TẠO */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center max-w-700 mx-auto mb-5">
            <span className="badge bg-success-subtle text-success fw-bold px-3 py-2 rounded-pill mb-2">
              TẠI SAO CHỌN VN PICKLEBALL ACADEMY?
            </span>
            <h2 className="fw-extrabold text-dark mb-2">
              Hệ Sinh Thái Đào Tạo & Cơ Sở Vật Chất Đẳng Cấp Quốc Tế
            </h2>
            <p className="text-secondary mb-0">
              Không chỉ là nơi học đánh bóng, chúng tôi mang đến môi trường tập luyện chuẩn y học thể thao, an toàn và kết nối cộng đồng đam mê Pickleball văn minh.
            </p>
          </div>

          <div className="row g-4">
            {facilityHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div className="col-md-6 col-lg-3" key={idx}>
                  <div className="card h-100 border-0 shadow-sm vp-feature-card p-4 rounded-4">
                    <div className="vp-icon-box rounded-3 d-inline-flex align-items-center justify-content-center mb-3">
                      <Icon size={26} />
                    </div>
                    <h5 className="fw-bold text-dark mb-2">{item.title}</h5>
                    <p className="text-secondary small mb-0">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. TÓM TẮT CÁC KHÓA HỌC NỔI BẬT */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
            <div>
              <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-2 rounded-pill mb-2">
                CHƯƠNG TRÌNH ĐÀO TẠO TRỌNG ĐIỂM
              </span>
              <h2 className="fw-extrabold text-dark mb-1">Các Khóa Học Pickleball Nổi Bật</h2>
              <p className="text-secondary mb-0">
                Lộ trình cá nhân hóa phù hợp cho mọi độ tuổi và trình độ — Cam kết đầu ra rõ ràng.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('courses')}
              className="btn btn-outline-dark fw-bold d-flex align-items-center gap-2 rounded-3"
            >
              <span>Xem tất cả 6 khóa học</span>
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="row g-4">
            {featuredCourses.map((course) => (
              <div className="col-md-6 col-lg-4" key={course.id}>
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden vp-course-card">
                  <div className="position-relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-100 object-fit-cover"
                      style={{ height: '210px' }}
                    />
                    <span className="position-absolute top-0 start-0 m-3 badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill shadow-sm">
                      {course.badge}
                    </span>
                    <span className="position-absolute bottom-0 end-0 m-3 badge bg-dark bg-opacity-75 text-white px-2 py-1 rounded-2">
                      ⭐ {course.rating} ({course.reviewsCount} học viên)
                    </span>
                  </div>

                  <div className="card-body p-4 d-flex flex-column">
                    <div className="text-success fw-bold small mb-1">{course.categoryLabel}</div>
                    <h5 className="fw-bold text-dark mb-2">{course.title}</h5>
                    <p className="text-secondary small mb-3 flex-grow-1">{course.summary}</p>

                    <div className="bg-light rounded-3 p-3 mb-3 small">
                      <div className="d-flex align-items-center gap-2 mb-2 text-dark">
                        <Clock size={15} className="text-success flex-shrink-0" />
                        <span className="text-truncate">
                          <strong>Thời lượng:</strong> {course.duration}
                        </span>
                      </div>
                      <div className="d-flex align-items-center gap-2 mb-2 text-dark">
                        <Calendar size={15} className="text-primary flex-shrink-0" />
                        <span className="text-truncate">
                          <strong>Lịch học:</strong> {course.schedule}
                        </span>
                      </div>
                      <div className="d-flex align-items-center gap-2 text-dark">
                        <Users size={15} className="text-warning flex-shrink-0" />
                        <span>
                          <strong>HLV:</strong> {course.coach} (Sĩ số tối đa {course.maxStudents} HV)
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between pt-2 border-top mt-auto">
                      <div>
                        <small className="text-secondary d-block">Học phí trọn khóa</small>
                        <span className="fs-5 fw-extrabold text-success">{formatVND(course.tuition)}</span>
                      </div>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          onClick={() => onViewCourseDetail(course)}
                          className="btn btn-sm btn-outline-secondary fw-semibold px-3 py-2"
                        >
                          Chi tiết
                        </button>
                        <button
                          type="button"
                          onClick={() => onSelectCourseForRegister(course)}
                          className="btn btn-sm vp-btn-lime fw-bold px-3 py-2"
                        >
                          Đăng ký
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ĐỘI NGŨ HUẤN LUYỆN VIÊN CHUYÊN NGHIỆP */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center max-w-700 mx-auto mb-5">
            <span className="badge bg-warning-subtle text-dark fw-bold px-3 py-2 rounded-pill mb-2">
              ĐỘI NGŨ CHUYÊN GIA ĐÀO TẠO
            </span>
            <h2 className="fw-extrabold text-dark mb-2">Gặp Gỡ Đội Ngũ Huấn Luyện Viên Hàng Đầu</h2>
            <p className="text-secondary mb-0">
              100% Huấn luyện viên tại học viện sở hữu chứng chỉ sư phạm Pickleball quốc tế (PPR / IPTPA) và kinh nghiệm thi đấu đỉnh cao.
            </p>
          </div>

          <div className="row g-4">
            {coaches.map((coach) => (
              <div className="col-sm-6 col-lg-3" key={coach.id}>
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden vp-coach-card">
                  <img
                    src={coach.avatar}
                    alt={coach.name}
                    className="w-100 object-fit-cover"
                    style={{ height: '240px' }}
                  />
                  <div className="card-body p-3">
                    <span className="badge bg-dark text-warning mb-2" style={{ fontSize: '0.7rem' }}>
                      {coach.certification}
                    </span>
                    <h5 className="fw-bold text-dark mb-1">{coach.name}</h5>
                    <div className="text-success small fw-semibold mb-2">{coach.title}</div>
                    <p className="text-secondary small mb-2">{coach.experience}</p>
                    <div className="p-2 bg-light rounded-3 small text-dark">
                      <strong>Thế mạnh:</strong> {coach.specialty}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CẢM NHẬN HỌC VIÊN (TESTIMONIALS PREVIEW) & BANNER CTA */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
            <div>
              <span className="badge bg-success-subtle text-success fw-bold px-3 py-2 rounded-pill mb-2">
                HỌC VIÊN NÓI GÌ VỀ CHÚNG TÔI?
              </span>
              <h2 className="fw-extrabold text-dark mb-0">Đánh Giá Thực Tế Từ Học Viên Tốt Nghiệp</h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('blog')}
              className="btn btn-outline-success fw-bold btn-sm px-3 py-2"
            >
              Xem thêm Review & Gửi đánh giá →
            </button>
          </div>

          <div className="row g-4 mb-5">
            {testimonials.slice(0, 3).map((item) => (
              <div className="col-md-4" key={item.id}>
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="text-warning d-flex gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="#f59e0b" />
                      ))}
                    </div>
                    <span className="badge bg-success-subtle text-success fw-bold">
                      {item.duprProgress}
                    </span>
                  </div>
                  <p className="text-secondary small fst-italic mb-4 flex-grow-1">"{item.comment}"</p>
                  <div className="d-flex align-items-center gap-3 pt-3 border-top">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="rounded-circle object-fit-cover"
                      width="46"
                      height="46"
                    />
                    <div>
                      <div className="fw-bold text-dark small">{item.name}</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                        {item.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Call-To-Action Box */}
          <div className="vp-cta-banner rounded-4 p-4 p-lg-5 text-white shadow">
            <div className="row align-items-center g-4">
              <div className="col-lg-8">
                <h3 className="fw-extrabold mb-2">
                  Sẵn Sàng Bắt Đầu Hành Trình Pickleball Của Bạn Ngay Hôm Nay?
                </h3>
                <p className="text-white-75 mb-0">
                  Đăng ký trực tuyến chỉ trong 30 giây để nhận ưu đãi giảm 15% học phí, tặng kèm 01 buổi kiểm tra trình độ DUPR và mượn vợt Carbon miễn phí!
                </p>
              </div>
              <div className="col-lg-4 text-lg-end">
                <button
                  type="button"
                  onClick={() => onNavigate('register')}
                  className="btn vp-btn-lime btn-lg fw-bold px-4 py-3 w-100 w-sm-auto"
                >
                  Đăng Ký Khóa Học Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
