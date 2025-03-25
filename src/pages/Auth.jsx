
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!isLogin) {
      if (!formData.firstName) {
        newErrors.firstName = "First name is required";
      }
      
      if (!formData.lastName) {
        newErrors.lastName = "Last name is required";
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      if (isLogin) {
        // In a real app, this would handle login logic
        console.log("Logging in with:", {
          email: formData.email,
          password: formData.password
        });
        alert("Login successful!");
      } else {
        // In a real app, this would handle registration logic
        console.log("Registering with:", formData);
        alert("Registration successful!");
      }
      
      // Redirect to home or account page
      navigate("/account");
    }, 1500);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  return (
    <div className="auth-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">{isLogin ? "Welcome Back" : "Create Account"}</h2>
                  <p className="text-muted">
                    {isLogin 
                      ? "Sign in to access your account"
                      : "Join us for a personalized shopping experience"
                    }
                  </p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <User size={18} />
                          </span>
                          <input 
                            type="text" 
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                          />
                          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <User size={18} />
                          </span>
                          <input 
                            type="text" 
                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                          />
                          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Mail size={18} />
                      </span>
                      <input 
                        type="email" 
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Lock size={18} />
                      </span>
                      <input 
                        type={showPassword ? "text" : "password"} 
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                      />
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                  </div>
                  
                  {!isLogin && (
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Lock size={18} />
                        </span>
                        <input 
                          type={showPassword ? "text" : "password"} 
                          className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm Password"
                        />
                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                      </div>
                    </div>
                  )}
                  
                  {isLogin && (
                    <div className="d-flex justify-content-end mb-3">
                      <Link to="/forgot-password" className="text-decoration-none text-dark">
                        Forgot password?
                      </Link>
                    </div>
                  )}
                  
                  <div className="d-grid mb-4">
                    <button 
                      type="submit" 
                      className="btn btn-dark py-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          {isLogin ? "Signing In..." : "Creating Account..."}
                        </>
                      ) : (
                        <>
                          {isLogin ? "Sign In" : "Create Account"}
                          <ArrowRight size={18} className="ms-1" />
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <p className="mb-0">
                      {isLogin ? "Don't have an account? " : "Already have an account? "}
                      <button 
                        type="button" 
                        className="btn btn-link text-dark p-0 text-decoration-underline"
                        onClick={toggleAuthMode}
                      >
                        {isLogin ? "Create one" : "Sign in"}
                      </button>
                    </p>
                  </div>
                </form>
                
                {isLogin && (
                  <div className="mt-4">
                    <div className="separator text-muted text-center mb-4">
                      <span>Or sign in with</span>
                    </div>
                    
                    <div className="row g-2">
                      <div className="col-6">
                        <button className="btn btn-outline-dark w-100">
                          <img 
                            src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" 
                            alt="Google" 
                            width="18" 
                            height="18" 
                            className="me-2"
                          />
                          Google
                        </button>
                      </div>
                      <div className="col-6">
                        <button className="btn btn-outline-dark w-100">
                          <img 
                            src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" 
                            alt="Facebook" 
                            width="18" 
                            height="18" 
                            className="me-2"
                          />
                          Facebook
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-muted small">
                By signing in or creating an account, you agree to our 
                <a href="#" className="text-decoration-underline text-dark mx-1">Terms of Service</a>
                and 
                <a href="#" className="text-decoration-underline text-dark mx-1">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx="true">{`
        .separator {
          display: flex;
          align-items: center;
          text-align: center;
        }
        
        .separator::before,
        .separator::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #dee2e6;
        }
        
        .separator span {
          padding: 0 10px;
        }
      `}</style>
    </div>
  );
};

export default Auth;
