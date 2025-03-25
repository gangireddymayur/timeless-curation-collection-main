
import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Package, Truck, ArrowRight } from "lucide-react";

const OrderConfirmation = () => {
  // In a real application, this would come from the order submission response
  const orderDetails = {
    orderNumber: "TC-" + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleDateString(),
    total: 409.97,
    email: "customer@example.com",
  };

  return (
    <div className="confirmation-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5 text-center">
                <div className="mb-4">
                  <CheckCircle size={64} className="text-success" />
                </div>
                <h2 className="fw-bold mb-3">Thank You for Your Order!</h2>
                <p className="text-muted mb-4">
                  Your order has been received and is being processed. You will receive an email confirmation shortly.
                </p>
                
                <div className="order-info p-4 bg-light rounded mb-4 text-start">
                  <div className="row mb-3">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <h6 className="text-muted mb-1">Order Number</h6>
                      <p className="fw-bold mb-0">{orderDetails.orderNumber}</p>
                    </div>
                    <div className="col-sm-6">
                      <h6 className="text-muted mb-1">Date</h6>
                      <p className="fw-bold mb-0">{orderDetails.date}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <h6 className="text-muted mb-1">Total</h6>
                      <p className="fw-bold mb-0">${orderDetails.total.toFixed(2)}</p>
                    </div>
                    <div className="col-sm-6">
                      <h6 className="text-muted mb-1">Email</h6>
                      <p className="fw-bold mb-0">{orderDetails.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="order-timeline mb-5">
                  <div className="timeline-item">
                    <div className="timeline-icon">
                      <CheckCircle size={24} className="text-success" />
                    </div>
                    <div className="timeline-content">
                      <h6 className="fw-bold mb-0">Order Confirmed</h6>
                      <p className="text-muted mb-0 small">Your order has been confirmed and is being processed.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-icon">
                      <Package size={24} className="text-muted" />
                    </div>
                    <div className="timeline-content">
                      <h6 className="fw-bold mb-0">Order Processing</h6>
                      <p className="text-muted mb-0 small">We're preparing your items for shipment.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-icon">
                      <Truck size={24} className="text-muted" />
                    </div>
                    <div className="timeline-content">
                      <h6 className="fw-bold mb-0">Order Shipped</h6>
                      <p className="text-muted mb-0 small">You'll receive tracking information via email when your order ships.</p>
                    </div>
                  </div>
                </div>
                
                <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
                  <Link to="/account/orders" className="btn btn-dark">
                    View Order Details
                  </Link>
                  <Link to="/shop" className="btn btn-outline-dark">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="card border-0 shadow-sm mt-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">What's Next?</h5>
                <ul className="list-unstyled mb-0">
                  <li className="mb-3">
                    <div className="d-flex">
                      <div className="me-3">
                        <div className="bg-light rounded-circle p-2">
                          <span className="fw-bold">1</span>
                        </div>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Order Confirmation Email</h6>
                        <p className="text-muted mb-0 small">
                          You will receive an email with your order details and receipt.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="mb-3">
                    <div className="d-flex">
                      <div className="me-3">
                        <div className="bg-light rounded-circle p-2">
                          <span className="fw-bold">2</span>
                        </div>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Order Processing</h6>
                        <p className="text-muted mb-0 small">
                          We'll start preparing your order for shipment. This usually takes 1-2 business days.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex">
                      <div className="me-3">
                        <div className="bg-light rounded-circle p-2">
                          <span className="fw-bold">3</span>
                        </div>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Shipping Notification</h6>
                        <p className="text-muted mb-0 small">
                          Once your order ships, you'll receive an email with tracking information.
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-4">
              <h6 className="fw-bold mb-3">Need Assistance?</h6>
              <p className="mb-4">
                If you have any questions about your order, please contact our customer support:
              </p>
              <p className="mb-0">
                <a href="mailto:support@timelesscuration.com" className="text-decoration-underline">support@timelesscuration.com</a> | 
                <span className="mx-2">+1 (555) 123-4567</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx="true">{`
        .order-timeline {
          position: relative;
          padding-left: 30px;
        }
        
        .order-timeline::before {
          content: "";
          position: absolute;
          top: 8px;
          bottom: 8px;
          left: 12px;
          border-left: 2px dashed #dee2e6;
        }
        
        .timeline-item {
          position: relative;
          padding-bottom: 24px;
        }
        
        .timeline-item:last-child {
          padding-bottom: 0;
        }
        
        .timeline-icon {
          position: absolute;
          left: -30px;
          background: white;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default OrderConfirmation;
