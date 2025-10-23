import React, { useState } from "react";

const ResultsTable = () => {
  const data = [
    { title: "Math Result", downloadLink: "/pdfs/math.pdf" },
    { title: "Science Result", downloadLink: "/pdfs/science.pdf" },
    { title: "English Result", downloadLink: "/pdfs/english.pdf" },
    { title: "History Result", downloadLink: "/pdfs/history.pdf" },
    { title: "Geography Result", downloadLink: "/pdfs/geography.pdf" },
    { title: "Computer Result", downloadLink: "/pdfs/computer.pdf" },
    { title: "Physics Result", downloadLink: "/pdfs/physics.pdf" },
  ];

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate the chunk of data to show
  const startIndex = currentPage * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Exam Results
      </h1>

      <div className="divide-y divide-gray-200 rounded-md overflow-hidden border border-gray-200">
        {currentData.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center px-6 py-4 bg-white hover:bg-gray-50 transition"
          >
            <span className="font-semibold text-gray-800">{item.title}</span>
            <a
              href={item.downloadLink}
              download
              className="bg-blue-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Download
            </a>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      {data.length > itemsPerPage && (
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <p className="text-center text-gray-500 text-sm mt-4">
        Click on "Download" to get the PDF of each result.
      </p>
    </div>
  );
};

export default ResultsTable;
