
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, MessageSquare, Instagram, Facebook, Twitter } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would send the form data to an API
    console.log("Form submitted:", formData);
    
    // Show success message
    setFormSubmitted(true);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="contact-page py-5">
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active">Contact Us</li>
          </ol>
        </nav>

        <div className="text-center mb-5">
          <h2 className="fw-bold mb-2">Contact Us</h2>
          <p className="text-muted">We'd love to hear from you. Get in touch with us!</p>
        </div>
        
        <div className="row mb-5">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">Get In Touch</h4>
                
                <div className="d-flex mb-4">
                  <div className="me-3">
                    <div className="contact-icon bg-light rounded-circle p-3">
                      <Mail size={20} />
                    </div>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Email</h6>
                    <p className="mb-0">
                      <a href="mailto:support@timelesscuration.com" className="text-decoration-none text-dark">
                        support@timelesscuration.com
                      </a>
                    </p>
                    <p className="mb-0">
                      <a href="mailto:info@timelesscuration.com" className="text-decoration-none text-dark">
                        info@timelesscuration.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="d-flex mb-4">
                  <div className="me-3">
                    <div className="contact-icon bg-light rounded-circle p-3">
                      <Phone size={20} />
                    </div>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Phone</h6>
                    <p className="mb-0">
                      <a href="tel:+15551234567" className="text-decoration-none text-dark">
                        +1 (555) 123-4567
                      </a>
                    </p>
                    <p className="mb-0">
                      <a href="tel:+15559876543" className="text-decoration-none text-dark">
                        +1 (555) 987-6543
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="d-flex mb-4">
                  <div className="me-3">
                    <div className="contact-icon bg-light rounded-circle p-3">
                      <MapPin size={20} />
                    </div>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Address</h6>
                    <p className="mb-0">
                      123 Luxury Avenue<br />
                      Suite 100<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="d-flex">
                  <div className="me-3">
                    <div className="contact-icon bg-light rounded-circle p-3">
                      <Clock size={20} />
                    </div>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Business Hours</h6>
                    <p className="mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="mb-1">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="mb-0">Sunday: Closed</p>
                  </div>
                </div>
                
                <hr className="my-4" />
                
                <h6 className="fw-bold mb-3">Follow Us</h6>
                <div className="d-flex gap-3">
                  <a href="#" className="text-dark contact-social">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="text-dark contact-social">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="text-dark contact-social">
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">Send Us a Message</h4>
                
                {formSubmitted ? (
                  <div className="alert alert-success d-flex align-items-center" role="alert">
                    <MessageSquare size={18} className="me-2" />
                    <div>
                      Thank you for your message! We'll get back to you as soon as possible.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Full Name *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="name" 
                          name="name" 
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email Address *</label>
                        <input 
                          type="email" 
                          className="form-control" 
                          id="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input 
                          type="tel" 
                          className="form-control" 
                          id="phone" 
                          name="phone" 
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="subject" className="form-label">Subject *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="subject" 
                          name="subject" 
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="message" className="form-label">Message *</label>
                        <textarea 
                          className="form-control" 
                          id="message" 
                          name="message" 
                          rows="5"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                      <div className="col-12">
                        <div className="form-check">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="privacyCheck"
                            required
                          />
                          <label className="form-check-label" htmlFor="privacyCheck">
                            I agree to the <a href="#" className="text-decoration-underline">Privacy Policy</a> and consent to being contacted regarding my inquiry.
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-dark btn-lg">
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
            
            <div className="mt-4">
              <div className="card border-0 shadow-sm">
                <div className="ratio ratio-16x9">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6040.188941730087!2d-73.99775258659701!3d40.72077535110975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598f493c5df7%3A0xb8a3b86972e35c7b!2sSoHo%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2suk!4v1689162057651!5m2!1sen!2suk" 
                    style={{ border: 0 }}
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4 text-center">
                <h5 className="fw-bold mb-3">Customer Support</h5>
                <p className="text-muted mb-3">
                  Need help with your order or have questions about our products?
                </p>
                <a href="mailto:support@timelesscuration.com" className="btn btn-outline-dark">
                  Get Support
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4 text-center">
                <h5 className="fw-bold mb-3">Feedback & Suggestions</h5>
                <p className="text-muted mb-3">
                  Have ideas on how we can improve? We'd love to hear from you!
                </p>
                <a href="mailto:feedback@timelesscuration.com" className="btn btn-outline-dark">
                  Share Feedback
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4 text-center">
                <h5 className="fw-bold mb-3">Business Inquiries</h5>
                <p className="text-muted mb-3">
                  Interested in partnerships or wholesale opportunities?
                </p>
                <a href="mailto:business@timelesscuration.com" className="btn btn-outline-dark">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx="true">{`
        .contact-icon {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .contact-social {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #f8f9fa;
          transition: all 0.3s ease;
        }
        
        .contact-social:hover {
          background-color: #212529;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default Contact;
