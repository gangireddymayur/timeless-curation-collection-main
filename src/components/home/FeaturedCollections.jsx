
import React from "react";
import { Link } from "react-router-dom";

const collections = [
  {
    id: 1,
    title: "Top Picks",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    link: "/shop/top-picks"
  },
  {
    id: 2,
    title: "New Arrivals",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    link: "/shop/new-arrivals"
  },
  {
    id: 3,
    title: "Luxury Essentials",
    image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    link: "/shop/luxury-essentials"
  }
];

const FeaturedCollections = () => {
  return (
    <section className="featured-collections py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Featured Collections</h2>
          <p className="text-muted">Explore our curated selection of premium products</p>
        </div>
        
        <div className="row g-4">
          {collections.map(collection => (
            <div key={collection.id} className="col-md-4">
              <Link to={collection.link} className="text-decoration-none">
                <div className="card border-0 rounded-0 shadow-sm h-100">
                  <div className="position-relative overflow-hidden" style={{ height: "300px" }}>
                    <img 
                      src={collection.image} 
                      alt={collection.title} 
                      className="card-img-top h-100 w-100 object-fit-cover transition-transform"
                      style={{ transform: "scale(1)", transition: "transform 0.5s ease" }}
                      onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                      onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                    />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">{collection.title}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
