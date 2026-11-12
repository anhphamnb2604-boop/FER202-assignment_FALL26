import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Star,
  Plus,
  Check,
  ShieldCheck,
  Truck,
  Award
} from 'lucide-react';
import { SHOP_CATEGORIES } from '../data/products';

export default function ProShopSection({ products, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedId, setAddedId] = useState(null);

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchQuery =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specs.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  const handleBuy = (product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="vp-page-header rounded-4 p-4 p-lg-5 mb-4 text-white shadow-sm">
          <div className="row align-items-center g-3">
            <div className="col-lg-8">
              <span className="badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill mb-2">
                CỬA HÀNG DỤNG CỤ CHÍNH HÃNG • OFFICIAL PICKLEBALL PRO SHOP
              </span>
              <h1 className="fw-extrabold mb-2">Cửa Hàng Dụng Cụ Pickleball Chính Hãng</h1>
              <p className="text-white-75 mb-0">
                Phân phối ủy quyền các dòng vợt Carbon JOOLA, Selkirk, Six Zero, bóng thi đấu Franklin X-40 và giày chuyên dụng. Học viên Học viện được trợ giá đặc biệt!
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div className="d-inline-flex flex-column gap-1 bg-white bg-opacity-10 p-3 rounded-3 text-start small">
                <div>✅ Cam kết chính hãng 100% chuẩn USAPA</div>
                <div>✅ Học viên được đánh thử vợt miễn phí tại sân</div>
                <div>✅ Bảo hành chính hãng 12 tháng</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <Search size={18} className="text-secondary" />
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-start-0"
                  placeholder="Tìm kiếm vợt Joola, Selkirk, bóng Franklin, giày..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-7">
              <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                {SHOP_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${
                      selectedCategory === cat.id ? 'btn-dark text-warning' : 'btn-outline-secondary'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div className="col-sm-6 col-lg-3" key={product.id}>
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden vp-course-card">
                <div className="position-relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-100 object-fit-cover"
                    style={{ height: '200px' }}
                  />
                  <span className="position-absolute top-0 start-0 m-2 badge bg-warning text-dark fw-bold">
                    {product.badge}
                  </span>
                </div>
                <div className="card-body p-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center small mb-1">
                    <span className="text-success fw-bold">{product.categoryLabel}</span>
                    <span className="text-warning fw-bold">
                      ⭐ {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <h6 className="fw-bold text-dark mb-1">{product.name}</h6>
                  <div className="badge bg-light text-secondary border text-wrap text-start mb-2 p-2">
                    {product.specs}
                  </div>
                  <p className="text-secondary small mb-3 flex-grow-1">{product.description}</p>

                  <div className="pt-2 border-top mt-auto d-flex align-items-center justify-content-between">
                    <div>
                      <del className="text-muted small d-block">{formatVND(product.originalPrice)}</del>
                      <span className="fw-extrabold text-danger fs-6">{formatVND(product.price)}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleBuy(product)}
                      className={`btn btn-sm fw-bold px-3 py-2 d-flex align-items-center gap-1 ${
                        addedId === product.id ? 'btn-success text-white' : 'vp-btn-lime'
                      }`}
                    >
                      {addedId === product.id ? (
                        <>
                          <Check size={16} /> Đã thêm
                        </>
                      ) : (
                        <>
                          <Plus size={16} /> Mua ngay
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
