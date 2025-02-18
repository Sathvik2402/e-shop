import React, { useState } from 'react';
import imagecarousel from "./ImageCarousel.css"

const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Go to the next image
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Go to the previous image
    const prevImage = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };

    return (
        <div className="carousel-container">
            <div className="carousel">
                <button className="prev" onClick={prevImage}>
                    &#10094; {/* Left arrow */}
                </button>
                <div className="image-container">
                    <img src={images[currentIndex]} alt={`carousel image ${currentIndex + 1}`} />
                </div>
                <button className="next" onClick={nextImage}>
                    &#10095; {/* Right arrow */}
                </button>
            </div>
        </div>
    );
};

export default ImageCarousel;
