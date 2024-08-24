import React from 'react';
import CustomButton from '../Button';

// Function to generate highlighted HTML
const highlightText = (text, highlights) => {
  // Escape special characters for regex
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // Create a regex pattern from the highlights array
  const pattern = highlights.map(escapeRegExp).join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');

  // Replace highlighted text with HTML
  return text.replace(regex, '<span class="text-blue-500">$1</span>');
};

const features = [
  {
    titleHighlighted: "Highly personalized AI",
    title: "that fits how you work",
    description: [
      "Context-aware suggestions based on your code and patterns",
      "Supports the most popular languages, libraries, and IDEs you use",
      "Ability to create bespoke models trained on your codebase"
    ],
    ctaText: "Learn More",
    imageUrl: "/img/feature-1.png"
  },
  {
    titleHighlighted: "Highly personalized AI",
    title: "that fits how you work",
    description: [
      "Context-aware suggestions based on your code and patterns",
      "Supports the most popular languages, libraries, and IDEs you use",
      "Ability to create bespoke models trained on your codebase"
    ],
    ctaText: "Learn More",
    imageUrl: "/img/feature-2.png"
  },
  {
    titleHighlighted: "Highly personalized AI",
    title: "that fits how you work",
    description: [
      "Context-aware suggestions based on your code and patterns",
      "Supports the most popular languages, libraries, and IDEs you use",
      "Ability to create bespoke models trained on your codebase"
    ],
    ctaText: "Learn More",
    imageUrl: "/img/feature-3.png"
  },
];

const FeaturesSection = () => {
  // Text fragments to be highlighted
  const highlightFragments = [
    "Context-aware suggestions",
    "most popular languages, libraries,",
    "bespoke models",
    // Add more text fragments if needed
  ];

  return (
    <section className=" mt-12 ">
      <div className="container">
        <div className="flex flex-col lg:space-x-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col lg:flex-row items-center lg:justify-between mb-8 lg:mb-16">
              {/* Left Section */}
              <div className="lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 max-w-[350px]">
                  <span className="text-purple-600">{feature.titleHighlighted}</span>{' '}
                  {feature.title}
                </h2>
                <ul className="list-none text-base lg:text-lg mb-8">
                  {feature.description.map((item, i) => (
                    <li key={i} className="mb-2 flex items-start">
                      <span className="text-gray-400 mr-2">-</span>
                      <span
                        className="ml-2"
                        dangerouslySetInnerHTML={{ __html: highlightText(item, highlightFragments) }}
                      />
                    </li>
                  ))}
                </ul>
                <CustomButton href="/signup">
                  {feature.ctaText}
                </CustomButton>
              </div>

              {/* Right Section */}
              <div className="lg:w-1/2 flex justify-center">
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="md:w-[350px] md:h-[247px] w-full h-auto object-contain"
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
