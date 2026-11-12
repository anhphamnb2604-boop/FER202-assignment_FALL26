import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import HomeSection from './components/HomeSection';
import CoursesSection from './components/CoursesSection';
import RegisterSection from './components/RegisterSection';
import CourtBookingSection from './components/CourtBookingSection';
import ProShopSection from './components/ProShopSection';
import BlogReviewsSection from './components/BlogReviewsSection';
import AboutContactSection from './components/AboutContactSection';
import AdminPortalSection from './components/AdminPortalSection';
import CoachPortalSection from './components/CoachPortalSection';
import AuthModal from './components/AuthModal';
import UserProfileModal from './components/UserProfileModal';
import CartDrawerModal from './components/CartDrawerModal';
import Footer, { ToastNotification } from './components/Footer';

import { INITIAL_COURSES } from './data/courses';
import { INITIAL_COACHES } from './data/users';
import { INITIAL_COURTS, TIME_SLOTS, INITIAL_COURT_BOOKINGS } from './data/courts';
import { INITIAL_PRODUCTS, INITIAL_SHOP_ORDERS } from './data/products';
import {
  INITIAL_BLOG_POSTS,
  INITIAL_TESTIMONIALS,
  INITIAL_ENROLLMENTS,
  INITIAL_CONTACTS
} from './data/blogs';

import './App.css';

