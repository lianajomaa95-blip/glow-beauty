// src/components/CinematicHero.js

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { theme } from "../theme";

export default function CinematicHero() {
  const navigate = useNavigate();

  return (
    <section style={hero}>
      <div style={imageWrap}>
        <img
          src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&q=85"
          alt="Luxury skincare"
          style={image}
        />
        <div style={overlay} />
      </div>

      <div style={content}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span style={eyebrow}>AURA STORE EDIT</span>
          <h1 style={title}>
            Skincare made <span style={italic}>extraordinary</span>
          </h1>
          <p style={subtitle}>
            Discover curated luxury from Avène and La Roche-Posay — dermatologist-approved formulas for every skin story.
          </p>
          <div style={ctaRow}>
            <button onClick={() => navigate("/shop")} style={primaryBtn}>
              Shop the Edit
            </button>
            <button onClick={() => navigate("/skin-quiz")} style={secondaryBtn}>
              Find Your Match →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const hero = {
  position: "relative",
  height: "85vh",
  minHeight: 500,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const imageWrap = {
  position: "absolute",
  inset: 0,
};

const image = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  animation: "slowZoom 20s ease-out forwards",
};

const overlay = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(135deg, rgba(125,42,60,0.4), rgba(0,0,0,0.35))",
};

const content = {
  position: "relative",
  zIndex: 2,
  maxWidth: 720,
  padding: "0 24px",
  textAlign: "center",
  color: "#fff",
};

const eyebrow = {
  display: "inline-block",
  fontSize: 11,
  letterSpacing: "0.4em",
  fontWeight: 600,
  marginBottom: 20,
  color: "#ffd4a3",
  textTransform: "uppercase",
};

const title = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(40px, 6vw, 72px)",
  fontWeight: 700,
  margin: "0 0 20px",
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  color: "#fff",
};

const italic = {
  fontStyle: "italic",
  fontWeight: 400,
  color: "#ffd4a3",
};

const subtitle = {
  fontSize: "clamp(15px, 1.6vw, 18px)",
  marginBottom: 36,
  opacity: 0.95,
  lineHeight: 1.6,
  fontWeight: 300,
  maxWidth: 540,
  margin: "0 auto 36px",
};

const ctaRow = {
  display: "flex",
  gap: 14,
  justifyContent: "center",
  flexWrap: "wrap",
};

const primaryBtn = {
  padding: "16px 36px",
  background: "#fff",
  color: theme.colors.dark,
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
  padding: "16px 28px",
  background: "transparent",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.6)",
  borderRadius: 0,
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  transition: "all 0.3s ease",
};