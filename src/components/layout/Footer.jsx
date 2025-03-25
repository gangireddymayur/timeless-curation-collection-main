
import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-light py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h5 className="mb-4 fw-bold">Timeless Curation</h5>
            <p className="text-muted">
              Discover timeless elegance with our expertly curated collection of luxury essentials.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="#" className="text-dark">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-dark">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-dark">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h6 className="mb-4 fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
              <li className="mb-2"><Link to="/shop" className="text-decoration-none text-muted">Shop</Link></li>
              <li className="mb-2"><Link to="/new-arrivals" className="text-decoration-none text-muted">New Arrivals</Link></li>
              <li className="mb-2"><Link to="/blog" className="text-decoration-none text-muted">Blog</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h6 className="mb-4 fw-bold">Categories</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/shop/fashion" className="text-decoration-none text-muted">Fashion</Link></li>
              <li className="mb-2"><Link to="/shop/beauty" className="text-decoration-none text-muted">Beauty</Link></li>
              <li className="mb-2"><Link to="/shop/accessories" className="text-decoration-none text-muted">Accessories</Link></li>
              <li className="mb-2"><Link to="/shop/wellness" className="text-decoration-none text-muted">Wellness</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-4 col-md-6">
            <h6 className="mb-4 fw-bold">Contact</h6>
            <ul className="list-unstyled">
              <li className="mb-2">Email: support@timelesscuration.com</li>
              <li className="mb-2">Phone: +1 (555) 123-4567</li>
              <li className="mb-2">Address: 123 Luxury Ave, Suite 100, New York, NY 10001</li>
            </ul>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-md-0 text-muted">© 2023 Timeless Curation. All rights reserved.</p>
          </div>
          <div className="col-md-6">
            <div className="text-md-end">
              <img src="https://via.placeholder.com/40x25" alt="Visa" className="me-2" />
              <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="me-2" />
              <img src="https://via.placeholder.com/40x25" alt="PayPal" className="me-2" />
              <img src="https://via.placeholder.com/40x25" alt="Apple Pay" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
