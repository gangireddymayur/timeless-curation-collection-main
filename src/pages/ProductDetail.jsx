import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, CheckCircle, Truck, RotateCcw, Shield } from "lucide-react";
import { toast } from "sonner";

const allProductsData = [
  {
    id: 1,
    name: "Cashmere Sweater",
    price: 199.99,
    rating: 4.8,
    reviewCount: 124,
    images: [
      "https://images.unsplash.com/photo-1581497396202-5645e76a3a8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"
    ],
    category: "Fashion",
    description: "Luxurious cashmere sweater crafted from the finest Mongolian cashmere. This timeless piece offers exceptional softness and warmth while maintaining its elegant shape. Perfect for layering or wearing on its own.",
    features: [
      "100% Premium Cashmere",
      "Sustainably sourced materials",
      "Hand-finished details",
      "Ribbed cuffs and hem"
    ],
    colors: ["Beige", "Gray", "Black", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 12,
    sku: "CS-1001-BG"
  },
  {
    id: 2,
    name: "Leather Tote Bag",
    price: 249.99,
    rating: 4.7,
    reviewCount: 98,
    images: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2057&q=80"
    ],
    category: "Accessories",
    description: "This premium leather tote bag combines elegance with functionality. Handcrafted from full-grain Italian leather, it features ample interior space, a secure zipper closure, and a comfortable shoulder strap. Perfect for work, travel, or everyday use.",
    features: [
      "Full-grain Italian leather",
      "Hand-stitched details",
      "Interior pockets",
      "Adjustable strap"
    ],
    colors: ["Tan", "Black", "Brown", "Burgundy"],
    sizes: ["One Size"],
    stock: 8,
    sku: "LB-2002-TN"
  },
  {
    id: 3,
    name: "Silk Pillowcase Set",
    price: 89.99,
    rating: 4.9,
    reviewCount: 156,
    images: [
      "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2050&q=80",
      "https://images.unsplash.com/photo-1636142728313-a6ef43f9cca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1625584694455-51d42fc6fc71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    category: "Wellness",
    description: "Elevate your sleep experience with our 100% pure mulberry silk pillowcases. These luxurious pillowcases help reduce friction on hair and skin, preventing sleep creases and bedhead. Experience the ultimate in comfort and skin-friendly bedding.",
    features: [
      "100% Pure Mulberry Silk (22 Momme)",
      "Hypoallergenic properties",
      "Hidden zipper closure",
      "Temperature regulating"
    ],
    colors: ["Ivory", "Blush", "Silver", "Champagne"],
    sizes: ["Standard", "Queen", "King"],
    stock: 15,
    sku: "SP-3003-IV"
  },
  {
    id: 4,
    name: "Luxury Face Serum",
    price: 129.99,
    rating: 4.6,
    reviewCount: 87,
    images: [
      "https://images.unsplash.com/photo-1571875257727-256c39da42af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1626784215021-2e9eda77dd0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    category: "Beauty",
    description: "This powerful anti-aging serum combines hyaluronic acid, vitamin C, and peptides to visibly reduce fine lines and improve skin texture. Formulated with clean, effective ingredients, our serum delivers intense hydration and promotes collagen production for radiant, youthful skin.",
    features: [
      "Peptide complex with hyaluronic acid",
      "Antioxidant protection",
      "Oil-free, suitable for all skin types",
      "Cruelty-free and vegan"
    ],
    colors: ["No Color Options"],
    sizes: ["30ml", "50ml"],
    stock: 6,
    sku: "FS-4004-30"
  },
  {
    id: 11,
    name: "Meditation Cushion Set",
    price: 69.99,
    rating: 4.7,
    reviewCount: 72,
    images: [
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      "https://images.unsplash.com/photo-1600526644447-705296c5c8d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    category: "Wellness",
    description: "Enhance your meditation practice with our ergonomically designed cushion set. Made with organic cotton and filled with natural buckwheat hulls, these cushions provide proper spinal alignment and comfort during long meditation sessions.",
    features: [
      "Organic cotton cover",
      "Buckwheat hull filling",
      "Ergonomic design",
      "Machine washable cover"
    ],
    colors: ["Natural", "Sage", "Indigo", "Terracotta"],
    sizes: ["Standard", "Large"],
    stock: 18,
    sku: "MC-1101-NT"
  },
  {
    id: 12,
    name: "Vitamin C Brightening Serum",
    price: 95.99,
    rating: 4.8,
    reviewCount: 63,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1611930022073-84f3bb4caa2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1611930022209-44259bd46a33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    ],
    category: "Beauty",
    description: "This potent brightening serum contains 15% stable vitamin C to even skin tone, reduce dark spots, and boost collagen production. Enhanced with vitamin E and ferulic acid for maximum antioxidant protection and efficacy.",
    features: [
      "15% L-ascorbic acid (vitamin C)",
      "Added vitamin E and ferulic acid",
      "Fragrance-free formula",
      "Airless pump packaging for stability"
    ],
    colors: ["No Color Options"],
    sizes: ["30ml"],
    stock: 10,
    sku: "VC-1202-30"
  },
  {
    id: 13,
    name: "Woven Accent Chair",
    price: 349.99,
    rating: 4.6,
    reviewCount: 42,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1916&q=80",
      "https://images.unsplash.com/photo-1615800002234-05c4d488696c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80"
    ],
    category: "Home",
    description: "Add a touch of artisanal elegance to your space with our handcrafted woven accent chair. The natural rattan frame and intricate weaving pattern create a stunning visual texture, while the ergonomic design ensures comfort.",
    features: [
      "Sustainable rattan construction",
      "Handwoven by skilled artisans",
      "Ergonomic design",
      "Indoor use only"
    ],
    colors: ["Natural", "Black", "White"],
    sizes: ["One Size"],
    stock: 7,
    sku: "WC-1303-NT"
  },
  {
    id: 14,
    name: "Merino Wool Scarf",
    price: 79.99,
    rating: 4.5,
    reviewCount: 38,
    images: [
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1556195332-95503f664ced?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1582966772680-860e372bb558?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1972&q=80"
    ],
    category: "Fashion",
    description: "Wrap yourself in luxurious warmth with our premium merino wool scarf. Incredibly soft, lightweight, and temperature-regulating, this versatile accessory adds effortless style to any outfit while providing exceptional comfort.",
    features: [
      "100% Australian merino wool",
      "Ethically sourced and sustainable",
      "Naturally temperature-regulating",
      "Ultrasoft and non-itchy"
    ],
    colors: ["Camel", "Charcoal", "Navy", "Burgundy"],
    sizes: ["One Size"],
    stock: 20,
    sku: "MW-1404-CM"
  },
  {
    id: 15,
    name: "Ceramic Dinner Set",
    price: 129.99,
    rating: 4.9,
    reviewCount: 54,
    images: [
      "https://images.unsplash.com/photo-1614252366682-0fd52b93f69c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1622428051913-878c08776c2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1578593195423-e21ab957f09d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    ],
    category: "Home",
    description: "Elevate your dining experience with our artisanal ceramic dinner set. Each piece is handcrafted by skilled artisans, featuring a minimalist design with organic textures and a beautiful reactive glaze finish that makes every set unique.",
    features: [
      "Handcrafted stoneware ceramic",
      "Dishwasher and microwave safe",
      "Reactive glaze finish",
      "16-piece set for 4 people"
    ],
    colors: ["Oatmeal", "Slate", "Sage", "Terracotta"],
    sizes: ["One Size"],
    stock: 15,
    sku: "CD-1505-OT"
  },
  {
    id: 16,
    name: "Linen Blazer",
    price: 189.99,
    rating: 4.7,
    reviewCount: 31,
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      "https://images.unsplash.com/photo-1607345366928-199ea26f5d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    ],
    category: "Fashion",
    description: "Our relaxed-fit linen blazer combines casual comfort with refined style. Made from premium European linen, it features a breathable, lightweight construction perfect for warm weather while maintaining a polished appearance.",
    features: [
      "100% European linen",
      "Relaxed, unstructured fit",
      "Partially lined for comfort",
      "Italian horn buttons"
    ],
    colors: ["Natural", "Navy", "Olive", "Sand"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 9,
    sku: "LB-1606-NT"
  },
  {
    id: 17,
    name: "Organic Bath Towel Set",
    price: 89.99,
    rating: 4.6,
    reviewCount: 47,
    images: [
      "https://images.unsplash.com/photo-1633284206442-dc44aa7388d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1620626011761-996c5c8d053d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      "https://images.unsplash.com/photo-1552474150-9c18d1c5be42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    category: "Home",
    description: "Transform your bathroom into a spa-like retreat with our luxurious organic cotton towel set. These ultra-absorbent towels feature a plush 700 GSM weight and are crafted from 100% GOTS-certified organic cotton for everyday luxury.",
    features: [
      "100% GOTS-certified organic cotton",
      "Ultra-absorbent 700 GSM weight",
      "Quick-drying technology",
      "6-piece set (2 bath, 2 hand, 2 washcloths)"
    ],
    colors: ["White", "Grey", "Sage", "Blush"],
    sizes: ["One Size"],
    stock: 22,
    sku: "OT-1707-WT"
  },
  {
    id: 18,
    name: "Handcrafted Leather Wallet",
    price: 59.99,
    rating: 4.8,
    reviewCount: 36,
    images: [
      "https://images.unsplash.com/photo-1627123053516-0b8cf55808dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      "https://images.unsplash.com/photo-1600841867003-288a959fca1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1972&q=80",
      "https://images.unsplash.com/photo-1558352692-f1e4216c48a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    ],
    category: "Accessories",
    description: "Our minimalist leather wallet combines classic craftsmanship with modern design. Hand-stitched from full-grain vegetable-tanned leather, this wallet will develop a beautiful patina over time. Features smart organization with just the right amount of space for your essentials.",
    features: [
      "Full-grain vegetable-tanned leather",
      "Hand-stitched construction",
      "RFID-blocking technology",
      "5 card slots and a cash compartment"
    ],
    colors: ["Tan", "Dark Brown", "Black", "Navy"],
    sizes: ["One Size"],
    stock: 14,
    sku: "LW-1808-TN"
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const numericId = parseInt(id);
    const foundProduct = allProductsData.find(p => p.id === numericId);
    
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors[0]);
      setSelectedSize(foundProduct.sizes[0]);
    }
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsInWishlist(wishlist.some(item => item.id === numericId));
    
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const cartItem = {
      ...product,
      quantity: quantity,
      color: selectedColor,
      size: selectedSize,
      addedDate: new Date().toISOString()
    };
    
    const existingItemIndex = cart.findIndex(item => 
      item.id === product.id && 
      item.color === selectedColor && 
      item.size === selectedSize
    );
    
    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push(cartItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    toast.success(`${product.name} added to cart`);
  };

  const toggleWishlist = () => {
    if (!product) return;
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (isInWishlist) {
      const newWishlist = wishlist.filter(item => item.id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      setIsInWishlist(false);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      const wishlistItem = {
        ...product,
        addedDate: new Date().toISOString()
      };
      const newWishlist = [...wishlist, wishlistItem];
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      setIsInWishlist(true);
      toast.success(`${product.name} added to wishlist`);
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

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product not found</h2>
        <p>We couldn't find the product you're looking for.</p>
        <Link to="/shop" className="btn btn-outline-dark mt-3">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="product-detail py-5">
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/shop">Shop</Link></li>
            <li className="breadcrumb-item"><Link to={`/shop/${product.category.toLowerCase()}`}>{product.category}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="row">
              <div className="col-2 d-none d-md-block">
                {product.images.map((img, index) => (
                  <div 
                    key={index} 
                    className={`thumbnail-image mb-3 ${activeImage === index ? 'border border-dark' : 'border'}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} thumbnail ${index + 1}`} 
                      className="img-fluid"
                    />
                  </div>
                ))}
              </div>
              <div className="col-md-10 col-12">
                <div className="main-image-container">
                  <img 
                    src={product.images[activeImage]} 
                    alt={product.name} 
                    className="img-fluid main-product-image"
                  />
                  <button 
                    className={`btn btn-sm position-absolute top-0 end-0 m-3 ${isInWishlist ? 'btn-danger' : 'btn-outline-dark'}`} 
                    onClick={toggleWishlist}
                  >
                    <Heart size={16} fill={isInWishlist ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="d-flex justify-content-center mt-3 d-md-none">
              {product.images.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail-image-sm mx-2 ${activeImage === index ? 'border border-dark' : 'border'}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} thumbnail ${index + 1}`} 
                    className="img-fluid"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6">
            <span className="badge bg-secondary mb-2">{product.category}</span>
            <h2 className="fw-bold">{product.name}</h2>
            
            <div className="d-flex align-items-center mb-3">
              <div className="me-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={`text-warning ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                  />
                ))}
                <span className="ms-1">{product.rating}</span>
              </div>
              <span className="text-muted">({product.reviewCount} reviews)</span>
            </div>
            
            <h3 className="fw-bold mb-4">${product.price.toFixed(2)}</h3>
            
            <p className="mb-4">{product.description}</p>
            
            <div className="row mb-4">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Color</label>
                <select 
                  className="form-select"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  {product.colors.map((color, index) => (
                    <option key={index} value={color}>{color}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Size</label>
                <select 
                  className="form-select"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  {product.sizes.map((size, index) => (
                    <option key={index} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="d-flex align-items-center mb-4">
              <div className="me-3">
                <label className="form-label fw-bold">Quantity</label>
                <select 
                  className="form-select" 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i+1} value={i+1}>{i+1}</option>
                  ))}
                </select>
              </div>
              <div className="flex-grow-1">
                <label className="form-label text-muted">Availability</label>
                {product.stock > 5 ? (
                  <div className="text-success d-flex align-items-center">
                    <CheckCircle size={16} className="me-1" /> In Stock
                  </div>
                ) : (
                  <div className="text-warning d-flex align-items-center">
                    <CheckCircle size={16} className="me-1" /> Low Stock ({product.stock} left)
                  </div>
                )}
              </div>
            </div>
            
            <div className="d-grid gap-2 mb-4">
              <button className="btn btn-dark btn-lg" onClick={handleAddToCart}>
                <ShoppingCart size={18} className="me-2" /> Add to Cart
              </button>
              <Link to="/checkout" className="btn btn-outline-dark btn-lg">
                Buy Now
              </Link>
            </div>
            
            <div className="product-meta mb-4">
              <div className="d-flex mb-2">
                <div className="fw-bold me-2">SKU:</div>
                <div>{product.sku}</div>
              </div>
              <div className="d-flex">
                <div className="fw-bold me-2">Category:</div>
                <div>{product.category}</div>
              </div>
            </div>
            
            <div className="product-features border-top pt-4">
              <div className="row">
                <div className="col-md-4 col-6 mb-3">
                  <div className="d-flex align-items-center">
                    <Truck size={16} className="me-2" />
                    <span className="small">Free Shipping</span>
                  </div>
                </div>
                <div className="col-md-4 col-6 mb-3">
                  <div className="d-flex align-items-center">
                    <RotateCcw size={16} className="me-2" />
                    <span className="small">30-Day Returns</span>
                  </div>
                </div>
                <div className="col-md-4 col-6 mb-3">
                  <div className="d-flex align-items-center">
                    <Shield size={16} className="me-2" />
                    <span className="small">2-Year Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <h4 className="fw-bold mb-4">Product Features</h4>
            <ul className="list-group list-group-flush">
              {product.features.map((feature, index) => (
                <li key={index} className="list-group-item bg-transparent ps-0">
                  <CheckCircle size={16} className="me-2 text-success" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0">Customer Reviews</h4>
            <button className="btn btn-outline-dark">Write a Review</button>
          </div>
          
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="review-summary p-4 bg-light">
                <h5 className="mb-3">Review Summary</h5>
                <div className="d-flex align-items-center mb-4">
                  <h2 className="fw-bold mb-0 me-2">{product.rating}</h2>
                  <div>
                    <div className="d-flex mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className="text-warning" 
                          fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <p className="mb-0 small">{product.reviewCount} reviews</p>
                  </div>
                </div>
                
                <div className="rating-breakdown">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="d-flex align-items-center mb-2">
                      <div className="me-2">{star} stars</div>
                      <div className="progress flex-grow-1" style={{ height: '8px' }}>
                        <div 
                          className="progress-bar bg-warning" 
                          role="progressbar" 
                          style={{ width: `${Math.random() * 100}%` }}
                          aria-valuenow="70" 
                          aria-valuemin="0" 
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <div className="ms-2 small">
                        {Math.floor(Math.random() * product.reviewCount)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="col-lg-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="card border-0 shadow-sm mb-4">
                  <div className="card-body">
                    <div className="d-flex mb-3">
                      <img 
                        src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${Math.floor(Math.random() * 100)}.jpg`} 
                        alt="Reviewer" 
                        className="rounded-circle me-3"
                        width="48"
                        height="48"
                      />
                      <div>
                        <h6 className="mb-0">
                          {index === 0 ? "Emily Johnson" : index === 1 ? "Michael Chen" : "Sarah Williams"}
                        </h6>
                        <div className="d-flex align-items-center">
                          <div className="me-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={14} 
                                className="text-warning" 
                                fill={i < (5 - index % 2) ? "currentColor" : "none"}
                              />
                            ))}
                          </div>
                          <small className="text-muted">
                            {index === 0 ? "2 months ago" : index === 1 ? "3 weeks ago" : "5 days ago"}
                          </small>
                        </div>
                      </div>
                    </div>
                    <h6 className="fw-bold">
                      {index === 0 ? "Exceptional Quality" : index === 1 ? "Great product, but..." : "Exactly as described"}
                    </h6>
                    <p className="mb-0">
                      {index === 0 
                        ? "I'm incredibly impressed with the quality of this product. The attention to detail is remarkable, and it feels like a truly premium item. Worth every penny!"
                        : index === 1 
                          ? "The product itself is fantastic, but shipping took longer than expected. Once it arrived though, I was very pleased with the purchase. Would buy again."
                          : "This product is exactly as described. The photos are accurate, and it functions perfectly. Very happy with my purchase and would recommend to friends."
                      }
                    </p>
                  </div>
                </div>
              ))}
              
              <div className="text-center">
                <button className="btn btn-outline-dark px-4">
                  Load More Reviews
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-5 border-top">
          <h4 className="fw-bold mb-4">You May Also Like</h4>
          <div className="row g-4">
            {allProductsData
              .filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map(relatedProduct => (
                <div key={relatedProduct.id} className="col-lg-3 col-md-6">
                  <div className="card border-0 h-100 shadow-sm">
                    <div className="position-relative">
                      <Link to={`/product/${relatedProduct.id}`} className="text-decoration-none">
                        <div className="overflow-hidden" style={{ height: "200px" }}>
                          <img 
                            src={relatedProduct.images[0]} 
                            alt={relatedProduct.name} 
                            className="card-img-top h-100 w-100 object-fit-cover"
                            style={{ transition: "transform 0.5s ease" }}
                            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                          />
                        </div>
                      </Link>
                      <div className="position-absolute top-0 end-0 p-2">
                        <button className="btn btn-sm btn-light rounded-circle shadow-sm">
                          <Heart size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge bg-secondary">{relatedProduct.category}</span>
                        <div className="d-flex align-items-center">
                          <Star size={14} className="text-warning" fill="currentColor" />
                          <span className="ms-1 small">{relatedProduct.rating}</span>
                        </div>
                      </div>
                      <h6 className="card-title">
                        <Link to={`/product/${relatedProduct.id}`} className="text-decoration-none text-dark">
                          {relatedProduct.name}
                        </Link>
                      </h6>
                      <p className="fw-bold">${relatedProduct.price.toFixed(2)}</p>
                      <Link to={`/product/${relatedProduct.id}`} className="btn btn-dark btn-sm w-100 mt-2">
                        <ShoppingCart size={14} className="me-1" /> View Product
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
