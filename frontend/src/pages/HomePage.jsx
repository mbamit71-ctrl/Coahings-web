import React from "react";
import Resultsbanner from "../components/resultsbanner.jsx";
import Resultspdf from "../components/resultspdf.jsx";
import Courese from "../components/courses.jsx";
import VideoSection from "../components/VideoSection.jsx";
import AboutUs from "../components/aboutus.jsx";
import Form from "../components/form.jsx";
import Gallery from "../components/Gallery.jsx";
import Subscribe from "../components/subscribe.jsx";
import ContactSection from "../components/ContactSection.jsx";
import MapSection from "../components/MapSection.jsx";

const HomePage = () => {
  return (
    <div>
      <Resultsbanner />
      <Resultspdf />
      <Courese />

      
      <VideoSection youtubeUrl="https://youtu.be/leeX4Vs1Yhs" />

      <AboutUs />
      <Form />
      <Gallery />
      <Subscribe />
      <MapSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
