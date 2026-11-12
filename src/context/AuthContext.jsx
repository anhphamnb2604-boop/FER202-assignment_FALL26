import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../data/users';

const AuthContext = createContext();

export function AuthProvider({ children, showToast, onRoleRedirect }) {
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('vp_academy_users_v2');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('vp_academy_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login');

  useEffect(() => {
    try {
      localStorage.setItem('vp_academy_users_v2', JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save users to localStorage', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('vp_academy_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('vp_academy_current_user');
      }
    } catch (e) {
      console.error('Failed to save currentUser to localStorage', e);
    }
  }, [currentUser]);

  const openAuthModal = (tab = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (email, password) => {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );
    if (!found) {
      return { success: false, message: 'Email hoặc mật khẩu không chính xác!' };
    }
    if (found.status === 'banned') {
      return {
        success: false,
        message: 'Tài khoản này đã bị Quản trị viên tạm khóa do vi phạm quy định Học viện!'
      };
    }
    setCurrentUser(found);
    setIsAuthModalOpen(false);
    if (onRoleRedirect) {
      if (found.role === 'admin') onRoleRedirect('admin-portal');
      else if (found.role === 'coach') onRoleRedirect('coach-portal');
      else onRoleRedirect('home');
    }
    if (showToast) {
      showToast(`Chào mừng trở lại, ${found.name}!`, 'success');
    }
    return { success: true, user: found };
  };

  const register = ({ name, email, phone, password }) => {
    const exists = users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (exists) {
      return { success: false, message: 'Email này đã được đăng ký trong hệ thống!' };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      password,
      role: 'student',
      status: 'active',
      level: 'DUPR 2.0 - New Member',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      address: 'TP. Hồ Chí Minh',
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    if (showToast) {
      showToast(`Đăng ký thành công tài khoản Học viên: ${newUser.name}!`, 'success');
    }
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
    if (showToast) {
      showToast('Đã đăng xuất khỏi tài khoản.', 'info');
    }
  };

  const updateProfile = (updatedData) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
    if (showToast) {
      showToast('Cập nhật hồ sơ cá nhân thành công!', 'success');
    }
  };

  const toggleUserStatus = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === 'active' ? 'banned' : 'active';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
    if (showToast) {
      showToast('Đã cập nhật trạng thái hoạt động của tài khoản!', 'info');
    }
  };

  const changeUserRole = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return { ...u, role: newRole };
        }
        return u;
      })
    );
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => ({ ...prev, role: newRole }));
    }
    if (showToast) {
      showToast('Đã phân quyền vai trò mới cho thành viên!', 'success');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        updateProfile,
        toggleUserStatus,
        changeUserRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
