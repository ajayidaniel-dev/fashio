import Image from "next/image";
import { useState, useEffect } from "react";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      role: "Business Executive",
      image: "/client1.jpg",
      quote:
        "The bespoke suit I ordered from FASHIO is absolutely perfect. The attention to detail and quality of materials is outstanding.",
      rating: 5,
      highlight: "Exceptional Quality",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Fashion Blogger",
      image: "/client2.jpg",
      quote:
        "FASHIO's accessories collection is a game-changer. Their FASHIO caps are now a staple in my wardrobe!",
      rating: 5,
      highlight: "Trendsetting",
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Entrepreneur",
      image: "/client3.jpg",
      quote:
        "The quality and craftsmanship of FASHIO's bespoke pieces are unmatched. Highly recommended!",
      rating: 5,
      highlight: "Craftsmanship",
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "Fashion Designer",
      image: "/client4.jpg",
      quote:
        "As a designer myself, I appreciate the attention to detail in every piece. FASHIO's collections are simply stunning!",
      rating: 5,
      highlight: "Attention to Detail",
    },
    {
      id: 5,
      name: "David Chen",
      role: "Tech CEO",
      image: "/client5.jpg",
      quote:
        "The modern aesthetic combined with traditional craftsmanship makes FASHIO stand out. Their pieces are conversation starters!",
      rating: 5,
      highlight: "Modern Aesthetic",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  // Handle manual navigation
  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${
          i < rating
            ? "text-[var(--color-accent)]"
            : "text-[var(--color-neutral)]"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-24 px-4 bg-[var(--color-secondary)] text-[var(--color-text-light)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Animation */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--color-text-light)] relative inline-block">
            Client Testimonials
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-[var(--color-accent)] transform origin-left scale-x-0 transition-transform duration-700 ease-out animate-on-scroll"></span>
          </h2>
          <p className="text-xl text-[var(--color-text-light)] max-w-3xl mx-auto">
            Hear what our valued clients have to say about their FASHIO
            experience
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Main Testimonial Display */}
          <div className="relative h-[500px] md:h-[400px] overflow-hidden rounded-2xl shadow-2xl">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === activeIndex
                    ? "opacity-100 translate-x-0"
                    : index < activeIndex
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
                }`}
              >
                {/* <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/90 to-[var(--color-secondary)]/90 z-10"></div> */}
                <div className=" flex flex-col md:flex-row items-center justify-center p-8 md:p-12">
                  {/* Image Side */}
                  <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[var(--color-accent)] shadow-lg mb-6 md:mb-0 md:mr-8 ">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content Side */}
                  <div className="relative text-center md:text-left max-w-2xl">
                    <div className="flex justify-center md:justify-start mb-2">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-2xl md:text-3xl font-light italic mb-6 text-white">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-[var(--color-accent)] font-medium">
                        {testimonial.role}
                      </p>
                      <span className="inline-block mt-2 px-4 py-1 bg-[var(--color-accent)] text-white text-sm font-bold rounded-full">
                        {testimonial.highlight}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-[var(--color-accent)] w-8"
                    : "bg-[var(--color-primary)]/50 hover:bg-[var(--color-primary)]"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() =>
              goToTestimonial(
                (activeIndex - 1 + testimonials.length) % testimonials.length
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/50 text-white p-2 rounded-full transition-all duration-300 z-30"
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              goToTestimonial((activeIndex + 1) % testimonials.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/50 text-white p-2 rounded-full transition-all duration-300 z-30"
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Testimonial Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-[var(--color-primary)]/70 backdrop-blur-md p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300 animate-on-scroll">
            <div className="text-4xl font-bold text-[var(--color-accent)] mb-2">
              98%
            </div>
            <p className="text-white">Satisfaction Rate</p>
          </div>
          <div
            className="bg-[var(--color-primary)]/70 backdrop-blur-md p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300 animate-on-scroll"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="text-4xl font-bold text-[var(--color-accent)] mb-2">
              500+
            </div>
            <p className="text-white">Happy Clients</p>
          </div>
          <div
            className="bg-[var(--color-primary)]/70 backdrop-blur-md p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300 animate-on-scroll"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="text-4xl font-bold text-[var(--color-accent)] mb-2">
              4.9/5
            </div>
            <p className="text-white">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
