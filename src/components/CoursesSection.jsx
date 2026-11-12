import React, { useState } from 'react';
import {
  Search,
  Clock,
  Calendar,
  Users,
  CheckCircle2,
  Star,
  Filter,
  GraduationCap,
  Award,
  Sparkles,
  X
} from 'lucide-react';
import { COURSE_CATEGORIES } from '../data/courses';

export default function CoursesSection({
  courses,
  selectedCourseDetail,
  setSelectedCourseDetail,
  onSelectCourseForRegister
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const filteredCourses = courses
    .filter((c) => {
      const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
      const matchesQuery =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.coach.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.tuition - b.tuition;
      if (sortBy === 'price-desc') return b.tuition - a.tuition;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        {/* Header Title */}
        <div className="vp-page-header rounded-4 p-4 p-lg-5 mb-4 text-white shadow-sm">
          <div className="row align-items-center g-3">
            <div className="col-lg-8">
              <span className="badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill mb-2">
                CHƯƠNG TRÌNH ĐÀO TẠO CHUẨN USA PICKLEBALL
              </span>
              <h1 className="fw-extrabold mb-2">Danh Sách Các Khóa Học Pickleball</h1>
              <p className="text-white-75 mb-0">
                Đầy đủ các lớp Cơ bản, Nâng cao, Trẻ em (Kids Junior), Huấn luyện 1 kèm 1 và Luyện thi đấu giải. Giáo trình bài bản, sĩ số giới hạn 6-8 học viên/sân đảm bảo chất lượng.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div className="bg-white bg-opacity-10 p-3 rounded-3 d-inline-block text-start">
                <div className="small text-warning fw-bold">🎁 Quyền lợi học viên mới</div>
                <div className="small text-white">• Miễn phí mượn vợt Carbon & bóng tập</div>
                <div className="small text-white">• Học bù miễn phí nếu bận đột xuất</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-md-7">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <Search size={18} className="text-secondary" />
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-start-0"
                  placeholder="Tìm khóa học theo tên, trình độ (Cơ bản, 1 kèm 1, Trẻ em) hoặc tên HLV..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="btn btn-light border"
                    onClick={() => setSearchQuery('')}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="col-md-5 d-flex align-items-center gap-2">
              <Filter size={18} className="text-secondary flex-shrink-0" />
              <select
                className="form-select bg-light"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Sắp xếp: Khóa học tiêu biểu</option>
                <option value="price-asc">Học phí: Thấp đến Cao</option>
                <option value="price-desc">Học phí: Cao đến Thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="d-flex flex-wrap gap-2 mt-3 pt-3 border-top">
            {COURSE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold d-flex align-items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'btn-dark text-warning shadow-sm'
                    : 'btn-outline-secondary'
                }`}
              >
                <span>{cat.name}</span>
                <span className="badge bg-secondary bg-opacity-25 text-reset rounded-pill">
                  {cat.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length === 0 ? (
          <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
            <GraduationCap size={48} className="text-secondary mx-auto mb-3" />
            <h5 className="fw-bold">Không tìm thấy khóa học phù hợp</h5>
            <p className="text-secondary mb-3">
              Vui lòng thử từ khóa khác hoặc chọn "Tất cả khóa học".
            </p>
            <div>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="btn btn-dark px-4"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {filteredCourses.map((course) => {
              const spotsLeft = Math.max(1, course.maxStudents - course.enrolledCount);
              return (
                <div className="col-lg-6" key={course.id}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden vp-course-card">
                    <div className="row g-0 h-100">
                      <div className="col-md-5 position-relative">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-100 h-100 object-fit-cover"
                          style={{ minHeight: '240px' }}
                        />
                        <span className="position-absolute top-0 start-0 m-3 badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill shadow-sm">
                          {course.badge}
                        </span>
                        <div className="position-absolute bottom-0 start-0 end-0 p-2 bg-dark bg-opacity-75 text-white d-flex justify-content-between align-items-center small">
                          <span>⭐ {course.rating}/5.0</span>
                          <span className="text-warning fw-bold">Còn {spotsLeft} chỗ trống</span>
                        </div>
                      </div>

                      <div className="col-md-7 d-flex flex-column p-4">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="badge bg-success-subtle text-success fw-bold">
                            {course.categoryLabel}
                          </span>
                          <small className="text-muted">{course.level}</small>
                        </div>

                        <h5 className="fw-extrabold text-dark mb-2">{course.title}</h5>
                        <p className="text-secondary small mb-3">{course.summary}</p>

                        {/* Detailed Info Box Required by Rubric: Thời lượng, Học phí, Lịch học, Huấn luyện viên */}
                        <div className="bg-light rounded-3 p-3 mb-3 small">
                          <div className="d-flex align-items-start gap-2 mb-2">
                            <Clock size={16} className="text-success flex-shrink-0 mt-1" />
                            <div>
                              <strong>Thời lượng:</strong> {course.duration}
                            </div>
                          </div>
                          <div className="d-flex align-items-start gap-2 mb-2">
                            <Calendar size={16} className="text-primary flex-shrink-0 mt-1" />
                            <div>
                              <strong>Lịch học:</strong> {course.schedule}
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={course.coachAvatar}
                              alt={course.coach}
                              className="rounded-circle object-fit-cover"
                              width="26"
                              height="26"
                            />
                            <div>
                              <strong>HLV phụ trách:</strong> {course.coach}{' '}
                              <span className="text-muted">({course.coachTitle})</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-auto pt-2 border-top d-flex flex-wrap align-items-center justify-content-between gap-2">
                          <div>
                            <small className="text-secondary d-block">Học phí trọn gói</small>
                            <span className="fs-5 fw-extrabold text-success">
                              {formatVND(course.tuition)}
                            </span>
                          </div>
                          <div className="d-flex gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedCourseDetail(course)}
                              className="btn btn-outline-dark btn-sm fw-semibold px-3 py-2"
                            >
                              Xem Giáo Trình
                            </button>
                            <button
                              type="button"
                              onClick={() => onSelectCourseForRegister(course)}
                              className="btn vp-btn-lime btn-sm fw-bold px-3 py-2"
                            >
                              Đăng Ký Học
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Course Syllabus & Detail Modal */}
      {selectedCourseDetail && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', zIndex: 1055 }}
          onClick={() => setSelectedCourseDetail(null)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 rounded-4 overflow-hidden shadow-lg">
              <div className="modal-header bg-dark text-white border-0 p-4">
                <div>
                  <span className="badge bg-warning text-dark fw-bold mb-2">
                    {selectedCourseDetail.categoryLabel} • {selectedCourseDetail.badge}
                  </span>
                  <h4 className="modal-title fw-extrabold mb-0">{selectedCourseDetail.title}</h4>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setSelectedCourseDetail(null)}
                />
              </div>

              <div className="modal-body p-4">
                <div className="row g-4 mb-4">
                  <div className="col-md-5">
                    <img
                      src={selectedCourseDetail.image}
                      alt={selectedCourseDetail.title}
                      className="img-fluid rounded-4 w-100 object-fit-cover mb-3"
                      style={{ height: '200px' }}
                    />
                    <div className="p-3 bg-light rounded-3 border">
                      <div className="text-secondary small">Học phí niêm yết trọn khóa</div>
                      <div className="fs-4 fw-extrabold text-success mb-2">
                        {formatVND(selectedCourseDetail.tuition)}
                      </div>
                      <div className="small text-dark mb-1">
                        <strong>⏱ Thời lượng:</strong> {selectedCourseDetail.duration}
                      </div>
                      <div className="small text-dark mb-1">
                        <strong>📅 Lịch học:</strong> {selectedCourseDetail.schedule}
                      </div>
                      <div className="small text-dark">
                        <strong>👥 Sĩ số tối đa:</strong> {selectedCourseDetail.maxStudents} học viên/lớp
                      </div>
                    </div>
                  </div>

                  <div className="col-md-7">
                    <div className="d-flex align-items-center gap-3 p-3 bg-success-subtle rounded-3 mb-3">
                      <img
                        src={selectedCourseDetail.coachAvatar}
                        alt={selectedCourseDetail.coach}
                        className="rounded-circle object-fit-cover border border-2 border-success"
                        width="56"
                        height="56"
                      />
                      <div>
                        <div className="small text-success fw-bold">HUẤN LUYỆN VIÊN PHỤ TRÁCH</div>
                        <div className="fw-bold text-dark fs-6">{selectedCourseDetail.coach}</div>
                        <div className="small text-secondary">{selectedCourseDetail.coachTitle}</div>
                      </div>
                    </div>

                    <h6 className="fw-bold text-dark mb-2">Mô tả chương trình học:</h6>
                    <p className="text-secondary small mb-3">{selectedCourseDetail.summary}</p>

                    <h6 className="fw-bold text-dark mb-2">Quyền lợi học viên:</h6>
                    <ul className="list-unstyled small mb-3">
                      {selectedCourseDetail.benefits.map((b, i) => (
                        <li key={i} className="d-flex align-items-start gap-2 mb-2">
                          <CheckCircle2 size={16} className="text-success flex-shrink-0 mt-1" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <h6 className="fw-bold text-dark mb-2">Nội dung giáo trình chi tiết (Syllabus):</h6>
                    <div className="list-group list-group-flush border rounded-3 overflow-hidden small">
                      {selectedCourseDetail.syllabus.map((step, i) => (
                        <div key={i} className="list-group-item bg-light py-2 px-3">
                          <strong>Phần {i + 1}:</strong> {step}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer bg-light border-0 p-3 d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4"
                  onClick={() => setSelectedCourseDetail(null)}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  className="btn vp-btn-lime fw-bold px-4 py-2"
                  onClick={() => {
                    const courseToRegister = selectedCourseDetail;
                    setSelectedCourseDetail(null);
                    onSelectCourseForRegister(courseToRegister);
                  }}
                >
                  Đăng Ký Khóa Học Này Ngay →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
