// src/components/DemoBanner.js

import { useState, useEffect } from "react";

export default function DemoBanner() {
  const [visible, setVisible] = useState(false);

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
      <span style={text}>
        ✨ <strong>Aura Store</strong> is a demo portfolio site — built with React + Shopify Storefront API. No real orders processed.
      </span>
      <button onClick={handleDismiss} style={closeBtn} aria-label="Dismiss banner">
        ✕
      </button>
    </div>
  );
}

const banner = {
  background: "linear-gradient(90deg, #7d2a3c, #c2687a)",
  color: "#fff",
  padding: "10px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 16,
  fontSize: 13,
  position: "relative",
  textAlign: "center",
};

const text = {
  flex: "0 1 auto",
};

const closeBtn = {
  background: "transparent",
  border: "none",
  color: "#fff",
  cursor: "pointer",
  fontSize: 16,
  padding: "4px 8px",
  position: "absolute",
  right: 8,
  top: "50%",
  transform: "translateY(-50%)",
  opacity: 0.8,
};