import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AboutUs = () => {
  const slides = useMemo(
    () => [
      {
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
        title: "Top Quality Modules",
        points: [
          "1. Fully Based on NEET New Pattern.",
          "2. NCERT Based Questions.",
        ],
      },
      {
        img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
        title: "NEET / MEDICAL , JEE ADV",
        points: ["Building a community of lifelong learners!"],
      },
      {
        img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=800&q=80",
        title: "Scholarship Program",
        points: ["For Class 7th, 8th, 9th, 10th"],
      },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(0);

  // ✅ Preload all images in background
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.img;
    });
  }, [slides]);

  // ✅ Auto slide
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [paused, slides.length]);

  // ✅ Manual controls
  const goNext = () => {
    setPaused(true);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    resumeAuto();
  };
  const goPrev = () => {
    setPaused(true);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    resumeAuto();
  };

  // ✅ Resume auto-slide after 3s of manual interaction
  const resumeAuto = () => {
    setTimeout(() => setPaused(false), 3000);
  };

  // ✅ Swipe handling
  const handleTouchStart = (e) => (startX.current = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX.current - endX > 50) goNext();
    else if (endX - startX.current > 50) goPrev();
  };

  return (
    <div className="bg-white py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        About Us
      </h2>

      <div
        className="relative max-w-5xl mx-auto overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={slides[currentIndex].img}
                src={slides[currentIndex].img}
                alt={slides[currentIndex].title}
                className="w-full max-w-sm h-72 object-cover rounded-xl shadow-lg"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                loading="lazy"
                decoding="async"
              />
            </AnimatePresence>
          </div>

          {/* Right Text */}
          <div className="text-center md:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[currentIndex].title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  {slides[currentIndex].title}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  {slides[currentIndex].points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={goPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition"
        >
          ◀
        </button>
        <button
          onClick={goNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
