// src/components/website-sections/FeaturesSection.js
import React from 'react';

const features = [
  {
    title: "Feature One",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.",
    ctaText: "Learn More",
    imageUrl: "https://via.placeholder.com/600"
  },
  {
    title: "Feature Two",
    description: "Curabitur euismod lectus nec sapien fermentum, eu feugiat turpis malesuada.",
    ctaText: "Discover More",
    imageUrl: "https://via.placeholder.com/600"
  },
  {
    title: "Feature Three",
    description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    ctaText: "Explore More",
    imageUrl: "https://via.placeholder.com/600"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-12 px-4 mt-[100px] container">
      <div className="container">
        <div className="flex flex-col lg:space-x-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col lg:flex-row items-center lg:justify-between mb-12 lg:mb-0">
              {/* Left Section */}
              <div className="lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
                <h2 className="text-3xl font-bold mb-4">{feature.title}</h2>
                <p className="text-lg mb-8">{feature.description}</p>
                <a
                  href="#"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
                >
                  {feature.ctaText}
                </a>
              </div>

              {/* Right Section */}
              <div className="lg:w-1/2 flex justify-center">
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
