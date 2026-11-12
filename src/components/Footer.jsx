import React from 'react';
import { Trophy } from 'lucide-react';

export function ToastNotification({ toast, onClose }) {
  if (!toast) return null;

  const bgClass =
    toast.type === 'error'
      ? 'bg-danger text-white'
      : toast.type === 'info'
      ? 'bg-dark text-white'
      : 'bg-success text-white';

  return (
    <div
      className="position-fixed top-0 end-0 p-3"
      style={{ zIndex: 2000, marginTop: '65px' }}
    >
      <div
        className={`toast show align-items-center border-0 shadow-lg rounded-3 ${bgClass}`}
        role="alert"
      >
        <div className="d-flex">
          <div className="toast-body fw-semibold small">{toast.message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
}

export default function Footer({ onNavigate }) {
  return (
    <footer className="vp-footer text-white pt-5 pb-5">
      <div className="container pb-4">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="vp-logo-icon d-flex align-items-center justify-content-center rounded-3">
                <Trophy size={22} className="text-dark" />
              </div>
              <div className="fw-extrabold fs-5">
                VN PICKLEBALL <span className="vp-text-lime">ACADEMY</span>
              </div>
            </div>
            <p className="text-white-50 small mb-3">
              Học viện Đào tạo Pickleball chuẩn quốc tế USA Pickleball & PPR hàng đầu Việt Nam. Hệ thống 12 sân Indoor máy lạnh, đội ngũ HLV quốc tế và Pro Shop chính hãng.
            </p>
            <div className="small text-white-75">
              <div className="mb-1">📍 Số 10 Mai Chí Thọ, KĐT Sala, TP. Thủ Đức, TP.HCM</div>
              <div className="mb-1">📞 Hotline: 1900 6886 • 0901 234 567</div>
              <div>✉️ Email: tuyensinh@pickleball.edu.vn</div>
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <h6 className="fw-bold text-warning mb-3">Điều Hướng</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="btn btn-link text-white-50 text-decoration-none p-0"
                >
                  Trang chủ Học viện
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('courses')}
                  className="btn btn-link text-white-50 text-decoration-none p-0"
                >
                  Danh sách Khóa học
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('register')}
                  className="btn btn-link text-white-50 text-decoration-none p-0"
                >
                  Đăng ký Ghi danh
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="btn btn-link text-white-50 text-decoration-none p-0"
                >
                  Giới thiệu & Liên hệ
                </button>
              </li>
            </ul>
          </div>

          <div className="col-6 col-lg-3">
            <h6 className="fw-bold text-warning mb-3">Dịch Vụ & Tiện Ích</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('courts')}
                  className="btn btn-link text-white-50 text-decoration-none p-0"
                >
                  Đặt Sân Tập Theo Giờ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop')}
                  className="btn btn-link text-white-50 text-decoration-none p-0"
                >
                  Cửa Hàng Dụng Cụ (Pro Shop)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('blog')}
                  className="btn btn-link text-white-50 text-decoration-none p-0"
                >
                  Cẩm Nang & Luật Chơi Pickleball
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('blog')}
                  className="btn btn-link text-white-50 text-decoration-none p-0"
                >
                  Đánh Giá Từ Học Viên
                </button>
              </li>
            </ul>
          </div>

          <div className="col-lg-3">
            <h6 className="fw-bold text-warning mb-3">Giờ Mở Cửa & Hỗ Trợ</h6>
            <div className="p-3 rounded-3 bg-white bg-opacity-10 small">
              <div className="mb-1">
                <strong>Thứ 2 – Chủ Nhật:</strong> 05:30 – 22:30
              </div>
              <div className="mb-2">
                <strong>Hotline Đặt sân:</strong> <span className="text-warning fw-bold">1900 6886</span>
              </div>
              <div className="mb-1">
                <strong>Zalo Giáo vụ:</strong> 0901 234 567
              </div>
              <div>
                <strong>Sân tập:</strong> 12 Sân Indoor & Mái che
              </div>
            </div>
          </div>
        </div>

        <div className="border-top border-secondary mt-4 pt-3 text-center small text-white-50">
          © 2026 VN Pickleball Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
