
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut, ChevronRight } from "lucide-react";

const Account = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Mock user data - in a real app this would come from authentication
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    orders: [
      {
        id: "TC-123456",
        date: "2023-06-15",
        status: "Delivered",
        items: 3,
        total: 329.97
      },
      {
        id: "TC-123455",
        date: "2023-05-02",
        status: "Delivered",
        items: 2,
        total: 159.98
      },
      {
        id: "TC-123454",
        date: "2023-04-18",
        status: "Delivered",
        items: 1,
        total: 89.99
      }
    ],
    wishlist: [
      {
        id: 2,
        name: "Leather Tote Bag",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      },
      {
        id: 4,
        name: "Luxury Face Serum",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
      }
    ],
    addresses: [
      {
        id: 1,
        name: "Home",
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "United States",
        isDefault: true
      },
      {
        id: 2,
        name: "Work",
        street: "456 Market Street",
        city: "San Francisco",
        state: "CA",
        zip: "94103",
        country: "United States",
        isDefault: false
      }
    ],
    paymentMethods: [
      {
        id: 1,
        type: "Credit Card",
        cardType: "Visa",
        lastFour: "4242",
        expiryDate: "05/25",
        isDefault: true
      },
      {
        id: 2,
        type: "Credit Card",
        cardType: "Mastercard",
        lastFour: "5678",
        expiryDate: "09/24",
        isDefault: false
      }
    ]
  };

  // Form state for profile information
  const [profileForm, setProfileForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [passwordSection, setPasswordSection] = useState(false);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value
    });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the updated profile to an API
    alert("Profile updated successfully!");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (profileForm.newPassword !== profileForm.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    
    // In a real app, this would send the password change request to an API
    alert("Password changed successfully!");
    
    // Reset password fields
    setProfileForm({
      ...profileForm,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    
    setPasswordSection(false);
  };

  const handleLogout = () => {
    // In a real app, this would handle logout logic
    alert("Logged out successfully!");
    navigate("/");
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "orders", label: "Orders", icon: <Package size={18} /> },
    { id: "wishlist", label: "Wishlist", icon: <Heart size={18} /> },
    { id: "addresses", label: "Addresses", icon: <MapPin size={18} /> },
    { id: "payment", label: "Payment Methods", icon: <CreditCard size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> }
  ];

  return (
    <div className="account-page py-5">
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active">Account</li>
          </ol>
        </nav>

        <h2 className="fw-bold mb-4">My Account</h2>
        
        <div className="row">
          <div className="col-lg-3 mb-4 mb-lg-0">
            {/* Profile Summary - Mobile */}
            <div className="d-flex d-lg-none align-items-center mb-4">
              <img 
                src={user.avatar} 
                alt={`${user.firstName} ${user.lastName}`}
                className="rounded-circle me-3"
                width="50"
                height="50"
              />
              <div>
                <h6 className="mb-0">{user.firstName} {user.lastName}</h6>
                <p className="text-muted small mb-0">{user.email}</p>
              </div>
            </div>
            
            {/* Sidebar Menu */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-0">
                {/* Profile Summary - Desktop */}
                <div className="d-none d-lg-flex align-items-center p-3 border-bottom">
                  <img 
                    src={user.avatar} 
                    alt={`${user.firstName} ${user.lastName}`}
                    className="rounded-circle me-3"
                    width="50"
                    height="50"
                  />
                  <div>
                    <h6 className="mb-0">{user.firstName} {user.lastName}</h6>
                    <p className="text-muted small mb-0">{user.email}</p>
                  </div>
                </div>
                
                <div className="list-group list-group-flush">
                  {tabs.map(tab => (
                    <button 
                      key={tab.id} 
                      className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === tab.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <span className="me-3">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                  <button 
                    className="list-group-item list-group-item-action d-flex align-items-center text-danger"
                    onClick={handleLogout}
                  >
                    <span className="me-3"><LogOut size={18} /></span>
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-9">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <div>
                    <h4 className="fw-bold mb-4">Profile Information</h4>
                    <form onSubmit={handleProfileSubmit}>
                      <div className="row mb-4">
                        <div className="col-md-6 mb-3 mb-md-0">
                          <label className="form-label">First Name</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="firstName"
                            value={profileForm.firstName}
                            onChange={handleProfileChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Last Name</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="lastName"
                            value={profileForm.lastName}
                            onChange={handleProfileChange}
                          />
                        </div>
                      </div>
                      
                      <div className="row mb-4">
                        <div className="col-md-6 mb-3 mb-md-0">
                          <label className="form-label">Email Address</label>
                          <input 
                            type="email" 
                            className="form-control" 
                            name="email"
                            value={profileForm.email}
                            onChange={handleProfileChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Phone Number</label>
                          <input 
                            type="tel" 
                            className="form-control" 
                            name="phone"
                            value={profileForm.phone}
                            onChange={handleProfileChange}
                          />
                        </div>
                      </div>
                      
                      <button type="submit" className="btn btn-dark">
                        Save Changes
                      </button>
                    </form>
                    
                    <hr className="my-4" />
                    
                    {passwordSection ? (
                      <div>
                        <h5 className="fw-bold mb-3">Change Password</h5>
                        <form onSubmit={handlePasswordSubmit}>
                          <div className="mb-3">
                            <label className="form-label">Current Password</label>
                            <input 
                              type="password" 
                              className="form-control" 
                              name="currentPassword"
                              value={profileForm.currentPassword}
                              onChange={handleProfileChange}
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <input 
                              type="password" 
                              className="form-control" 
                              name="newPassword"
                              value={profileForm.newPassword}
                              onChange={handleProfileChange}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label className="form-label">Confirm New Password</label>
                            <input 
                              type="password" 
                              className="form-control" 
                              name="confirmPassword"
                              value={profileForm.confirmPassword}
                              onChange={handleProfileChange}
                              required
                            />
                          </div>
                          <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-dark">
                              Update Password
                            </button>
                            <button 
                              type="button" 
                              className="btn btn-outline-secondary"
                              onClick={() => setPasswordSection(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div>
                        <h5 className="fw-bold mb-3">Password</h5>
                        <p className="text-muted mb-3">
                          Your password was last changed on April 3, 2023
                        </p>
                        <button 
                          className="btn btn-outline-dark"
                          onClick={() => setPasswordSection(true)}
                        >
                          Change Password
                        </button>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Orders Tab */}
                {activeTab === "orders" && (
                  <div>
                    <h4 className="fw-bold mb-4">Order History</h4>
                    
                    {user.orders.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="mb-3">You haven't placed any orders yet.</p>
                        <Link to="/shop" className="btn btn-outline-dark">
                          Start Shopping
                        </Link>
                      </div>
                    ) : (
                      <div className="table-responsive">
                        <table className="table align-middle">
                          <thead>
                            <tr>
                              <th scope="col">Order ID</th>
                              <th scope="col">Date</th>
                              <th scope="col">Status</th>
                              <th scope="col">Items</th>
                              <th scope="col">Total</th>
                              <th scope="col" className="text-end">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {user.orders.map(order => (
                              <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{new Date(order.date).toLocaleDateString()}</td>
                                <td>
                                  <span className="badge bg-success">{order.status}</span>
                                </td>
                                <td>{order.items}</td>
                                <td>${order.total.toFixed(2)}</td>
                                <td className="text-end">
                                  <Link to={`/account/orders/${order.id}`} className="btn btn-sm btn-outline-dark">
                                    View <ChevronRight size={14} className="ms-1" />
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Wishlist Tab */}
                {activeTab === "wishlist" && (
                  <div>
                    <h4 className="fw-bold mb-4">My Wishlist</h4>
                    
                    {user.wishlist.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="mb-3">Your wishlist is empty.</p>
                        <Link to="/shop" className="btn btn-outline-dark">
                          Discover Products
                        </Link>
                      </div>
                    ) : (
                      <div className="row g-4">
                        {user.wishlist.map(item => (
                          <div key={item.id} className="col-md-6 col-lg-4">
                            <div className="card border-0 h-100 shadow-sm">
                              <div className="position-relative">
                                <Link to={`/product/${item.id}`}>
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="card-img-top"
                                    style={{ height: "180px", objectFit: "cover" }}
                                  />
                                </Link>
                                <button className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2">
                                  <Heart size={14} fill="currentColor" />
                                </button>
                              </div>
                              <div className="card-body">
                                <h6 className="card-title">
                                  <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
                                    {item.name}
                                  </Link>
                                </h6>
                                <p className="fw-bold">${item.price.toFixed(2)}</p>
                                <div className="d-grid">
                                  <button className="btn btn-dark btn-sm">
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Addresses Tab */}
                {activeTab === "addresses" && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 className="fw-bold mb-0">My Addresses</h4>
                      <button className="btn btn-dark">
                        Add New Address
                      </button>
                    </div>
                    
                    {user.addresses.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="mb-3">You haven't added any addresses yet.</p>
                        <button className="btn btn-outline-dark">
                          Add Address
                        </button>
                      </div>
                    ) : (
                      <div className="row g-4">
                        {user.addresses.map(address => (
                          <div key={address.id} className="col-md-6">
                            <div className="card border-0 h-100 shadow-sm">
                              <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                  <h6 className="fw-bold mb-0">{address.name}</h6>
                                  {address.isDefault && (
                                    <span className="badge bg-dark">Default</span>
                                  )}
                                </div>
                                <p className="mb-1">{address.street}</p>
                                <p className="mb-1">{address.city}, {address.state} {address.zip}</p>
                                <p className="mb-3">{address.country}</p>
                                <div className="d-flex gap-2">
                                  <button className="btn btn-sm btn-outline-dark">
                                    Edit
                                  </button>
                                  {!address.isDefault && (
                                    <button className="btn btn-sm btn-outline-dark">
                                      Set as Default
                                    </button>
                                  )}
                                  <button className="btn btn-sm btn-outline-danger">
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Payment Methods Tab */}
                {activeTab === "payment" && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 className="fw-bold mb-0">Payment Methods</h4>
                      <button className="btn btn-dark">
                        Add New Payment Method
                      </button>
                    </div>
                    
                    {user.paymentMethods.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="mb-3">You haven't added any payment methods yet.</p>
                        <button className="btn btn-outline-dark">
                          Add Payment Method
                        </button>
                      </div>
                    ) : (
                      <div className="row g-4">
                        {user.paymentMethods.map(method => (
                          <div key={method.id} className="col-md-6">
                            <div className="card border-0 h-100 shadow-sm">
                              <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                  <h6 className="fw-bold mb-0">{method.cardType}</h6>
                                  {method.isDefault && (
                                    <span className="badge bg-dark">Default</span>
                                  )}
                                </div>
                                <p className="mb-1">**** **** **** {method.lastFour}</p>
                                <p className="mb-3">Expires: {method.expiryDate}</p>
                                <div className="d-flex gap-2">
                                  {!method.isDefault && (
                                    <button className="btn btn-sm btn-outline-dark">
                                      Set as Default
                                    </button>
                                  )}
                                  <button className="btn btn-sm btn-outline-danger">
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Settings Tab */}
                {activeTab === "settings" && (
                  <div>
                    <h4 className="fw-bold mb-4">Account Settings</h4>
                    
                    <div className="card border-0 shadow-sm mb-4">
                      <div className="card-body">
                        <h6 className="fw-bold mb-3">Email Notifications</h6>
                        <div className="form-check form-switch mb-3">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="orderUpdates"
                            defaultChecked
                          />
                          <label className="form-check-label" htmlFor="orderUpdates">
                            Order updates and confirmations
                          </label>
                        </div>
                        <div className="form-check form-switch mb-3">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="promotionalEmails"
                            defaultChecked
                          />
                          <label className="form-check-label" htmlFor="promotionalEmails">
                            Promotional emails and special offers
                          </label>
                        </div>
                        <div className="form-check form-switch mb-3">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="newProducts"
                          />
                          <label className="form-check-label" htmlFor="newProducts">
                            New product announcements
                          </label>
                        </div>
                        <div className="form-check form-switch">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="accountSecurity"
                            defaultChecked
                          />
                          <label className="form-check-label" htmlFor="accountSecurity">
                            Account security notifications
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card border-0 shadow-sm mb-4">
                      <div className="card-body">
                        <h6 className="fw-bold mb-3">Privacy Settings</h6>
                        <div className="form-check form-switch mb-3">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="dataSaving"
                            defaultChecked
                          />
                          <label className="form-check-label" htmlFor="dataSaving">
                            Save my shopping history
                          </label>
                        </div>
                        <div className="form-check form-switch">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="personalization"
                            defaultChecked
                          />
                          <label className="form-check-label" htmlFor="personalization">
                            Personalized recommendations
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card border-0 shadow-sm bg-light">
                      <div className="card-body">
                        <h6 className="fw-bold text-danger mb-3">Danger Zone</h6>
                        <p className="text-muted small mb-3">
                          Deleting your account will permanently remove all your data, including order history, saved addresses, and payment methods. This action cannot be undone.
                        </p>
                        <button className="btn btn-outline-danger">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
