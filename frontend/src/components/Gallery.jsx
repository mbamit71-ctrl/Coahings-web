import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Gallery = () => {
  const images = useMemo(
    () => [
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80",
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80",
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
      // ...add more if needed
    ],
    []
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const imagesPerSlide = 6;
  const totalSlides = Math.ceil(images.length / imagesPerSlide);

  // ✅ Background Preload (non-blocking)
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  const handleNext = () => setCurrentSlide((p) => (p + 1) % totalSlides);
  const handlePrev = () => setCurrentSlide((p) => (p - 1 + totalSlides) % totalSlides);

  const currentImages = images.slice(
    currentSlide * imagesPerSlide,
    currentSlide * imagesPerSlide + imagesPerSlide
  );

  return (
    <div className="py-10 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Our Moments</h2>

      <div className="relative">
        {/* Navigation Buttons */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 transition"
          onClick={handlePrev}
        >
          ◀
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 transition"
          onClick={handleNext}
        >
          ▶
        </button>

        {/* Image Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {currentImages.map((img, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl shadow-md cursor-pointer bg-gray-200"
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`Gallery ${index}`}
                  className="w-full h-60 object-cover transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            src={selectedImage}
            alt="Selected"
            className="max-w-3xl max-h-[85vh] rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
