import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Products() {
    const [productData, setProductData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:3001/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            if (res.status === 201) {
                setProductData(data);
            } else {
                console.log("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const deleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            const response = await fetch(`http://localhost:3001/deleteproduct/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            await response.json();

            if (response.status === 201) {
                getProducts();
            } else {
                console.log("Error deleting product");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const filteredProducts = productData.filter(item => 
        (item.ProductName && item.ProductName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.ProductBarcode && String(item.ProductBarcode).includes(searchTerm))
    );

    const totalValuation = filteredProducts.reduce((sum, item) => sum + (Number(item.ProductPrice) || 0), 0);

    return (
        <div className="container py-4">
            {/* Header section */}
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
                <div>
                    <h2 className="fw-bold mb-1 d-flex align-items-center gap-2">
                        <i className="fa-solid fa-boxes-stacked text-primary"></i> Inventory Catalog
                    </h2>
                    <p className="text-muted mb-0">Manage, search, edit, and audit stock items in real time.</p>
                </div>
                <NavLink to="/insertproduct" className="btn btn-primary btn-hover-lift rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2">
                    <i className="fa-solid fa-plus"></i> Add New Product
                </NavLink>
            </div>

            {/* Filter and stats bar */}
            <div className="custom-card p-3 mb-4">
                <div className="row g-3 align-items-center">
                    <div className="col-md-6 col-lg-7">
                        <div className="input-group">
                            <span className="input-group-text bg-light border-end-0 text-muted">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </span>
                            <input 
                                type="text" 
                                className="form-control border-start-0 bg-light" 
                                placeholder="Search products by name or barcode..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button className="btn btn-light border" onClick={() => setSearchTerm('')}>
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-5 d-flex justify-content-md-end gap-3 text-muted small fw-medium">
                        <div className="bg-light px-3 py-2 rounded-3 border">
                            Items: <strong className="text-dark">{filteredProducts.length}</strong> / {productData.length}
                        </div>
                        <div className="bg-light px-3 py-2 rounded-3 border">
                            Valuation: <strong className="text-success">${totalValuation.toFixed(2)}</strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table or Loading / Empty state */}
            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="text-muted mt-2">Loading inventory items...</p>
                </div>
            ) : filteredProducts.length > 0 ? (
                <div className="table-container shadow-sm">
                    <div className="table-responsive">
                        <table className="table custom-table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ width: '60px' }}>#</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Barcode</th>
                                    <th scope="col" className="text-end" style={{ width: '140px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((element, id) => {
                                    return (
                                        <tr key={element._id}>
                                            <td className="fw-semibold text-muted">{id + 1}</td>
                                            <td className="fw-bold text-dark">{element.ProductName}</td>
                                            <td className="badge-price fs-6">${Number(element.ProductPrice).toFixed(2)}</td>
                                            <td><span className="badge-barcode">{element.ProductBarcode}</span></td>
                                            <td className="text-end">
                                                <div className="d-flex justify-content-end gap-2">
                                                    <NavLink to={`/updateproduct/${element._id}`} className="btn btn-outline-primary btn-sm rounded-3 px-2 py-1" title="Edit Product">
                                                        <i className="fa-solid fa-pen-to-square"></i>
                                                    </NavLink>
                                                    <button className="btn btn-outline-danger btn-sm rounded-3 px-2 py-1" onClick={() => deleteProduct(element._id)} title="Delete Product">
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="custom-card text-center py-5">
                    <i className="fa-solid fa-box-open display-4 text-muted mb-3 opacity-50"></i>
                    <h4>No Products Found</h4>
                    <p className="text-muted mb-4">
                        {searchTerm ? `No inventory item matches "${searchTerm}".` : "Your inventory catalog is currently empty."}
                    </p>
                    {searchTerm ? (
                        <button className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setSearchTerm('')}>
                            Clear Search Filter
                        </button>
                    ) : (
                        <NavLink to="/insertproduct" className="btn btn-primary rounded-pill px-4 py-2">
                            Add Your First Product
                        </NavLink>
                    )}
                </div>
            )}
        </div>
    )
}
