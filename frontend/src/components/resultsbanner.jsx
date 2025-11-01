import React, { useState, useEffect, useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageSlider = () => {
  const images = useMemo(
    () => [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&q=80",
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80",
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeout = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // 🔥 Preload next & prev images
  useEffect(() => {
    const preloadImage = (url) => {
      const img = new Image();
      img.src = url;
    };
    preloadImage(images[(currentIndex + 1) % images.length]);
    preloadImage(images[(currentIndex - 1 + images.length) % images.length]);
  }, [currentIndex, images]);

  // 🕒 Auto-slide with pause on interaction
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  const pauseAutoSlide = () => {
    setIsPaused(true);
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => setIsPaused(false), 3000);
  };

  // 🧠 Smooth update using requestAnimationFrame
  const changeSlide = (direction) => {
    window.requestAnimationFrame(() => {
      setCurrentIndex((prev) =>
        direction === "next"
          ? prev === images.length - 1
            ? 0
            : prev + 1
          : prev === 0
          ? images.length - 1
          : prev - 1
      );
    });
    pauseAutoSlide();
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
    pauseAutoSlide();
  };

  const handleTouchEnd = (e) => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (diff > 50) changeSlide("prev");
    else if (diff < -50) changeSlide("next");
    setIsDragging(false);
  };

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setIsDragging(true);
    pauseAutoSlide();
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    if (diff > 50) changeSlide("prev");
    else if (diff < -50) changeSlide("next");
    setIsDragging(false);
  };

  return (
    <div className="w-full relative rounded-lg overflow-hidden shadow-lg">
      <div
        className="relative h-48 overflow-hidden cursor-grab select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              loading={Math.abs(currentIndex - index) <= 1 ? "eager" : "lazy"} // 💤 load only visible slides fast
              className="min-w-full h-full object-cover"
              draggable={false}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() => changeSlide("prev")}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => changeSlide("next")}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
