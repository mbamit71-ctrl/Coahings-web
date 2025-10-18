import React from "react";

const VideoSection = ({ youtubeUrl }) => {
  let videoId = "";

  if (youtubeUrl.includes("watch?v=")) {
    videoId = youtubeUrl.split("v=")[1].split("&")[0];
  } else if (youtubeUrl.includes("youtu.be/")) {
    videoId = youtubeUrl.split("youtu.be/")[1].split("?")[0];
  } else if (youtubeUrl.includes("shorts/")) {
    videoId = youtubeUrl.split("shorts/")[1].split("?")[0];
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const channelUrl =
    "https://youtube.com/@mantracareerinstitute4581?si=nQZPOlPDdUwitbMT";

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-10">Video</h2>

      {/* Video and Text */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Video */}
        <div className="md:w-1/2 ml-2">
          <iframe
            className="w-full aspect-video rounded-md shadow-md"
            src={embedUrl}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-2xl font-extrabold text-gray-800">
            No.1 Institute in India
          </h2>

          <h2 className="text-3xl font-extrabold text-indigo-700 mt-3 tracking-wide drop-shadow-sm">
            INSTITUTE NAME
          </h2>

          <h4 className="text-lg text-gray-700 mt-4 leading-relaxed">
            Premier institute for pre-medical exams{" "}
            <span className="font-bold text-gray-900">NEET / AIIMS</span>
          </h4>

          {/* Redirect Button */}
          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            Visit Channel
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
