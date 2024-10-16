"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Music, Clock, Users, Star } from "lucide-react";
import ContactButton from "./contact-button";
import BackgroundImage from "./background-image";
import { imagePaths } from "./images";

interface FeatureBoxProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TestimonialBoxProps {
  quote: string;
  author: string;
}

// Feature Box Component
const FeatureBox: React.FC<FeatureBoxProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
    <div className="mb-3">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

// Testimonial Box Component
const TestimonialBox: React.FC<TestimonialBoxProps> = ({ quote, author }) => (
  <div className="bg-[#f6f6f6] p-6 rounded-lg shadow flex flex-col items-center text-center">
    <p className="italic mb-4 text-sm md:text-base">{quote}</p>
    <p className="font-semibold text-sm md:text-base">- {author}</p>
  </div>
);

const PianoLessonsLandingPage = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight / 2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Home Section */}
        <section
          id="home"
          className="relative h-screen flex items-center justify-center snap-start"
        >
          <BackgroundImage
            src={imagePaths.home}
            alt="Largs piano lessons studio"
            priority
            overlayOpacity={0.2}
          />
          <div className="relative z-20 text-center px-5 py-5 bg-black bg-opacity-20 rounded-lg text-white shadow-text">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Largs Piano Lessons
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Here to help you master piano playing.
            </p>
            <ContactButton />
          </div>
        </section>

        {/* Features Section */}

        <section
          id="features"
          className="relative min-h-screen flex items-center justify-center snap-start"
        >
          <BackgroundImage
            src={imagePaths.features}
            alt="Piano learning benefits in Largs"
            overlayOpacity={0.15}
          />
          <div className="relative z-20 container mx-auto px-4 py-16  ">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-12 text-center text-white">
              Why Choose Our Piano Lessons?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <FeatureBox
                icon={<Music className="w-10 h-10 text-blue-500" />}
                title="Develop focus and concentration"
                description="So many distractions everywhere. Piano lessons will help to develop focus and concentration levels in students."
              />
              <FeatureBox
                icon={<Clock className="w-10 h-10 text-blue-500" />}
                title="Watch your confidence increase"
                description="Building resilience comes with learning music. It's not going to be easy but the more you play the more you'll realise you can do it!"
              />
              <FeatureBox
                icon={<Users className="w-10 h-10 text-blue-500" />}
                title="Become empowered and self directed"
                description="During lessons we spend time learning how to self analyse and practice which means during the week practice is easier."
              />
              <FeatureBox
                icon={<Star className="w-10 h-10 text-blue-500" />}
                title="Join a growing musical community"
                description="Throughout the year we have piano parties. Play piano and take part in fun interactive quizzes. Everyone together for fun times!"
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="relative min-h-screen flex items-center justify-center snap-start"
        >
          <BackgroundImage
            src={imagePaths.testimonials}
            alt="Successful piano students in Largs"
            overlayOpacity={0.25}
          />
          <div className="relative z-10 w-full max-w-[80%] mx-auto px-4 py-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-12 text-center text-white">
              What Our Students Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TestimonialBox
                quote="Matthew could play a few chords on the piano, and I was worried that he’d find traditional lessons offputting. Colin has found a way to engage Matthew and keep his interest. Matthew enjoys learning new songs, and we’ve all noticed his playing is steadily improving. Can’t ask for more than that."
                author="Linda Beveridge"
              />
              <TestimonialBox
                quote="Colin, cares about the lessons that he gives, and to the person who he teaches. I found Colin to be a very talented teacher who really cares.
So if your lucky enough to be taught by him, then you have done well.
I fully recommend him to everyone."
                author="Andrew McPake"
              />
              <TestimonialBox
                quote="We have been so impressed by the piano lessons for our boys from Colin. What an all round great guy. And the kids love him! We can’t get over how much they have learned in such a short time."
                author="Stephanie Carmichael"
              />
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section
          id="about"
          className="relative min-h-screen flex items-center justify-center snap-start"
        >
          <BackgroundImage
            src={imagePaths.about}
            alt="Largs piano teacher profile"
            overlayOpacity={0.2}
          />
          <div className="relative z-10 container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center text-white">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                About Me
              </h2>
              <p className="text-base md:text-lg mb-8">
                With over 10 years of experience teaching piano, I&apos;m
                passionate about helping students of all ages discover their
                musical talents. My personalized approach ensures that each
                student progresses at their own pace while enjoying the learning
                process.
              </p>
              <ContactButton />
            </div>
          </div>
        </section>
      </main>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => scrollToSection("home")}
          className="fixed bottom-4 right-4 bg-[#0f4c82] text-white p-2 rounded-full shadow-lg hover:bg-[#16344e] transition duration-300 z-40"
        >
          <ArrowUp size={20} className="md:w-6 md:h-6" />
        </button>
      )}
    </div>
  );
};

export default PianoLessonsLandingPage;
