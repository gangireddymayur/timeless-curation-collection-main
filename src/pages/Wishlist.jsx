
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
    setLoading(false);
  }, []);

  const handleRemoveItem = (id) => {
    const newWishlist = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    toast.success("Item removed from wishlist");
  };

  const handleAddToCart = (product) => {
    // Get cart from localStorage or initialize empty array
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product is already in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Product exists, increase quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // Product doesn't exist, add new item
      cart.push({
        ...product,
        quantity: 1,
        addedDate: new Date().toISOString()
      });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddAllToCart = () => {
    if (wishlistItems.length === 0) return;
    
    // Get current cart
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Add each wishlist item to cart
    wishlistItems.forEach(product => {
      const existingItemIndex = cart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Product exists, increase quantity
        cart[existingItemIndex].quantity += 1;
      } else {
        // Product doesn't exist, add new item
        cart.push({
          ...product,
          quantity: 1,
          addedDate: new Date().toISOString()
        });
      }
    });
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    toast.success("All items added to cart!");
  };

  const handleClearWishlist = () => {
    if (window.confirm("Are you sure you want to clear your wishlist?")) {
      setWishlistItems([]);
      localStorage.setItem('wishlist', JSON.stringify([]));
      toast.success("Wishlist cleared");
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
    <div className="wishlist-page py-5">
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active">Wishlist</li>
          </ol>
        </nav>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">My Wishlist</h2>
          {wishlistItems.length > 0 && (
            <button 
              className="btn btn-outline-danger"
              onClick={handleClearWishlist}
            >
              <Trash2 size={16} className="me-1" />
              Clear Wishlist
            </button>
          )}
        </div>
        
        {wishlistItems.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <Heart size={60} className="text-muted" />
            </div>
            <h4 className="mb-3">Your wishlist is empty</h4>
            <p className="text-muted mb-4">Add items you love to your wishlist. Review them anytime and easily move them to your cart.</p>
            <Link to="/shop" className="btn btn-dark px-4 py-2">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {wishlistItems.map(item => (
              <div key={item.id} className="col-md-6 col-lg-3">
                <div className="card border-0 h-100 shadow-sm">
                  <div className="position-relative">
                    <Link to={`/product/${item.id}`} className="text-decoration-none">
                      <div className="overflow-hidden" style={{ height: "250px" }}>
                        <img 
                          src={item.image || (item.images && item.images[0])} 
                          alt={item.name} 
                          className="card-img-top h-100 w-100 object-fit-cover"
                          style={{ transition: "transform 0.5s ease" }}
                          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                        />
                      </div>
                    </Link>
                    <div className="position-absolute top-0 end-0 p-3">
                      <button 
                        className="btn btn-sm btn-danger rounded-circle shadow-sm"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="position-absolute bottom-0 start-0 p-3">
                      <span className="badge bg-dark">{item.category}</span>
                    </div>
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">
                      <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
                        {item.name}
                      </Link>
                    </h5>
                    <p className="fw-bold mb-1">${item.price.toFixed(2)}</p>
                    <p className="text-muted small mb-3">
                      Added on {new Date(item.addedDate).toLocaleDateString()}
                    </p>
                    
                    <div className="d-grid">
                      <button 
                        className="btn btn-dark btn-sm"
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingCart size={14} className="me-1" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {wishlistItems.length > 0 && (
          <div className="d-flex justify-content-between align-items-center mt-5">
            <Link to="/shop" className="btn btn-outline-dark">
              Continue Shopping
            </Link>
            <button 
              className="btn btn-dark"
              onClick={handleAddAllToCart}
            >
              <ShoppingCart size={16} className="me-1" />
              Add All to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
