import React from 'react'
import AboutUs from './components/aboutus.jsx'
import ContactSection from './components/ContactSection.jsx'
import Courses from './components/courses.jsx'
import EmailSubscription from './components/emailsubs.jsx'
import EnquirySubs from './components/enquirysubs.jsx'
import Footer from './components/footer.jsx'
import Form from './components/form.jsx'
import Gallery from './components/Gallery.jsx'
import Header from './components/header.jsx'
import MapSection from './components/MapSection.jsx'
import ImageSlider from './components/resultsbanner.jsx'
import ResultsTable from './components/resultspdf.jsx'
import Subscribe from './components/subscribe.jsx'
import TopPage from './components/toppage.jsx'
import VideoSection from './components/VideoSection.jsx'

const App = () => {
  return (
    <div>
      <AboutUs />
      <ContactSection />
      <Courses />
      <EmailSubscription />
      <Footer />
      <Form />
      <Header />
      <MapSection />
      <ImageSlider />
      <ResultsTable/>
      <Subscribe/>
      <TopPage />
      <VideoSection youtubeUrl="https://youtu.be/leeX4Vs1Yhs"/>
      <EnquirySubs />
      
    </div>
  )
}

export default App
