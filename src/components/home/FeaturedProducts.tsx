import Image from "next/image";
import Link from "next/link";

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
}

const FeaturedProducts = () => {
  // WhatsApp number to send messages to (replace with your actual number)
  const whatsappNumber = "+2347030367949"; // Replace with your actual WhatsApp number

  // Function to send product info to WhatsApp
  const sendToWhatsApp = (product: Product) => {
    const message = `I'm interested in: ${product.title}%0A%0APrice: ${product.price}%0A%0AProduct Link: ${window.location.origin}/product/${product.id}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const products: Product[] = [
    {
      id: 1,
      title: "Bespoke Suits",
      description: "Tailored to perfection for the modern gentleman",
      image: "/bespoke-suits.jpg",
      category: "Suits",
      price: "From $299",
      featured: true,
      type: "collection",
    },
    {
      id: 2,
      title: "FASHIO Signature Caps",
      description: "Our iconic collection of premium headwear",
      image: "/cap.jpg",
      category: "Accessories",
      price: "From $49",
      featured: true,
      type: "retail",
    },
    {
      id: 3,
      title: "Men's Native Attire",
      description: "Elegant traditional wear with contemporary flair",
      image: "/native.jpg",
      category: "Traditional",
      price: "From $199",
      featured: true,
      type: "collection",
    },
    {
      id: 4,
      title: "Luxury Accessories",
      description: "Complete your look with our premium accessories",
      image: "/accessories.jpg",
      category: "Accessories",
      price: "From $79",
      featured: true,
      type: "retail",
    },
    {
      id: 5,
      title: "Casual Collection",
      description: "Effortlessly stylish everyday wear",
      image: "/casual-collection.jpg",
      category: "Casual",
      price: "From $89",
      featured: false,
      type: "collection",
    },
    {
      id: 6,
      title: "Evening Wear",
      description: "Sophisticated pieces for special occasions",
      image: "/evening-wear.jpg",
      category: "Formal",
      price: "From $249",
      featured: false,
      type: "collection",
    },
  ];

  const featuredProducts = products.filter((product) => product.featured);
  const additionalProducts = products.filter((product) => !product.featured);

  return (
    <section className="py-24 px-4 bg-[var(--color-neutral)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Animation */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--color-primary)] relative inline-block">
            Featured Collections
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-[var(--color-accent)] transform origin-left scale-x-0 transition-transform duration-700 ease-out animate-on-scroll"></span>
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto">
            Discover our most popular styles and trending pieces
          </p>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4 bg-[var(--color-accent)] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-[var(--color-primary)] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                    {product.type}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-[var(--color-primary)] font-bold px-3 py-1 rounded-full transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                    {product.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] mb-4">
                    {product.description}
                  </p>
                  <button
                    onClick={() => sendToWhatsApp(product)}
                    className="w-full bg-[var(--color-primary)] text-white py-2 rounded-lg font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Collections Preview */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[var(--color-primary)]">
            More Collections
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additionalProducts.map((product, index) => (
              <div
                key={product.id}
                className="group animate-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4 bg-[var(--color-accent)] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {product.category}
                    </div>
                    <div className="absolute top-4 right-4 bg-[var(--color-primary)] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                      {product.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] mb-4">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[var(--color-primary)]">
                        {product.price}
                      </span>
                      <button
                        onClick={() => sendToWhatsApp(product)}
                        className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Collections Button */}
        <div className="text-center animate-on-scroll">
          <Link href="/collections">
            <button className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-[var(--color-accent-light)] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              View All Collections
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
