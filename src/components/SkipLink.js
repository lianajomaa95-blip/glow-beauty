// src/components/SkipLink.js
//
// Accessibility: lets keyboard users skip past the navbar straight to main content.
// Visible only when focused (Tab key).

import { theme } from "../theme";

export default function SkipLink() {
  return (
    <a href="#main-content" style={link} className="skip-link">
      Skip to content
    </a>
  );
}

const link = {
  position: "absolute",
  top: "-100px",
  left: 16,
  background: theme.colors.dark,
  color: "#fff",
  padding: "12px 20px",
  borderRadius: 8,
  textDecoration: "none",
  fontWeight: 600,
  fontSize: 14,
  zIndex: 9999,
  transition: "top 0.2s ease",
};