
import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // In a real application, you would send this to your backend
      console.log("Email submitted:", email);
      setIsSubmitted(true);
      setEmail("");
      
      // Reset the success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section className="newsletter py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="fw-bold mb-3">Join Our VIP List</h2>
            <p className="text-muted mb-4">
              Subscribe to receive exclusive offers, early access to new collections, and curated content.
            </p>
            
            <form onSubmit={handleSubmit} className="row g-2 justify-content-center">
              <div className="col-md-8">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-auto">
                <button type="submit" className="btn btn-dark btn-lg w-100">
                  Subscribe
                </button>
              </div>
            </form>
            
            {isSubmitted && (
              <div className="alert alert-success mt-3">
                Thank you for subscribing! Welcome to our VIP list.
              </div>
            )}
            
            <p className="small text-muted mt-3">
              By subscribing, you agree to our Privacy Policy and consent to receive our newsletters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
