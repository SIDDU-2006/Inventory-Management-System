import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

export default function InsertProduct() {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productBarcode, setProductBarcode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const addProduct = async (e) => {
        e.preventDefault();

        if (!productName || !productPrice || !productBarcode) {
            setError("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:3001/insertproduct", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "ProductName": productName, "ProductPrice": Number(productPrice), "ProductBarcode": Number(productBarcode) })
            });

            await res.json();

            if (res.status === 201) {
                navigate('/products');
            }
            else if (res.status === 422) {
                setError("A product with this barcode already exists in inventory.");
            }
            else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="custom-card p-4 p-md-5">
                        <div className="text-center mb-4">
                            <div className="stat-icon-wrapper icon-blue mx-auto mb-3">
                                <i className="fa-solid fa-cart-plus"></i>
                            </div>
                            <h3 className="fw-bold mb-1">Add New Product</h3>
                            <p className="text-muted small">Enter product specifications to insert into inventory.</p>
                        </div>

                        {error && (
                            <div className="alert alert-danger d-flex align-items-center gap-2 mb-4 rounded-3 py-2 px-3 small" role="alert">
                                <i className="fa-solid fa-circle-exclamation fs-6"></i>
                                <div>{error}</div>
                            </div>
                        )}

                        <form onSubmit={addProduct}>
                            <div className="mb-3">
                                <label htmlFor="product_name" className="form-label fw-semibold text-muted small">PRODUCT NAME</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light text-muted"><i className="fa-solid fa-tag"></i></span>
                                    <input 
                                        type="text" 
                                        onChange={(e) => setProductName(e.target.value)} 
                                        value={productName} 
                                        className="form-control" 
                                        id="product_name" 
                                        placeholder="e.g. Wireless Ergonomic Keyboard" 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="product_price" className="form-label fw-semibold text-muted small">UNIT PRICE ($)</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light text-muted"><i className="fa-solid fa-dollar-sign"></i></span>
                                    <input 
                                        type="number" 
                                        step="0.01"
                                        onChange={(e) => setProductPrice(e.target.value)} 
                                        value={productPrice} 
                                        className="form-control" 
                                        id="product_price" 
                                        placeholder="e.g. 49.99" 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="product_barcode" className="form-label fw-semibold text-muted small">BARCODE NUMBER</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light text-muted"><i className="fa-solid fa-barcode"></i></span>
                                    <input 
                                        type="number" 
                                        onChange={(e) => setProductBarcode(e.target.value.slice(0, 12))} 
                                        value={productBarcode} 
                                        className="form-control" 
                                        id="product_barcode" 
                                        placeholder="12-digit numeric barcode" 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="d-flex gap-3 pt-2">
                                <NavLink to="/products" className="btn btn-outline-secondary rounded-pill w-50 py-2 fw-semibold">
                                    Cancel
                                </NavLink>
                                <button type="submit" className="btn btn-primary btn-hover-lift rounded-pill w-50 py-2 fw-bold d-inline-flex align-items-center justify-content-center gap-2" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" role="status"></span>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-check"></i> Add Product
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
