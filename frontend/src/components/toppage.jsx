import React, { useState } from "react";
import { Home, FileText, Book, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const TopPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Results", path: "/results", icon: FileText },
    { name: "Courses", path: "/courses", icon: Book },
  ];

  return (
    <>
      {/* Sticky Navbar */}
      <div className="fixed top-0 left-0 w-full bg-white flex items-center justify-between p-4 shadow-md z-50">
        {/* Left side: Logo/Image */}
        <div className="flex items-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1721829332372-460bb55f37f4?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0"
            alt="Top banner"
            className="w-24 h-24 object-cover rounded-lg"
          />
        </div>

        {/* Hamburger Menu */}
        <Menu
          className="w-8 h-8 text-blue-600 cursor-pointer"
          onClick={toggleMenu}
        />
      </div>

      {/* Full screen drawer */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col items-start p-10 space-y-8`}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-3xl font-bold"
          onClick={toggleMenu}
        >
          &times;
        </button>

        {/* Menu Items */}
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={toggleMenu}
              className="flex items-center space-x-4 text-3xl text-blue-600 font-bold hover:text-blue-800 transition-colors"
            >
              <Icon className="w-8 h-8" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Spacer div to prevent content hiding behind fixed navbar */}
      <div className="h-28"></div>
    </>
  );
};

export default TopPage;
