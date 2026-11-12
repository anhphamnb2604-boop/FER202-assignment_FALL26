import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  CreditCard,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CartDrawerModal({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onAddShopOrder,
  showToast
}) {
  const { currentUser } = useAuth();
  const [step, setStep] = useState('cart'); // 'cart' | 'checkout' | 'done'
  const [checkoutData, setCheckoutData] = useState({
    customerName: currentUser?.name || '',
    customerPhone: currentUser?.phone || '',
    address: currentUser?.address || '',
    paymentMethod: 'Chuyển khoản VietQR (Giảm thêm 50k)'
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!checkoutData.customerName.trim() || !checkoutData.customerPhone.trim() || !checkoutData.address.trim()) {
      setError('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng.');
      return;
    }
    setError('');

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: checkoutData.customerName.trim(),
      customerPhone: checkoutData.customerPhone.trim(),
      address: checkoutData.address.trim(),
      paymentMethod: checkoutData.paymentMethod,
      items: cartItems,
      totalAmount,
      createdAt: new Date().toLocaleString('vi-VN')
    };

    onAddShopOrder(newOrder);
    onClearCart();
    setStep('done');
    if (showToast) {
      showToast(`Đặt mua dụng cụ thành công! Mã đơn #${newOrder.id}`, 'success');
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.78)', zIndex: 1060 }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 rounded-4 overflow-hidden shadow-lg">
          <div className="modal-header bg-dark text-white border-0 p-4">
            <h5 className="modal-title fw-extrabold mb-0 d-flex align-items-center gap-2">
              <ShoppingBag size={20} className="text-warning" />
              <span>Giỏ Hàng Pro Shop ({cartItems.length})</span>
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} />
          </div>

          <div className="modal-body p-4">
            {step === 'done' ? (
              <div className="text-center py-4">
                <CheckCircle2 size={54} className="text-success mb-3" />
                <h4 className="fw-extrabold text-success mb-2">Đặt Hàng Thành Công!</h4>
                <p className="text-secondary small mb-4">
                  Đơn hàng dụng cụ Pickleball của bạn đã được ghi nhận và sẽ giao tới tận tay trong 24h.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStep('cart');
                    onClose();
                  }}
                  className="btn vp-btn-lime fw-bold px-4"
                >
                  Tiếp tục khám phá
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-5">
                <ShoppingBag size={48} className="text-secondary mb-2" />
                <h6 className="fw-bold">Giỏ hàng của bạn đang trống</h6>
                <p className="text-secondary small mb-0">
                  Hãy chọn vợt Carbon hoặc bóng thi đấu tại mục Pro Shop nhé!
                </p>
              </div>
            ) : step === 'cart' ? (
              <>
                <div className="d-flex flex-column gap-3 mb-4">
                  {cartItems.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="d-flex align-items-center gap-3 p-2 bg-light rounded-3 border"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="rounded-3 object-fit-cover"
                        width="64"
                        height="64"
                      />
                      <div className="flex-grow-1 min-w-0">
                        <div className="fw-bold text-dark small text-truncate">{product.name}</div>
                        <div className="text-danger fw-bold small">{formatVND(product.price)}</div>
                        <div className="d-flex align-items-center gap-2 mt-1">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(product.id, quantity - 1)}
                            className="btn btn-sm btn-outline-secondary py-0 px-2"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="small fw-bold">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(product.id, quantity + 1)}
                            className="btn btn-sm btn-outline-secondary py-0 px-2"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(product.id)}
                        className="btn btn-sm text-danger"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3 mb-3">
                  <span className="fw-bold text-dark">Tổng thanh toán:</span>
                  <span className="fs-5 fw-extrabold text-danger">{formatVND(totalAmount)}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('checkout')}
                  className="btn vp-btn-lime w-100 fw-extrabold py-2"
                >
                  Tiến Hành Đặt Mua & Thanh Toán →
                </button>
              </>
            ) : (
              <form onSubmit={handleCheckoutSubmit}>
                <h6 className="fw-bold text-dark mb-3">Thông Tin Giao Nhận Dụng Cụ</h6>
                {error && <div className="alert alert-danger py-2 small">{error}</div>}
                <div className="mb-3">
                  <label className="form-label small fw-bold">Họ và tên người nhận *</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={checkoutData.customerName}
                    onChange={(e) =>
                      setCheckoutData({ ...checkoutData, customerName: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Số điện thoại liên hệ *</label>
                  <input
                    type="tel"
                    className="form-control form-control-sm"
                    value={checkoutData.customerPhone}
                    onChange={(e) =>
                      setCheckoutData({ ...checkoutData, customerPhone: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Địa chỉ nhận hàng (hoặc Nhận tại Sân) *</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Nhập địa chỉ hoặc ghi 'Nhận tại Lễ tân Sân Sala'..."
                    value={checkoutData.address}
                    onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label small fw-bold">Phương thức thanh toán</label>
                  <select
                    className="form-select form-select-sm"
                    value={checkoutData.paymentMethod}
                    onChange={(e) =>
                      setCheckoutData({ ...checkoutData, paymentMethod: e.target.value })
                    }
                  >
                    <option value="Chuyển khoản VietQR">Chuyển khoản Ngân hàng (VietQR)</option>
                    <option value="Thanh toán khi nhận hàng (COD)">
                      Thanh toán tiền mặt khi nhận hàng (COD)
                    </option>
                    <option value="Thanh toán tại Quầy Lễ tân Học viện">
                      Thanh toán trực tiếp tại Quầy Lễ tân Học viện
                    </option>
                  </select>
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="btn btn-outline-secondary w-50"
                  >
                    ← Quay lại
                  </button>
                  <button type="submit" className="btn vp-btn-lime w-50 fw-bold">
                    Xác Nhận Đặt Hàng
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
