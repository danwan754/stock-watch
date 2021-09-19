import React from 'react';

import '../css/components/Slideshow.css';

const slides = ["/slide-lists.png", "/slide-quote.png", "/slide-edit.png"];
const delay = 3000;

function Slideshow() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  const startTimeout = () => {
    timeoutRef.current = setTimeout(
        () =>
          setIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
          ),
        delay
      );
  }

  React.useEffect(() => {
    resetTimeout();
    startTimeout();

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {slides.map((slide, index) => (
            // <img
            //     key={index}
            //     className="slide-image slide"
            //     src={slide}
            //     // style={{ content: `url(${slide})`}}
            //     alt="slide image"
            //     onMouseOver={resetTimeout}
            //     onMouseOut={startTimeout}
            // />
          <div 
            className="slide-background-image-container"
            key={index}
          >
            <div
              className="slide2"
              style={{ backgroundImage: `url(${slide})`}}
              onMouseOver={resetTimeout}
              onMouseOut={startTimeout}
            ></div>
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;