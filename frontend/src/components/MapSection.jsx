const MapSection = () => {
  return (
    <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[500px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.949541436399!2d84.90515827187262!3d26.650097971333576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993350776371cfb%3A0x1b3596b9349fd247!2sMantra%20Career%20Institute%E0%A5%A4%20NEET%20and%20IIT-%20JEE%20classes%20Motihari%E0%A5%A4%20Medical%20and%20Engineering%20Coaching%20Motihari%20%E0%A5%A4%20Coaching%20Motihari!5e0!3m2!1sen!2sin!4v1758019425495!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mantra Career Institute Location"
      ></iframe>
    </div>
  );
};

export default MapSection;
