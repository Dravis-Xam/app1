import React, { useState, useEffect } from "react";

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
  linkText?: string;
};

const BaseSlider: React.FC<SliderProps> = ({
  data,
  className = "",
  slideInterval = 5000,
  titleTag = "h2",
  linkText = "Learn More",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // auto slide effect
  useEffect(() => {
    if (!data.length) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, slideInterval);

    return () => clearInterval(intervalId);
  }, [data.length, slideInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const TitleTag = titleTag;

  return (
    <div className={className}>
      <div className="slides">
        {data.map((item, index) => (
          <div
            key={item.id}
            className={`slide ${index === currentIndex ? "active" : ""}`}
            style={
              item.imageUrl ? { backgroundImage: `url(${item.imageUrl})` } : undefined
            }
          >
            <div className="slide-content">
              <TitleTag>{item.title}</TitleTag>
              <p>{item.description}</p>
              {item.link && (
                <a href={item.link} className="slide-link">
                  {linkText}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* indicators */}
      <div className="indicators">
        {data.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

// 🔹 General Slider Wrapper
export const SliderGeneral: React.FC<{ data: SliderData[] }> = ({ data }) => (
  <BaseSlider
    data={data}
    className="slider-general"
    slideInterval={5000}
    titleTag="h2"
    linkText="Learn More"
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
