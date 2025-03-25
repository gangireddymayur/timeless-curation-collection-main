import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Star, Heart, ShoppingCart, Filter, ChevronDown, X } from "lucide-react";

const Shop = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category || "all");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortBy, setSortBy] = useState("featured");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Mock products data - in a real app this would come from an API
  const productsData = [
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
    },
    {
      id: 5,
      name: "Merino Wool Scarf",
      price: 79.99,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      category: "Fashion"
    },
    {
      id: 6,
      name: "Handcrafted Watch",
      price: 299.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Accessories"
    },
    {
      id: 7,
      name: "Essential Oil Diffuser",
      price: 59.99,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      category: "Wellness"
    },
    {
      id: 8,
      name: "Organic Night Cream",
      price: 85.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1601612628452-9e99ced43524?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      category: "Beauty"
    },
    {
      id: 9,
      name: "Linen Button-Down Shirt",
      price: 120.00,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80",
      category: "Fashion"
    },
    {
      id: 10,
      name: "Premium Sunglasses",
      price: 179.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
      category: "Accessories"
    },
    {
      id: 11,
      name: "Meditation Cushion Set",
      price: 69.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      category: "Wellness"
    },
    {
      id: 12,
      name: "Vitamin C Brightening Serum",
      price: 95.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      category: "Beauty"
    }
  ];

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setProducts(productsData);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(productsData.map(item => item.category))];
      setCategories(uniqueCategories);
      
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    // Filter products based on selected category and price range
    let result = [...products];
    
    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    
    // Filter by price range
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    // Sort products
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }
    // If sortBy is "featured", we keep the original order
    
    setFilteredProducts(result);
  }, [products, selectedCategory, priceRange, sortBy]);

  // Update selected category when URL param changes
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("all");
    }
  }, [category]);

  const handlePriceChange = (e, position) => {
    const value = parseInt(e.target.value);
    const newPriceRange = [...priceRange];
    newPriceRange[position] = value;
    setPriceRange(newPriceRange);
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
  
    // Get cart from localStorage or initialize an empty array
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
    // Create a consistent product object structure
    const productWithImages = {
      ...product,
      images: [product.image],  // Ensure it follows the same structure as NewArrivals
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
  
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    toast.success(`${product.name} added to cart`);
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setPriceRange([0, 300]);
    setSortBy("featured");
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
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
    <div className="shop-page py-5">
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active">Shop</li>
            {selectedCategory !== "all" && (
              <li className="breadcrumb-item active text-capitalize">{selectedCategory}</li>
            )}
          </ol>
        </nav>

        <div className="row">
          {/* Filters - Desktop */}
          <div className="col-lg-3 d-none d-lg-block">
            <div className="shop-filters p-4 bg-light">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Filters</h5>
                <button 
                  className="btn btn-sm text-decoration-underline"
                  onClick={clearFilters}
                >
                  Clear All
                </button>
              </div>
              
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Categories</h6>
                <div className="list-group list-group-flush">
                  <button 
                    className={`list-group-item bg-transparent border-0 px-0 ${selectedCategory === "all" ? "fw-bold" : ""}`}
                    onClick={() => setSelectedCategory("all")}
                  >
                    All Products
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat} 
                      className={`list-group-item bg-transparent border-0 px-0 ${selectedCategory === cat.toLowerCase() ? "fw-bold" : ""}`}
                      onClick={() => setSelectedCategory(cat.toLowerCase())}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Price Range</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <div className="range-container mb-3">
                  <input 
                    type="range" 
                    className="form-range" 
                    min="0" 
                    max="300" 
                    step="10" 
                    value={priceRange[0]} 
                    onChange={(e) => handlePriceChange(e, 0)}
                  />
                  <input 
                    type="range" 
                    className="form-range" 
                    min="0" 
                    max="300" 
                    step="10" 
                    value={priceRange[1]} 
                    onChange={(e) => handlePriceChange(e, 1)}
                  />
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <div className="input-group input-group-sm">
                      <span className="input-group-text">$</span>
                      <input 
                        type="number" 
                        className="form-control" 
                        value={priceRange[0]} 
                        onChange={(e) => handlePriceChange(e, 0)}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group input-group-sm">
                      <span className="input-group-text">$</span>
                      <input 
                        type="number" 
                        className="form-control" 
                        value={priceRange[1]} 
                        onChange={(e) => handlePriceChange(e, 1)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h6 className="fw-bold mb-3">Rating</h6>
                <div className="list-group list-group-flush">
                  {[4, 3, 2, 1].map(rating => (
                    <button key={rating} className="list-group-item bg-transparent border-0 px-0 d-flex align-items-center">
                      <input 
                        className="form-check-input me-2" 
                        type="checkbox" 
                      />
                      <div className="d-flex align-items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={`${i < rating ? "text-warning" : "text-muted"}`} 
                            fill={i < rating ? "currentColor" : "none"}
                          />
                        ))}
                        <span className="ms-2">& Up</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Filter Button */}
          <div className="d-lg-none mb-3">
            <button 
              className="btn btn-outline-dark d-flex align-items-center"
              onClick={toggleFilters}
            >
              <Filter size={16} className="me-2" />
              Filters
              <ChevronDown size={16} className="ms-2" />
            </button>
          </div>
          
          {/* Mobile Filters Overlay */}
          {filtersVisible && (
            <div className="position-fixed top-0 start-0 w-100 h-100 bg-white p-4 mobile-filters" style={{ zIndex: 1050, overflowY: 'auto' }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Filters</h5>
                <button 
                  className="btn btn-sm btn-outline-dark"
                  onClick={toggleFilters}
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Categories</h6>
                <div className="list-group list-group-flush">
                  <button 
                    className={`list-group-item bg-transparent border-0 px-0 ${selectedCategory === "all" ? "fw-bold" : ""}`}
                    onClick={() => {
                      setSelectedCategory("all");
                      setFiltersVisible(false);
                    }}
                  >
                    All Products
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat} 
                      className={`list-group-item bg-transparent border-0 px-0 ${selectedCategory === cat.toLowerCase() ? "fw-bold" : ""}`}
                      onClick={() => {
                        setSelectedCategory(cat.toLowerCase());
                        setFiltersVisible(false);
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Price Range</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <div className="range-container mb-3">
                  <input 
                    type="range" 
                    className="form-range" 
                    min="0" 
                    max="300" 
                    step="10" 
                    value={priceRange[0]} 
                    onChange={(e) => handlePriceChange(e, 0)}
                  />
                  <input 
                    type="range" 
                    className="form-range" 
                    min="0" 
                    max="300" 
                    step="10" 
                    value={priceRange[1]} 
                    onChange={(e) => handlePriceChange(e, 1)}
                  />
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <div className="input-group input-group-sm">
                      <span className="input-group-text">$</span>
                      <input 
                        type="number" 
                        className="form-control" 
                        value={priceRange[0]} 
                        onChange={(e) => handlePriceChange(e, 0)}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group input-group-sm">
                      <span className="input-group-text">$</span>
                      <input 
                        type="number" 
                        className="form-control" 
                        value={priceRange[1]} 
                        onChange={(e) => handlePriceChange(e, 1)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Rating</h6>
                <div className="list-group list-group-flush">
                  {[4, 3, 2, 1].map(rating => (
                    <button key={rating} className="list-group-item bg-transparent border-0 px-0 d-flex align-items-center">
                      <input 
                        className="form-check-input me-2" 
                        type="checkbox" 
                      />
                      <div className="d-flex align-items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={`${i < rating ? "text-warning" : "text-muted"}`} 
                            fill={i < rating ? "currentColor" : "none"}
                          />
                        ))}
                        <span className="ms-2">& Up</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="d-flex gap-2 mt-4">
                <button 
                  className="btn btn-dark flex-grow-1"
                  onClick={() => setFiltersVisible(false)}
                >
                  Apply Filters
                </button>
                <button 
                  className="btn btn-outline-dark"
                  onClick={() => {
                    clearFilters();
                    setFiltersVisible(false);
                  }}
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
          
          {/* Products */}
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="fw-bold mb-0 text-capitalize">
                  {selectedCategory === "all" ? "All Products" : selectedCategory}
                </h4>
                <p className="text-muted mb-0">{filteredProducts.length} products found</p>
              </div>
              <div className="d-flex align-items-center">
                <span className="me-2 d-none d-md-block">Sort by:</span>
                <select 
                  className="form-select form-select-sm" 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-5">
                <h5>No products found.</h5>
                <p className="text-muted">Try adjusting your filters or browse our other categories.</p>
                <button 
                  className="btn btn-outline-dark mt-2"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="row g-4">
                {filteredProducts.map(product => (
                  <div key={product.id} className="col-lg-4 col-md-6">
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
                          <button className="btn btn-sm btn-light rounded-circle shadow-sm">
                            <Heart size={16} />
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
            )}
            
            {/* Pagination */}
            <nav className="mt-5">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                </li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
