import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AboutUs = () => {
  const slides = [

    
   


    {
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      title: "Top Quality Modules",
      points: ["1. Fully Based on NEET New Pattern.", "2. NCERT Based Questions."],
    },
    {
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      title: "NEET / MEDICAL , JEE ADV",
      points: ["Building a community of lifelong learners!"],
    },
    {
      img:  "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
      title: " Schlorship Program",
      points: ["For Class 7th, 8th, 9th, 10th"],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const intervalRef = useRef(null);

  // swipe/drag start & end
  const startX = useRef(0);
  const endX = useRef(0);

  // Auto Slide
  useEffect(() => {
    if (!isManual) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isManual]);

  // Resume auto slide after 3 sec
  useEffect(() => {
    if (isManual) {
      const timeout = setTimeout(() => {
        setIsManual(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isManual]);

  const goPrev = () => {
    setIsManual(true);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setIsManual(true);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  // Detect swipe/drag
  const handleSwipe = () => {
    const distance = startX.current - endX.current;
    if (Math.abs(distance) > 50) {
      if (distance > 0) goNext();
      else goPrev();
    }
  };

  // Touch & Mouse
  const handleTouchStart = (e) => (startX.current = e.targetTouches[0].clientX);
  const handleTouchEnd = (e) => {
    endX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };
  const handleMouseDown = (e) => (startX.current = e.clientX);
  const handleMouseUp = (e) => {
    endX.current = e.clientX;
    handleSwipe();
  };

  return (
    <div className="bg-white py-10 px-4">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        About Us
      </h2>

      {/* Slider Section */}
      <div
        className="relative max-w-4xl mx-auto select-none overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Left Image with Animation */}
          <div className="flex justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={slides[currentIndex].img}
                alt={slides[currentIndex].title}
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full max-w-sm h-72 object-cover rounded-xl shadow-lg"
              />
            </AnimatePresence>
          </div>

          {/* Right Content with Animation */}
          <div className="text-center md:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex + "-text"}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
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

        {/* Navigation Arrows */}
        <button
          onClick={goPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300"
        >
          ◀
        </button>
        <button
          onClick={goNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
