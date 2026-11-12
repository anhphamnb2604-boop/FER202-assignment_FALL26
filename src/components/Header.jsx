import React, { useState } from 'react';
import {
  Trophy,
  Calendar,
  ShoppingBag,
  User,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  BookOpen,
  PhoneCall,
  Home,
  GraduationCap,
  ClipboardCheck,
  Sparkles,
  Building2,
  Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenProfile
}) {
  const { currentUser, openAuthModal, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = currentUser?.role === 'admin';
  const isCoach = currentUser?.role === 'coach';

  const navItems = [
    ...(isAdmin
      ? [{ id: 'admin-portal', label: 'Trung Tâm Quản Trị', icon: ShieldCheck, badge: 'Admin' }]
      : []),
    ...(isCoach
      ? [{ id: 'coach-portal', label: 'Kênh Huấn Luyện Viên', icon: GraduationCap, badge: 'HLV' }]
      : []),
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'courses', label: 'Khóa học', icon: GraduationCap },
    { id: 'register', label: 'Đăng ký học', icon: ClipboardCheck },
    { id: 'courts', label: 'Đặt sân tập', icon: Calendar },
    { id: 'shop', label: 'Pro Shop', icon: ShoppingBag },
    { id: 'blog', label: 'Blog & Review', icon: BookOpen },
    { id: 'about', label: 'Giới thiệu & Liên hệ', icon: PhoneCall }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getRoleBadge = (role) => {
    if (role === 'admin') return { text: 'Quản trị viên', bg: 'bg-danger' };
    if (role === 'coach') return { text: 'Huấn luyện viên', bg: 'bg-primary' };
    return { text: 'Học viên', bg: 'bg-success' };
  };

  return (
    <header
      className="vp-header sticky-top shadow-sm"
      style={
        isAdmin
          ? { background: 'linear-gradient(135deg, #0f172a 0%, #31102f 100%)' }
          : isCoach
          ? { background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)' }
          : undefined
      }
    >
      {/* Top Bar customized by Role */}
      <div className="vp-topbar py-1 px-2 text-white">
        <div className="container d-flex flex-wrap justify-content-between align-items-center small">
          <div className="d-flex align-items-center gap-2 text-truncate">
            <Sparkles size={14} className="text-warning flex-shrink-0" />
            {isAdmin ? (
              <span className="text-truncate text-warning fw-semibold">
                Chế độ Quản trị viên (Admin): Toàn quyền quản lý Cụm Sân Tập, Khóa học, Kho Pro Shop & Phân quyền
              </span>
            ) : isCoach ? (
              <span className="text-truncate text-info fw-semibold">
                Không gian Huấn luyện viên (Coach): Quản lý lớp dạy, Điểm danh chuyên cần & Chấm điểm trình độ DUPR
              </span>
            ) : (
              <span className="text-truncate">
                <strong>Ưu đãi Khóa Mới:</strong> Giảm 15% học phí & Tặng buổi đánh giá trình độ DUPR miễn phí!
              </span>
            )}
          </div>
          <div className="d-none d-lg-flex align-items-center gap-3">
            <span>📍 Khu đô thị Sala, TP. Thủ Đức, TP.HCM</span>
            <span>•</span>
            <span>📞 Hotline: 1900 6886 (05:30 - 22:30)</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container-fluid px-lg-4 py-2">
        <div className="d-flex align-items-center justify-content-between gap-2">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() =>
              handleNavClick(isAdmin ? 'admin-portal' : isCoach ? 'coach-portal' : 'home')
            }
            className="btn p-0 border-0 d-flex align-items-center gap-2 text-start text-decoration-none"
          >
            <div className="vp-logo-icon d-flex align-items-center justify-content-center rounded-3">
              <Trophy size={22} className="text-dark" />
            </div>
            <div>
              <div className="fw-extrabold fs-5 lh-1 text-white d-flex align-items-center gap-1">
                VN PICKLEBALL <span className="vp-text-lime">ACADEMY</span>
              </div>
              <small className="text-white-50 d-block" style={{ fontSize: '0.68rem' }}>
                {isAdmin
                  ? 'ADMINISTRATION & FACILITY MANAGEMENT'
                  : isCoach
                  ? 'COACHING & DUPR EVALUATION PORTAL'
                  : 'USA PICKLEBALL & PPR CERTIFIED CENTER'}
              </small>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="d-none d-xl-flex align-items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`btn btn-sm px-2 py-2 rounded-3 d-flex align-items-center gap-1 fw-semibold transition-all ${
                    isActive ? 'vp-nav-active' : 'text-white vp-nav-link'
                  }`}
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className="badge rounded-pill bg-danger text-white ms-1"
                      style={{ fontSize: '0.62rem' }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Cart + User Auth + Mobile Hamburger */}
          <div className="d-flex align-items-center gap-2">
            {/* Pro Shop Cart Button (Hidden or secondary when in pure Admin view, but accessible) */}
            {!isAdmin && (
              <button
                type="button"
                onClick={onOpenCart}
                className="btn btn-sm vp-btn-glass position-relative d-flex align-items-center gap-1 px-2 py-2"
                title="Giỏ hàng Pro Shop"
              >
                <ShoppingBag size={18} />
                <span className="d-none d-sm-inline small fw-semibold">Giỏ hàng</span>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark fw-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* User Account Action */}
            {currentUser ? (
              <div className="d-flex align-items-center gap-1">
                {isAdmin && activeTab !== 'admin-portal' && (
                  <button
                    type="button"
                    onClick={() => handleNavClick('admin-portal')}
                    className="btn btn-sm btn-danger d-none d-md-flex align-items-center gap-1 fw-bold"
                  >
                    <ShieldCheck size={16} />
                    <span>Về Trang Quản Trị</span>
                  </button>
                )}

                {isCoach && activeTab !== 'coach-portal' && (
                  <button
                    type="button"
                    onClick={() => handleNavClick('coach-portal')}
                    className="btn btn-sm btn-primary d-none d-md-flex align-items-center gap-1 fw-bold"
                  >
                    <GraduationCap size={16} />
                    <span>Về Kênh HLV</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={onOpenProfile}
                  className="btn btn-sm vp-btn-glass d-flex align-items-center gap-2 px-2 py-1"
                  title="Xem Hồ sơ cá nhân & Tiến độ"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="rounded-circle object-fit-cover border border-warning"
                    width="28"
                    height="28"
                  />
                  <div className="text-start d-none d-md-block lh-1">
                    <div
                      className="fw-bold text-white text-truncate"
                      style={{ maxWidth: '125px', fontSize: '0.78rem' }}
                    >
                      {currentUser.name}
                    </div>
                    <span
                      className={`badge ${getRoleBadge(currentUser.role).bg}`}
                      style={{ fontSize: '0.62rem' }}
                    >
                      {getRoleBadge(currentUser.role).text}
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    handleNavClick('home');
                  }}
                  className="btn btn-sm btn-outline-light d-none d-md-flex align-items-center p-2"
                  title="Đăng xuất"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="btn btn-sm vp-btn-lime fw-bold d-flex align-items-center gap-1 px-3 py-2"
              >
                <User size={16} />
                <span>Đăng nhập</span>
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-sm vp-btn-glass d-xl-none p-2"
              aria-label="Mở menu điều hướng"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Collapsible Menu */}
        {mobileMenuOpen && (
          <div className="vp-mobile-menu d-xl-none mt-2 pt-2 border-top border-secondary">
            <div className="row g-2 mb-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <div className="col-6 col-sm-4" key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      className={`btn w-100 text-start d-flex align-items-center gap-2 py-2 px-3 rounded-3 fw-semibold ${
                        isActive ? 'vp-nav-active' : 'vp-btn-glass text-white'
                      }`}
                    >
                      <Icon size={17} />
                      <span className="text-truncate">{item.label}</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {currentUser && (
              <div className="d-flex flex-wrap gap-2 pt-2 border-top border-secondary">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenProfile();
                  }}
                  className="btn btn-sm btn-outline-light flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                >
                  <User size={15} /> Hồ sơ cá nhân
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                    handleNavClick('home');
                  }}
                  className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center gap-1"
                >
                  <LogOut size={15} /> Đăng xuất
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
