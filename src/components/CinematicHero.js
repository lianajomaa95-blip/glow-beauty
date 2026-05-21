// src/components/CinematicHero.js

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CinematicHero() {
  const navigate = useNavigate();

  return (
    <div style={hero}>
      {/* BACKGROUND IMAGE with slow zoom */}
      <div style={imageContainer}>
        <img
          src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1920&q=85"
          alt="Luxurious skincare"
          style={bgImage}
        />
        <div style={overlay} />
      </div>

      {/* TEXT CONTENT */}
      <div style={content}>
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.4em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={eyebrow}
        >
          CURATED LUXURY SKINCARE
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          style={headline}
        >
          Skincare for the{" "}
          <span style={italicAccent}>extraordinary</span> in you
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          style={subtitle}
        >
          Dermatologist-approved formulas from the world's most trusted brands.
          Discover routines designed for real skin.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
          style={ctaRow}
        >
          <button onClick={() => navigate("/skincare")} style={primaryCta}>
            Shop Skincare
          </button>
          <button
            onClick={() => navigate("/skin-quiz")}
            style={secondaryCta}
          >
            Take Skin Quiz →
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 1.4 }}
          style={scrollIndicator}
        >
          <div style={scrollLine} />
          <div style={scrollText}>SCROLL</div>
        </motion.div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const hero = {
  position: "relative",
  width: "100%",
  height: "85vh",
  minHeight: 560,
  maxHeight: 800,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const imageContainer = {
  position: "absolute",
  inset: 0,
  zIndex: 0,
};

const bgImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  animation: "slowZoom 8s ease-out forwards",
};

const overlay = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(135deg, rgba(125,42,60,0.55) 0%, rgba(0,0,0,0.45) 50%, rgba(125,42,60,0.4) 100%)",
};

const content = {
  position: "relative",
  zIndex: 1,
  textAlign: "center",
  color: "#fff",
  padding: "0 24px",
  maxWidth: 900,
};

const eyebrow = {
  fontSize: 11,
  letterSpacing: "0.3em",
  fontWeight: 600,
  color: "#fce5ec",
  marginBottom: 24,
  textTransform: "uppercase",
};

const headline = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(36px, 6vw, 72px)",
  fontWeight: 700,
  lineHeight: 1.1,
  marginBottom: 24,
  textShadow: "0 4px 30px rgba(0,0,0,0.3)",
  color: "#fff",
};

const italicAccent = {
  fontStyle: "italic",
  fontWeight: 400,
  background: "linear-gradient(135deg, #ffd4a3, #ffb6c1, #fce5ec)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const subtitle = {
  fontSize: "clamp(15px, 1.6vw, 18px)",
  lineHeight: 1.6,
  maxWidth: 600,
  margin: "0 auto 40px",
  opacity: 0.95,
  fontWeight: 300,
};

const ctaRow = {
  display: "flex",
  gap: 14,
  justifyContent: "center",
  flexWrap: "wrap",
};

const primaryCta = {
  padding: "16px 36px",
  background: "#fff",
  color: "#7d2a3c",
  border: "none",
  borderRadius: 0,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
};

const secondaryCta = {
  padding: "16px 28px",
  background: "transparent",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.5)",
  borderRadius: 0,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 500,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  transition: "all 0.3s ease",
};

const scrollIndicator = {
  position: "absolute",
  bottom: -120,
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
};

const scrollLine = {
  width: 1,
  height: 40,
  background: "linear-gradient(to bottom, transparent, #fff)",
  animation: "float 2s ease-in-out infinite",
};

const scrollText = {
  fontSize: 10,
  letterSpacing: "0.3em",
  color: "#fff",
  fontWeight: 500,
};