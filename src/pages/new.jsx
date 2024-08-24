import React from 'react';
import Header from '../components/website-sections/header'; // Adjust the path as needed
import HeroSection from '../components/website-sections/hero'; // Adjust the path as needed
import FeaturesSection from '../components/website-sections/features';
import PricingSection from '../components/website-sections/pricing';
import TestimonialSection from '../components/website-sections/testimonial';
import Footer from '../components/website-sections/footer'; // Adjust the path as needed

const YourComponent = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialSection />
      <Footer />
    </div>
  );
};

export default YourComponent;
