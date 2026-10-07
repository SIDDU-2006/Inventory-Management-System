import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar sticky-top py-3 shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold text-white fs-4" to="/">
          <i className="fa-solid fa-boxes-stacked text-primary fs-3"></i>
          <span>Inventory<span className="text-primary">Master</span></span>
        </Link>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-2">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link px-3 py-2 rounded-3 fw-medium ${isActive ? 'active bg-primary text-white' : 'text-light'}`} to="/">
                <i className="fa-solid fa-chart-line me-2"></i>Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link px-3 py-2 rounded-3 fw-medium ${isActive ? 'active bg-primary text-white' : 'text-light'}`} to="/products">
                <i className="fa-solid fa-box-open me-2"></i>Inventory
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link px-3 py-2 rounded-3 fw-medium ${isActive ? 'active bg-primary text-white' : 'text-light'}`} to="/about">
                <i className="fa-solid fa-circle-info me-2"></i>About
              </NavLink>
            </li>
          </ul>
          <div className="ms-lg-3 mt-3 mt-lg-0">
            <Link to="/insertproduct" className="btn btn-primary btn-hover-lift rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2">
              <i className="fa-solid fa-plus"></i> Add Product
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
