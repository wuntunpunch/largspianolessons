"use client";

import React, { useState, useEffect, Suspense } from "react";
import Logo from "./logo";
import { Menu, X } from "lucide-react";
import ContactForm from "./contact-form";
import Link from "next/link";

// Create a client component that safely uses useSearchParams
const MenuCloseListener = ({
  setIsMenuOpen,
}: {
  setIsMenuOpen: (open: boolean) => void;
}) => {
  // Import useSearchParams dynamically to avoid direct import
  const { useSearchParams } = require("next/navigation");
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [searchParams, setIsMenuOpen]);

  return null;
};

const PianoLessonsPageHeader = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
    setIsMenuOpen(false);
  };

  return (
    <div>
      {/* Wrap the useSearchParams component in Suspense */}
      <Suspense fallback={null}>
        <MenuCloseListener setIsMenuOpen={setIsMenuOpen} />
      </Suspense>

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

      {/* Mobile menu with slide-in animation */}
      <div className={`relative z-50 ${isMenuOpen ? "" : "hidden"}`}>
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsMenuOpen(false)}
        ></div>
        <div className="fixed inset-y-0 right-0 z-20 w-full sm:max-w-sm bg-[#f6f6f6] p-4 overflow-y-auto transform origin-right transition-transform ease-in-out duration-300">
          <div className="flex items-center justify-between mb-6">
            <Logo />
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-left hover:text-[#0f4c82]"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/#features"
              className="text-left hover:text-[#0f4c82]"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/#testimonials"
              className="text-left hover:text-[#0f4c82]"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="/#about"
              className="text-left hover:text-[#0f4c82]"
              onClick={() => setIsMenuOpen(false)}
            >
              About Me
            </Link>
            <button
              onClick={toggleForm}
              className="text-left hover:text-[#0f4c82] bg-transparent border-none font-normal text-base cursor-pointer"
            >
              Contact Me
            </button>

            <Link
              href="/relative-keys"
              className="text-left hover:text-[#0f4c82]"
              onClick={() => setIsMenuOpen(false)}
            >
              Relative Key Game
            </Link>

            <Link
              href="/privacy-policy"
              className="text-left hover:text-[#0f4c82]"
              onClick={() => setIsMenuOpen(false)}
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>

      <ContactForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default PianoLessonsPageHeader;
