"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px]">
        <Image
          src="/images/about-hero.jpg"
          alt="About FASHIO"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeIn">
              About FASHIO
            </h1>
            <p className="text-xl md:text-2xl animate-fadeIn animation-delay-200">
              Crafting Style, Building Community
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24 animate-fadeIn">
            <div className="relative h-[600px] rounded-xl overflow-hidden shadow-2xl group">
              <Image
                src="/bespoke.jpg"
                alt="Fashion Design Process"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[var(--color-primary)]">
                Our Story
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed">
                Born from a passion for sustainable fashion and innovative
                design, FASHIO has been at the forefront of the fashion
                revolution since 2020. We believe that style should be both
                beautiful and responsible.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center p-6 bg-[var(--color-background-alt)] rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-[var(--color-accent)]/10">
                  <h3 className="text-3xl font-bold text-[var(--color-primary)] mb-2">
                    10K+
                  </h3>
                  <p className="text-[var(--color-text-secondary)]">
                    Happy Customers
                  </p>
                </div>
                <div className="text-center p-6 bg-[var(--color-background-alt)] rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-[var(--color-accent)]/10">
                  <h3 className="text-3xl font-bold text-[var(--color-primary)] mb-2">
                    500+
                  </h3>
                  <p className="text-[var(--color-text-secondary)]">
                    Unique Designs
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 animate-fadeIn animation-delay-200">
            <div className="p-8 bg-gray-100 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-[var(--color-accent)]/20 group">
              <div className="w-16 h-16 bg-[var(--color-accent)]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[var(--color-accent)]/20 transition-colors duration-300">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--color-primary)]">
                Creative Design
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                Our team of expert designers creates unique pieces that blend
                contemporary trends with timeless elegance.
              </p>
            </div>
            <div className="p-8 bg-gray-100 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-[var(--color-accent)]/20 group">
              <div className="w-16 h-16 bg-[var(--color-accent)]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[var(--color-accent)]/20 transition-colors duration-300">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--color-primary)]">
                Sustainable Fashion
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                We&apos;re committed to eco-friendly practices, from sourcing
                materials to packaging and shipping.
              </p>
            </div>
            <div className="p-8 bg-gray-100 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-[var(--color-accent)]/20 group">
              <div className="w-16 h-16 bg-[var(--color-accent)]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[var(--color-accent)]/20 transition-colors duration-300">
                <span className="text-3xl">💫</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--color-primary)]">
                Quality Craftsmanship
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                Each piece is crafted with attention to detail and premium
                materials for lasting quality.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action Section */}
      <section className="py-24 px-4 bg-[var(--color-secondary)]/10 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-block mb-6 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-[var(--color-primary)] font-medium animate-fadeIn">
            Join Our Community
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 animate-fadeIn animation-delay-200 text-[var(--color-primary)]">
            Ready to Transform Your Style?
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed animate-fadeIn animation-delay-300">
            Be part of a community that values style, sustainability, and
            innovation. Experience fashion that makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn animation-delay-400">
            <button
              onClick={() => router.push("/collections")}
              className="px-10 py-4 bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-primary)]/90 transition-all duration-300 hover:shadow-lg hover:scale-105 text-lg font-medium group"
            >
              <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
                Shop Now
              </span>
            </button>
          </div>
          <div className="mt-12 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 animate-fadeIn animation-delay-500">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mr-5 md:mr-3">
                <svg
                  className="w-6 h-6 text-[var(--color-primary)]"
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
              </div>
              <span className="text-[var(--color-text-secondary)]">
                Free Shipping
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mr-3">
                <svg
                  className="w-6 h-6 text-[var(--color-primary)]"
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
              </div>
              <span className="text-[var(--color-text-secondary)]">
                30-Day Returns
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mr-3">
                <svg
                  className="w-6 h-6 text-[var(--color-primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
              </div>
              <span className="text-[var(--color-text-secondary)]">
                Secure Payment
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 bg-[var(--color-background-alt)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-[var(--color-primary)] font-medium animate-fadeIn">
              Meet Our Experts
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] animate-fadeIn animation-delay-200">
              Our Team
            </h2>
            <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto animate-fadeIn animation-delay-300">
              The creative minds behind our innovative designs and sustainable
              practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & Creative Director",
                image: "/images/team-1.jpg",
                bio: "With over 15 years in fashion, Sarah brings her passion for sustainable design to every collection.",
              },
              {
                name: "Michael Chen",
                role: "Head of Design",
                image: "/images/team-2.jpg",
                bio: "Michael's innovative approach combines traditional techniques with cutting-edge technology.",
              },
              {
                name: "Emma Rodriguez",
                role: "Sustainability Manager",
                image: "/images/team-3.jpg",
                bio: "Emma ensures our commitment to eco-friendly practices throughout our supply chain.",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="group animate-fadeIn"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-[var(--color-background)] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[var(--color-primary)]/10">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:opacity-0"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-bold mb-2 text-[var(--color-primary)] group-hover:text-[var(--color-primary)]/90 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-[var(--color-primary)]/80 font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-[var(--color-text-secondary)] hidden md:block text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-40 md:opacity-0 md:max-h-0 md:group-hover:max-h-40">
                      {member.bio}
                    </p>
                    <div className="mt-4 hidden md:flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:opacity-0">
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center hover:bg-[var(--color-primary)]/20 transition-colors duration-300"
                      >
                        <svg
                          className="w-5 h-5 text-[var(--color-primary)]"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center hover:bg-[var(--color-primary)]/20 transition-colors duration-300"
                      >
                        <svg
                          className="w-5 h-5 text-[var(--color-primary)]"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center hover:bg-[var(--color-primary)]/20 transition-colors duration-300"
                      >
                        <svg
                          className="w-5 h-5 text-[var(--color-primary)]"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                        </svg>
                      </a>
                    </div>

                    {/* Mobile-only bio and social links */}
                    <div className="md:hidden ">
                      <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-4">
                        {member.bio}
                      </p>
                      <div className="flex justify-center space-x-4">
                        <a
                          href="#"
                          className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center hover:bg-[var(--color-primary)]/20 transition-colors duration-300"
                        >
                          <svg
                            className="w-5 h-5 text-[var(--color-primary)]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center hover:bg-[var(--color-primary)]/20 transition-colors duration-300"
                        >
                          <svg
                            className="w-5 h-5 text-[var(--color-primary)]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center hover:bg-[var(--color-primary)]/20 transition-colors duration-300"
                        >
                          <svg
                            className="w-5 h-5 text-[var(--color-primary)]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4 bg-[var(--color-primary)]/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[var(--color-primary)]">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Quality",
                description:
                  "We never compromise on the quality of our products, ensuring each piece meets our high standards.",
                icon: "✨",
              },
              {
                title: "Sustainability",
                description:
                  "We are committed to sustainable practices, from sourcing materials to packaging.",
                icon: "🌱",
              },
              {
                title: "Community",
                description:
                  "We believe in building a strong community of fashion enthusiasts and supporting local artisans.",
                icon: "🤝",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-xl bg-[var(--color-background-alt)] animate-fadeIn hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-[var(--color-accent)]/50 group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--color-primary)]">
                  {value.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
