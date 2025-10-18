import React from 'react';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "JEE (Main+Advanced)/IIT-JEE",
      description: "JEE (Main+Advanced) Courses builds strong subject knowledge and problem-solving skills to help aspirants ace the exams to get enrolled into IITs.",
      image: "🏗️", // Using emoji as placeholder - you can replace with actual image URLs
      buttonText: "Click Here"
    },
    {
      id: 2,
      title: "Pre-Medical/NEET UG",
      description: "NEETUG Courses sharpen skills essential for medical entrance exams, ensuring students are well-prepared for success in the competitive medical field.",
      image: "👨‍⚕️",
      buttonText: "Click Here"
    },
    {
      id: 3,
      title: "JEE (Main)",
      description: "JEE (Main) courses are designed to provide students with a significant competitive edge for achieving success for their path to NITs, IIITs and equivalent colleges.",
      image: "📚",
      buttonText: "Click Here"
    },
    {
      id: 4,
      title: "Pre-Nurture & Career Foundation",
      description: "PNCF Courses for class 6th to 10th nurtures students, establishing a robust groundwork for excelling in competitive exams and Olympiads.",
      image: "🎯",
      buttonText: "Click Here"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Courses & Fee
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl bg-white p-3 rounded-lg shadow-sm">
                {course.image}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {course.title}
                </h3>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed">
              {course.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;