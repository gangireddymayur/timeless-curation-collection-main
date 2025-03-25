
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Mock new arrivals products data - in a real app this would come from an API
  const mockProducts = [
    {
      id: 11,
      name: "Meditation Cushion Set",
      price: 69.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      category: "Wellness",
      isNew: true
    },
    {
      id: 12,
      name: "Vitamin C Brightening Serum",
      price: 95.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      category: "Beauty",
      isNew: true
    },
    {
      id: 13,
      name: "Woven Accent Chair",
      price: 349.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1916&q=80",
      category: "Home",
      isNew: true
    },
    {
      id: 14,
      name: "Merino Wool Scarf",
      price: 79.99,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      category: "Fashion",
      isNew: true
    },
    {
      id: 15,
      name: "Ceramic Dinner Set",
      price: 129.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1614252366682-0fd52b93f69c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Home",
      isNew: true
    },
    {
      id: 16,
      name: "Linen Blazer",
      price: 189.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      category: "Fashion",
      isNew: true
    },
    {
      id: 17,
      name: "Organic Bath Towel Set",
      price: 89.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1633284206442-dc44aa7388d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Home",
      isNew: true
    },
    {
      id: 18,
      name: "Handcrafted Leather Wallet",
      price: 59.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1627123053516-0b8cf55808dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      category: "Accessories",
      isNew: true
    }
  ];

  useEffect(() => {
    // Load products and wishlist
    setProducts(mockProducts);
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistItems(wishlist);
    setLoading(false);
  }, []);

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
      const newWishlist = [...wishlistItems, { 
        ...product, 
        images: [product.image], // Convert image to images array for consistency
        addedDate: new Date().toISOString() 
      }];
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
    <div className="new-arrivals-page py-5">
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active">New Arrivals</li>
          </ol>
        </nav>

        <div className="text-center mb-5">
          <h2 className="fw-bold mb-2">New Arrivals</h2>
          <p className="text-muted">Discover our latest collection of premium products</p>
        </div>
        
        {/* New Arrivals Banner */}
        <div className="card border-0 shadow-sm mb-5">
          <div className="row g-0">
            <div className="col-md-6">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                alt="New Arrivals" 
                className="img-fluid rounded-start h-100 object-fit-cover"
              />
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <div className="card-body p-4 p-md-5">
                <h3 className="fw-bold mb-3">Fresh Finds For The New Season</h3>
                <p className="text-muted mb-4">
                  Explore our curated selection of the latest additions to our collection. Each piece has been carefully selected to embody timeless elegance and premium quality.
                </p>
                <Link to="/shop" className="btn btn-dark">Shop All New Arrivals</Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Grid */}
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
                  {product.isNew && (
                    <div className="position-absolute top-0 start-0 p-3">
                      <span className="badge bg-dark">New</span>
                    </div>
                  )}
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
        
        {/* Featured Categories */}
        <div className="mt-5 pt-4">
          <h3 className="fw-bold text-center mb-4">Shop By Category</h3>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="position-relative">
                  <img 
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2088&q=80" 
                    alt="Fashion" 
                    className="card-img"
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark" style={{ opacity: "0.3" }}></div>
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                    <div className="text-center text-white">
                      <h4 className="fw-bold mb-3">Fashion</h4>
                      <Link to="/shop/fashion" className="btn btn-light">Shop Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="position-relative">
                  <img 
                    src="https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Beauty" 
                    className="card-img"
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark" style={{ opacity: "0.3" }}></div>
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                    <div className="text-center text-white">
                      <h4 className="fw-bold mb-3">Beauty</h4>
                      <Link to="/shop/beauty" className="btn btn-light">Shop Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="position-relative">
                  <img 
                    src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" 
                    alt="Home" 
                    className="card-img"
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark" style={{ opacity: "0.3" }}></div>
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                    <div className="text-center text-white">
                      <h4 className="fw-bold mb-3">Home</h4>
                      <Link to="/shop/home" className="btn btn-light">Shop Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
