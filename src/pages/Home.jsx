
import React from "react";
import Hero from "../components/home/Hero";
import FeaturedCollections from "../components/home/FeaturedCollections";
import TrendingProducts from "../components/home/TrendingProducts";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";

const Home = () => {
  return (
    <div className="home-container">
      <Hero />
      <FeaturedCollections />
      <TrendingProducts />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
