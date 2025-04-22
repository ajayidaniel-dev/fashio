"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface CurrencyOption {
  code: string;
  symbol: string;
  name: string;
  rate: number;
}

interface CurrencyContextType {
  currency: CurrencyOption;
  formatPrice: (price: string) => string;
}

const currencies: CurrencyOption[] = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", rate: 1630 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79 },
];

const CurrencyContext = createContext<CurrencyContextType>({
  currency: currencies[0],
  formatPrice: (price: string) => price,
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currency, setCurrency] = useState<CurrencyOption>(currencies[0]);

  // Load currency from localStorage after mount
  useEffect(() => {
    const storedCurrency = localStorage.getItem("selectedCurrency");
    if (storedCurrency) {
      const parsed = JSON.parse(storedCurrency);
      const validCurrency = currencies.find((c) => c.code === parsed.code);
      if (validCurrency) {
        setCurrency(validCurrency);
      }
    }
  }, []);

  useEffect(() => {
    const handleCurrencyChange = (event: CustomEvent<CurrencyOption>) => {
      setCurrency(event.detail);
      localStorage.setItem("selectedCurrency", JSON.stringify(event.detail));
    };

    window.addEventListener(
      "currencyChange",
      handleCurrencyChange as EventListener
    );
    return () =>
      window.removeEventListener(
        "currencyChange",
        handleCurrencyChange as EventListener
      );
  }, []);

  const formatPrice = (price: string): string => {
    // Remove currency symbol and convert to number
    const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));

    // Convert price based on currency rate
    const convertedPrice = numericPrice * currency.rate;

    // Format the price with the appropriate currency symbol and decimal places
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(convertedPrice);
  };

  return (
    <CurrencyContext.Provider value={{ currency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};
