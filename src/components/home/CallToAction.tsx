import Link from "next/link";
import { useState, useEffect } from "react";

const CallToAction = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [buttonScale, setButtonScale] = useState(1);

  // Animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("cta-section");
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8;
        setIsVisible(isInView);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Button pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setButtonScale((prev) => (prev === 1 ? 1.05 : 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="cta-section"
      className="py-24 px-4 bg-[var(--color-neutral)] text-[var(--color-text-primary)] overflow-hidden relative"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-[var(--color-accent)]/5 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Animated heading */}
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Ready to <span className="text-[var(--color-accent)]">Elevate</span>{" "}
          Your Style?
        </h2>

        {/* Animated subheading */}
        <p
          className={`text-xl md:text-2xl mb-10 text-[var(--color-text-secondary)] transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Book a consultation with our expert tailors today
        </p>

        {/* Animated button */}
        <div
          className={`transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Link
            href="/contact"
            className="inline-block bg-[var(--color-cta)] text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-[var(--color-cta-hover)] transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
            style={{ transform: `scale(${buttonScale})` }}
          >
            <span className="relative z-10">Book Consultation</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-cta)] to-[var(--color-cta-hover)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute -inset-1 bg-[var(--color-cta)]/30 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
        </div>

        {/* Additional info */}
        <div
          className={`mt-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-[var(--color-cta)] mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span>Free Initial Consultation</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-[var(--color-cta)] mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>30-Minute Session</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-[var(--color-cta)] mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            <span>Book Online</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
