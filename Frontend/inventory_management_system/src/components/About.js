import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="container py-5">
      <div className="text-center max-w-2xl mx-auto mb-5">
        <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-3 py-2 rounded-pill fs-6 fw-semibold mb-3">
          Architecture & Design
        </span>
        <h1 className="display-5 fw-bold mb-3">About InventoryMaster</h1>
        <p className="lead text-muted">
          A production-ready Full-Stack MERN (MongoDB, Express, React, Node.js) CRUD management application built with REST API best practices.
        </p>
      </div>

      <div className="row g-4 mb-5">
        {/* Tech Stack Cards */}
        <div className="col-md-6 col-lg-3">
          <div className="custom-card p-4 text-center h-100">
            <div className="stat-icon-wrapper icon-green mx-auto mb-3">
              <i className="fa-solid fa-database"></i>
            </div>
            <h5 className="fw-bold">MongoDB</h5>
            <p className="text-muted small mb-0">NoSQL document store with strict Mongoose schema validation for barcode indexing.</p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="custom-card p-4 text-center h-100">
            <div className="stat-icon-wrapper icon-blue mx-auto mb-3">
              <i className="fa-solid fa-server"></i>
            </div>
            <h5 className="fw-bold">Express.js</h5>
            <p className="text-muted small mb-0">Fast & scalable web application framework routing HTTP GET, POST, PUT, DELETE requests.</p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="custom-card p-4 text-center h-100">
            <div className="stat-icon-wrapper icon-purple mx-auto mb-3">
              <i className="fa-brands fa-react"></i>
            </div>
            <h5 className="fw-bold">React 18</h5>
            <p className="text-muted small mb-0">Component-driven single page app frontend utilizing modern hooks and React Router v6.</p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="custom-card p-4 text-center h-100">
            <div className="stat-icon-wrapper icon-amber mx-auto mb-3">
              <i className="fa-brands fa-node-js"></i>
            </div>
            <h5 className="fw-bold">Node.js</h5>
            <p className="text-muted small mb-0">Asynchronous, event-driven JavaScript runtime environment for backend service.</p>
          </div>
        </div>
      </div>

      {/* Feature Breakdown */}
      <div className="custom-card p-4 p-md-5 mb-5">
        <h3 className="fw-bold mb-4 d-flex align-items-center gap-2">
          <i className="fa-solid fa-list-check text-primary"></i> Key Functional Highlights
        </h3>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="d-flex gap-3">
              <i className="fa-solid fa-barcode text-primary fs-4 mt-1"></i>
              <div>
                <h6 className="fw-bold mb-1">Unique Barcode Enforcement</h6>
                <p className="text-muted small mb-0">Prevents product data corruption by verifying unique barcodes prior to persistence.</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="d-flex gap-3">
              <i className="fa-solid fa-pen-to-square text-primary fs-4 mt-1"></i>
              <div>
                <h6 className="fw-bold mb-1">Instant In-Place Editing</h6>
                <p className="text-muted small mb-0">Allows effortless updating of product names, pricing, and barcodes in real-time.</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="d-flex gap-3">
              <i className="fa-solid fa-magnifying-glass text-primary fs-4 mt-1"></i>
              <div>
                <h6 className="fw-bold mb-1">Live Search & Filtering</h6>
                <p className="text-muted small mb-0">Search through catalog items instantaneously with client-side reactive filtering.</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="d-flex gap-3">
              <i className="fa-solid fa-mobile-screen-button text-primary fs-4 mt-1"></i>
              <div>
                <h6 className="fw-bold mb-1">Fully Responsive UI</h6>
                <p className="text-muted small mb-0">Designed for smooth user experience across desktops, tablets, and mobile devices.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link to="/products" className="btn btn-primary btn-hover-lift rounded-pill px-5 py-3 fw-bold fs-6">
          Explore Inventory Catalog
        </Link>
      </div>
    </div>
  )
}
