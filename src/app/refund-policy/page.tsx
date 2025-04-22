"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <Navbar />

      <div className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[var(--color-primary)] animate-fadeIn">
            Refund Policy
          </h1>

          <div className="prose prose-lg max-w-none text-[var(--color-text-secondary)]">
            <p className="mb-6 animate-fadeIn animation-delay-200">
              At FASHIO, we strive to ensure your complete satisfaction with
              every purchase. This Refund Policy outlines our procedures for
              returns, exchanges, and refunds.
            </p>

            <section className="mb-12 animate-fadeIn animation-delay-300">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[var(--color-primary)]">
                Returns & Exchanges
              </h2>
              <p className="mb-4">
                We accept returns and exchanges within 30 days of the delivery
                date. Items must be unworn, unwashed, and in their original
                condition with all tags attached.
              </p>
              <p className="mb-4">
                To initiate a return or exchange, please contact our customer
                service team at{" "}
                <a
                  href="mailto:returns@fashio.com"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  returns@fashio.com
                </a>{" "}
                with your order number and reason for return.
              </p>
              <p>
                Once your return is approved, you will receive a return
                authorization number and instructions for shipping your item
                back to us.
              </p>
            </section>

            <section className="mb-12 animate-fadeIn animation-delay-400">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[var(--color-primary)]">
                Refund Process
              </h2>
              <p className="mb-4">
                Upon receiving and inspecting your returned item, we will notify
                you of the approval or rejection of your refund.
              </p>
              <p className="mb-4">
                If approved, your refund will be processed and a credit will
                automatically be applied to your original method of payment
                within 5-10 business days. Please note that depending on your
                credit card company, it may take an additional 2-10 business
                days after your credit is applied for it to post to your
                account.
              </p>
              <p>
                If your refund is rejected, we will notify you with the reason
                for rejection and provide options for resolution.
              </p>
            </section>

            <section className="mb-12 animate-fadeIn animation-delay-500">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[var(--color-primary)]">
                Shipping Costs
              </h2>
              <p className="mb-4">
                Customers are responsible for return shipping costs unless the
                return is due to our error (you received an incorrect or
                defective item). In such cases, we will provide a prepaid
                shipping label.
              </p>
              <p>
                We recommend using a trackable shipping service and purchasing
                shipping insurance for your return. We cannot guarantee that we
                will receive your returned item.
              </p>
            </section>

            <section className="mb-12 animate-fadeIn animation-delay-600">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[var(--color-primary)]">
                Exceptions
              </h2>
              <p className="mb-4">
                The following items are not eligible for return or exchange:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  Items marked as &quot;Final Sale&quot; or
                  &quot;Non-Returnable&quot;
                </li>
                <li>Personalized or customized items</li>
                <li>Items damaged due to customer misuse</li>
                <li>Items without original tags or packaging</li>
              </ul>
              <p>
                For hygiene reasons, we cannot accept returns of certain items
                such as underwear, swimwear, and beauty products unless they are
                unopened and in their original packaging.
              </p>
            </section>

            <section className="mb-12 animate-fadeIn animation-delay-700">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[var(--color-primary)]">
                International Returns
              </h2>
              <p className="mb-4">
                International customers are responsible for all customs duties,
                import taxes, and return shipping costs. These charges are not
                refundable.
              </p>
              <p>
                Please ensure that your return package is clearly marked as a
                return to avoid any customs issues. We recommend including a
                copy of your return authorization email inside the package.
              </p>
            </section>

            <section className="mb-12 animate-fadeIn animation-delay-800">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[var(--color-primary)]">
                Contact Information
              </h2>
              <p className="mb-4">
                If you have any questions about our Refund Policy, please
                contact us at:
              </p>
              <ul className="list-none space-y-2">
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:returns@fashio.com"
                    className="text-[var(--color-primary)] hover:underline"
                  >
                    returns@fashio.com
                  </a>
                </li>
                <li>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </li>
                <li>
                  <strong>Address:</strong> 123 Fashion Street, Style City, SC
                  12345
                </li>
              </ul>
            </section>

            <div className="mt-12 text-center animate-fadeIn animation-delay-900">
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-primary)]/90 transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
