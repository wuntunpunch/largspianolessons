"use client";

import React, { useState } from "react";
import Logo from "./logo";
import { Menu, X } from "lucide-react";
import ContactForm from "./contact-form";

const PianoLessonsPageHeader = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
    setIsMenuOpen(false);
  };

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 bg-[#f6f6f6] shadow-md z-50">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <Logo />
          </div>
          <button
            onClick={toggleMenu}
            className="text-[#0f4c82] hover:text-[#16344e]"
          >
            <Menu size={24} className="md:w-8 md:h-8" />
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-[#f6f6f6] w-64 h-full p-4">
            <button
              onClick={toggleMenu}
              className="mb-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-left hover:text-[#0f4c82]"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-left hover:text-[#0f4c82]"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-left hover:text-[#0f4c82]"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left hover:text-[#0f4c82]"
              >
                About Me
              </button>
              <button
                onClick={toggleForm}
                className="text-left hover:text-[#0f4c82]"
              >
                Contact Me
              </button>

              <a href="/relative-keys">
                <button className="text-left hover:text-[#0f4c82]">
                  Relative Key Game
                </button>
              </a>

              <a href="/privacy-policy">
                <button className="text-left hover:text-[#0f4c82]">
                  Privacy Policy
                </button>
              </a>
            </nav>
          </div>
        </div>
      )}
      <ContactForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default PianoLessonsPageHeader;
