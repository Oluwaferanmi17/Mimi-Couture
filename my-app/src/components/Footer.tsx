import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-white py-[50px] pb-5 mt-[50px]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] px-5">
        {/* Contact Us */}
        <div className="flex flex-col gap-2">
          <h3 className="mb-5 text-[18px] font-bold font-lora">Contact Us</h3>
          <p className="mb-1 text-sm">Email: info@mimicoutoure.com</p>
          <p className="mb-1 text-sm">Phone: +1 (234) 567-8900</p>
          <p className="mb-1 text-sm">
            Address: 123 Fashion Avenue, Style City
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-[18px] font-bold font-lora">Quick Links</h3>
          <ul className="space-y-[10px]">
            {[
              "About Us",
              "Our Collections",
              "Size Guide",
              "Shipping Policy",
            ].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-white no-underline transition-colors duration-300 hover:text-[#ccc]"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="mb-5 text-[18px] font-bold font-lora">Follow Us</h3>
          <div className="flex gap-[15px]">
            <a
              href="#"
              aria-label="Facebook"
              className="text-[20px] text-white transition-colors duration-300 hover:text-[#ccc]"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-[20px] text-white transition-colors duration-300 hover:text-[#ccc]"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-[20px] text-white transition-colors duration-300 hover:text-[#ccc]"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              aria-label="Pinterest"
              className="text-[20px] text-white transition-colors duration-300 hover:text-[#ccc]"
            >
              <FaPinterest />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col w-full">
          <h3 className="mb-5 text-[18px] font-bold font-lora">Newsletter</h3>

          <form className="flex flex-col gap-4">
            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full p-4 bg-white text-black placeholder-gray-500 border-none outline-none text-base font-sans"
            />

            {/* Subscribe Button */}
            <button
              type="submit"
              className="w-fit px-8 py-3 
                     bg-white text-black font-bold text-lg rounded-full 
                     transition-all duration-300 ease-in-out
                     shadow-none
                     hover:bg-[#ccc] 
                     hover:-translate-y-1 hover:-translate-x-[2px]
                     hover:shadow-[4px_5px_0_0_black]
                     active:translate-y-[2px] active:translate-x-[1px]
                     active:shadow-none"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-10 pt-5 border-t border-[#333] flex flex-col gap-2">
        <p>
          © <span className="date">{currentYear}</span> Mimi Coutoure. All
          rights reserved.
        </p>
        <p>
          Created By{" "}
          <span className="font-[Poppins] font-semibold text-[15px] text-[#d5aeae] transition-all cursor-pointer hover:text-[#a31313] hover:text-lg">
            Oluwaferanmi Aruaji
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
