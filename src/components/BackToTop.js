// src/components/BackToTop.js
//
// Floating "back to top" button that appears after the user scrolls down.

import { useState, useEffect } from "react";
import { theme } from "../theme";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 400px
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      style={{
        ...btn,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}

/* ================= STYLES ================= */

const btn = {
  position: "fixed",
  bottom: 90, // above WhatsApp button (which is at bottom: 24)
  right: 24,
  zIndex: 940,
  width: 44,
  height: 44,
  borderRadius: "50%",
  background: theme.colors.dark,
  color: "#fff",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 6px 20px rgba(125,42,60,0.35)",
  transition: "all 0.3s ease",
};