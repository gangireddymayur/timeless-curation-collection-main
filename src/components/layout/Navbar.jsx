
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Heart, User } from "lucide-react";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${isSticky ? "sticky-top bg-white shadow-sm" : ""}`}>
      <div className="container">
        <Link className="navbar-brand fs-3 fw-bold" to="/">
          Timeless Curation
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="/shop" id="shopDropdown" role="button" data-bs-toggle="dropdown">
                Shop
              </Link>
              <ul className="dropdown-menu" aria-labelledby="shopDropdown">
                <li><Link className="dropdown-item" to="/shop/fashion">Fashion</Link></li>
                <li><Link className="dropdown-item" to="/shop/beauty">Beauty</Link></li>
                <li><Link className="dropdown-item" to="/shop/accessories">Accessories</Link></li>
                <li><Link className="dropdown-item" to="/shop/wellness">Wellness</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/new-arrivals">New Arrivals</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blog">Blog</Link>
            </li>
          </ul>
          <div className="d-flex">
            <div className="position-relative me-3">
              <Search size={20} className="cursor-pointer" />
            </div>
            <div className="position-relative me-3">
              <Link to="/wishlist">
                <Heart size={20} className="cursor-pointer" />
              </Link>
            </div>
            <div className="position-relative me-3">
              <Link to="/account">
                <User size={20} className="cursor-pointer" />
              </Link>
            </div>
            <div className="position-relative">
              <Link to="/cart">
                <ShoppingCart size={20} className="cursor-pointer" />
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
