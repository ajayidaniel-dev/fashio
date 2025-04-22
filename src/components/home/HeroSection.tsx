"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  onScrollToAbout: () => void;
}

const HeroSection = ({ onScrollToAbout }: HeroSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Auto-rotate hero slides
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 8000);

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  // Hero background images
  const heroImages = [
    "/hero-fashion-1.jpg",
    "/hero-fashion-2.jpg",
    "/hero-fashion-3.jpg",
  ];

  // Hero content for each slide
  const heroContent = [
    {
      title: "Elevate Your Style",
      subtitle: "Bespoke Fashion & Accessories",
      cta: "Explore Collection",
      link: "/collections",
    },
    {
      title: "Craft Your Signature Look",
      subtitle: "Tailored to Perfection",
      cta: "Book Consultation",
      link: "/bespoke",
    },
    {
      title: "Discover FASHIO Caps",
      subtitle: "The Ultimate Fashion Statement",
      cta: "Shop Now",
      link: "/shop",
    },
  ];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Slider */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={`FASHIO Fashion ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark)]/90 to-[var(--color-primary-dark)]/70" />
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-[var(--color-accent)] w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto">
        {heroContent.map((content, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 transform ${
              currentSlide === index
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 text-[var(--color-text-light)] tracking-tight">
              {content.title}
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-[var(--color-text-light)]/90 max-w-2xl">
              {content.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={content.link}
                className="inline-block bg-[var(--color-accent)] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[var(--color-accent-light)] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {content.cta}
              </Link>
              <Link
                href="/about"
                className="inline-block bg-transparent border-2 border-[var(--color-text-light)] text-[var(--color-text-light)] px-8 py-3 rounded-full text-lg font-semibold hover:bg-[var(--color-text-light)] hover:text-[var(--color-primary)] transform hover:scale-105 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={onScrollToAbout}
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 animate-bounce cursor-pointer focus:outline-none"
        aria-label="Scroll to About Us section"
      >
        <svg
          className="w-6 h-6 text-[var(--color-text-light)]"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </button>
    </section>
  );
};

export default HeroSection;
