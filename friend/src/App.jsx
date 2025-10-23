import React from 'react'
import Header from './components/header.jsx'
import Toppage from './components/toppage.jsx'
import Resultsbanner from './components/resultsbanner.jsx'
import Resultspdf from './components/resultspdf.jsx'
import Courese from './components/courses.jsx'
import VideoSection from './components/VideoSection.jsx'
import AboutUs from './components/aboutus.jsx'
import Gallery from './components/Gallery.jsx'
import MapSection from './components/MapSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import Subscribe from './components/subscribe.jsx'
import Footer from './components/footer.jsx'
import Form from './components/form.jsx'

const App = () => {
  return (
    <div>
      <Header />
                    <Resultsbanner />
                    {/* <Toppage /> */}
                    <Resultspdf />
                    <Courese />
                    <VideoSection youtubeUrl="https://youtu.be/leeX4Vs1Yhs?si=F5GxQhYXfVwWP3jN" /> 
                    <AboutUs />
                    <Form />
                    <Gallery />
                    <Subscribe />
                    <MapSection />
                    <ContactSection />
                    <Footer />

    </div>
  )
}

export default App

