import React from "react";
import Resultsbanner from "../components/resultsbanner.jsx";
import Resultspdf from "../components/resultspdf.jsx";

const ResultsPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Results</h1>
      <Resultsbanner />
      <Resultspdf />
    </div>
  );
};

export default ResultsPage;
