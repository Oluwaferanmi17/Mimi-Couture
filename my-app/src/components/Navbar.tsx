import React, { useState } from "react";
import { FaHeart, FaUserAlt } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <nav className="fixed top-0 w-full bg-white text-[#070707] py-[10px] z-[1000] flex items-center justify-between shadow-[0_2px_5px_rgba(0,0,0,0.1)]">
        {/* Left: Toggle & Menu Text */}
        <div className="flex items-center z-[1001] pl-4">
          {/* Custom Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-[40px] h-[40px] cursor-pointer flex flex-col items-center justify-center gap-[8px] group border-none bg-transparent"
            aria-label="Toggle Menu"
          >
            {/* Bar 1 */}
            <div
              className={`w-[70%] h-[1px] bg-[#0c0a0a] rounded-[5px] transition-all duration-300 origin-left
                ${isOpen ? "rotate-45 ml-[13px]" : ""}`}
            ></div>

            {/* Bar 2 */}
            <div
              className={`w-[70%] h-[1px] bg-[#0c0a0a] rounded-[5px] transition-all duration-300 origin-center
                ${isOpen ? "rotate-[135deg] ml-0" : ""}`}
            ></div>

            {/* Bar 3 */}
            <div
              className={`w-[70%] h-[1px] bg-[#0c0a0a] rounded-[5px] transition-all duration-300 origin-left
                ${isOpen ? "-rotate-45 opacity-0" : ""}`}
            ></div>
          </button>

          <p
            className="ml-2 font-lora cursor-pointer select-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "cancel" : "menu"}
          </p>
        </div>

        {/* Sidebar (Slide-in Menu) */}
        <div
          className={`fixed top-0 left-0 h-screen w-[420px] max-w-[85vw] bg-white transition-transform duration-300 ease-in-out shadow-2xl z-[999] flex items-center justify-start
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <ul className="p-[20px] mt-[60px] w-full">
            {[
              "New",
              "Women",
              "Men",
              "Children",
              "Come Learn With Us",
              "Become A Worker",
            ].map((item, index) => (
              <li key={index} className="mb-[20px] list-none">
                <a
                  href="#"
                  className={`text-[1.5rem] no-underline transition-colors duration-300 font-lora
                    ${item === "Come Learn With Us" ? "text-black font-semibold" : "text-[#070707] hover:text-[#ccc]"}`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Center: Logo */}
        <h1 className="absolute left-1/2 -translate-x-1/2 font-lora text-2xl font-bold tracking-widest">
          LOGO
        </h1>

        {/* Right: Icons & Call Us */}
        <div className="ml-auto flex items-center gap-[12px] pr-[15px]">
          <a
            href="#"
            className="no-underline text-[#070707] font-lora text-sm hover:text-gray-500 transition-colors"
          >
            Call Us
          </a>
          <FaHeart className="text-[17px] cursor-pointer hover:text-gray-500 transition-colors" />
          <FaUserAlt className="text-[24px] cursor-pointer hover:text-gray-500 transition-colors" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
