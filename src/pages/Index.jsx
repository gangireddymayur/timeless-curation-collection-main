
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Search, ChevronRight } from "lucide-react";

const Index = () => {
  // Sample data for featured products
  const featuredCollections = [
    {
      id: 1,
      title: "Top Picks",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1470&auto=format&fit=crop",
      link: "/shop"
    },
    {
      id: 2,
      title: "New Arrivals",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1470&auto=format&fit=crop",
      link: "/shop"
    },
    {
      id: 3,
      title: "Luxury Essentials",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1412&auto=format&fit=crop",
      link: "/shop"
    }
  ];

  const trendingProducts = [
    {
      id: 1,
      name: "Elegance Silk Dress",
      price: "$129.99",
      image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1374&auto=format&fit=crop",
      rating: 4.8
    },
    {
      id: 2,
      name: "Luxury Leather Bag",
      price: "$249.99",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1335&auto=format&fit=crop",
      rating: 4.9
    },
    {
      id: 3,
      name: "Minimalist Gold Watch",
      price: "$179.99",
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1288&auto=format&fit=crop",
      rating: 4.7
    },
    {
      id: 4,
      name: "Premium Skincare Set",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1288&auto=format&fit=crop",
      rating: 4.6
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sophia K.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "The quality of each item I've purchased has exceeded my expectations. Truly a premium shopping experience!"
    },
    {
      id: 2,
      name: "James L.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Fast shipping and the packaging was exquisite. Will definitely be a returning customer."
    },
    {
      id: 3,
      name: "Emma R.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      text: "Their curation is impeccable. Every piece feels special and thoughtfully selected."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="w-full h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=1470&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4">
            <h1 className="text-4xl md:text-6xl font-light mb-4">Timeless Elegance – Curated for You</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">Discover our handpicked collection of premium products designed for the modern connoisseur</p>
            <Link to="/shop" className="bg-white text-gray-900 hover:bg-gray-100 transition-all px-8 py-3 rounded-none text-lg font-medium">
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-10">
              <Link to="/" className="text-2xl font-semibold">TIMELESS</Link>
              <nav className="hidden md:flex space-x-8">
                <Link to="/" className="text-gray-900 hover:text-gray-600 transition-colors">Home</Link>
                <Link to="/shop" className="text-gray-900 hover:text-gray-600 transition-colors">Shop</Link>
                <Link to="/new-arrivals" className="text-gray-900 hover:text-gray-600 transition-colors">New Arrivals</Link>
                <div className="relative group">
                  <button className="text-gray-900 hover:text-gray-600 transition-colors flex items-center">
                    Categories <ChevronRight className="h-4 w-4 ml-1 transform group-hover:rotate-90 transition-transform" />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <Link to="/category/fashion" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Fashion</Link>
                    <Link to="/category/beauty" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Beauty</Link>
                    <Link to="/category/accessories" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Accessories</Link>
                    <Link to="/category/wellness" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Wellness</Link>
                  </div>
                </div>
                <Link to="/blog" className="text-gray-900 hover:text-gray-600 transition-colors">Blog</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative hidden md:block">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 w-40 lg:w-60"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <Link to="/account" className="text-gray-900 hover:text-gray-600">
                <span className="sr-only">Account</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
              <Link to="/wishlist" className="text-gray-900 hover:text-gray-600">
                <span className="sr-only">Wishlist</span>
                <Heart className="h-6 w-6" />
              </Link>
              <Link to="/cart" className="text-gray-900 hover:text-gray-600 relative">
                <span className="sr-only">Cart</span>
                <ShoppingBag className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
              </Link>
              <button className="md:hidden text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Featured Collections */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-light text-center mb-12">Featured Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCollections.map((collection) => (
                <Link to={collection.link} key={collection.id} className="group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={collection.image} 
                      alt={collection.title} 
                      className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-medium">{collection.title}</h3>
                      <p className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore Collection</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Products */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-light text-center mb-12">Trending Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {trendingProducts.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative overflow-hidden bg-white">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button className="w-full bg-black text-white py-2 hover:bg-gray-800 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium">{product.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-900 font-medium">{product.price}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/shop" className="inline-block border border-gray-900 text-gray-900 px-6 py-2 hover:bg-gray-900 hover:text-white transition-colors">
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-light text-center mb-12">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <h3 className="font-medium">{testimonial.name}</h3>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                  <div className="mt-4 text-yellow-400">★★★★★</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 px-4 bg-gray-900 text-white">
          <div className="container mx-auto text-center max-w-2xl">
            <h2 className="text-3xl font-light mb-4">Join Our VIP List</h2>
            <p className="mb-8">Subscribe to receive exclusive offers, early access to new collections, and curated content.</p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500"
                required
              />
              <button 
                type="submit" 
                className="bg-white text-gray-900 px-6 py-3 font-medium hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">TIMELESS</h3>
              <p className="text-gray-600 mb-4">Curated luxury for the modern lifestyle.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
                <li><Link to="/shop" className="text-gray-600 hover:text-gray-900">Shop</Link></li>
                <li><Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
                <li><Link to="/shipping" className="text-gray-600 hover:text-gray-900">Shipping & Returns</Link></li>
                <li><Link to="/terms" className="text-gray-600 hover:text-gray-900">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Contact Us</h3>
              <address className="not-italic text-gray-600">
                <p>123 Luxury Lane</p>
                <p>Fashion District, NY 10001</p>
                <p className="mt-3">Email: support@timeless.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">© 2023 Timeless. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <img src="https://www.pngitem.com/pimgs/m/1-14995_payment-methods-icons-hd-png-download.png" alt="Payment Methods" className="h-8" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
