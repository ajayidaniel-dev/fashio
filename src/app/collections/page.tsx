"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { collections } from "@/app/constant";
import { useCurrency } from "@/context/CurrencyContext";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import toast from "react-hot-toast";
// Define a Product type
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
  selectedSize?: string;
  selectedColor?: string;
}

const CollectionsPage = () => {
  const { formatPrice } = useCurrency();
  const [activeCollection, setActiveCollection] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [isVisible, setIsVisible] = useState(false);
  const collectionsRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  // Customer details state
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerWhatsapp, setCustomerWhatsapp] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState("");
  const [showCustomerForm, setShowCustomerForm] = useState(false);

  // Calculate total price in Naira
  const totalPrice = cartItems.reduce((sum, item) => {
    // Extract numeric price value
    const numericPrice = Number(item.price.replace(/[^0-9.]/g, ""));

    // Convert to Naira (assuming prices are in USD, multiply by Naira rate)
    const nairaRate = 1630; // Naira conversion rate from USD
    const priceInNaira = numericPrice * nairaRate;

    return sum + priceInNaira;
  }, 0);

  // console.log(selectedCurrency);
  // WhatsApp number to send messages to (replace with your actual number)
  const whatsappNumber = "+2347030367949"; // Replace with your actual WhatsApp number

  // Function to send product info to WhatsApp

  // Flutterwave Payment
  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "",
    tx_ref: Date.now().toString(),
    amount: 1000, // Use the total price in Naira
    currency: "NGN",
    payment_options:
      "card,mobilemoney,ussd, account, banktransfer, opay, applepay, googlepay",
    customer: {
      email: customerEmail,
      phone_number: customerWhatsapp,
      name: customerName,
    },
    customizations: {
      title: "Fashio",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  // Animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const element = collectionsRef.current;
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

  // Scroll to products section when a collection is selected
  useEffect(() => {
    if (activeCollection && productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeCollection]);

  // Collections data

  // Handle product selection
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize("");
    setSelectedColor("");
    setIsModalOpen(true);
  };

  // Handle collection selection
  const handleCollectionClick = (collectionId: number) => {
    setActiveCollection(collectionId);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (selectedProduct) {
      // Check if the product is already in the cart
      const isAlreadyInCart = cartItems.some(
        (item) => item.id === selectedProduct.id
      );

      if (!isAlreadyInCart) {
        // Add the product with selected size and color
        const productWithSelections = {
          ...selectedProduct,
          selectedSize: selectedSize || undefined,
          selectedColor: selectedColor || undefined,
        };
        setCartItems([...cartItems, productWithSelections]);
        setIsModalOpen(false);
        setIsCartOpen(true);
      } else {
        // If already in cart, just show the cart
        setIsModalOpen(false);
        setIsCartOpen(true);
      }
    }
  };

  // Add a useEffect to handle the add to cart action when selectedProduct changes
  useEffect(() => {
    if (selectedProduct && !isModalOpen) {
      // This will run when a product is selected from the quick action button
      // Only add to cart if it's not already in the cart
      const isAlreadyInCart = cartItems.some(
        (item) => item.id === selectedProduct.id
      );
      if (!isAlreadyInCart) {
        handleAddToCart();
      }
    }
  }, [selectedProduct, isModalOpen]);

  // Filter products based on search and category
  const filteredCollections = collections
    .map((collection) => {
      const filteredProducts = collection.products.filter((product) => {
        // Search filter - check if product title or description contains the search query
        const matchesSearch =
          searchQuery === "" ||
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());

        // Category filter - check if product category matches the selected category
        const matchesCategory =
          filterCategory === "all" ||
          product.category.toLowerCase() === filterCategory.toLowerCase();

        return matchesSearch && matchesCategory;
      });

      // Return the collection with filtered products
      return {
        ...collection,
        products: filteredProducts,
      };
    })
    .filter((collection) => collection.products.length > 0); // Only show collections with products after filtering

  // Get unique categories for filter
  const categories = [
    "all",
    ...new Set(
      collections.flatMap((collection) =>
        collection.products.map((product) => product.category.toLowerCase())
      )
    ),
  ];
  const message = cartItems.map((item) => {
    let itemDetails = `${item.title} - ${item.price} \n`;
    if (item.selectedSize) itemDetails += `Size: ${item.selectedSize} \n`;
    if (item.selectedColor) itemDetails += `Color: ${item.selectedColor}`;
    return itemDetails;
  });
  const handleSubmit = async () => {
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #4f46e5, #7c3aed);
              color: white;
              padding: 20px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .content {
              padding: 20px;
            }
            .field {
              margin-bottom: 15px;
              padding: 10px;
              background-color: #f8f9fa;
              border-radius: 5px;
            }
            .label {
              font-weight: bold;
              color: #4f46e5;
              margin-bottom: 5px;
            }
            .value {
              color: #333;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #666;
              font-size: 0.9em;
              border-top: 1px solid #eee;
            }
            @media (max-width: 600px) {
              .container {
                margin: 10px;
                padding: 10px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Customer Name</div>
                <div class="value">${customerName}</div>
              </div>
              <div class="field">
                <div class="label">Customer Email</div>
                <div class="value">${customerEmail}</div>
              </div>
              <div class="field">
                <div class="label">Whatsapp Number</div>
                <div class="value">${customerWhatsapp}</div>
              </div>
              <div class="field">
                <div class="label">Delivery Details</div>
                <div class="value">${deliveryDetails}</div>
              </div>
              <div class="field">
                <div class="label">Order Details</div>
                <div class="value">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p>This message was sent from your portfolio contact form</p>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      const response = await fetch("https://techxmail.onrender.com/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: customerName,
          mail: `ajayidaniel.dev@gmail.com`,
          subject: `${customerName} just placed an order for`,
          html: htmlTemplate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent successfully");
      setCustomerName("");
      setCustomerEmail("");
      setCustomerWhatsapp("");
      setDeliveryDetails("");
      setCartItems([]);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error("Error sending message");
      console.error("Error sending message:", error);
    }
  };

  return (
    <main className="min-h-screen ">
      <Navbar cartItems={cartItems} onCartClick={() => setIsCartOpen(true)} />

      {/* Collections Hero Section */}
      <section className="relative py-40 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/collections-hero.jpg"
            alt="Fashio Collections"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark)]/90 to-[var(--color-primary-dark)]/70" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[var(--color-text-light)] animate-fade-in">
            Our Collections
          </h1>
          <p
            className="text-xl md:text-2xl text-[var(--color-text-light)]/90 max-w-3xl mx-auto mb-8 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Discover our curated collections of premium fashion pieces
          </p>

          {/* Search and Filter */}
          <div
            className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search collections..."
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div className="relative w-full md:w-64">
              <select
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all duration-300 appearance-none"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-[var(--color-primary-dark)] text-white"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70 pointer-events-none"
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
            </div>
          </div>

          {/* Active Filters Indicator */}
          {(searchQuery !== "" || filterCategory !== "all") && (
            <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in">
              {searchQuery !== "" && (
                <div className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full flex items-center">
                  <span className="mr-2">
                    Search: &ldquo;{searchQuery}&rdquo;
                  </span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-white/70 hover:text-white"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
              {filterCategory !== "all" && (
                <div className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full flex items-center">
                  <span className="mr-2">
                    Category:{" "}
                    {filterCategory.charAt(0).toUpperCase() +
                      filterCategory.slice(1)}
                  </span>
                  <button
                    onClick={() => setFilterCategory("all")}
                    className="text-white/70 hover:text-white"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterCategory("all");
                }}
                className="bg-[var(--color-accent)] text-white px-3 py-1 rounded-full text-sm hover:bg-[var(--color-accent-light)] transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Collections Grid */}
      <div
        ref={collectionsRef}
        className="py-16 px-4 bg-gradient-to-b from-transparent via-[var(--color-neutral)]/10 to-[var(--color-neutral-light)]"
      >
        <div className="max-w-7xl mx-auto">
          {filteredCollections.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
                No collections found
              </h3>
              <p className="text-[var(--color-text-secondary)] mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterCategory("all");
                }}
                className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {filteredCollections.map((collection, index) => (
                <div
                  key={index}
                  className={`relative group perspective-1000 ${
                    isVisible
                      ? "opacity-100 translate-y-0 rotate-0"
                      : "opacity-0 translate-y-10 rotate-3"
                  } transition-all duration-700 ease-out hover:z-10`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    transform: `rotate(${index % 2 === 0 ? "2deg" : "-2deg"})`,
                  }}
                >
                  <div
                    className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 
                      hover:shadow-[0_20px_50px_rgba(var(--color-accent-rgb),0.3)] hover:-translate-y-2 hover:scale-105 
                      ${
                        activeCollection === collection.id
                          ? "ring-4 ring-[var(--color-accent)] scale-105"
                          : ""
                      }
                      before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-[var(--color-accent)]/0 
                      before:to-[var(--color-primary)]/0 before:opacity-0 before:transition-opacity before:duration-300 
                      hover:before:opacity-20 cursor-pointer group/card`}
                    onClick={() => handleCollectionClick(collection.id)}
                  >
                    <div className="relative h-[400px] sm:h-[450px] overflow-hidden">
                      <div className="absolute inset-0 bg-[var(--color-primary)]/10 mix-blend-overlay z-10"></div>
                      <Image
                        src={collection.image}
                        alt={collection.name}
                        fill
                        className="object-cover transition-all duration-700 group-hover/card:scale-110 group-hover/card:rotate-2"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>

                      {/* Collection Badge */}
                      <div
                        className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[var(--color-primary)] px-3 py-1 rounded-full 
                        text-sm font-medium shadow-lg transform -rotate-2"
                      >
                        {collection.products.length} Pieces
                      </div>

                      {/* Fun Badge */}
                      <div
                        className="absolute top-4 right-4 bg-[var(--color-accent)] text-white px-4 py-1.5 rounded-full 
                        transform rotate-2 opacity-0 group-hover/card:opacity-100 transition-all duration-300 delay-100 
                        shadow-lg text-sm font-semibold"
                      >
                        View Collection
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500">
                        <h3
                          className="text-3xl font-bold text-white mb-4 transform group-hover/card:scale-105 transition-transform duration-300 
                          drop-shadow-lg"
                        >
                          {collection.name}
                        </h3>
                        <p
                          className="text-white/90 text-base transform group-hover/card:translate-x-2 transition-transform duration-300 
                          line-clamp-2 mb-6"
                        >
                          {collection.description}
                        </p>

                        {/* Interactive Elements */}
                        <div className="flex items-center gap-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 delay-100">
                          <span
                            className="inline-flex items-center text-[var(--color-accent)] text-sm bg-white/10 backdrop-blur-sm 
                            px-3 py-1 rounded-full"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Featured Collection
                          </span>
                          <span className="text-white/90 text-sm bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                            Starting from{" "}
                            {formatPrice(collection.products[0].price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products Section */}
      {activeCollection && (
        <section
          ref={productsRef}
          className="py-16 mt-16 lg:mt-4 px-4 bg-[var(--color-primary)]/10"
        >
          <div className="max-w-7xl mx-auto">
            {/* Back to Collections Button - Mobile Friendly */}
            <div className="mb-8 flex justify-between items-center">
              <button
                //scroll to top of page
                onClick={() => {
                  setActiveCollection(null);
                  window.scrollTo({ top: 100, behavior: "smooth" });
                }}
                className="flex items-center text-[var(--color-primary)]  hover:text-[var(--color-accent)] transition-colors"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Collections
              </button>
              {/* Collection Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">
                {filteredCollections.find((c) => c.id === activeCollection)
                  ?.name ||
                  collections.find((c) => c.id === activeCollection)?.name}
              </h2>
              <div className="w-5 h-5"></div> {/* Spacer for alignment */}
            </div>

            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mb-8">
              {filteredCollections.find((c) => c.id === activeCollection)
                ?.description ||
                collections.find((c) => c.id === activeCollection)?.description}
            </p>

            {filteredCollections.find((c) => c.id === activeCollection)
              ?.products.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
                  No products found
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilterCategory("all");
                  }}
                  className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {filteredCollections
                  .find((c) => c.id === activeCollection)
                  ?.products.map((product, index) => (
                    <div
                      key={product.id}
                      className={`group/product cursor-pointer ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10"
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => handleProductClick(product)}
                    >
                      <div
                        className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 
                        hover:shadow-2xl relative group-hover/product:ring-2 group-hover/product:ring-[var(--color-accent)]"
                      >
                        <div className="relative h-[500px] overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover transition-all duration-500 group-hover/product:scale-110"
                          />
                          <div
                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent 
                            opacity-0 group-hover/product:opacity-100 transition-opacity duration-300"
                          ></div>

                          {/* Product Badges */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {product.featured && (
                              <span className="bg-[var(--color-accent)] text-white text-xs font-bold px-3 py-1 rounded-full">
                                Featured
                              </span>
                            )}
                            <span className="bg-white/90 backdrop-blur-sm text-[var(--color-primary)] text-xs font-bold px-3 py-1 rounded-full">
                              {product.category}
                            </span>
                          </div>

                          {/* Quick Actions */}
                          <div className="absolute top-4 right-4 ">
                            <button
                              onClick={() => handleProductClick(product)}
                              className="bg-white/90 backdrop-blur-sm text-[var(--color-primary)] p-2 rounded-full 
                                hover:bg-[var(--color-accent)] hover:text-white transition-colors duration-300 block"
                              title="Buy Now"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                              </svg>
                            </button>
                          </div>

                          <div
                            className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 
                            group-hover/product:translate-y-0 transition-transform duration-300"
                          >
                            <h3 className="text-xl font-bold text-white mb-2">
                              {product.title}
                            </h3>
                            <p className="text-white/90 text-sm line-clamp-2 mb-3">
                              {product.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <p className="text-[var(--color-accent)] font-bold text-lg">
                                {formatPrice(product.price)}
                              </p>
                              {product.inStock ? (
                                <span className="text-green-400 text-sm bg-green-400/10 px-2 py-1 rounded-full">
                                  In Stock
                                </span>
                              ) : (
                                <span className="text-red-400 text-sm bg-red-400/10 px-2 py-1 rounded-full">
                                  Out of Stock
                                </span>
                              )}
                            </div>

                            {/* Available Sizes/Colors Preview */}
                            {(product.sizes || product.colors) && (
                              <div className="flex gap-4 mt-3">
                                {product.sizes && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-white/60 text-xs">
                                      Sizes:
                                    </span>
                                    <div className="flex gap-1">
                                      {product.sizes.slice(0, 3).map((size) => (
                                        <span
                                          key={size}
                                          className="text-white text-xs bg-white/10 px-1.5 py-0.5 rounded"
                                        >
                                          {size}
                                        </span>
                                      ))}
                                      {product.sizes.length > 3 && (
                                        <span className="text-white text-xs bg-white/10 px-1.5 py-0.5 rounded">
                                          +{product.sizes.length - 3}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}
                                {product.colors && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-white/60 text-xs">
                                      Colors:
                                    </span>
                                    <div className="flex gap-1">
                                      {product.colors
                                        .slice(0, 3)
                                        .map((color) => (
                                          <span
                                            key={color}
                                            className="text-white text-xs bg-white/10 px-1.5 py-0.5 rounded"
                                          >
                                            {color}
                                          </span>
                                        ))}
                                      {product.colors.length > 3 && (
                                        <span className="text-white text-xs bg-white/10 px-1.5 py-0.5 rounded">
                                          +{product.colors.length - 3}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Product Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-[var(--color-primary)]">
                  {selectedProduct.title}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-96">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>

                <div>
                  <p className="text-gray-600 mb-4">
                    {selectedProduct.description}
                  </p>
                  <p className="text-2xl font-bold text-[var(--color-primary)] mb-6">
                    {formatPrice(selectedProduct.price)}
                  </p>

                  {selectedProduct.sizes && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">Select Size</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map((size) => (
                          <button
                            key={size}
                            className={`px-4 py-2 rounded-full border ${
                              selectedSize === size
                                ? "bg-[var(--color-primary)] text-white"
                                : "hover:bg-[var(--color-neutral-light)]"
                            }`}
                            onClick={() => setSelectedSize(size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProduct.colors && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">Select Color</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.colors.map((color) => (
                          <button
                            key={color}
                            className={`px-4 py-2 rounded-full border ${
                              selectedColor === color
                                ? "bg-[var(--color-primary)] text-white"
                                : "hover:bg-[var(--color-neutral-light)]"
                            }`}
                            onClick={() => setSelectedColor(color)}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      disabled={!selectedSize || !selectedColor}
                      onClick={handleAddToCart}
                      className="flex-1 bg-[var(--color-secondary)] text-white py-3 rounded-full hover:bg-[var(--color-secondary-dark)] transition-colors duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-xl transform transition-transform duration-300">
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[var(--color-primary)]">
                  Your Cart
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-[var(--color-primary)]"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <svg
                    className="w-16 h-16 text-gray-300 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-[var(--color-text-secondary)] mb-6">
                    Add some items to your cart
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto">
                    {cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-4 mb-6 pb-6 border-b border-gray-200"
                      >
                        <div className="relative w-20 h-20 rounded-md overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[var(--color-primary)]">
                            {item.title}
                          </h3>
                          <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                            {formatPrice(item.price)}
                          </p>
                          {(item.selectedSize || item.selectedColor) && (
                            <div className="text-sm text-[var(--color-text-secondary)] mb-2">
                              {item.selectedSize && (
                                <span>Size: {item.selectedSize}</span>
                              )}
                              {item.selectedSize && item.selectedColor && (
                                <span> • </span>
                              )}
                              {item.selectedColor && (
                                <span>Color: {item.selectedColor}</span>
                              )}
                            </div>
                          )}
                          <div className="flex justify-between items-center">
                            <button
                              onClick={() => {
                                const newCartItems = [...cartItems];
                                newCartItems.splice(index, 1);
                                setCartItems(newCartItems);
                              }}
                              className="text-sm text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold text-[var(--color-primary)]">
                        Total in Naira: ₦
                        {totalPrice.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      <span className="font-bold text-[var(--color-primary)]">
                        {cartItems.length}{" "}
                        {cartItems.length === 1 ? "item" : "items"}
                      </span>
                    </div>
                    <div className="flex flex-col justify-between items-center gap-4 w-full">
                      <button
                        onClick={() => {
                          setShowCustomerForm(true);
                        }}
                        className="w-full  bg-[var(--color-accent)] text-white py-3 rounded-lg font-medium hover:bg-[var(--color-accent-light)] transition-colors"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Customer Details Form Modal */}
      {showCustomerForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[var(--color-primary)]">
                Customer Details
              </h3>
              <button
                onClick={() => setShowCustomerForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder:text-[var(--color-text-secondary)] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder:text-[var(--color-text-secondary)] placeholder:text-sm  focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={customerWhatsapp}
                  onChange={(e) => setCustomerWhatsapp(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder:text-[var(--color-text-secondary)] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  placeholder="Enter your WhatsApp number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Details
                </label>
                <textarea
                  value={deliveryDetails}
                  onChange={(e) => setDeliveryDetails(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder:text-[var(--color-text-secondary)] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  placeholder="Enter your delivery address and any special instructions"
                  rows={3}
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    // Validate form
                    if (
                      !customerName ||
                      !customerEmail ||
                      !customerWhatsapp ||
                      !deliveryDetails
                    ) {
                      toast.error("Please fill in all fields");
                      return;
                    }

                    // Send all items to WhatsApp with customer details
                    const message = cartItems
                      .map((item) => {
                        let itemDetails = `${item.title} - ${item.price}`;
                        if (item.selectedSize)
                          itemDetails += `\nSize: ${item.selectedSize}`;
                        if (item.selectedColor)
                          itemDetails += `\nColor: ${item.selectedColor}`;
                        return itemDetails;
                      })
                      .join("%0A%0A");

                    const customerInfo = `%0A%0ACustomer Details:%0A%0AName: ${customerName}%0AEmail: ${customerEmail}%0AWhatsApp: ${customerWhatsapp}%0A%0ADelivery Details:%0A${deliveryDetails}%0A%0ATotal in Naira: ₦${totalPrice.toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}`;

                    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=I'm interested in the following items:%0A%0A${message}${customerInfo}`;
                    window.open(whatsappUrl, "_blank");
                    setShowCustomerForm(false);
                    setIsCartOpen(false);
                  }}
                  className="w-full border-2 border-[var(--color-accent)] text-[var(--color-accent)] py-3 rounded-lg font-medium hover:border-[var(--color-accent-light)] transition-colors"
                >
                  Send to WhatsApp
                </button>

                <button
                  onClick={() => {
                    if (
                      !customerName ||
                      !customerEmail ||
                      !customerWhatsapp ||
                      !deliveryDetails
                    ) {
                      toast.error("Please fill in all fields");
                      return;
                    }

                    handleFlutterPayment({
                      callback: (response) => {
                        console.log(response);
                        if (
                          response.status === "successful" ||
                          response.status === "completed"
                        ) {
                          toast.success("Payment successful");

                          handleSubmit();
                        } else {
                          toast.error("Payment failed");
                        }
                        closePaymentModal(); // this will close the modal programmatically
                      },
                      onClose: () => {
                        toast.error("Payment closed");
                      },
                    });
                  }}
                  className="w-full bg-[var(--color-accent)] mt-6 text-white py-3 rounded-lg font-medium hover:bg-[var(--color-accent-light)] transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
};

export default CollectionsPage;
