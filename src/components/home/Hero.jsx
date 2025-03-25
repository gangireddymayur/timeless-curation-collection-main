
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-section position-relative">
      <div className="hero-image w-100" style={{ 
        height: "80vh", 
        backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')", 
        backgroundSize: "cover", 
        backgroundPosition: "center"
      }}>
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark" style={{ opacity: "0.4" }}></div>
        <div className="container h-100 position-relative">
          <div className="row h-100 align-items-center">
            <div className="col-lg-6">
              <div className="text-white">
                <h1 className="display-4 fw-bold mb-4">Timeless Elegance – Curated for You</h1>
                <p className="lead mb-4">Discover our handpicked collection of premium products that blend sophistication with modern style.</p>
                <Link to="/shop" className="btn btn-light btn-lg px-4 py-2">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
