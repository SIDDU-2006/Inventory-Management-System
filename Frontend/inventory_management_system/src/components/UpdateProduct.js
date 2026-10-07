import React, { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom';

export default function UpdateProduct() {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productBarcode, setProductBarcode] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getProduct = async () => {
          try {
            setFetching(true);
            const res = await fetch(`http://localhost:3001/products/${id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              }
            });
      
            const data = await res.json();
      
            if (res.status === 201) {
              setProductName(data.ProductName);
              setProductPrice(data.ProductPrice);
              setProductBarcode(data.ProductBarcode);
            } else {
              setError("Failed to retrieve product details.");
            }
          } catch (err) {
            console.log(err);
            setError("Error fetching product data.");
          } finally {
            setFetching(false);
          }
        };
      
        getProduct();
    }, [id]);

    const updateProduct = async (e) => {
        e.preventDefault();

        if (!productName || !productPrice || !productBarcode) {
            setError("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`http://localhost:3001/updateproduct/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "ProductName": productName, "ProductPrice": Number(productPrice), "ProductBarcode": Number(productBarcode) })
            });

            await response.json();

            if (response.status === 201) {
                navigate('/products');
            }
            else {
                setError("Something went wrong updating product.");
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
                            <div className="stat-icon-wrapper icon-purple mx-auto mb-3">
                                <i className="fa-solid fa-pen-to-square"></i>
                            </div>
                            <h3 className="fw-bold mb-1">Update Product</h3>
                            <p className="text-muted small">Modify details for item ID: <code className="text-primary">{id}</code></p>
                        </div>

                        {error && (
                            <div className="alert alert-danger d-flex align-items-center gap-2 mb-4 rounded-3 py-2 px-3 small" role="alert">
                                <i className="fa-solid fa-circle-exclamation fs-6"></i>
                                <div>{error}</div>
                            </div>
                        )}

                        {fetching ? (
                            <div className="text-center py-4">
                                <div className="spinner-border text-primary" role="status"></div>
                                <p className="text-muted mt-2 small">Loading product info...</p>
                            </div>
                        ) : (
                            <form onSubmit={updateProduct}>
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
                                            placeholder="Enter Product Name" 
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
                                            placeholder="Enter Product Price" 
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
                                            placeholder="Enter Barcode Number" 
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
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fa-solid fa-floppy-disk"></i> Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
