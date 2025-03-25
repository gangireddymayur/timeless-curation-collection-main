
import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Sophia Parker",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "Fashion Enthusiast",
    text: "Timeless Curation's attention to detail and quality is exceptional. Every piece I've purchased has become a staple in my wardrobe."
  },
  {
    id: 2,
    name: "Michael Chen",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Loyal Customer",
    text: "I've been shopping here for over a year, and I'm consistently impressed by their curation. The quality is unmatched!"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    role: "Lifestyle Blogger",
    text: "As someone who values aesthetics and quality, I can't recommend Timeless Curation enough. Their products elevate everyday living."
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">What Our Customers Say</h2>
          <p className="text-muted">Read about experiences from our valued customers</p>
        </div>
        
        <div className="row g-4">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm p-4">
                <div className="d-flex align-items-center mb-4">
                  <img 
                    src={testimonial.photo} 
                    alt={testimonial.name} 
                    className="rounded-circle me-3"
                    width="60"
                    height="60"
                  />
                  <div>
                    <h5 className="mb-0">{testimonial.name}</h5>
                    <p className="text-muted small mb-0">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-3">
                  {[1, 2, 3, 4, 5].map(star => (
                    <i key={star} className="bi bi-star-fill text-warning me-1">★</i>
                  ))}
                </div>
                <p className="card-text fst-italic">"{testimonial.text}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
