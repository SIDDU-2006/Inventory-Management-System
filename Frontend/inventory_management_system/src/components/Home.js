import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [stats, setStats] = useState({ totalItems: 0, totalValuation: 0, avgPrice: 0 });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const res = await fetch("http://localhost:3001/products");
      if (res.ok) {
        const data = await res.json();
        const total = data.length;
        const valuation = data.reduce((acc, curr) => acc + (Number(curr.ProductPrice) || 0), 0);
        const avg = total > 0 ? valuation / total : 0;
        setStats({
          totalItems: total,
          totalValuation: valuation.toFixed(2),
          avgPrice: avg.toFixed(2)
        });
        setRecentProducts(data.slice(-4).reverse());
      }
    } catch (err) {
      console.log("Failed to fetch dashboard metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      {/* Hero Banner */}
      <div className="hero-banner p-4 p-md-5 mb-4 position-relative overflow-hidden">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <span className="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-25 px-3 py-2 rounded-pill fs-6 mb-3 fw-semibold">
              <i className="fa-solid fa-bolt me-2"></i>MERN Stack v1.0 Live
            </span>
            <h1 className="display-5 fw-bold mb-3">Enterprise Inventory & Stock Control</h1>
            <p className="lead text-slate-300 mb-4 opacity-90">
              Streamline stock tracking, barcode lookup, price calculations, and real-time inventory management with full RESTful API integration.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/products" className="btn btn-primary btn-hover-lift rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2">
                <i className="fa-solid fa-boxes-stacked"></i> View Inventory
              </Link>
              <Link to="/insertproduct" className="btn btn-outline-light rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2">
                <i className="fa-solid fa-plus"></i> Add New Product
              </Link>
            </div>
          </div>
          <div className="col-lg-4 d-none d-lg-block text-center position-relative">
            <i className="fa-solid fa-warehouse text-primary text-opacity-25 display-1" style={{ fontSize: '10rem' }}></i>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="stat-card d-flex align-items-center gap-3">
            <div className="stat-icon-wrapper icon-blue">
              <i className="fa-solid fa-box-archive"></i>
            </div>
            <div>
              <div className="text-muted small fw-semibold text-uppercase">Total Catalog Items</div>
              <h3 className="fw-bold mb-0">{loading ? '...' : stats.totalItems}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="stat-card d-flex align-items-center gap-3">
            <div className="stat-icon-wrapper icon-green">
              <i className="fa-solid fa-sack-dollar"></i>
            </div>
            <div>
              <div className="text-muted small fw-semibold text-uppercase">Total Valuation</div>
              <h3 className="fw-bold mb-0">${loading ? '...' : stats.totalValuation}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="stat-card d-flex align-items-center gap-3">
            <div className="stat-icon-wrapper icon-purple">
              <i className="fa-solid fa-calculator"></i>
            </div>
            <div>
              <div className="text-muted small fw-semibold text-uppercase">Average Item Value</div>
              <h3 className="fw-bold mb-0">${loading ? '...' : stats.avgPrice}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table & Quick Info */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="custom-card p-4 h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
                <i className="fa-solid fa-clock-rotate-left text-primary"></i>
                Recent Catalog Additions
              </h5>
              <Link to="/products" className="text-primary text-decoration-none fw-semibold small">
                View All <i className="fa-solid fa-arrow-right ms-1"></i>
              </Link>
            </div>
            {recentProducts.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Product Name</th>
                      <th>Barcode</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProducts.map((prod) => (
                      <tr key={prod._id}>
                        <td className="fw-semibold">{prod.ProductName}</td>
                        <td><span className="badge-barcode">{prod.ProductBarcode}</span></td>
                        <td className="badge-price">${Number(prod.ProductPrice).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-4 text-muted">
                <i className="fa-solid fa-inbox display-6 mb-2 d-block opacity-50"></i>
                No items added yet. Click "Add Product" to get started!
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="custom-card p-4 h-100">
            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <i className="fa-solid fa-shield-halved text-success"></i>
              System Capabilities
            </h5>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
              <li className="d-flex align-items-start gap-2">
                <i className="fa-solid fa-circle-check text-success mt-1"></i>
                <div>
                  <strong>Mongo DB & Mongoose Schema</strong>
                  <div className="text-muted small">Optimized database model with unique barcode indexing.</div>
                </div>
              </li>
              <li className="d-flex align-items-start gap-2">
                <i className="fa-solid fa-circle-check text-success mt-1"></i>
                <div>
                  <strong>Express RESTful Server</strong>
                  <div className="text-muted small">Standardized JSON API endpoints with HTTP status handling.</div>
                </div>
              </li>
              <li className="d-flex align-items-start gap-2">
                <i className="fa-solid fa-circle-check text-success mt-1"></i>
                <div>
                  <strong>React SPA Navigation</strong>
                  <div className="text-muted small">Smooth client routing via React Router DOM.</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
