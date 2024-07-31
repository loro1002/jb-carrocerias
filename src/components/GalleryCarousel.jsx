// src/components/GalleryCarousel.jsx
import React, { useState } from 'react';
import './GalleryCarousel.css';

const GalleryCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="gallery-carousel">
      <button className="carousel-button left" onClick={goToPrevious}>
        &lt;
      </button>
      <div className="carousel-images">
        <img src={images[currentIndex]} alt="Galeria" className="carousel-image" />
      </div>
      <button className="carousel-button right" onClick={goToNext}>
        &gt;
      </button>
    </div>
  );
};

export default GalleryCarousel;
