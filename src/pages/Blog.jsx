
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, User, Tag, Search } from "lucide-react";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock blog data - in a real app this would come from an API
  const mockBlogPosts = [
    {
      id: 1,
      title: "Timeless Fashion: Investing in Pieces That Last",
      excerpt: "Discover the art of building a timeless wardrobe with quality pieces that transcend passing trends.",
      content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      author: "Emily Johnson",
      date: "2023-07-15",
      category: "Fashion",
      readTime: 5
    },
    {
      id: 2,
      title: "The Art of Slow Beauty: Natural Skincare Rituals",
      excerpt: "Embrace the philosophy of slow beauty with mindful, natural skincare routines that nourish both skin and soul.",
      content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
      image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      author: "Sophia Parker",
      date: "2023-07-05",
      category: "Beauty",
      readTime: 7
    },
    {
      id: 3,
      title: "Creating a Minimalist Home That Still Feels Cozy",
      excerpt: "Learn how to embrace minimalism in your home decor while maintaining warmth and personality.",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Michael Chen",
      date: "2023-06-28",
      category: "Lifestyle",
      readTime: 6
    },
    {
      id: 4,
      title: "Sustainable Luxury: Ethical Brands Redefining Premium Products",
      excerpt: "Explore how ethical brands are revolutionizing the luxury market with sustainable practices without compromising on quality.",
      content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      image: "https://images.unsplash.com/photo-1542370285-b8eb8317691c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Sarah Williams",
      date: "2023-06-20",
      category: "Sustainability",
      readTime: 8
    },
    {
      id: 5,
      title: "The Psychology of Color: Choosing the Right Palette for Your Home",
      excerpt: "Discover how different colors affect mood and atmosphere, and learn to create harmonious color schemes for your living spaces.",
      content: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Emma Rodriguez",
      date: "2023-06-10",
      category: "Interior Design",
      readTime: 5
    },
    {
      id: 6,
      title: "Wellness Rituals: Daily Practices for Balance and Peace",
      excerpt: "Incorporate these simple yet powerful wellness rituals into your daily routine to enhance your physical and mental wellbeing.",
      content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      author: "David Kim",
      date: "2023-05-25",
      category: "Wellness",
      readTime: 6
    }
  ];

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setBlogPosts(mockBlogPosts);
      setLoading(false);
    }, 500);
  }, []);

  const filteredPosts = searchQuery 
    ? blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : blogPosts;

  const categories = [...new Set(blogPosts.map(post => post.category))];
  
  const recentPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

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
    <div className="blog-page py-5">
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active">Blog</li>
          </ol>
        </nav>

        <div className="text-center mb-5">
          <h2 className="fw-bold mb-2">Our Blog</h2>
          <p className="text-muted">Insights, tips, and stories from the world of luxury and timeless elegance</p>
        </div>
        
        <div className="row">
          <div className="col-lg-8 mb-5 mb-lg-0">
            <div className="blog-grid mb-5">
              <div className="row g-4">
                {filteredPosts.length === 0 ? (
                  <div className="col-12 text-center py-5">
                    <p className="mb-0">No blog posts found matching your search criteria.</p>
                  </div>
                ) : (
                  filteredPosts.map(post => (
                    <div key={post.id} className="col-md-6">
                      <div className="card border-0 shadow-sm h-100">
                        <Link to={`/blog/${post.id}`} className="text-decoration-none">
                          <div className="overflow-hidden">
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="card-img-top"
                              style={{ 
                                height: "240px", 
                                objectFit: "cover",
                                transition: "transform 0.5s ease"
                              }}
                              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                            />
                          </div>
                        </Link>
                        <div className="card-body p-4">
                          <div className="d-flex align-items-center mb-3">
                            <span className="badge bg-secondary me-2">{post.category}</span>
                            <div className="text-muted small d-flex align-items-center">
                              <Clock size={14} className="me-1" />
                              <span>{post.readTime} min read</span>
                            </div>
                          </div>
                          <h5 className="card-title">
                            <Link to={`/blog/${post.id}`} className="text-decoration-none text-dark">
                              {post.title}
                            </Link>
                          </h5>
                          <p className="card-text text-muted">{post.excerpt}</p>
                          <div className="d-flex align-items-center mt-3">
                            <div className="d-flex align-items-center text-muted small">
                              <User size={14} className="me-1" />
                              <span>By {post.author}</span>
                            </div>
                            <div className="mx-3">•</div>
                            <div className="text-muted small">
                              {new Date(post.date).toLocaleDateString("en-US", { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            {/* Pagination */}
            <nav>
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
          
          <div className="col-lg-4">
            {/* Search Bar */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Search</h5>
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search blog posts..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button 
                    className="btn btn-dark" 
                    type="button"
                    onClick={() => {
                      // Handle search - Already happening via state
                    }}
                  >
                    <Search size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Categories */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Categories</h5>
                <div className="list-group list-group-flush">
                  <Link to="/blog" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center bg-transparent border-0 px-0 py-2">
                    All Categories
                    <span className="badge bg-light text-dark">{blogPosts.length}</span>
                  </Link>
                  {categories.map((category, index) => (
                    <Link 
                      key={index} 
                      to={`/blog?category=${category.toLowerCase()}`} 
                      className="list-group-item list-group-item-action d-flex justify-content-between align-items-center bg-transparent border-0 px-0 py-2"
                    >
                      {category}
                      <span className="badge bg-light text-dark">
                        {blogPosts.filter(post => post.category === category).length}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Recent Posts */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Recent Posts</h5>
                <div className="list-group list-group-flush">
                  {recentPosts.map(post => (
                    <Link 
                      key={post.id} 
                      to={`/blog/${post.id}`} 
                      className="list-group-item list-group-item-action bg-transparent border-0 px-0 py-3"
                    >
                      <div className="d-flex">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="me-3 rounded"
                          style={{ width: "70px", height: "70px", objectFit: "cover" }}
                        />
                        <div>
                          <h6 className="mb-1">{post.title}</h6>
                          <div className="text-muted small">
                            {new Date(post.date).toLocaleDateString("en-US", { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Tags */}
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Popular Tags</h5>
                <div className="d-flex flex-wrap gap-2">
                  <Link to="/blog?tag=luxury" className="badge bg-light text-dark text-decoration-none p-2 d-flex align-items-center">
                    <Tag size={14} className="me-1" />
                    Luxury
                  </Link>
                  <Link to="/blog?tag=sustainable" className="badge bg-light text-dark text-decoration-none p-2 d-flex align-items-center">
                    <Tag size={14} className="me-1" />
                    Sustainable
                  </Link>
                  <Link to="/blog?tag=minimalism" className="badge bg-light text-dark text-decoration-none p-2 d-flex align-items-center">
                    <Tag size={14} className="me-1" />
                    Minimalism
                  </Link>
                  <Link to="/blog?tag=skincare" className="badge bg-light text-dark text-decoration-none p-2 d-flex align-items-center">
                    <Tag size={14} className="me-1" />
                    Skincare
                  </Link>
                  <Link to="/blog?tag=fashion" className="badge bg-light text-dark text-decoration-none p-2 d-flex align-items-center">
                    <Tag size={14} className="me-1" />
                    Fashion
                  </Link>
                  <Link to="/blog?tag=wellness" className="badge bg-light text-dark text-decoration-none p-2 d-flex align-items-center">
                    <Tag size={14} className="me-1" />
                    Wellness
                  </Link>
                  <Link to="/blog?tag=home-decor" className="badge bg-light text-dark text-decoration-none p-2 d-flex align-items-center">
                    <Tag size={14} className="me-1" />
                    Home Decor
                  </Link>
                  <Link to="/blog?tag=ethical" className="badge bg-light text-dark text-decoration-none p-2 d-flex align-items-center">
                    <Tag size={14} className="me-1" />
                    Ethical
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
