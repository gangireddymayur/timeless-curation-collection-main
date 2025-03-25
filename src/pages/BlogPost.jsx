
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Clock, User, Tag, Share2, Facebook, Twitter, Instagram, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // Mock blog data - in a real app this would come from an API
  const mockBlogPosts = [
    {
      id: 1,
      title: "Timeless Fashion: Investing in Pieces That Last",
      excerpt: "Discover the art of building a timeless wardrobe with quality pieces that transcend passing trends.",
      content: `
        <p>In a world of fast fashion and constant trend cycles, the concept of timeless style has never been more valuable. Investing in quality pieces that stand the test of time not only reduces your environmental footprint but also creates a wardrobe that serves you faithfully for years to come.</p>
        
        <h3>Quality Over Quantity</h3>
        <p>The cornerstone of a timeless wardrobe is prioritizing quality over quantity. A well-made garment constructed from superior materials will not only look better but will also last significantly longer than its fast-fashion counterparts. Consider these factors when assessing quality:</p>
        <ul>
          <li><strong>Fabric composition</strong> - Natural fibers like wool, cotton, silk, and linen generally offer better longevity and aging characteristics</li>
          <li><strong>Construction details</strong> - Examine stitching, seams, buttons, and linings for signs of careful craftsmanship</li>
          <li><strong>Fit and silhouette</strong> - Classic cuts and proportions that flatter your body type will remain relevant despite changing trends</li>
        </ul>
        
        <h3>Building Blocks of a Timeless Wardrobe</h3>
        <p>While personal style varies widely, certain pieces have proven their staying power across decades:</p>
        
        <h4>1. The Perfect White Shirt</h4>
        <p>A crisp white button-down in high-quality cotton works for countless occasions. Look for one with a tailored fit, substantial fabric, and clean lines.</p>
        
        <h4>2. Well-Fitted Dark Denim</h4>
        <p>A pair of dark indigo jeans in a classic cut (straight or slightly tapered) can be dressed up or down. Raw denim develops a beautiful patina over time, telling the story of your wear.</p>
        
        <h4>3. Cashmere Knitwear</h4>
        <p>A premium cashmere sweater is an investment that pays dividends in comfort and longevity. Classic colors like navy, camel, gray, or black offer maximum versatility.</p>
        
        <h4>4. Tailored Blazer</h4>
        <p>Whether in navy, black, or subtle herringbone, a well-cut blazer instantly elevates any outfit. Look for natural shoulder lines and a fit that allows movement without excess fabric.</p>
        
        <h3>Caring for Your Investment Pieces</h3>
        <p>Proper care dramatically extends the life of quality garments:</p>
        <ul>
          <li>Follow care labels meticulously</li>
          <li>Air items between wears before storing</li>
          <li>Invest in proper hangers that maintain garment shape</li>
          <li>Address stains and repairs promptly</li>
          <li>Consider cedar elements in storage areas to deter moths</li>
        </ul>
        
        <h3>The Cost Per Wear Calculation</h3>
        <p>When evaluating investment pieces, consider the cost-per-wear rather than the initial price tag. A $300 cashmere sweater worn 100 times costs $3 per wear, while a $30 fast-fashion sweater that pills and loses shape after 10 wears costs the same $3 per wear—but without the quality experience and with greater environmental impact.</p>
        
        <h3>Conclusion</h3>
        <p>Building a timeless wardrobe is a journey rather than a destination. By carefully selecting pieces that transcend trends, choosing quality materials, and properly maintaining your garments, you create not just a collection of clothes but a sustainable expression of personal style that serves you beautifully for years to come.</p>
      `,
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      author: "Emily Johnson",
      authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
      authorBio: "Emily is a fashion consultant and sustainability advocate with over 10 years of experience in the luxury fashion industry.",
      date: "2023-07-15",
      category: "Fashion",
      readTime: 5,
      tags: ["Fashion", "Sustainability", "Luxury", "Minimalism"]
    },
    {
      id: 2,
      title: "The Art of Slow Beauty: Natural Skincare Rituals",
      excerpt: "Embrace the philosophy of slow beauty with mindful, natural skincare routines that nourish both skin and soul.",
      content: `
        <p>In our fast-paced world, the concept of "slow beauty" offers a refreshing alternative to the constant stream of trending products and quick-fix solutions. Rooted in mindfulness and sustainability, slow beauty encourages us to create intentional rituals that honor our skin's natural processes while nurturing our well-being.</p>
        
        <h3>What is Slow Beauty?</h3>
        <p>Slow beauty is a philosophy that values quality over quantity, simplicity over complexity, and ritual over routine. It embraces traditional wisdom and natural ingredients while encouraging us to slow down and make our skincare a mindful practice rather than another task to complete.</p>
        
        <h3>Creating Your Natural Skincare Ritual</h3>
        
        <h4>Morning Ritual: Gentle Awakening</h4>
        <p>Begin your day with intention by creating a morning skincare ritual that gently awakens both skin and senses:</p>
        <ol>
          <li><strong>Cleanse with intention</strong> - Rather than rushing through cleansing, take a moment to feel the texture of your cleanser and the temperature of the water. A gentle oil cleanser or honey-based wash respects your skin's morning condition.</li>
          <li><strong>Hydrosol refreshment</strong> - Floral waters like rose, lavender, or chamomile mist not only hydrate but also provide aromatherapeutic benefits to start your day.</li>
          <li><strong>Oil nourishment</strong> - Natural plant oils selected for your skin type provide nourishment without overwhelming the skin. Apply with gentle upward motions, taking time to connect with your facial contours.</li>
        </ol>
        
        <h4>Evening Ritual: Sacred Unwinding</h4>
        <p>Transform your evening skincare into a ceremony that signals to your body and mind that it's time to release the day:</p>
        <ol>
          <li><strong>Double cleansing practice</strong> - Begin with a natural oil cleanser to dissolve makeup and environmental pollutants, followed by a gentle second cleanse to purify the skin.</li>
          <li><strong>Mask meditation</strong> - Once or twice weekly, apply a clay or honey-based mask. Instead of viewing this as waiting time, use these 10-15 minutes for meditation or gentle breathing exercises.</li>
          <li><strong>Facial massage</strong> - Using a facial oil, perform a 3-5 minute facial massage with intention. This stimulates circulation, releases tension in facial muscles, and deepens your connection with self-care.</li>
        </ol>
        
        <h3>Crafting a Natural Skincare Apothecary</h3>
        <p>Creating and using your own simple skincare preparations connects you to ancient traditions of self-care:</p>
        
        <h4>Herbal Infused Oils</h4>
        <p>Infuse organic plant oils with herbs and flowers to create multi-purpose skincare oils. Calendula, chamomile, and rose petals infused in jojoba or sweet almond oil create gentle preparations suitable for most skin types.</p>
        
        <h4>Honey Treatments</h4>
        <p>Raw, unpasteurized honey makes an excellent mask for all skin types. Its natural enzymes, antibacterial properties, and humectant nature make it a perfect slow beauty staple.</p>
        
        <h4>Herbal Steam Facials</h4>
        <p>Create seasonal facial steams using dried herbs. Lavender and chamomile for sensitive skin, rose and calendula for aging concerns, or thyme and rosemary for congested skin.</p>
        
        <h3>Mindful Product Selection</h3>
        <p>When purchasing skincare products, the slow beauty approach encourages:</p>
        <ul>
          <li>Selecting multi-purpose products over single-use items</li>
          <li>Supporting artisanal producers creating small-batch formulations</li>
          <li>Choosing products with minimal, pronounceable ingredients</li>
          <li>Investigating the sustainability practices of brands</li>
          <li>Investing in fewer, higher-quality items rather than numerous trendy products</li>
        </ul>
        
        <h3>Conclusion</h3>
        <p>By embracing slow beauty rituals, we transform skincare from a series of quick fixes into a nurturing practice that honors our bodies, respects the environment, and creates moments of presence in our busy lives. This approach not only yields more radiant skin but also cultivates a deeper relationship with ourselves and our daily practices.</p>
      `,
      image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      author: "Sophia Parker",
      authorImage: "https://randomuser.me/api/portraits/women/68.jpg",
      authorBio: "Sophia is a holistic esthetician and herbalist specializing in natural skincare and wellness rituals.",
      date: "2023-07-05",
      category: "Beauty",
      readTime: 7,
      tags: ["Beauty", "Skincare", "Wellness", "Natural"]
    },
    {
      id: 3,
      title: "Creating a Minimalist Home That Still Feels Cozy",
      excerpt: "Learn how to embrace minimalism in your home decor while maintaining warmth and personality.",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Michael Chen",
      authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
      authorBio: "Michael is an interior designer specializing in minimalist and Scandinavian design principles.",
      date: "2023-06-28",
      category: "Lifestyle",
      readTime: 6,
      tags: ["Interior Design", "Minimalism", "Home Decor", "Lifestyle"]
    },
    {
      id: 4,
      title: "Sustainable Luxury: Ethical Brands Redefining Premium Products",
      excerpt: "Explore how ethical brands are revolutionizing the luxury market with sustainable practices without compromising on quality.",
      content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      image: "https://images.unsplash.com/photo-1542370285-b8eb8317691c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Sarah Williams",
      authorImage: "https://randomuser.me/api/portraits/women/22.jpg",
      authorBio: "Sarah is a sustainability consultant working with luxury brands to improve their environmental impact.",
      date: "2023-06-20",
      category: "Sustainability",
      readTime: 8,
      tags: ["Sustainability", "Luxury", "Ethical", "Fashion"]
    },
    {
      id: 5,
      title: "The Psychology of Color: Choosing the Right Palette for Your Home",
      excerpt: "Discover how different colors affect mood and atmosphere, and learn to create harmonious color schemes for your living spaces.",
      content: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Emma Rodriguez",
      authorImage: "https://randomuser.me/api/portraits/women/46.jpg",
      authorBio: "Emma is a color therapist and interior design consultant with expertise in creating mood-enhancing spaces.",
      date: "2023-06-10",
      category: "Interior Design",
      readTime: 5,
      tags: ["Interior Design", "Color Theory", "Home Decor", "Psychology"]
    },
    {
      id: 6,
      title: "Wellness Rituals: Daily Practices for Balance and Peace",
      excerpt: "Incorporate these simple yet powerful wellness rituals into your daily routine to enhance your physical and mental wellbeing.",
      content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      author: "David Kim",
      authorImage: "https://randomuser.me/api/portraits/men/62.jpg",
      authorBio: "David is a wellness coach and mindfulness teacher specializing in integrating simple practices into busy lives.",
      date: "2023-05-25",
      category: "Wellness",
      readTime: 6,
      tags: ["Wellness", "Mindfulness", "Self-Care", "Health"]
    }
  ];

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundPost = mockBlogPosts.find(p => p.id === parseInt(id));
      setPost(foundPost);
      
      if (foundPost) {
        // Get related posts (same category)
        const related = mockBlogPosts
          .filter(p => p.category === foundPost.category && p.id !== foundPost.id)
          .slice(0, 2);
        setRelatedPosts(related);
        
        // Mock comments
        const mockComments = [
          {
            id: 1,
            name: "Jennifer Adams",
            email: "jennifer@example.com",
            content: "This article was so insightful! I've been trying to build a more sustainable wardrobe and these tips are exactly what I needed.",
            date: "2023-07-18T10:30:00",
            avatar: "https://randomuser.me/api/portraits/women/33.jpg"
          },
          {
            id: 2,
            name: "Robert Chen",
            email: "robert@example.com",
            content: "I appreciate the focus on quality over quantity. It's so easy to get caught up in fast fashion trends, but investing in timeless pieces makes so much more sense in the long run.",
            date: "2023-07-17T15:45:00",
            avatar: "https://randomuser.me/api/portraits/men/41.jpg"
          }
        ];
        
        setComments(mockComments);
      }
      
      setLoading(false);
    }, 500);
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    if (!comment.trim()) return;
    
    // In a real app, this would send the comment to an API
    const newComment = {
      id: comments.length + 1,
      name: "You", // In a real app, this would be the logged-in user
      email: "you@example.com",
      content: comment,
      date: new Date().toISOString(),
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg" // Placeholder avatar
    };
    
    setComments([newComment, ...comments]);
    setComment("");
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

  if (!post) {
    return (
      <div className="container py-5 text-center">
        <h4>Blog post not found</h4>
        <Link to="/blog" className="btn btn-dark mt-3">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="blog-post-page py-5">
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/blog">Blog</Link></li>
            <li className="breadcrumb-item active">{post.title}</li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="blog-header text-center mb-5">
              <span className="badge bg-secondary mb-2">{post.category}</span>
              <h1 className="fw-bold mb-3">{post.title}</h1>
              
              <div className="d-flex justify-content-center align-items-center gap-3 text-muted small mb-4">
                <div className="d-flex align-items-center">
                  <Clock size={16} className="me-1" />
                  {post.readTime} min read
                </div>
                <div className="d-flex align-items-center">
                  <User size={16} className="me-1" />
                  {post.author}
                </div>
                <div>
                  {new Date(post.date).toLocaleDateString("en-US", { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
              
              <img 
                src={post.image} 
                alt={post.title} 
                className="img-fluid rounded"
                style={{ maxHeight: "500px", width: "100%", objectFit: "cover" }}
              />
            </div>
            
            <div className="blog-content mb-5">
              <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </div>
            
            <div className="blog-tags mb-5">
              <div className="d-flex flex-wrap gap-2 align-items-center">
                <span className="fw-bold">Tags:</span>
                {post.tags.map((tag, index) => (
                  <Link 
                    key={index} 
                    to={`/blog?tag=${tag.toLowerCase()}`} 
                    className="badge bg-light text-dark text-decoration-none p-2"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="blog-share mb-5">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="fw-bold me-3">Share:</span>
                  <a href="#" className="text-dark me-2">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="text-dark me-2">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="text-dark">
                    <Instagram size={20} />
                  </a>
                </div>
                <div>
                  <Link to="/blog" className="btn btn-outline-dark btn-sm">
                    <ChevronLeft size={16} className="me-1" />
                    Back to Blog
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="author-box bg-light p-4 rounded mb-5">
              <div className="d-flex">
                <img 
                  src={post.authorImage} 
                  alt={post.author} 
                  className="rounded-circle me-4"
                  width="80"
                  height="80"
                />
                <div>
                  <h5 className="fw-bold mb-1">About {post.author}</h5>
                  <p className="mb-3">{post.authorBio}</p>
                  <div className="d-flex gap-2">
                    <a href="#" className="btn btn-sm btn-dark">
                      Follow
                    </a>
                    <a href="#" className="btn btn-sm btn-outline-dark">
                      View all posts
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="post-navigation d-flex justify-content-between mb-5">
              <Link to={`/blog/${post.id - 1 > 0 ? post.id - 1 : post.id}`} className={`btn btn-outline-dark ${post.id === 1 ? 'invisible' : ''}`}>
                <ChevronLeft size={16} className="me-1" />
                Previous Post
              </Link>
              <Link to={`/blog/${post.id + 1 <= mockBlogPosts.length ? post.id + 1 : post.id}`} className={`btn btn-outline-dark ${post.id === mockBlogPosts.length ? 'invisible' : ''}`}>
                Next Post
                <ChevronRight size={16} className="ms-1" />
              </Link>
            </div>
            
            {relatedPosts.length > 0 && (
              <div className="related-posts mb-5">
                <h4 className="fw-bold mb-4">You Might Also Like</h4>
                <div className="row g-4">
                  {relatedPosts.map(related => (
                    <div key={related.id} className="col-md-6">
                      <div className="card border-0 shadow-sm h-100">
                        <Link to={`/blog/${related.id}`} className="text-decoration-none">
                          <div className="overflow-hidden">
                            <img 
                              src={related.image} 
                              alt={related.title} 
                              className="card-img-top"
                              style={{ 
                                height: "200px", 
                                objectFit: "cover",
                                transition: "transform 0.5s ease"
                              }}
                              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                            />
                          </div>
                        </Link>
                        <div className="card-body">
                          <h5 className="card-title">
                            <Link to={`/blog/${related.id}`} className="text-decoration-none text-dark">
                              {related.title}
                            </Link>
                          </h5>
                          <p className="card-text text-muted small">{related.excerpt}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="comments-section">
              <h4 className="fw-bold mb-4">Comments ({comments.length})</h4>
              
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3">Leave a Comment</h5>
                  <form onSubmit={handleCommentSubmit}>
                    <div className="mb-3">
                      <textarea 
                        className="form-control" 
                        rows="4" 
                        placeholder="Share your thoughts..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-dark">
                      <MessageSquare size={16} className="me-1" />
                      Post Comment
                    </button>
                  </form>
                </div>
              </div>
              
              {comments.length > 0 ? (
                <div className="comments-list">
                  {comments.map(comment => (
                    <div key={comment.id} className="card border-0 shadow-sm mb-3">
                      <div className="card-body p-4">
                        <div className="d-flex">
                          <img 
                            src={comment.avatar} 
                            alt={comment.name} 
                            className="rounded-circle me-3"
                            width="48"
                            height="48"
                          />
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <h6 className="fw-bold mb-0">{comment.name}</h6>
                              <span className="text-muted small">
                                {new Date(comment.date).toLocaleDateString("en-US", {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                            <p className="mb-1">{comment.content}</p>
                            <button className="btn btn-link text-muted p-0 small">Reply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-center">Be the first to share your thoughts on this article.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx="true">{`
        .blog-content h2, .blog-content h3, .blog-content h4 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        
        .blog-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }
        
        .blog-content ul, .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        
        .blog-content li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }
        
        .blog-content a {
          color: #000;
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 2px;
        }
        
        .blog-content blockquote {
          padding: 1.5rem;
          margin: 2rem 0;
          background-color: #f8f9fa;
          border-left: 4px solid #212529;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default BlogPost;
