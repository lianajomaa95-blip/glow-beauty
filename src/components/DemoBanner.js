// src/components/DemoBanner.js
//
// Subtle banner at the top of the site indicating this is a portfolio
// demo project. Users can dismiss it, and the dismissal is remembered.

import { useState, useEffect } from "react";

export default function DemoBanner() {
  const [visible, setVisible] = useState(false);

  // Check localStorage to see if user dismissed it before
  useEffect(() => {
    const dismissed = localStorage.getItem("demo_banner_dismissed");
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("demo_banner_dismissed", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={banner}>
      <div style={inner}>
        <span style={icon}>✨</span>

        <span style={text}>
          <strong>Demo Project:</strong> This is a portfolio demo built with{" "}
          <strong>React + Shopify Storefront API</strong>. Products, prices,
          and brand displays are for demonstration only — no real orders are
          processed.
        </span>

        <a
          href="https://github.com/yourusername/glow-beauty"
          target="_blank"
          rel="noreferrer"
          style={link}
        >
          View Code →
        </a>

        <button onClick={handleDismiss} style={dismissBtn} title="Dismiss">
          ✕
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const banner = {
  background: "linear-gradient(135deg, #c2687a, #7d2a3c)",
  color: "#fff",
  position: "sticky",
  top: 0,
  zIndex: 1100, // above navbar
  width: "100%",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const inner = {
  maxWidth: 1300,
  margin: "0 auto",
  padding: "10px 20px",
  display: "flex",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
  fontSize: 13,
};

const icon = {
  fontSize: 16,
  flexShrink: 0,
};

const text = {
  flex: 1,
  minWidth: 200,
  lineHeight: 1.5,
};

const link = {
  color: "#fff",
  textDecoration: "underline",
  fontWeight: 600,
  whiteSpace: "nowrap",
  flexShrink: 0,
};

const dismissBtn = {
  background: "rgba(255,255,255,0.15)",
  border: "none",
  color: "#fff",
  cursor: "pointer",
  width: 26,
  height: 26,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  flexShrink: 0,
};