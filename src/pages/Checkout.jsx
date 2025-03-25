
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreditCard, Check } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    shippingMethod: "standard",
    paymentMethod: "creditCard",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    savePaymentInfo: false
  });
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(1); // 1 = Shipping, 2 = Payment, 3 = Review

  // Mock cart data - in a real app this would come from a state management store or API
  const mockCartItems = [
    {
      id: 1,
      name: "Cashmere Sweater",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1581497396202-5645e76a3a8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      quantity: 1,
      color: "Beige",
      size: "M"
    },
    {
      id: 3,
      name: "Silk Pillowcase Set",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2050&q=80",
      quantity: 2,
      color: "Ivory",
      size: "Queen"
    }
  ];

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setCartItems(mockCartItems);
      setLoading(false);
    }, 500);
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateShipping = () => {
    if (formData.shippingMethod === "express") {
      return 15;
    } else if (formData.shippingMethod === "priority") {
      return 8;
    } else {
      return calculateSubtotal() > 100 ? 0 : 5; // Free standard shipping over $100
    }
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateShippingForm = () => {
    const newErrors = {};
    const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "state", "zipCode"];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/[^\d]/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentForm = () => {
    const newErrors = {};
    
    if (formData.paymentMethod === "creditCard") {
      if (!formData.cardNumber) {
        newErrors.cardNumber = "Card number is required";
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number";
      }
      
      if (!formData.cardName) {
        newErrors.cardName = "Name on card is required";
      }
      
      if (!formData.expiryDate) {
        newErrors.expiryDate = "Expiry date is required";
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = "Please use format MM/YY";
      }
      
      if (!formData.cvv) {
        newErrors.cvv = "CVV is required";
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = "Please enter a valid CVV";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingStepSubmit = (e) => {
    e.preventDefault();
    if (validateShippingForm()) {
      setActiveStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handlePaymentStepSubmit = (e) => {
    e.preventDefault();
    if (validatePaymentForm()) {
      setActiveStep(3);
      window.scrollTo(0, 0);
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Simulate order processing
    alert("Order placed successfully! Thank you for your purchase.");
    
    // Redirect to confirmation page
    navigate("/confirmation");
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return value;
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

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h4 className="mb-3">Your cart is empty</h4>
        <p className="text-muted mb-4">You need to add items to your cart before checking out.</p>
        <Link to="/shop" className="btn btn-dark px-4 py-2">
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page py-5">
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/cart">Cart</Link></li>
            <li className="breadcrumb-item active">Checkout</li>
          </ol>
        </nav>

        <h2 className="fw-bold mb-4">Checkout</h2>
        
        {/* Checkout Steps */}
        <div className="checkout-steps mb-5">
          <div className="row">
            <div className="col-md-4">
              <div className={`step ${activeStep >= 1 ? 'active' : ''} ${activeStep > 1 ? 'complete' : ''}`}>
                <div className="step-number">
                  {activeStep > 1 ? <Check size={16} /> : 1}
                </div>
                <div className="step-content">
                  <h6 className="mb-0">Shipping</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`step ${activeStep >= 2 ? 'active' : ''} ${activeStep > 2 ? 'complete' : ''}`}>
                <div className="step-number">
                  {activeStep > 2 ? <Check size={16} /> : 2}
                </div>
                <div className="step-content">
                  <h6 className="mb-0">Payment</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`step ${activeStep >= 3 ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <div className="step-content">
                  <h6 className="mb-0">Review</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-lg-8 mb-4 mb-lg-0">
            {/* Shipping Information Step */}
            {activeStep === 1 && (
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4">Shipping Information</h4>
                  
                  <form onSubmit={handleShippingStepSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">First Name *</label>
                        <input 
                          type="text" 
                          className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Last Name *</label>
                        <input 
                          type="text" 
                          className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email Address *</label>
                        <input 
                          type="email" 
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Phone Number *</label>
                        <input 
                          type="tel" 
                          className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g., (555) 123-4567"
                        />
                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                      </div>
                      <div className="col-12">
                        <label className="form-label">Address *</label>
                        <input 
                          type="text" 
                          className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Street address, apartment, etc."
                        />
                        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">City *</label>
                        <input 
                          type="text" 
                          className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                        {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">State/Province *</label>
                        <input 
                          type="text" 
                          className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                        />
                        {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">ZIP/Postal Code *</label>
                        <input 
                          type="text" 
                          className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                        />
                        {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
                      </div>
                      <div className="col-12">
                        <label className="form-label">Country *</label>
                        <select 
                          className="form-select"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                          <option value="France">France</option>
                          <option value="Germany">Germany</option>
                          <option value="Japan">Japan</option>
                        </select>
                      </div>
                      <div className="col-12 mt-4">
                        <h5 className="fw-bold mb-3">Shipping Method</h5>
                        <div className="shipping-options">
                          <div className="form-check mb-3 p-3 border rounded">
                            <input 
                              className="form-check-input" 
                              type="radio" 
                              name="shippingMethod" 
                              id="standard" 
                              value="standard"
                              checked={formData.shippingMethod === "standard"}
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label w-100" htmlFor="standard">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <strong>Standard Shipping</strong>
                                  <p className="text-muted mb-0 small">5-7 business days</p>
                                </div>
                                <span>
                                  {calculateSubtotal() > 100 ? (
                                    <span className="text-success">Free</span>
                                  ) : (
                                    <span>$5.00</span>
                                  )}
                                </span>
                              </div>
                            </label>
                          </div>
                          <div className="form-check mb-3 p-3 border rounded">
                            <input 
                              className="form-check-input" 
                              type="radio" 
                              name="shippingMethod" 
                              id="priority" 
                              value="priority"
                              checked={formData.shippingMethod === "priority"}
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label w-100" htmlFor="priority">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <strong>Priority Shipping</strong>
                                  <p className="text-muted mb-0 small">2-4 business days</p>
                                </div>
                                <span>$8.00</span>
                              </div>
                            </label>
                          </div>
                          <div className="form-check p-3 border rounded">
                            <input 
                              className="form-check-input" 
                              type="radio" 
                              name="shippingMethod" 
                              id="express" 
                              value="express"
                              checked={formData.shippingMethod === "express"}
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label w-100" htmlFor="express">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <strong>Express Shipping</strong>
                                  <p className="text-muted mb-0 small">1-2 business days</p>
                                </div>
                                <span>$15.00</span>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="d-flex justify-content-between mt-4">
                      <Link to="/cart" className="btn btn-outline-dark">
                        Back to Cart
                      </Link>
                      <button type="submit" className="btn btn-dark">
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            {/* Payment Information Step */}
            {activeStep === 2 && (
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4">Payment Method</h4>
                  
                  <form onSubmit={handlePaymentStepSubmit}>
                    <div className="payment-methods mb-4">
                      <div className="form-check mb-3 p-3 border rounded">
                        <input 
                          className="form-check-input" 
                          type="radio" 
                          name="paymentMethod" 
                          id="creditCard" 
                          value="creditCard"
                          checked={formData.paymentMethod === "creditCard"}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label w-100" htmlFor="creditCard">
                          <div className="d-flex align-items-center">
                            <CreditCard size={20} className="me-2" />
                            <span>Credit/Debit Card</span>
                          </div>
                        </label>
                      </div>
                      <div className="form-check mb-3 p-3 border rounded">
                        <input 
                          className="form-check-input" 
                          type="radio" 
                          name="paymentMethod" 
                          id="paypal" 
                          value="paypal"
                          checked={formData.paymentMethod === "paypal"}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label w-100" htmlFor="paypal">
                          <div className="d-flex align-items-center">
                            <img src="https://via.placeholder.com/40x25" alt="PayPal" className="me-2" />
                            <span>PayPal</span>
                          </div>
                        </label>
                      </div>
                      <div className="form-check p-3 border rounded">
                        <input 
                          className="form-check-input" 
                          type="radio" 
                          name="paymentMethod" 
                          id="applePay" 
                          value="applePay"
                          checked={formData.paymentMethod === "applePay"}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label w-100" htmlFor="applePay">
                          <div className="d-flex align-items-center">
                            <img src="https://via.placeholder.com/40x25" alt="Apple Pay" className="me-2" />
                            <span>Apple Pay</span>
                          </div>
                        </label>
                      </div>
                    </div>
                    
                    {formData.paymentMethod === "creditCard" && (
                      <div className="credit-card-form">
                        <div className="row g-3">
                          <div className="col-12">
                            <label className="form-label">Card Number *</label>
                            <div className="input-group">
                              <input 
                                type="text" 
                                className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={(e) => {
                                  const formatted = formatCardNumber(e.target.value);
                                  setFormData({
                                    ...formData,
                                    cardNumber: formatted
                                  });
                                }}
                                placeholder="XXXX XXXX XXXX XXXX"
                                maxLength={19}
                              />
                              <span className="input-group-text">
                                <div className="d-flex gap-2">
                                  <img src="https://via.placeholder.com/25x15" alt="Visa" />
                                  <img src="https://via.placeholder.com/25x15" alt="Mastercard" />
                                </div>
                              </span>
                              {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                            </div>
                          </div>
                          <div className="col-12">
                            <label className="form-label">Name on Card *</label>
                            <input 
                              type="text" 
                              className={`form-control ${errors.cardName ? 'is-invalid' : ''}`}
                              name="cardName"
                              value={formData.cardName}
                              onChange={handleInputChange}
                            />
                            {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>}
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Expiry Date *</label>
                            <input 
                              type="text" 
                              className={`form-control ${errors.expiryDate ? 'is-invalid' : ''}`}
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={(e) => {
                                const formatted = formatExpiryDate(e.target.value);
                                setFormData({
                                  ...formData,
                                  expiryDate: formatted
                                });
                              }}
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                            {errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate}</div>}
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">CVV *</label>
                            <input 
                              type="text" 
                              className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                              name="cvv"
                              value={formData.cvv}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                setFormData({
                                  ...formData,
                                  cvv: value
                                });
                              }}
                              placeholder="XXX"
                              maxLength={4}
                            />
                            {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                          </div>
                          <div className="col-12 mt-2">
                            <div className="form-check">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                name="savePaymentInfo"
                                id="savePaymentInfo"
                                checked={formData.savePaymentInfo}
                                onChange={handleInputChange}
                              />
                              <label className="form-check-label" htmlFor="savePaymentInfo">
                                Save this card for future purchases
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="d-flex justify-content-between mt-4">
                      <button 
                        type="button" 
                        className="btn btn-outline-dark"
                        onClick={() => setActiveStep(1)}
                      >
                        Back to Shipping
                      </button>
                      <button type="submit" className="btn btn-dark">
                        Continue to Review
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            {/* Order Review Step */}
            {activeStep === 3 && (
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4">Review Your Order</h4>
                  
                  <div className="order-details">
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <h6 className="fw-bold mb-3">Shipping Information</h6>
                        <p className="mb-1">{formData.firstName} {formData.lastName}</p>
                        <p className="mb-1">{formData.address}</p>
                        <p className="mb-1">{formData.city}, {formData.state} {formData.zipCode}</p>
                        <p className="mb-1">{formData.country}</p>
                        <p className="mb-1">{formData.email}</p>
                        <p className="mb-0">{formData.phone}</p>
                      </div>
                      <div className="col-md-6">
                        <h6 className="fw-bold mb-3">Payment Method</h6>
                        {formData.paymentMethod === "creditCard" && (
                          <>
                            <p className="mb-1">Credit/Debit Card</p>
                            <p className="mb-1">**** **** **** {formData.cardNumber.slice(-4)}</p>
                            <p className="mb-0">{formData.cardName}</p>
                          </>
                        )}
                        {formData.paymentMethod === "paypal" && (
                          <p className="mb-0">PayPal</p>
                        )}
                        {formData.paymentMethod === "applePay" && (
                          <p className="mb-0">Apple Pay</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="shipping-method mb-4">
                      <h6 className="fw-bold mb-3">Shipping Method</h6>
                      <p className="mb-0">
                        {formData.shippingMethod === "express" && "Express Shipping (1-2 business days)"}
                        {formData.shippingMethod === "priority" && "Priority Shipping (2-4 business days)"}
                        {formData.shippingMethod === "standard" && "Standard Shipping (5-7 business days)"}
                      </p>
                    </div>
                    
                    <div className="order-items mb-4">
                      <h6 className="fw-bold mb-3">Order Items</h6>
                      {cartItems.map(item => (
                        <div key={item.id} className="d-flex mb-3">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="me-3"
                            style={{ width: "70px", height: "70px", objectFit: "cover" }}
                          />
                          <div className="flex-grow-1">
                            <h6 className="mb-1">{item.name}</h6>
                            <div className="small text-muted mb-1">
                              <span className="me-2">Color: {item.color}</span>
                              <span>Size: {item.size}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span>Qty: {item.quantity}</span>
                              <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <form onSubmit={handlePlaceOrder}>
                    <div className="form-check mb-4">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        required
                        id="termsCheck"
                      />
                      <label className="form-check-label" htmlFor="termsCheck">
                        I agree to the <a href="#" className="text-decoration-underline">Terms and Conditions</a> and <a href="#" className="text-decoration-underline">Privacy Policy</a>
                      </label>
                    </div>
                    
                    <div className="d-flex justify-content-between">
                      <button 
                        type="button" 
                        className="btn btn-outline-dark"
                        onClick={() => setActiveStep(2)}
                      >
                        Back to Payment
                      </button>
                      <button type="submit" className="btn btn-dark">
                        Place Order
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4">Order Summary</h5>
                
                <div className="order-items mb-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex align-items-center">
                        <span className="badge bg-dark rounded-circle me-2">{item.quantity}</span>
                        <span>{item.name}</span>
                      </div>
                      <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <hr />
                
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
                
                <hr />
                
                <div className="d-flex justify-content-between mb-0">
                  <span className="fw-bold">Total</span>
                  <span className="fw-bold fs-5">${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx="true">{`
        .checkout-steps {
          position: relative;
        }
        
        .checkout-steps .row {
          position: relative;
        }
        
        .checkout-steps .row::before {
          content: "";
          position: absolute;
          top: 24px;
          left: 16.6%;
          right: 16.6%;
          height: 2px;
          background-color: #dee2e6;
          z-index: 0;
        }
        
        .step {
          display: flex;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        
        .step.active .step-number {
          background-color: #212529;
          color: white;
          border-color: #212529;
        }
        
        .step.complete .step-number {
          background-color: #28a745;
          color: white;
          border-color: #28a745;
        }
        
        .step-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: white;
          border: 2px solid #dee2e6;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          font-weight: bold;
        }
        
        .shipping-options .form-check-input:checked ~ .form-check-label {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Checkout;
