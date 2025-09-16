"use client";

import React, { useState, useEffect, useRef } from "react";

type SliderData = {
  id: string;
  imageUrl?: string;
  title: string;
  description: string;
  link?: string;
};

type SliderProps = {
  data: SliderData[];
  className?: string;
  slideInterval?: number;
  titleTag?: "h2" | "h3";
  linkText?: string | ((item: SliderData) => string);
};

const BaseSlider: React.FC<SliderProps> = ({
  data,
  className = "",
  slideInterval = 5000,
  titleTag = "h2",
  linkText = "Learn More",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // swipe tracking
  const startX = useRef<number | null>(null);
  const endX = useRef<number | null>(null);

  // auto slide effect
  useEffect(() => {
    if (!data.length) return;

    if (!paused) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, slideInterval);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [data.length, slideInterval, paused]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    endX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (startX.current !== null && endX.current !== null) {
      const diff = startX.current - endX.current;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // swipe left
          handleNext();
        } else {
          // swipe right
          handlePrev();
        }
      }
    }

    startX.current = null;
    endX.current = null;
  };

  const TitleTag = titleTag;

  return (
    <div
      className={`relative w-full h-96 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={sliderRef}
    >
      {/* Slides container with 3D perspective */}
      <div className="relative w-full h-full perspective-1000">
        {data.map((item, index) => {
          // Calculate position for deck effect
          const position = (index - currentIndex + data.length) % data.length;
          
          // Only show the top 4 cards for performance and visual clarity
          if (position > 3) return null;
          
          let translateZ = -position * 15; // Stack cards with decreasing Z-index
          let scale = 1 - position * 0.03; // Slightly scale down lower cards
          let opacity = 1; // Solid opacity for all cards
          let zIndex = data.length - position;
          
          // Position cards with slight offsets to show edges
          let translateX = 0;
          let translateY = 0;
          
          if (position > 0) {
            // Show just the edges of the cards beneath
            translateX = position % 2 === 0 ? 4 : -4;
            translateY = position * 2;
          }

          // Define card background colors based on position
          const cardColors = [
            "bg-gradient-to-br from-cyan-50 to-blue-100", // Top card
            "bg-gradient-to-br from-blue-50 to-indigo-100", // Second card
            "bg-gradient-to-br from-indigo-50 to-purple-100", // Third card
            "bg-gradient-to-br from-purple-50 to-pink-100", // Fourth card
          ];

          return (
            <div
              key={item.id}
              className="absolute w-4/5 left-1/2 top-0 h-80 transition-all duration-700 ease-in-out origin-center slider-card"
              style={{
                transform: `translateX(calc(-50% + ${translateX}px)) translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale})`,
                opacity,
                zIndex,
              }}
            >
              <div
                className={`w-full h-full rounded-xl bg-center bg-cover flex items-center justify-center shadow-lg overflow-hidden border-2 ${cardColors[position]} border-white`}
                style={item.imageUrl ? { backgroundImage: `url(${item.imageUrl})` } : {}}
              >
                <div className="bg-white/95 p-6 rounded-lg text-center w-4/5 shadow-md border border-gray-200">
                  <TitleTag className="text-xl font-bold mb-2 text-gray-800">{item.title}</TitleTag>
                  <p className="text-sm mb-4 text-gray-600">{item.description}</p>
                  {item.link && (
                    <a
                      href={item.link}
                      className="mt-3 inline-block px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white text-sm font-medium transition-all duration-300 shadow-md"
                    >
                      {typeof linkText === "function" ? linkText(item) : linkText}
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation arrows */}
      {data.length > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-cyan-700 p-3 rounded-full transition-all duration-300 shadow-md border border-gray-200"
            onClick={handlePrev}
            disabled={isTransitioning}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-cyan-700 p-3 rounded-full transition-all duration-300 shadow-md border border-gray-200"
            onClick={handleNext}
            disabled={isTransitioning}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2 z-20">
        {data.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-cyan-600 scale-110" : "bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </div>
  );
};

// Add perspective utility class to your global CSS
const style = `
.perspective-1000 {
  perspective: 1000px;
}

/* Add smooth transitions for 3D effects */
.slider-card {
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
}

/* Add shadow to the active card */
.slider-card:first-child {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Subtle shadow for cards beneath */
.slider-card:not(:first-child) {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
`;

// Add the style to the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = style;
  document.head.appendChild(styleSheet);
}

// 🔹 General Slider Wrapper
export const SliderGeneral: React.FC<{ data: SliderData[] }> = ({ data }) => (
  <BaseSlider
    data={data}
    className="slider-general"
    slideInterval={5000}
    titleTag="h2"
    linkText={(item) => (item.title === "Subscription" ? "Get" : "Learn More")}
  />
);

// 🔹 Info Slider Wrapper
export const InfoSlider: React.FC<{ data: SliderData[] }> = ({ data }) => (
  <BaseSlider
    data={data}
    className="info-slider"
    slideInterval={7000}
    titleTag="h3"
    linkText="Read More"
  />
);

export default SliderGeneral;