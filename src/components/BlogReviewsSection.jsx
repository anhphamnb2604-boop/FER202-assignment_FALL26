import React, { useState } from 'react';
import {
  BookOpen,
  Star,
  Clock,
  User,
  MessageSquarePlus,
  CheckCircle2,
  X,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function BlogReviewsSection({
  blogs,
  testimonials,
  onAddTestimonial,
  showToast
}) {
  const { currentUser } = useAuth();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    name: currentUser ? currentUser.name : '',
    role: 'Học viên Khóa Cơ bản / Nâng cao',
    courseTaken: 'Pickleball Khởi Đầu Toàn Diện (Beginner 2.0 - 3.0)',
    rating: 5,
    duprProgress: 'Tiến bộ rõ rệt sau khóa học',
    comment: ''
  });
  const [reviewError, setReviewError] = useState('');

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim()) {
      setReviewError('Vui lòng nhập họ và tên của bạn.');
      return;
    }
    if (!reviewForm.comment.trim() || reviewForm.comment.trim().length < 15) {
      setReviewError('Vui lòng nhập nội dung đánh giá tối thiểu 15 ký tự.');
      return;
    }
    setReviewError('');

    const newReview = {
      id: `testi-${Date.now()}`,
      name: reviewForm.name.trim(),
      role: reviewForm.role,
      courseTaken: reviewForm.courseTaken,
      rating: Number(reviewForm.rating),
      duprProgress: reviewForm.duprProgress,
      avatar:
        currentUser?.avatar ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      comment: reviewForm.comment.trim(),
      date: 'Vừa xong'
    };

    onAddTestimonial(newReview);
    setReviewForm({ ...reviewForm, comment: '' });
    if (showToast) {
      showToast('Cảm ơn bạn đã gửi đánh giá! Review đã được hiển thị.', 'success');
    }
  };

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="vp-page-header rounded-4 p-4 p-lg-5 mb-5 text-white shadow-sm">
          <span className="badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill mb-2">
            CẨM NANG KIẾN THỨC & ĐÁNH GIÁ HỌC VIÊN • KNOWLEDGE HUB
          </span>
          <h1 className="fw-extrabold mb-2">Cẩm Nang Luật Chơi Pickleball & Đánh Giá Học Viên</h1>
          <p className="text-white-75 mb-0">
            Tổng hợp kiến thức luật chơi chuẩn USAPA, kỹ thuật 3rd Shot Drop, bí quyết chọn vợt từ chuyên gia và cảm nhận thực tế từ các thế hệ học viên.
          </p>
        </div>

        {/* 1. BLOG CHIA SẺ KIẾN THỨC & LUẬT CHƠI */}
        <div className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h3 className="fw-extrabold text-dark mb-1">
                📚 Bài Viết Chuyên Môn & Luật Chơi Pickleball
              </h3>
              <p className="text-secondary small mb-0">
                Biên soạn trực tiếp bởi Hội đồng Huấn luyện viên PPR tại VN Pickleball Academy
              </p>
            </div>
          </div>

          <div className="row g-4">
            {blogs.map((post) => (
              <div className="col-md-6" key={post.id}>
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden vp-course-card">
                  <div className="row g-0 h-100">
                    <div className="col-sm-5">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-100 h-100 object-fit-cover"
                        style={{ minHeight: '200px' }}
                      />
                    </div>
                    <div className="col-sm-7 p-4 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center small mb-2">
                        <span className="badge bg-success-subtle text-success fw-bold">
                          {post.category}
                        </span>
                        <span className="text-muted">{post.readTime}</span>
                      </div>
                      <h5 className="fw-bold text-dark mb-2">{post.title}</h5>
                      <p className="text-secondary small mb-3 flex-grow-1">{post.excerpt}</p>
                      <div className="d-flex justify-content-between align-items-center pt-2 border-top mt-auto">
                        <small className="text-muted">✍️ {post.author}</small>
                        <button
                          type="button"
                          onClick={() => setSelectedBlog(post)}
                          className="btn btn-sm btn-dark fw-semibold px-3"
                        >
                          Đọc bài viết →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. ĐÁNH GIÁ TỪ HỌC VIÊN CŨ (TESTIMONIALS) & FORM GỬI REVIEW */}
        <div className="row g-4">
          <div className="col-lg-7">
            <h3 className="fw-extrabold text-dark mb-3">
              ⭐ Đánh Giá & Review Từ Học Viên ({testimonials.length})
            </h3>
            <div className="d-flex flex-column gap-3">
              {testimonials.map((item) => (
                <div key={item.id} className="card border-0 shadow-sm rounded-4 p-4">
                  <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="rounded-circle object-fit-cover"
                        width="48"
                        height="48"
                      />
                      <div>
                        <h6 className="fw-bold text-dark mb-0">{item.name}</h6>
                        <small className="text-secondary">{item.courseTaken}</small>
                      </div>
                    </div>
                    <span className="badge bg-success-subtle text-success fw-bold px-3 py-2 rounded-pill">
                      🏆 {item.duprProgress}
                    </span>
                  </div>
                  <div className="text-warning d-flex gap-1 mb-2">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#f59e0b" />
                    ))}
                  </div>
                  <p className="text-dark small mb-1">"{item.comment}"</p>
                  <small className="text-muted" style={{ fontSize: '0.72rem' }}>
                    Đăng vào: {item.date}
                  </small>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-4 sticky-lg-top" style={{ top: '90px' }}>
              <h5 className="fw-extrabold text-dark mb-2 d-flex align-items-center gap-2">
                <MessageSquarePlus size={20} className="text-success" />
                <span>Gửi Đánh Giá Của Bạn Về Học Viện</span>
              </h5>
              <p className="text-secondary small mb-3">
                Chia sẻ trải nghiệm học tập của bạn để giúp các học viên mới có thêm góc nhìn thực tế!
              </p>

              <form onSubmit={handleReviewSubmit}>
                {reviewError && (
                  <div className="alert alert-danger py-2 small">{reviewError}</div>
                )}

                <div className="mb-3">
                  <label className="form-label small fw-bold">Họ và tên học viên *</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Nhập họ và tên của bạn..."
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Khóa học đã tham gia</label>
                  <select
                    className="form-select form-select-sm"
                    value={reviewForm.courseTaken}
                    onChange={(e) => setReviewForm({ ...reviewForm, courseTaken: e.target.value })}
                  >
                    <option value="Pickleball Khởi Đầu Toàn Diện (Beginner 2.0 - 3.0)">
                      Pickleball Khởi Đầu Toàn Diện (Beginner 2.0 - 3.0)
                    </option>
                    <option value="Làm Chủ Chiến Thuật & Kỹ Thuật Nâng Cao (3.5+)">
                      Làm Chủ Chiến Thuật & Kỹ Thuật Nâng Cao (3.5+)
                    </option>
                    <option value="Huấn Luyện Cá Nhân 1 Kèm 1 (VIP Private)">
                      Huấn Luyện Cá Nhân 1 Kèm 1 (VIP Private)
                    </option>
                    <option value="Học Viện Pickleball Thiếu Nhi (Kids Junior)">
                      Học Viện Pickleball Thiếu Nhi (Kids Junior)
                    </option>
                  </select>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label small fw-bold">Mức độ hài lòng</label>
                    <select
                      className="form-select form-select-sm"
                      value={reviewForm.rating}
                      onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5/5 Xuất sắc)</option>
                      <option value={4}>⭐⭐⭐⭐ (4/5 Rất tốt)</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">Kết quả đạt được</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={reviewForm.duprProgress}
                      onChange={(e) => setReviewForm({ ...reviewForm, duprProgress: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Cảm nhận chi tiết *</label>
                  <textarea
                    rows="3"
                    className="form-control form-control-sm"
                    placeholder="Chia sẻ về chất lượng sân bãi, sự tận tâm của HLV và tiến bộ kỹ thuật của bạn..."
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn vp-btn-lime w-100 fw-bold py-2">
                  Đăng Đánh Giá Học Viên
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Article Reader Modal */}
      {selectedBlog && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', zIndex: 1055 }}
          onClick={() => setSelectedBlog(null)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 rounded-4 overflow-hidden shadow-lg">
              <div className="modal-header bg-dark text-white border-0 p-4">
                <div>
                  <span className="badge bg-warning text-dark mb-2">{selectedBlog.category}</span>
                  <h5 className="modal-title fw-extrabold mb-0">{selectedBlog.title}</h5>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setSelectedBlog(null)}
                />
              </div>
              <div className="modal-body p-4">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="w-100 rounded-4 object-fit-cover mb-3"
                  style={{ height: '240px' }}
                />
                <div className="d-flex justify-content-between text-secondary small mb-3 pb-2 border-bottom">
                  <span>
                    ✍️ Tác giả: <strong>{selectedBlog.author}</strong> ({selectedBlog.authorRole})
                  </span>
                  <span>
                    📅 {selectedBlog.date} • ⏱ {selectedBlog.readTime}
                  </span>
                </div>
                {selectedBlog.content.map((para, index) => (
                  <p key={index} className="text-dark mb-3 lh-lg">
                    {para}
                  </p>
                ))}
              </div>
              <div className="modal-footer bg-light border-0">
                <button
                  type="button"
                  className="btn btn-dark px-4"
                  onClick={() => setSelectedBlog(null)}
                >
                  Đóng bài viết
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
