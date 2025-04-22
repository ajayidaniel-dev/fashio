import Link from "next/link";
import { useState, useEffect } from "react";

// Currency configuration
interface CurrencyOption {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Rate relative to USD
}

const currencies: CurrencyOption[] = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", rate: 1630 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79 },
];

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption>(
    currencies[0]
  );

  // Load currency from localStorage after mount
  useEffect(() => {
    const stored = localStorage.getItem("selectedCurrency");
    if (stored) {
      const parsed = JSON.parse(stored);
      const validCurrency = currencies.find((c) => c.code === parsed.code);
      if (validCurrency) {
        setSelectedCurrency(validCurrency);
      }
    }
  }, []);

  // Animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("footer-section");
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.9;
        setIsVisible(isInView);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close currency dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById("currency-dropdown");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setIsCurrencyOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle currency change
  const handleCurrencyChange = (currency: CurrencyOption) => {
    setSelectedCurrency(currency);
    setIsCurrencyOpen(false);
    // Dispatch a custom event to notify other components about the currency change
    const event = new CustomEvent("currencyChange", { detail: currency });
    window.dispatchEvent(event);
  };

  return (
    <footer
      id="footer-section"
      className="bg-[var(--color-primary-dark)] text-[var(--color-text-light)] relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div
            className={`space-y-4 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-3xl font-bold text-[var(--color-accent)] relative inline-block">
              FASHIO
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-[var(--color-accent)] transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
            </h3>
            <p className="text-[var(--color-text-light)]/80">
              Crafting bespoke fashion pieces that define your unique style.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-[var(--color-text-light)]/80 hover:text-[var(--color-accent)] transition-all duration-300 transform hover:scale-110"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-[var(--color-text-light)]/80 hover:text-[var(--color-accent)] transition-all duration-300 transform hover:scale-110"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-[var(--color-text-light)]/80 hover:text-[var(--color-accent)] transition-all duration-300 transform hover:scale-110"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
            </div>

            {/* Currency Selector */}
            <div className="relative mt-4" id="currency-dropdown">
              <button
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                className="flex items-center space-x-2 bg-[var(--color-primary)] px-4 py-2 rounded-lg hover:bg-[var(--color-primary-light)] transition-all duration-300"
              >
                <span className="text-[var(--color-text-light)]/80">
                  {selectedCurrency.symbol} {selectedCurrency.code}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isCurrencyOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Currency Dropdown */}
              {isCurrencyOpen && (
                <div className="absolute bottom-full mb-2 left-0 w-48 bg-[var(--color-primary)] rounded-lg shadow-xl overflow-hidden transform origin-bottom scale-y-100 transition-all duration-300">
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => handleCurrencyChange(currency)}
                      className={`w-full px-4 py-3 text-left hover:bg-[var(--color-primary-light)] transition-colors duration-300 flex items-center justify-between group ${
                        selectedCurrency.code === currency.code
                          ? "bg-[var(--color-primary-light)]"
                          : ""
                      }`}
                    >
                      <span className="flex items-center space-x-2">
                        <span className="text-[var(--color-accent)]">
                          {currency.symbol}
                        </span>
                        <span className="text-[var(--color-text-light)]/80">
                          {currency.code}
                        </span>
                      </span>
                      {selectedCurrency.code === currency.code && (
                        <svg
                          className="w-4 h-4 text-[var(--color-accent)]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-xl font-semibold mb-6 text-[var(--color-accent)] relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-[var(--color-accent)] transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/collections"
                  className="text-[var(--color-text-light)]/80 hover:text-[var(--color-accent)] transition-all duration-300 flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-[var(--color-accent)] mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Collections
                </Link>
              </li>

              <li>
                <Link
                  href="/accessories"
                  className="text-[var(--color-text-light)]/80 hover:text-[var(--color-accent)] transition-all duration-300 flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-[var(--color-accent)] mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[var(--color-text-light)]/80 hover:text-[var(--color-accent)] transition-all duration-300 flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-[var(--color-accent)] mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[var(--color-text-light)]/80 hover:text-[var(--color-accent)] transition-all duration-300 flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-[var(--color-accent)] mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Terms & Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-[var(--color-text-light)]/80 hover:text-[var(--color-accent)] transition-all duration-300 flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-[var(--color-accent)] mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-xl font-semibold mb-6 text-[var(--color-accent)] relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-[var(--color-accent)] transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
            </h3>
            <ul className="space-y-3 text-[var(--color-text-light)]/80">
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-[var(--color-accent)] mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span>123 Fashion Street, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-[var(--color-accent)] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                <span>+234 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 text-[var(--color-accent)] mr-2"
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
                <span>info@fashio.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-xl font-semibold mb-6 text-[var(--color-accent)] relative inline-block">
              Newsletter
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-[var(--color-accent)] transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
            </h3>
            <p className="text-[var(--color-text-light)]/80 mb-4">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-[var(--color-primary)] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-[var(--color-accent)]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-[var(--color-accent)] text-white rounded-md hover:bg-[var(--color-accent-light)] transition-all duration-300 font-semibold transform hover:scale-105 hover:shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div
          className={`mt-12 pt-8 border-t border-[var(--color-primary)] text-center text-[var(--color-text-light)]/70 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p>&copy; {new Date().getFullYear()} FASHIO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
