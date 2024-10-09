import React from "react";


const Typewriter = ({ text, shouldAnimate = true }) => {
  if (!text) return null;

  // Split the text into an array of characters
  const characters = text.split("");

  return (
    <span className={`typewriter ${shouldAnimate ? "animate" : ""}`}>
      {characters.map((char, index) => (
        <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
          {char}
        </span>
      ))}
    </span>
  );
};

export default React.memo(Typewriter);
