"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface NavbarProps {
  cartItems?: Product[];
  onCartClick?: () => void;
}

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  price: string;
  featured: boolean;
  type: string;
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
}

const Navbar = ({ cartItems = [], onCartClick }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCartBouncing, setIsCartBouncing] = useState(false);
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add bounce animation when cart items change
  useEffect(() => {
    if (cartItems.length > 0) {
      setIsCartBouncing(true);
      const timer = setTimeout(() => setIsCartBouncing(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [cartItems.length]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-primary-dark)]/95 backdrop-blur-md shadow-lg py-6"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-3xl font-bold text-[var(--color-text-light)] hover:text-[var(--color-accent)] transition-all duration-300 transform hover:scale-105"
            >
              FASHIO
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/collections"
              className="text-[var(--color-text-light)] hover:text-[var(--color-accent)] transition-all duration-300 relative group"
            >
              Collections
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              href="/about"
              className="text-[var(--color-text-light)] hover:text-[var(--color-accent)] transition-all duration-300 relative group"
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/contact"
              className="text-[var(--color-text-light)] hover:text-[var(--color-accent)] transition-all duration-300 relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/shop"
              className="px-6 py-2 bg-[var(--color-accent)] text-white rounded-full font-medium hover:bg-[var(--color-accent-light)] transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Buy Now
            </Link>
            {/* Cart Icon */}
            <button
              onClick={onCartClick}
              className="relative group"
              aria-label="Shopping Cart"
            >
              <div
                className={`transform transition-transform duration-300 ${
                  isCartBouncing ? "animate-bounce" : "hover:scale-110"
                }`}
              >
                <svg
                  className="w-6 h-6 text-[var(--color-text-light)] group-hover:text-[var(--color-accent)] transition-colors duration-300"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform scale-100 transition-transform duration-300">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </button>
          </div>

          {/* Mobile menu button and cart icon */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile Cart Icon */}
            <button
              onClick={onCartClick}
              className="relative group"
              aria-label="Shopping Cart"
            >
              <div
                className={`transform transition-transform duration-300 ${
                  isCartBouncing ? "animate-bounce" : "hover:scale-110"
                }`}
              >
                <svg
                  className="w-6 h-6 text-[var(--color-text-light)] group-hover:text-[var(--color-accent)] transition-colors duration-300"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[var(--color-text-light)] hover:text-[var(--color-accent)] focus:outline-none transition-all duration-300"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[var(--color-primary-dark)]/95 backdrop-blur-md shadow-lg transform transition-all duration-300 ease-in-out">
            <div className="px-4 py-3 space-y-3">
              <Link
                href="/collections"
                className="block px-3 py-2 text-[var(--color-text-light)] hover:text-[var(--color-accent)] transition-all duration-300 hover:bg-[var(--color-primary)]/30 rounded-md"
              >
                Collections
              </Link>

              <Link
                href="/about"
                className="block px-3 py-2 text-[var(--color-text-light)] hover:text-[var(--color-accent)] transition-all duration-300 hover:bg-[var(--color-primary)]/30 rounded-md"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-[var(--color-text-light)] hover:text-[var(--color-accent)] transition-all duration-300 hover:bg-[var(--color-primary)]/30 rounded-md"
              >
                Contact
              </Link>
              <Link
                href="/shop"
                className="block px-3 py-2 mt-4 text-center bg-[var(--color-accent)] text-white rounded-md font-medium hover:bg-[var(--color-accent-light)] transition-all duration-300"
              >
                Buy Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
