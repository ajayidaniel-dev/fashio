import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/context/CurrencyContext";
import ThemeProvider from "@/components/utils/ThemeProvider";
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fashio - Premium Fashion Design",
  description: "Discover our curated collections of premium fashion pieces",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sora.variable}  antialiased`}>
        <ThemeProvider />
        <CurrencyProvider>{children}</CurrencyProvider>
      </body>
    </html>
  );
}
