import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Lock,
  Phone,
  ShieldCheck,
  GraduationCap,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    authModalTab,
    closeAuthModal,
    login,
    register
  } = useAuth();

  const [tab, setTab] = useState(authModalTab || 'login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [regData, setRegData] = useState({ name: '', email: '', phone: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setTab(authModalTab || 'login');
    setErrorMsg('');
  }, [authModalTab, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!loginData.email.trim() || !loginData.password.trim()) {
      setErrorMsg('Vui lòng nhập đầy đủ Email và Mật khẩu.');
      return;
    }
    const res = login(loginData.email, loginData.password);
    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!regData.name.trim() || regData.name.trim().length < 3) {
      setErrorMsg('Họ và tên phải có ít nhất 3 ký tự.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(regData.email.trim())) {
      setErrorMsg('Địa chỉ Email không hợp lệ.');
      return;
    }
    const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
    if (!phoneRegex.test(regData.phone.trim().replace(/\s+/g, ''))) {
      setErrorMsg('Số điện thoại không đúng định dạng 10 số Việt Nam.');
      return;
    }
    if (regData.password.length < 6) {
      setErrorMsg('Mật khẩu phải có tối thiểu 6 ký tự.');
      return;
    }

    const res = register(regData);
    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.78)', zIndex: 1060 }}
      onClick={closeAuthModal}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 rounded-4 overflow-hidden shadow-lg">
          <div className="modal-header bg-dark text-white border-0 p-4">
            <div>
              <span className="badge bg-warning text-dark fw-bold mb-1">
                HỆ THỐNG TÀI KHOẢN HỌC VIỆN
              </span>
              <h5 className="modal-title fw-extrabold mb-0">
                {tab === 'login' ? 'Đăng Nhập Tài Khoản' : 'Đăng Ký Học Viên Mới'}
              </h5>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={closeAuthModal}
            />
          </div>

          <div className="modal-body p-4">
            {/* Switch Tabs */}
            <div className="nav nav-pills nav-fill bg-light p-1 rounded-3 mb-4">
              <button
                type="button"
                className={`nav-link fw-bold py-2 ${
                  tab === 'login' ? 'bg-dark text-warning' : 'text-secondary'
                }`}
                onClick={() => {
                  setTab('login');
                  setErrorMsg('');
                }}
              >
                Đăng Nhập
              </button>
              <button
                type="button"
                className={`nav-link fw-bold py-2 ${
                  tab === 'register' ? 'bg-dark text-warning' : 'text-secondary'
                }`}
                onClick={() => {
                  setTab('register');
                  setErrorMsg('');
                }}
              >
                Đăng Ký Tài Khoản
              </button>
            </div>

            {errorMsg && (
              <div className="alert alert-danger py-2 small d-flex align-items-center gap-2">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {tab === 'login' ? (
              <form onSubmit={handleLoginSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Email đăng nhập</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Nhập địa chỉ email của bạn..."
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Mật khẩu</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <Lock size={16} />
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Nhập mật khẩu..."
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    />
                  </div>
                </div>

                <button type="submit" className="btn vp-btn-lime w-100 fw-bold py-2">
                  Đăng Nhập Ngay
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Họ và tên học viên *</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nguyễn Văn An"
                      value={regData.name}
                      onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Địa chỉ Email *</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="hocvien@gmail.com"
                      value={regData.email}
                      onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Số điện thoại *</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <Phone size={16} />
                    </span>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="0901234567"
                      value={regData.phone}
                      onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Mật khẩu (Tối thiểu 6 ký tự) *</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <Lock size={16} />
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="******"
                      value={regData.password}
                      onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                    />
                  </div>
                </div>

                <button type="submit" className="btn vp-btn-lime w-100 fw-bold py-2">
                  Tạo Tài Khoản Học Viên
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
