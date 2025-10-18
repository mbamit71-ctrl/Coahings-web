import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Gallery = () => {
  const images = [
    
    "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80",
    
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
    
    "https://images.unsplash.com/photo-1600880291769-6e1de9d7a3c5?w=800&q=80",
    "https://images.unsplash.com/photo-1606326608690-6bfb9c2b52d6?w=800&q=80",
    "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=800&q=80",
    "https://images.unsplash.com/photo-1600880292231-b6b6d7d4c0a5?w=800&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",

    
    // add more images up to 64 or more
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const imagesPerSlide = 6;
  const totalSlides = Math.ceil(images.length / imagesPerSlide);

  // Preload next slide images
  useEffect(() => {
    const nextSlideIndex = currentSlide + 1;
    if (nextSlideIndex < totalSlides) {
      const start = nextSlideIndex * imagesPerSlide;
      const end = start + imagesPerSlide;
      images.slice(start, end).forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [currentSlide, images]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Get images for current slide
  const currentImages = images.slice(
    currentSlide * imagesPerSlide,
    currentSlide * imagesPerSlide + imagesPerSlide
  );

  return (
    <div className="py-10 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Our Moments</h2>

      <div className="relative">
        {/* Slide Buttons */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          onClick={handlePrev}
        >
          ◀
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          onClick={handleNext}
        >
          ▶
        </button>

        {/* Image Grid with animation */}
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={currentSlide}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            {currentImages.map((img, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl shadow-md cursor-pointer"
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`Gallery ${index}`}
                  className="w-full h-60 object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-3xl max-h-[80vh] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
