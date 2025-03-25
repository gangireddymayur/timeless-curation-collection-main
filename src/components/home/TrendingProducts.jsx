
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const products = [
  {
    id: 1,
    name: "Cashmere Sweater",
    price: 199.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1581497396202-5645e76a3a8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Fashion"
  },
  {
    id: 2,
    name: "Leather Tote Bag",
    price: 249.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    category: "Accessories"
  },
  {
    id: 3,
    name: "Silk Pillowcase Set",
    price: 89.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2050&q=80",
    category: "Wellness"
  },
  {
    id: 4,
    name: "Luxury Face Serum",
    price: 129.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
    category: "Beauty"
  }
];

const TrendingProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  
  // Track wishlist items in local state
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Check if a product is in the wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  // Add/remove from wishlist
  const toggleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      const newWishlist = wishlistItems.filter(item => item.id !== product.id);
      setWishlistItems(newWishlist);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      toast.success(`${product.name} removed from wishlist`);
    } else {
      const newWishlist = [...wishlistItems, { ...product, addedDate: new Date().toISOString() }];
      setWishlistItems(newWishlist);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      toast.success(`${product.name} added to wishlist`);
    }
  };

  // Add to cart
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get cart from localStorage or initialize empty array
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Create full product object with images array for consistency
    const productWithImages = {
      ...product,
      images: [product.image]  // Convert single image to images array
    };
    
    // Check if product is already in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Product exists, increase quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // Product doesn't exist, add new item
      cart.push({
        ...productWithImages,
        quantity: 1,
        addedDate: new Date().toISOString()
      });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    toast.success(`${product.name} added to cart`);
  };

  return (
    <section className="trending-products py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Trending Products</h2>
          <p className="text-muted">Our bestsellers loved by customers</p>
        </div>
        
        <div className="row g-4">
          {products.map(product => (
            <div key={product.id} className="col-lg-3 col-md-6">
              <div 
                className="card border-0 h-100 shadow-sm"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="position-relative">
                  <Link to={`/product/${product.id}`} className="text-decoration-none">
                    <div className="overflow-hidden" style={{ height: "280px" }}>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="card-img-top h-100 w-100 object-fit-cover"
                        style={{ 
                          transform: hoveredProduct === product.id ? "scale(1.08)" : "scale(1)", 
                          transition: "transform 0.5s ease" 
                        }}
                      />
                    </div>
                  </Link>
                  <div className="position-absolute top-0 end-0 p-3">
                    <button 
                      className={`btn btn-sm ${isInWishlist(product.id) ? 'btn-danger' : 'btn-light'} rounded-circle shadow-sm`}
                      onClick={(e) => toggleWishlist(e, product)}
                    >
                      <Heart size={16} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>

                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-secondary">{product.category}</span>
                    <div className="d-flex align-items-center">
                      <Star size={14} className="text-warning" fill="currentColor" />
                      <span className="ms-1 small">{product.rating}</span>
                    </div>
                  </div>
                  <h5 className="card-title">
                    <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                      {product.name}
                    </Link>
                  </h5>
                  <p className="fw-bold">${product.price.toFixed(2)}</p>
                  <button 
                    className="btn btn-dark btn-sm w-100 mt-2"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    <ShoppingCart size={14} className="me-1" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-5">
          <Link to="/shop" className="btn btn-outline-dark px-4">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
