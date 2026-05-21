// src/components/BrandSpotlight.js
//
// Editorial brand feature with quote, image, and CTA.

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { theme } from "../theme";

const BRAND_INFO = {
  Avène: {
    handle: "avne",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=85",
    tagline: "Soothing care since 1736",
    quote:
      "Pioneers in dermatological skincare for sensitive skin, trusted by dermatologists for over three centuries.",
    cta: "Discover Avène",
  },
  "La Roche-Posay": {
    handle: "la-roche-posay",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=85",
    tagline: "Dermatologically tested. Endorsed by 90,000+ dermatologists.",
    quote:
      "Born from the unique thermal spring water of La Roche-Posay, France. Recommended for the most sensitive skin.",
    cta: "Discover La Roche-Posay",
  },
};

export default function BrandSpotlight({ brand = "La Roche-Posay" }) {
  const navigate = useNavigate();
  const info = BRAND_INFO[brand];

  if (!info) return null;

  return (
    <section style={section}>
      <div style={container}>
        {/* LEFT: Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={imageCol}
        >
          <img src={info.image} alt={brand} style={image} />
          <div style={imageBadge}>EST. 1736</div>
        </motion.div>

        {/* RIGHT: Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={contentCol}
        >
          <span style={eyebrow}>FEATURED BRAND</span>

          <h2 style={brandName}>
            <span style={italic}>{brand.split(" ")[0]}</span>{" "}
            {brand.split(" ").slice(1).join(" ")}
          </h2>

          <p style={tagline}>{info.tagline}</p>

          <p style={quote}>"{info.quote}"</p>

          <button
            onClick={() => navigate(`/brand/${info.handle}`)}
            style={ctaBtn}
          >
            {info.cta} →
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ================= STYLES ================= */

const section = {
  padding: "80px 24px",
  background: theme.colors.bg,
};

const container = {
  maxWidth: 1200,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 60,
  alignItems: "center",
};

const imageCol = {
  position: "relative",
};

const image = {
  width: "100%",
  height: 500,
  objectFit: "cover",
};

const imageBadge = {
  position: "absolute",
  top: 24,
  left: 24,
  background: theme.colors.card,
  padding: "8px 16px",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.25em",
  color: theme.colors.dark,
};

const contentCol = {
  padding: "0 20px",
};

const eyebrow = {
  display: "inline-block",
  fontSize: 11,
  letterSpacing: "0.3em",
  fontWeight: 600,
  color: theme.colors.primary,
  marginBottom: 20,
  textTransform: "uppercase",
};

const brandName = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(32px, 4vw, 48px)",
  fontWeight: 700,
  color: theme.colors.dark,
  margin: "0 0 16px",
  letterSpacing: "-0.02em",
  lineHeight: 1.1,
};

const italic = {
  fontStyle: "italic",
  fontWeight: 400,
};

const tagline = {
  fontSize: 16,
  color: theme.colors.primary,
  marginBottom: 24,
  fontWeight: 500,
  letterSpacing: "0.02em",
};

const quote = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 18,
  fontStyle: "italic",
  color: theme.colors.muted,
  lineHeight: 1.7,
  marginBottom: 32,
  fontWeight: 400,
};

const ctaBtn = {
  padding: "14px 32px",
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