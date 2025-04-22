"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add animation classes when component mounts
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = elementTop < window.innerHeight && elementBottom > 0;
        if (isVisible) {
          element.classList.add("animate-fade-in");
        }
      });
    };

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", animateOnScroll);
    };
  }, []);

  // Function to scroll to About Us section with a 3-second duration
  const scrollToAbout = () => {
    if (aboutSectionRef.current) {
      // Get the target position
      const targetPosition = aboutSectionRef.current.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 2000; // 3 seconds in milliseconds
      let start: number | null = null;

      // Disable the scroll button during animation
      const scrollButton = document.querySelector(
        '[aria-label="Scroll to About Us section"]'
      ) as HTMLButtonElement;
      if (scrollButton) {
        scrollButton.disabled = true;
        scrollButton.classList.add("opacity-50", "cursor-not-allowed");
      }

      // Animation function
      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function for smooth acceleration and deceleration
        const easeInOutCubic =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startPosition + distance * easeInOutCubic);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          // Re-enable the scroll button after animation completes
          if (scrollButton) {
            scrollButton.disabled = false;
            scrollButton.classList.remove("opacity-50", "cursor-not-allowed");
          }
        }
      };

      // Start the animation
      requestAnimationFrame(animation);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <HeroSection onScrollToAbout={scrollToAbout} />
      <AboutSection
        aboutRef={aboutSectionRef as React.RefObject<HTMLDivElement>}
      />
      <FeaturedProducts />
      <Testimonials />
      <CallToAction />

      <Footer />
    </main>
  );
}
