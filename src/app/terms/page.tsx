"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// Extend Window interface to include scrollTimeout property
declare global {
  interface Window {
    scrollTimeout: number | undefined;
  }
}

const TermsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("terms-section");
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.9;
        setIsVisible(isInView);
      }

      // Detect if user is scrolling - simplified approach
      if (window.scrollTimeout) {
        clearTimeout(window.scrollTimeout);
      }
      window.scrollTimeout = window.setTimeout(() => {
        // Scrolling has stopped
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (window.scrollTimeout) {
        clearTimeout(window.scrollTimeout);
      }
    };
  }, []);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div>
      <div className="min-h-screen bg-[var(--color-background)]">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div
            id="terms-section"
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4 relative inline-block">
                Terms and Privacy Policy
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-[var(--color-accent)] transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
              </h1>
              <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                Please read our terms and privacy policy carefully to understand
                how we operate and protect your information.
              </p>
            </div>

            <div className="space-y-8">
              {/* Navigation Tabs */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <button
                  onClick={() => toggleSection("terms")}
                  className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                    activeSection === "terms" || activeSection === null
                      ? "bg-[var(--color-accent)] text-white shadow-lg"
                      : "bg-[var(--color-primary-light)] text-gray-200 hover:bg-[var(--color-primary)]"
                  }`}
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => toggleSection("privacy")}
                  className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                    activeSection === "privacy"
                      ? "bg-[var(--color-accent)] text-white shadow-lg"
                      : "bg-[var(--color-primary-light)] text-gray-200 hover:bg-[var(--color-primary)]"
                  }`}
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => toggleSection("contact")}
                  className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                    activeSection === "contact"
                      ? "bg-[var(--color-accent)] text-white shadow-lg"
                      : "bg-[var(--color-primary-light)] text-gray-200 hover:bg-[var(--color-primary)]"
                  }`}
                >
                  Contact Us
                </button>
              </div>

              {/* Terms of Service */}
              <section
                className={`transition-all duration-500 ${
                  activeSection === "terms" || activeSection === null
                    ? "opacity-100 max-h-[2000px]"
                    : "opacity-0 max-h-0 overflow-hidden"
                }`}
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-xl border border-[var(--color-primary-light)]">
                  <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-6 flex items-center">
                    <span className="w-10 h-10 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center mr-3">
                      <svg
                        className="w-5 h-5 text-[var(--color-accent)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    Terms of Service
                  </h2>
                  <div className="prose prose-lg text-[var(--color-text-secondary)]">
                    <p className="mb-4">
                      Welcome to FASHIO. By accessing our website, you agree to
                      these terms of service. Please read them carefully.
                    </p>

                    <div className="space-y-6">
                      <div className="bg-[var(--color-primary-light)]/30 p-4 rounded-lg hover:bg-[var(--color-primary-light)]/50 transition-all duration-300">
                        <h3 className="text-xl font-medium text-[var(--color-text-primary)] mb-2 flex items-center">
                          <span className="w-6 h-6 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center mr-2 text-sm">
                            1
                          </span>
                          Acceptance of Terms
                        </h3>
                        <p className="mb-0">
                          By accessing and using this website, you accept and
                          agree to be bound by the terms and provision of this
                          agreement.
                        </p>
                      </div>

                      <div className="bg-[var(--color-primary-light)]/30 p-4 rounded-lg hover:bg-[var(--color-primary-light)]/50 transition-all duration-300">
                        <h3 className="text-xl font-medium text-[var(--color-text-primary)] mb-2 flex items-center">
                          <span className="w-6 h-6 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center mr-2 text-sm">
                            2
                          </span>
                          Use License
                        </h3>
                        <p className="mb-0">
                          Permission is granted to temporarily download one copy
                          of the materials (information or software) on
                          FASHIO&apos;s website for personal, non-commercial
                          transitory viewing only.
                        </p>
                      </div>

                      <div className="bg-[var(--color-primary-light)]/30 p-4 rounded-lg hover:bg-[var(--color-primary-light)]/50 transition-all duration-300">
                        <h3 className="text-xl font-medium text-[var(--color-text-primary)] mb-2 flex items-center">
                          <span className="w-6 h-6 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center mr-2 text-sm">
                            3
                          </span>
                          Disclaimer
                        </h3>
                        <p className="mb-0">
                          The materials on FASHIO&apos;s website are provided on
                          an &apos;as is&apos; basis. FASHIO makes no
                          warranties, expressed or implied, and hereby disclaims
                          and negates all other warranties including, without
                          limitation, implied warranties or conditions of
                          merchantability, fitness for a particular purpose, or
                          non-infringement of intellectual property or other
                          violation of rights.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Privacy Policy */}
              <section
                className={`transition-all duration-500 ${
                  activeSection === "privacy"
                    ? "opacity-100 max-h-[2000px]"
                    : "opacity-0 max-h-0 overflow-hidden"
                }`}
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-xl border border-[var(--color-primary-light)]">
                  <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-6 flex items-center">
                    <span className="w-10 h-10 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center mr-3">
                      <svg
                        className="w-5 h-5 text-[var(--color-accent)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </span>
                    Privacy Policy
                  </h2>
                  <div className="prose prose-lg text-[var(--color-text-secondary)]">
                    <p className="mb-4">
                      Your privacy is important to us. It is FASHIO&apos;s
                      policy to respect your privacy regarding any information
                      we may collect while operating our website.
                    </p>

                    <div className="space-y-6">
                      <div className="bg-[var(--color-primary-light)]/30 p-4 rounded-lg hover:bg-[var(--color-primary-light)]/50 transition-all duration-300">
                        <h3 className="text-xl font-medium text-[var(--color-text-primary)] mb-2 flex items-center">
                          <span className="w-6 h-6 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center mr-2 text-sm">
                            1
                          </span>
                          Information We Collect
                        </h3>
                        <p className="mb-0">
                          We collect information that you provide directly to
                          us, including when you create an account, make a
                          purchase, sign up for our newsletter, or contact us
                          for support.
                        </p>
                      </div>

                      <div className="bg-[var(--color-primary-light)]/30 p-4 rounded-lg hover:bg-[var(--color-primary-light)]/50 transition-all duration-300">
                        <h3 className="text-xl font-medium text-[var(--color-text-primary)] mb-2 flex items-center">
                          <span className="w-6 h-6 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center mr-2 text-sm">
                            2
                          </span>
                          How We Use Your Information
                        </h3>
                        <p className="mb-0">
                          We use the information we collect to provide,
                          maintain, and improve our services, to process your
                          transactions, and to communicate with you.
                        </p>
                      </div>

                      <div className="bg-[var(--color-primary-light)]/30 p-4 rounded-lg hover:bg-[var(--color-primary-light)]/50 transition-all duration-300">
                        <h3 className="text-xl font-medium text-[var(--color-text-primary)] mb-2 flex items-center">
                          <span className="w-6 h-6 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center mr-2 text-sm">
                            3
                          </span>
                          Information Sharing
                        </h3>
                        <p className="mb-0">
                          We do not share your personal information with third
                          parties except as described in this privacy policy.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section
                className={`transition-all duration-500 ${
                  activeSection === "contact"
                    ? "opacity-100 max-h-[2000px]"
                    : "opacity-0 max-h-0 overflow-hidden"
                }`}
              >
                <div className="bg-[var(--color-primary-light)] p-6 md:p-8 rounded-xl shadow-xl border border-[var(--color-accent)]/30">
                  <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-6 flex items-center">
                    <span className="w-10 h-10 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center mr-3">
                      <svg
                        className="w-5 h-5 text-[var(--color-accent)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                    Contact Us
                  </h2>
                  <p className="text-[var(--color-text-secondary)] mb-6">
                    If you have any questions about our Terms and Privacy
                    Policy, please contact us:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-center mb-3">
                        <svg
                          className="w-6 h-6 text-[var(--color-accent)] mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="font-medium text-[var(--color-text-primary)]">
                          Email
                        </span>
                      </div>
                      <p className="text-[var(--color-text-secondary)]">
                        info@fashio.com
                      </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-center mb-3">
                        <svg
                          className="w-6 h-6 text-[var(--color-accent)] mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span className="font-medium text-[var(--color-text-primary)]">
                          Phone
                        </span>
                      </div>
                      <p className="text-[var(--color-text-secondary)]">
                        +234 123 456 7890
                      </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-center mb-3">
                        <svg
                          className="w-6 h-6 text-[var(--color-accent)] mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="font-medium text-[var(--color-text-primary)]">
                          Address
                        </span>
                      </div>
                      <p className="text-[var(--color-text-secondary)]">
                        123 Fashion Street, Lagos, Nigeria
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button className="w-full md:w-auto px-6 py-3 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-light)] transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Send us a message
                    </button>
                  </div>
                </div>
              </section>

              {/* Back to Home */}
              <div className="pt-8 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center text-[var(--color-accent)] hover:text-[var(--color-accent-light)] transition-colors duration-300 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-lg hover:bg-white/10 transform hover:scale-105"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
