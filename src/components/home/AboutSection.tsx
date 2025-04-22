import Image from "next/image";
import { useEffect, useRef } from "react";

interface AboutSectionProps {
  aboutRef: React.RefObject<HTMLDivElement>;
}

const AboutSection = ({ aboutRef }: AboutSectionProps) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add parallax effect to the image
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollPosition = window.scrollY;
        const elementPosition =
          imageRef.current.getBoundingClientRect().top + window.scrollY;
        const distance = scrollPosition - elementPosition;

        if (distance > -window.innerHeight && distance < window.innerHeight) {
          const translateY = distance * 0.1;
          imageRef.current.style.transform = `translateY(${translateY}px)`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={aboutRef}
      className="py-32 px-4 bg-[var(--color-neutral-light)] overflow-hidden"
      id="about"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Animation */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--color-primary)] relative inline-block">
            About FASHIO
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-[var(--color-accent)] transform origin-left scale-x-0 transition-transform duration-700 ease-out animate-on-scroll"></span>
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto">
            Redefining luxury fashion with contemporary design and exceptional
            craftsmanship
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="animate-on-scroll" ref={contentRef}>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[var(--color-primary)]">
                Our Story
              </h3>
              <p className="text-lg mb-6 text-[var(--color-text-secondary)]">
                FASHIO is a premium fashion brand specializing in bespoke men
                wears, suits, accessories, and our signature FASHIO caps.
                Founded with a vision to redefine luxury fashion, we combine
                traditional craftsmanship with contemporary design.
              </p>
              <p className="text-lg mb-6 text-[var(--color-text-secondary)]">
                Our team of expert tailors and designers work tirelessly to
                create pieces that not only look exceptional but feel
                exceptional. Every item is crafted with attention to detail and
                a commitment to quality that sets us apart.
              </p>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-4 my-8">
                <div className="text-center p-4 bg-[var(--color-accent)]/10 rounded-lg">
                  <div className="text-3xl font-bold text-[var(--color-accent)] mb-1">
                    10+
                  </div>
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    Years Experience
                  </div>
                </div>
                <div className="text-center p-4 bg-[var(--color-accent)]/10 rounded-lg">
                  <div className="text-3xl font-bold text-[var(--color-accent)] mb-1">
                    5000+
                  </div>
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    Happy Clients
                  </div>
                </div>
                <div className="text-center p-4 bg-[var(--color-accent)]/10 rounded-lg">
                  <div className="text-3xl font-bold text-[var(--color-accent)] mb-1">
                    100%
                  </div>
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    Satisfaction
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-[var(--color-accent)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--color-primary)] text-center text-lg mb-2">
                  Premium Quality
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] text-center">
                  Finest materials sourced from around the world
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-[var(--color-accent)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    ></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--color-primary)] text-lg mb-2">
                  Customizable
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] text-center">
                  Tailored to your exact measurements and preferences
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-[var(--color-accent)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--color-primary)] text-lg mb-2">
                  Fast Delivery
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] text-center">
                  Quick turnaround without compromising quality
                </p>
              </div>
            </div>
          </div>

          {/* Image Column with Parallax Effect */}
          <div
            className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl animate-on-scroll"
            ref={imageRef}
          >
            <div className="absolute inset-0 z-10">
              <Image
                src="/about-fashion-studio.jpg"
                alt="FASHIO Fashion Studio"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-dark)]/70 to-transparent"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-10 right-10 z-20 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3 border-2 border-[var(--color-accent)]">
                  <Image
                    src="/tailor-profile.jpg"
                    alt="Expert Tailor"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-primary)]">
                    Expert Tailors
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    20+ years experience
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-10 left-10 z-20 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3 border-2 border-[var(--color-accent)]">
                  <Image
                    src="/designer-profile.jpg"
                    alt="Fashion Designer"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-primary)]">
                    Creative Designers
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Award-winning team
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-2 text-[var(--color-primary)]">
                  Our Craftsmanship
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  Every piece tells a story of excellence and dedication.
                </p>
                <button className="mt-4 bg-[var(--color-accent)] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[var(--color-accent-light)] transition-colors">
                  Meet Our Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
