import React, { useState, useEffect } from "react";

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize state based on localStorage or default to false
    return localStorage.getItem("dark-mode") === "true";
  });

  // Update body class and localStorage whenever `isDarkMode` changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "12px 24px",
        fontSize: "1.2em",
        backgroundColor: isDarkMode ? "#E0E0E0" : "#2C2C2C",
        color: isDarkMode ? "#000" : "#FFF",
        border: "none",
        borderRadius: "30px",
        cursor: "pointer",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
        transition: "background-color 0.3s ease, transform 0.2s ease",
        zIndex: 1000,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
      aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default DarkModeToggle;
