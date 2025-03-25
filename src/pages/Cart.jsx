import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, X, Info, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Get cart items from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
    setLoading(false);
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 100 ? 0 : 10; // Free shipping over $100
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping() - discount;
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success("Item removed from cart");
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "welcome10") {
      setDiscount(calculateSubtotal() * 0.1); // 10% discount
      setCouponApplied(true);
      toast.success("Coupon applied successfully!");
    } else {
      toast.error("Invalid coupon code.");
      setCouponApplied(false);
      setDiscount(0);
    }
  };

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setCartItems([]);
      localStorage.setItem('cart', JSON.stringify([]));
      toast.success("Cart cleared");
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page py-5">
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active">Cart</li>
          </ol>
        </nav>

        <h2 className="fw-bold mb-4">Your Shopping Cart</h2>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <ShoppingBag size={60} className="text-muted" />
            </div>
            <h4 className="mb-3">Your cart is empty</h4>
            <p className="text-muted mb-4">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/shop" className="btn btn-dark px-4 py-2">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="table-responsive">
                    <table className="table table-borderless align-middle">
                      <thead className="text-muted small">
                        <tr>
                          <th scope="col" className="ps-0" style={{ width: "50%" }}>Product</th>
                          <th scope="col" className="text-center">Price</th>
                          <th scope="col" className="text-center">Quantity</th>
                          <th scope="col" className="text-end pe-0">Total</th>
                          <th scope="col" className="text-end pe-0"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map(item => (
                          <tr key={item.id}>
                            <td className="ps-0">
                              <div className="d-flex align-items-center">
                                <Link to={`/product/${item.id}`} className="me-3">
                                  <img 
                                    src={item.images ? item.images[0] : item.image} 
                                    alt={item.name} 
                                    className="cart-item-image"
                                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                  />
                                </Link>
                                <div>
                                  <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
                                    <h6 className="mb-1">{item.name}</h6>
                                  </Link>
                                  {item.color && item.size && (
                                    <div className="small text-muted">
                                      <span className="me-2">Color: {item.color}</span>
                                      <span>Size: {item.size}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="text-center">${item.price.toFixed(2)}</td>
                            <td className="text-center">
                              <div className="quantity-controls d-flex align-items-center justify-content-center">
                                <button 
                                  className="btn btn-sm btn-outline-dark border-0"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  -
                                </button>
                                <input 
                                  type="number" 
                                  className="form-control form-control-sm text-center mx-2" 
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                  style={{ width: "50px" }}
                                />
                                <button 
                                  className="btn btn-sm btn-outline-dark border-0"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="text-end fw-bold">${(item.price * item.quantity).toFixed(2)}</td>
                            <td className="text-end pe-0">
                              <button 
                                className="btn btn-sm btn-link text-danger p-0"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4">
                    <div className="row">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <div className="input-group">
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            disabled={couponApplied}
                          />
                          <button 
                            className="btn btn-outline-dark"
                            onClick={applyCoupon}
                            disabled={couponApplied}
                          >
                            Apply
                          </button>
                        </div>
                        {couponApplied && (
                          <div className="text-success mt-2 small">
                            Coupon applied: 10% off your order!
                          </div>
                        )}
                        <div className="text-muted mt-2 small d-flex align-items-center">
                          <Info size={14} className="me-1" />
                          Try code: "WELCOME10" for 10% off
                        </div>
                      </div>
                      <div className="col-md-6 d-flex justify-content-md-end align-items-center">
                        <Link to="/shop" className="btn btn-link text-dark me-3">
                          Continue Shopping
                        </Link>
                        <button 
                          className="btn btn-outline-danger"
                          onClick={clearCart}
                        >
                          <X size={16} className="me-1" />
                          Clear Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">Order Summary</h5>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Shipping</span>
                    {calculateShipping() === 0 ? (
                      <span className="text-success">Free</span>
                    ) : (
                      <span>${calculateShipping().toFixed(2)}</span>
                    )}
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Tax (8%)</span>
                    <span>${calculateTax().toFixed(2)}</span>
                  </div>
                  
                  {couponApplied && (
                    <div className="d-flex justify-content-between mb-2 text-success">
                      <span>Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <hr />
                  
                  <div className="d-flex justify-content-between mb-4">
                    <span className="fw-bold">Total</span>
                    <span className="fw-bold fs-5">${calculateTotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="d-grid gap-2">
                    <Link to="/checkout" className="btn btn-dark py-2">
                      Proceed to Checkout
                    </Link>
                  </div>
                  
                  <div className="payment-methods mt-4">
                    <div className="d-flex justify-content-center gap-2">
                      <img src="https://via.placeholder.com/40x25" alt="Visa" />
                      <img src="https://via.placeholder.com/40x25" alt="Mastercard" />
                      <img src="https://via.placeholder.com/40x25" alt="PayPal" />
                      <img src="https://via.placeholder.com/40x25" alt="Apple Pay" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card border-0 shadow-sm mt-3">
                <div className="card-body p-4">
                  <h6 className="fw-bold mb-3">Need Help?</h6>
                  <p className="small mb-0">
                    If you have any questions about your order, please contact our customer support team:
                  </p>
                  <p className="small mt-2 mb-0">
                    <a href="mailto:support@timelesscuration.com" className="text-decoration-underline">support@timelesscuration.com</a>
                    <br />
                    <span className="text-muted">+1 (555) 123-4567</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
