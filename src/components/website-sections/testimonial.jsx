import React from 'react';

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    rating: "★★★★★",
    testimonial: "This is an amazing service! Highly recommend to everyone.",
    imageUrl: "https://via.placeholder.com/50", // Dummy image URL
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: "★★★★☆",
    testimonial: "Great experience. The support team was very helpful.",
    imageUrl: "https://via.placeholder.com/50", // Dummy image URL
  },
  {
    id: 3,
    name: "Sam Wilson",
    rating: "★★★★★",
    testimonial: "Excellent! The product exceeded my expectations.",
    imageUrl: "https://via.placeholder.com/50", // Dummy image URL
  },
  {
    id: 4,
    name: "Emily Davis",
    rating: "★★★★☆",
    testimonial: "Good value for money. Will use it again.",
    imageUrl: "https://via.placeholder.com/50", // Dummy image URL
  },
  {
    id: 5,
    name: "Michael Brown",
    rating: "★★★★★",
    testimonial: "Outstanding service. Fast and reliable.",
    imageUrl: "https://via.placeholder.com/50", // Dummy image URL
  },
  {
    id: 6,
    name: "Linda Green",
    rating: "★★★★☆",
    testimonial: "Very satisfied with the quality and support.",
    imageUrl: "https://via.placeholder.com/50", // Dummy image URL
  },
];

const TestimonialSection = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">What Our Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map(({ id, name, rating, testimonial, imageUrl }) => (
          <div
            key={id}
            className="border-2 border-orange-500 p-6 rounded-lg shadow-lg bg-white flex items-start"
          >
            <div className="w-12 h-12 flex-shrink-0 mr-4">
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <div className="text-xl font-semibold mb-2">{name}</div>
              <div className="text-yellow-500 mb-2">{rating}</div>
              <p className="text-gray-600">{testimonial}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
