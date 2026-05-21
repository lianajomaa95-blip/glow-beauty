// src/pages/NotFound.js
//
// Custom 404 page — shown when a user visits a route that doesn't exist.

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { theme } from "../theme";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={page}
    >
      <div style={container}>
        {/* BIG 404 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={bigNumber}
        >
          404
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span style={eyebrow}>PAGE NOT FOUND</span>

          <h1 style={title}>
            We can't find that <span style={italic}>page</span>
          </h1>

          <p style={subtitle}>
            The page you're looking for doesn't exist or has been moved.
            Let's get you back to discovering great skincare.
          </p>

          {/* SUGGESTIONS */}
          <div style={suggestions}>
            <button
              onClick={() => navigate("/")}
              style={primaryBtn}
            >
              Back to Home
            </button>
            <button
              onClick={() => navigate("/shop")}
              style={secondaryBtn}
            >
              Browse Products →
            </button>
          </div>

          {/* HELPFUL LINKS */}
          <div style={helpfulLinks}>
            <p style={helpfulLabel}>OR EXPLORE</p>
            <div style={linksRow}>
              <button onClick={() => navigate("/skincare")} style={linkBtn}>
                Skincare
              </button>
              <span style={dot}>·</span>
              <button onClick={() => navigate("/brands")} style={linkBtn}>
                Brands
              </button>
              <span style={dot}>·</span>
              <button onClick={() => navigate("/skin-quiz")} style={linkBtn}>
                Skin Quiz
              </button>
              <span style={dot}>·</span>
              <button onClick={() => navigate("/contact")} style={linkBtn}>
                Contact
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "calc(100vh - 100px)",
  background: theme.colors.bg,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "60px 24px",
};

const container = {
  maxWidth: 600,
  textAlign: "center",
};

const bigNumber = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(120px, 20vw, 200px)",
  fontWeight: 700,
  color: theme.colors.dark,
  lineHeight: 1,
  letterSpacing: "-0.04em",
  marginBottom: 20,
  background:
    "linear-gradient(135deg, #7d2a3c 0%, #c2687a 50%, #ffd4a3 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const eyebrow = {
  display: "inline-block",
  fontSize: 11,
  letterSpacing: "0.3em",
  fontWeight: 600,
  color: theme.colors.primary,
  marginBottom: 14,
  textTransform: "uppercase",
};

const title = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(28px, 4vw, 40px)",
  fontWeight: 700,
  color: theme.colors.dark,
  margin: 0,
  letterSpacing: "-0.02em",
  lineHeight: 1.2,
};

const italic = {
  fontStyle: "italic",
  fontWeight: 400,
};

const subtitle = {
  fontSize: 15,
  color: theme.colors.muted,
  marginTop: 16,
  marginBottom: 32,
  lineHeight: 1.6,
};

const suggestions = {
  display: "flex",
  gap: 14,
  justifyContent: "center",
  flexWrap: "wrap",
  marginBottom: 40,
};

const primaryBtn = {
  padding: "14px 28px",
  background: theme.colors.dark,
  color: "#fff",
  border: "none",
  borderRadius: 0,
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  transition: "all 0.3s ease",
};

const secondaryBtn = {
  padding: "14px 28px",
  background: "transparent",
  color: theme.colors.dark,
  border: `1px solid ${theme.colors.dark}`,
  borderRadius: 0,
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  transition: "all 0.3s ease",
};

const helpfulLinks = {
  paddingTop: 30,
  borderTop: `1px solid ${theme.colors.border}`,
};

const helpfulLabel = {
  fontSize: 11,
  letterSpacing: "0.3em",
  color: theme.colors.muted,
  fontWeight: 600,
  marginBottom: 14,
};

const linksRow = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
};

const linkBtn = {
  background: "transparent",
  border: "none",
  color: theme.colors.primary,
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 500,
  padding: "6px 8px",
  transition: "color 0.2s ease",
  fontFamily: "inherit",
};

const dot = {
  color: theme.colors.muted,
  fontSize: 14,
};