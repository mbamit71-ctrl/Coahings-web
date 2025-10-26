import React from "react";
import { FaWhatsapp, FaFacebook, FaYoutube, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const ContactSection = () => {
  return (
    <div className="bg-white py-12 px-6 md:px-20 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8 text-center">
        {/* Location */}
        <div className="flex flex-col items-center">
          <FaMapMarkerAlt className="text-4xl text-blue-500 mb-2" />
          <h2 className="font-semibold text-lg mb-1">Location</h2>
          <p>123 Career Street, Patna, Bihar, India</p>
        </div>

        {/* Opening Hours */}
        <div className="flex flex-col items-center">
          <FaClock className="text-4xl text-green-500 mb-2" />
          <h2 className="font-semibold text-lg mb-1">Opening Hours</h2>
          <p>Mon - Fri: 09:00 AM - 06:00 PM</p>
          <p>Saturday: 10:00 AM - 04:00 PM</p>
          <p>Sunday: Closed</p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center">
          <h2 className="font-semibold text-lg mb-2">Connect with Us</h2>
          <div className="flex space-x-4 mt-2 justify-center">
            <a
              href="https://wa.me/yourwhatsapplink"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 text-3xl hover:scale-110 transition"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 text-3xl hover:scale-110 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://youtube.com/@yourchannel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 text-3xl hover:scale-110 transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
