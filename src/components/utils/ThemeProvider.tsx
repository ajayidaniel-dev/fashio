import React from "react";
import { Toaster } from "react-hot-toast";

const ThemeProvider = () => {
  // const { theme } = useUser();
  // const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // const getThemeBasedImage = () => {
  //   if (theme === "dark") {
  //     return "dark";
  //   } else if (theme === "light") {
  //     return "light";
  //   } else if (theme === "system") {
  //     return darkQuery.matches ? "dark" : "light";
  //   }
  //   return "dark"; // fallback in case of an unexpected value
  // };

  return (
    <Toaster
      position="top-right"
      gutter={4}
      toastOptions={{
        duration: 2000,
        success: {
          iconTheme: {
            primary: "#095913",
            secondary: "#ffffff",
          },
          style: {
            color: "#095913",
            backgroundColor: "#DAF1DD",
            fontSize: "14px",
            fontWeight: "600",
            border: "1px solid #AED6B4", // Set border width, style, and color
            borderRadius: "8px", // Rounded corners
          },
        },
        error: {
          iconTheme: {
            primary: "#911D1D",
            secondary: "#ffffff",
          },
          style: {
            color: "#911D1D",
            backgroundColor: "#FDE8E8",
            fontSize: "14px",
            fontWeight: "600",
            border: "1px solid #F2B8B8",
            borderRadius: "8px", // Rounded corners
          },
        },
      }}
    />
  );
};

export default ThemeProvider;