function AppLayout({
  activeTab,
  setActiveTab,
  courses,
  handleAddCourse,
  handleUpdateCourse,
  handleDeleteCourse,
  courts,
  handleAddCourt,
  handleUpdateCourt,
  handleDeleteCourt,
  timeSlots,
  handleAddTimeSlot,
  handleUpdateTimeSlot,
  handleDeleteTimeSlot,
  products,
  handleAddProduct,
  handleUpdateProduct,
  handleDeleteProduct,
  enrollments,
  handleAddEnrollment,
  handleUpdateEnrollment,
  handleDeleteEnrollment,
  courtBookings,
  handleAddCourtBooking,
  handleUpdateCourtBooking,
  handleDeleteCourtBooking,
  testimonials,
  handleAddTestimonial,
  shopOrders,
  setShopOrders,
  handleUpdateShopOrderStatus,
  contactMessages,
  handleAddContactMessage,
  handleUpdateContactStatus,
  cartItems,
  setCartItems,
  handleAddToCart,
  handleUpdateCartQty,
  handleRemoveCartItem,
  preselectedCourse,
  handleSelectCourseForRegister,
  selectedCourseDetail,
  setSelectedCourseDetail,
  handleViewCourseDetail,
  isCartOpen,
  setIsCartOpen,
  isProfileOpen,
  setIsProfileOpen,
  toast,
  setToast,
  showToast
}) {
  const { currentUser } = useAuth();
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // If Admin is in 'admin-portal' mode, render full-screen dedicated Admin Workspace without public Header/Footer
  const isDedicatedAdminScreen =
    currentUser?.role === 'admin' && activeTab === 'admin-portal';

  if (isDedicatedAdminScreen) {
    return (
      <div className="vp-app-wrapper min-vh-100">
        <AdminPortalSection
          courses={courses}
          onAddCourse={handleAddCourse}
          onUpdateCourse={handleUpdateCourse}
          onDeleteCourse={handleDeleteCourse}
          courts={courts}
          onAddCourt={handleAddCourt}
          onUpdateCourt={handleUpdateCourt}
          onDeleteCourt={handleDeleteCourt}
          timeSlots={timeSlots}
          onAddTimeSlot={handleAddTimeSlot}
          onUpdateTimeSlot={handleUpdateTimeSlot}
          onDeleteTimeSlot={handleDeleteTimeSlot}
          enrollments={enrollments}
          onUpdateEnrollment={handleUpdateEnrollment}
          onDeleteEnrollment={handleDeleteEnrollment}
          courtBookings={courtBookings}
          onAddCourtBooking={handleAddCourtBooking}
          onUpdateCourtBooking={handleUpdateCourtBooking}
          onDeleteCourtBooking={handleDeleteCourtBooking}
          products={products}
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
          shopOrders={shopOrders}
          onUpdateShopOrderStatus={handleUpdateShopOrderStatus}
          contactMessages={contactMessages}
          onUpdateContactStatus={handleUpdateContactStatus}
          onSwitchToPublicView={() => setActiveTab('home')}
        />
        <AuthModal />
        <ToastNotification toast={toast} onClose={() => setToast(null)} />
      </div>
    );
  }

  return (
    <div className="vp-app-wrapper d-flex flex-column min-vh-100">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      <main className="flex-grow-1">
        {activeTab === 'coach-portal' && (
          <CoachPortalSection
            courses={courses}
            onUpdateCourse={handleUpdateCourse}
            enrollments={enrollments}
            onUpdateEnrollment={handleUpdateEnrollment}
            courtBookings={courtBookings}
          />
        )}

        {activeTab === 'home' && (
          <HomeSection
            courses={courses}
            coaches={INITIAL_COACHES}
            testimonials={testimonials}
            onNavigate={setActiveTab}
            onSelectCourseForRegister={handleSelectCourseForRegister}
            onViewCourseDetail={handleViewCourseDetail}
          />
        )}

        {activeTab === 'courses' && (
          <CoursesSection
            courses={courses}
            selectedCourseDetail={selectedCourseDetail}
            setSelectedCourseDetail={setSelectedCourseDetail}
            onSelectCourseForRegister={handleSelectCourseForRegister}
          />
        )}

        {activeTab === 'register' && (
          <RegisterSection
            courses={courses}
            preselectedCourse={preselectedCourse}
            onAddEnrollment={handleAddEnrollment}
            enrollments={enrollments}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'courts' && (
          <CourtBookingSection
            courts={courts}
            timeSlots={timeSlots}
            courtBookings={courtBookings}
            onAddCourtBooking={handleAddCourtBooking}
            showToast={showToast}
          />
        )}

        {activeTab === 'shop' && (
          <ProShopSection
            products={products}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeTab === 'blog' && (
          <BlogReviewsSection
            blogs={INITIAL_BLOG_POSTS}
            testimonials={testimonials}
            onAddTestimonial={handleAddTestimonial}
            showToast={showToast}
          />
        )}

        {activeTab === 'about' && (
          <AboutContactSection
            onAddContactMessage={handleAddContactMessage}
            showToast={showToast}
          />
        )}
      </main>

      <Footer onNavigate={setActiveTab} />

      {/* Global Modals */}
      <AuthModal />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        enrollments={enrollments}
        courtBookings={courtBookings}
        onCancelCourtBooking={(id) =>
          handleUpdateCourtBooking(id, { status: 'cancelled' })
        }
        shopOrders={shopOrders}
      />

      <CartDrawerModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
        onAddShopOrder={(ord) => setShopOrders((prev) => [ord, ...prev])}
        showToast={showToast}
      />

      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem('vp_academy_current_user'));
      if (savedUser?.role === 'admin') return 'admin-portal';
      if (savedUser?.role === 'coach') return 'coach-portal';
      return 'home';
    } catch {
      return 'home';
    }
  });

  // Persistent States with LocalStorage fallback
  const [courses, setCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('vp_academy_courses_v3');
      return saved ? JSON.parse(saved) : INITIAL_COURSES;
    } catch {
      return INITIAL_COURSES;
    }
  });

  const [courts, setCourts] = useState(() => {
    try {
      const saved = localStorage.getItem('vp_academy_courts_v3');
      return saved ? JSON.parse(saved) : INITIAL_COURTS;
    } catch {
      return INITIAL_COURTS;
    }
  });

  const [timeSlots, setTimeSlots] = useState(() => {
    try {
      const saved = localStorage.getItem('vp_academy_timeslots_v3');
      return saved ? JSON.parse(saved) : TIME_SLOTS;
    } catch {
      return TIME_SLOTS;
    }
  });

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('vp_academy_products_v3');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [enrollments, setEnrollments] = useState(() => {
    try {
      const saved = localStorage.getItem('vp_academy_enrollments_v2');
      return saved ? JSON.parse(saved) : INITIAL_ENROLLMENTS;
    } catch {
      return INITIAL_ENROLLMENTS;
    }
  });

  const [courtBookings, setCourtBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('vp_academy_court_bookings_v2');
      return saved ? JSON.parse(saved) : INITIAL_COURT_BOOKINGS;
    } catch {
      return INITIAL_COURT_BOOKINGS;
    }
  });

  const [testimonials, setTestimonials] = useState(() => {
    try {
      const saved = localStorage.getItem('vp_academy_testimonials_v2');
      return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  const [shopOrders, setShopOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('vp_academy_shop_orders_v2');
      return saved ? JSON.parse(saved) : INITIAL_SHOP_ORDERS;
    } catch {
      return INITIAL_SHOP_ORDERS;
    }
  });

  const [contactMessages, setContactMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('vp_academy_contacts_v2');
      return saved ? JSON.parse(saved) : INITIAL_CONTACTS;
    } catch {
      return INITIAL_CONTACTS;
    }
  });

  const [cartItems, setCartItems] = useState([
    { product: INITIAL_PRODUCTS[3], quantity: 1 }
  ]);

  const [preselectedCourse, setPreselectedCourse] = useState(INITIAL_COURSES[0]);
  const [selectedCourseDetail, setSelectedCourseDetail] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  useEffect(() => {
    try {
      localStorage.setItem('vp_academy_courses_v3', JSON.stringify(courses));
    } catch {}
  }, [courses]);

  useEffect(() => {
    try {
      localStorage.setItem('vp_academy_courts_v3', JSON.stringify(courts));
    } catch {}
  }, [courts]);

  useEffect(() => {
    try {
      localStorage.setItem('vp_academy_timeslots_v3', JSON.stringify(timeSlots));
    } catch {}
  }, [timeSlots]);

  useEffect(() => {
    try {
      localStorage.setItem('vp_academy_products_v3', JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('vp_academy_enrollments_v2', JSON.stringify(enrollments));
    } catch {}
  }, [enrollments]);

  useEffect(() => {
    try {
      localStorage.setItem('vp_academy_court_bookings_v2', JSON.stringify(courtBookings));
    } catch {}
  }, [courtBookings]);

  useEffect(() => {
    try {
      localStorage.setItem('vp_academy_testimonials_v2', JSON.stringify(testimonials));
    } catch {}
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem('vp_academy_shop_orders_v2', JSON.stringify(shopOrders));
    } catch {}
  }, [shopOrders]);

  useEffect(() => {
    try {
      localStorage.setItem('vp_academy_contacts_v2', JSON.stringify(contactMessages));
    } catch {}
  }, [contactMessages]);

  // Course Handlers
  const handleSelectCourseForRegister = (course) => {
    setPreselectedCourse(course);
    setActiveTab('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Đã chọn khóa học: ${course.title}`, 'info');
  };

  const handleViewCourseDetail = (course) => {
    setSelectedCourseDetail(course);
    setActiveTab('courses');
  };

  const handleAddCourse = (courseObj) => {
    setCourses((prev) => [courseObj, ...prev]);
    showToast(`Đã thêm khóa học mới: ${courseObj.title}`, 'success');
  };

  const handleUpdateCourse = (courseId, updatedFields) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, ...updatedFields } : c))
    );
    showToast('Đã cập nhật thông tin & giáo trình khóa học!', 'success');
  };

  const handleDeleteCourse = (courseId) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    showToast('Đã xóa khóa học khỏi danh sách.', 'info');
  };

  // Court Facility CRUD Handlers
  const handleAddCourt = (newCourt) => {
    setCourts((prev) => [...prev, newCourt]);
    showToast(`Đã thêm sân tập mới: ${newCourt.name}`, 'success');
  };

  const handleUpdateCourt = (courtId, updatedFields) => {
    setCourts((prev) =>
      prev.map((c) => (c.id === courtId ? { ...c, ...updatedFields } : c))
    );
    showToast('Đã cập nhật cấu hình & bảng giá sân tập!', 'success');
  };

  const handleDeleteCourt = (courtId) => {
    setCourts((prev) => prev.filter((c) => c.id !== courtId));
    showToast('Đã xóa sân tập khỏi hệ thống.', 'info');
  };

  // Time Slots CRUD Handlers
  const handleAddTimeSlot = (newSlot) => {
    setTimeSlots((prev) => [...prev, newSlot]);
    showToast(`Đã thêm khung giờ mới: ${newSlot.time}`, 'success');
  };

  const handleUpdateTimeSlot = (slotId, updatedFields) => {
    setTimeSlots((prev) =>
      prev.map((s) => (s.id === slotId ? { ...s, ...updatedFields } : s))
    );
    showToast('Đã cập nhật khung giờ hoạt động!', 'success');
  };

  const handleDeleteTimeSlot = (slotId) => {
    setTimeSlots((prev) => prev.filter((s) => s.id !== slotId));
    showToast('Đã xóa khung giờ hoạt động.', 'info');
  };

  // Enrollment & Court Booking CRUD Handlers
  const handleAddEnrollment = (newEnrollment) => {
    setEnrollments((prev) => [newEnrollment, ...prev]);
    showToast(`Đăng ký khóa học thành công! Mã hồ sơ #${newEnrollment.id}`, 'success');
  };

  const handleUpdateEnrollment = (enrId, updatedFields) => {
    setEnrollments((prev) =>
      prev.map((e) => (e.id === enrId ? { ...e, ...updatedFields } : e))
    );
    showToast('Đã cập nhật hồ sơ học viên!', 'success');
  };

  const handleDeleteEnrollment = (enrId) => {
    setEnrollments((prev) => prev.filter((e) => e.id !== enrId));
    showToast('Đã xóa hồ sơ ghi danh.', 'info');
  };

  const handleAddCourtBooking = (newBooking) => {
    setCourtBookings((prev) => [newBooking, ...prev]);
    showToast(
      newBooking.status === 'blocked'
        ? `Đã khóa ca sân (${newBooking.time}) ngày ${newBooking.date}!`
        : `Đã lưu lịch đặt sân #${newBooking.id}!`,
      'success'
    );
  };

  const handleUpdateCourtBooking = (bookingId, updatedFields) => {
    setCourtBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, ...updatedFields } : b))
    );
    showToast('Đã cập nhật thông tin ngày/giờ phiếu đặt sân!', 'success');
  };

  const handleDeleteCourtBooking = (bookingId) => {
    setCourtBookings((prev) => prev.filter((b) => b.id !== bookingId));
    showToast('Đã xóa lịch / Mở trống lại ca sân thành công!', 'info');
  };

  // Product & Shop Handlers
  const handleAddProduct = (newProd) => {
    setProducts((prev) => [newProd, ...prev]);
    showToast(`Đã thêm dụng cụ mới: ${newProd.name}`, 'success');
  };

  const handleUpdateProduct = (prodId, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === prodId ? { ...p, ...updatedFields } : p))
    );
    showToast('Đã cập nhật thông tin sản phẩm!', 'success');
  };

  const handleDeleteProduct = (prodId) => {
    setProducts((prev) => prev.filter((p) => p.id !== prodId));
    showToast('Đã xóa sản phẩm khỏi Pro Shop.', 'info');
  };

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`, 'success');
  };

  const handleUpdateCartQty = (productId, newQty) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveCartItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleUpdateShopOrderStatus = (orderId, newStatus) => {
    setShopOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast('Đã cập nhật trạng thái đơn hàng Pro Shop!', 'success');
  };

  const handleAddTestimonial = (newReview) => {
    setTestimonials((prev) => [newReview, ...prev]);
  };

  const handleAddContactMessage = (newMsg) => {
    setContactMessages((prev) => [newMsg, ...prev]);
  };

  const handleUpdateContactStatus = (msgId, newStatus) => {
    setContactMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, status: newStatus } : m))
    );
    showToast('Đã cập nhật trạng thái tư vấn khách hàng!', 'info');
  };

  return (
    <AuthProvider showToast={showToast} onRoleRedirect={(targetTab) => setActiveTab(targetTab)}>
      <AppLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        courses={courses}
        handleAddCourse={handleAddCourse}
        handleUpdateCourse={handleUpdateCourse}
        handleDeleteCourse={handleDeleteCourse}
        courts={courts}
        handleAddCourt={handleAddCourt}
        handleUpdateCourt={handleUpdateCourt}
        handleDeleteCourt={handleDeleteCourt}
        timeSlots={timeSlots}
        handleAddTimeSlot={handleAddTimeSlot}
        handleUpdateTimeSlot={handleUpdateTimeSlot}
        handleDeleteTimeSlot={handleDeleteTimeSlot}
        products={products}
        handleAddProduct={handleAddProduct}
        handleUpdateProduct={handleUpdateProduct}
        handleDeleteProduct={handleDeleteProduct}
        enrollments={enrollments}
        handleAddEnrollment={handleAddEnrollment}
        handleUpdateEnrollment={handleUpdateEnrollment}
        handleDeleteEnrollment={handleDeleteEnrollment}
        courtBookings={courtBookings}
        handleAddCourtBooking={handleAddCourtBooking}
        handleUpdateCourtBooking={handleUpdateCourtBooking}
        handleDeleteCourtBooking={handleDeleteCourtBooking}
        testimonials={testimonials}
        handleAddTestimonial={handleAddTestimonial}
        shopOrders={shopOrders}
        setShopOrders={setShopOrders}
        handleUpdateShopOrderStatus={handleUpdateShopOrderStatus}
        contactMessages={contactMessages}
        handleAddContactMessage={handleAddContactMessage}
        handleUpdateContactStatus={handleUpdateContactStatus}
        cartItems={cartItems}
        setCartItems={setCartItems}
        handleAddToCart={handleAddToCart}
        handleUpdateCartQty={handleUpdateCartQty}
        handleRemoveCartItem={handleRemoveCartItem}
        preselectedCourse={preselectedCourse}
        handleSelectCourseForRegister={handleSelectCourseForRegister}
        selectedCourseDetail={selectedCourseDetail}
        setSelectedCourseDetail={setSelectedCourseDetail}
        handleViewCourseDetail={handleViewCourseDetail}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        toast={toast}
        setToast={setToast}
        showToast={showToast}
      />
    </AuthProvider>
  );
}
