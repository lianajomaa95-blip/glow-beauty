import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCollections } from "../hooks/useCollections";
import { CollectionGridSkeleton } from "../components/Skeleton";
import SEO from "../components/SEO";
import { theme } from "../theme";

export default function Skincare() {
  const navigate = useNavigate();
  const { collections, loading } = useCollections();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={page}
    >
      <SEO title="Skincare" description="Explore our complete skincare collection: cleansers, moisturizers, serums, sunscreens, and more." />
      {/* HERO */}
      <div style={hero}>
        <div style={heroBadge}>SKINCARE</div>
        <h1 style={heroTitle}>Skincare Built for Real Skin</h1>
        <p style={heroSub}>
          Dermatologist-approved formulas from the world's most trusted brands.
          Find your perfect routine, one product at a time.
        </p>
      </div>

      {/* CATEGORIES GRID */}
      <div style={container}>
        <div style={sectionLabel}>Shop by Category</div>

        {loading && <CollectionGridSkeleton count={8} />}

        {!loading && collections.length === 0 && (
          <div style={empty}>No categories available yet.</div>
        )}

        {!loading && collections.length > 0 && (
          <div style={grid}>
            {collections.map((col, i) => (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => navigate(`/collection/${col.handle}`)}
                style={card}
              >
                {col.image ? (
                  <img src={col.image} alt={col.name} style={cardImg} />
                ) : (
                  <div style={cardPlaceholder}>
                    {emojiForCategory(col.name)}
                  </div>
                )}
                <div style={cardOverlay} />
                <div style={cardContent}>
                  <h3 style={cardTitle}>{col.name}</h3>
                  {col.subtitle && (
                    <p style={cardSubtitle}>{col.subtitle}</p>
                  )}
                  <span style={cardArrow}>Shop now →</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* BRANDS CTA */}
        <div style={brandsCta}>
          <h2 style={ctaTitle}>Prefer to shop by brand?</h2>
          <p style={ctaSub}>
            Browse our curated selection of skincare from leading brands.
          </p>
          <button
            onClick={() => navigate("/brands")}
            style={ctaBtn}
          >
            Browse Brands
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ================= HELPERS ================= */

function emojiForCategory(name) {
  const map = {
    Cleansers: "🧼",
    Moisturizers: "💧",
    Serums: "✨",
    Sunscreens: "☀️",
    "Eye Care": "👁️",
    Treatments: "🩺",
    "Body Care": "🛁",
    "Lip Care": "💋",
  };
  return map[name] || "🧴";
}

/* ================= STYLES ================= */

const page = {
  background: theme.colors.bg,
  minHeight: "100vh",
};

const hero = {
  textAlign: "center",
  padding: "60px 24px 40px",
  background: theme.colors.card,
  borderBottom: `1px solid ${theme.colors.border}`,
};

const heroBadge = {
  display: "inline-block",
  padding: "6px 14px",
  borderRadius: 999,
  background: "rgba(194,104,122,0.1)",
  color: theme.colors.primary,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 1.5,
  marginBottom: 16,
};

const heroTitle = {
  fontSize: 38,
  fontWeight: 700,
  color: theme.colors.dark,
  lineHeight: 1.2,
  maxWidth: 700,
  margin: "0 auto",
};

const heroSub = {
  fontSize: 15,
  color: theme.colors.muted,
  marginTop: 14,
  maxWidth: 560,
  marginLeft: "auto",
  marginRight: "auto",
  lineHeight: 1.6,
};

const container = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "40px 24px 60px",
};

const sectionLabel = {
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: 1.5,
  color: theme.colors.muted,
  fontWeight: 700,
  marginBottom: 18,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 16,
};

const card = {
  position: "relative",
  height: 240,
  borderRadius: 20,
  overflow: "hidden",
  cursor: "pointer",
  background: theme.colors.card,
  boxShadow: theme.shadow.card,
};

const cardImg = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const cardPlaceholder = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  background: "linear-gradient(135deg, #fde6e9, #fff)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 60,
};

const cardOverlay = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)",
};

const cardContent = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: 20,
  color: "#fff",
};

const cardTitle = {
  fontSize: 22,
  fontWeight: 700,
  margin: 0,
  textShadow: "0 2px 8px rgba(0,0,0,0.3)",
};

const cardSubtitle = {
  fontSize: 12,
  opacity: 0.85,
  marginTop: 4,
  marginBottom: 8,
};

const cardArrow = {
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: 0.5,
};

const empty = {
  textAlign: "center",
  padding: 40,
  color: theme.colors.muted,
};

const brandsCta = {
  marginTop: 50,
  padding: "40px 24px",
  background: theme.colors.card,
  borderRadius: 20,
  textAlign: "center",
  border: `1px solid ${theme.colors.border}`,
};

const ctaTitle = {
  fontSize: 24,
  color: theme.colors.dark,
  marginBottom: 8,
};

const ctaSub = {
  color: theme.colors.muted,
  marginBottom: 18,
};

const ctaBtn = {
  padding: "12px 28px",
  background: theme.colors.primary,
  color: "#fff",
  border: "none",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 14,
};