import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SocialMediaIcons from "./SocialMediaIcons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: "/music", label: "MUSIC" },
    { path: "/videos", label: "VIDEOS" },
    { path: "/tour", label: "TOUR" },
    { path: "/contact", label: "CONTACT" }
  ];

  return (
    <header className="w-full pt-12 pb-8 px-4 flex flex-col items-center z-50">
      
      {/* 1. Big Center Title */}
      <Link 
        to="/" 
        className="text-4xl md:text-6xl font-larsseit-medium text-black tracking-tight uppercase mb-6 hover:text-gray-600 transition-colors text-center"
        onClick={() => setIsOpen(false)}
      >
        YUKON CLUB
      </Link>

      {/* 2. Social Icons Row */}
      <div className="mb-6">
         <SocialMediaIcons />
      </div>

      {/* 3. Navigation Links - Desktop */}
      <nav className="hidden md:flex items-center space-x-6">
        {menuItems.map((item, index) => (
          <React.Fragment key={item.path}>
            <Link
              to={item.path}
              className="text-lg font-larsseit-medium text-black hover:text-gray-500 transition-colors uppercase tracking-wide"
            >
              {item.label}
            </Link>
            {index < menuItems.length - 1 && (
               <span className="text-black mx-1">|</span>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden mt-4 text-black p-2 border border-black uppercase text-xs font-bold tracking-widest"
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <nav className="md:hidden flex flex-col items-center space-y-4 mt-6 w-full py-6 border-t-2 border-b-2 border-black bg-bone">
           {menuItems.map((item) => (
             <Link
               key={item.path}
               to={item.path}
               className="text-xl font-larsseit-medium text-black uppercase"
               onClick={() => setIsOpen(false)}
             >
               {item.label}
             </Link>
           ))}
        </nav>
      )}

    </header>
  );
};

export default Navbar;
