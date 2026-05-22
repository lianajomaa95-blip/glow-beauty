// src/pages/Skincare.js
//
// Skincare hub: featured collections, special edits, brands

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCollections } from "../hooks/useCollections";
import { SPECIAL_COLLECTIONS } from "../utils/specialCollections";
import { CollectionGridSkeleton } from "../components/Skeleton";
import SEO from "../components/SEO";
import { theme } from "../theme";

export default function Skincare() {
  const navigate = useNavigate();
  const { collections, loading } = useCollections();

  return (
    <>
      <SEO
        title="Skincare"
        description="Explore our complete skincare collection: cleansers, moisturizers, serums, sunscreens, and more."
      />

      <div style={page}>
        {/* HERO */}
        <div style={hero}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span style={eyebrow}>SKINCARE</span>
            <h1 style={heroTitle}>
              Curated <span style={italic}>for every</span> skin story
            </h1>
            <p style={heroSubtitle}>
              From everyday essentials to investment-worthy luxuries
            </p>
          </motion.div>
        </div>

        {/* SHOP THE EDIT (special collections) */}
        <section style={section}>
          <div style={sectionInner}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={sectionHeader}
            >
              <span style={eyebrow}>CURATED EDIT</span>
              <h2 style={sectionTitle}>
                Shop <span style={italic}>the Edit</span>
              </h2>
              <p style={sectionSub}>
                Handpicked collections to make finding your perfect match easy
              </p>
            </motion.div>

            <div style={editGrid}>
              {SPECIAL_COLLECTIONS.map((col, i) => (
                <motion.div
                  key={col.handle}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -6 }}
                  onClick={() => navigate(`/${col.handle}`)}
                  style={{
                    ...editCard,
                    background: col.gradient,
                  }}
                >
                  <div style={editCardIcon}>{col.icon}</div>
                  <span style={editCardEyebrow}>{col.eyebrow}</span>
                  <h3 style={editCardTitle}>{col.name}</h3>
                  <p style={editCardDesc}>{col.description}</p>
                  <span style={editCardArrow}>EXPLORE →</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SHOP BY CATEGORY */}
        <section style={section}>
          <div style={sectionInner}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={sectionHeader}
            >
              <span style={eyebrow}>BROWSE</span>
              <h2 style={sectionTitle}>
                Shop by <span style={italic}>Category</span>
              </h2>
              <p style={sectionSub}>
                Find exactly what your skin is craving
              </p>
            </motion.div>

            {loading && <CollectionGridSkeleton count={6} />}

            {!loading && collections.length > 0 && (
              <div style={categoryGrid}>
                {collections.map((col, i) => (
                  <motion.div
                    key={col.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                    onClick={() => navigate(`/collection/${col.handle}`)}
                    style={categoryCard}
                  >
                    {col.image ? (
                      <img
                        src={col.image}
                        alt={col.name}
                        style={categoryImg}
                      />
                    ) : (
                      <div style={categoryPlaceholder}>🧴</div>
                    )}
                    <div style={categoryOverlay} />
                    <div style={categoryContent}>
                      <h3 style={categoryTitle}>{col.name}</h3>
                      <span style={categoryArrow}>SHOP →</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* BRANDS CTA */}
        <section style={brandsSection}>
          <div style={brandsInner}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={brandsContent}
            >
              <span style={{ ...eyebrow, color: "#fce5ec" }}>OUR BRANDS</span>
              <h2 style={brandsTitle}>
                Trusted by <span style={italicLight}>dermatologists</span>{" "}
                worldwide
              </h2>
              <p style={brandsText}>
                Discover Avène and La Roche-Posay — the brands that defined
                modern dermatological skincare.
              </p>
              <button onClick={() => navigate("/brands")} style={brandsBtn}>
                Explore Brands →
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

/* ================= STYLES ================= */

const page = {
  background: theme.colors.bg,
  minHeight: "100vh",
};

const hero = {
  padding: "70px 24px 60px",
  background: theme.colors.card,
  textAlign: "center",
  borderBottom: `1px solid ${theme.colors.border}`,
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

const italic = { fontStyle: "italic", fontWeight: 400 };
const italicLight = { fontStyle: "italic", fontWeight: 400, color: "#ffd4a3" };

const heroTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(32px, 5vw, 50px)",
  fontWeight: 700,
  color: theme.colors.dark,
  margin: 0,
  letterSpacing: "-0.02em",
  lineHeight: 1.2,
};

const heroSubtitle = {
  fontSize: 16,
  color: theme.colors.muted,
  marginTop: 14,
};

const section = {
  padding: "70px 24px",
};

const sectionInner = {
  maxWidth: 1200,
  margin: "0 auto",
};

const sectionHeader = {
  textAlign: "center",
  marginBottom: 40,
};

const sectionTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(28px, 4vw, 40px)",
  fontWeight: 700,
  color: theme.colors.dark,
  margin: 0,
  letterSpacing: "-0.02em",
};

const sectionSub = {
  fontSize: 15,
  color: theme.colors.muted,
  marginTop: 12,
};

/* SHOP THE EDIT */
const editGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 20,
};

const editCard = {
  padding: "36px 28px",
  borderRadius: 24,
  color: "#fff",
  cursor: "pointer",
  textAlign: "center",
  transition: "transform 0.4s ease, box-shadow 0.4s ease",
  boxShadow: "0 10px 30px rgba(125,42,60,0.15)",
};

const editCardIcon = {
  fontSize: 48,
  marginBottom: 14,
};

const editCardEyebrow = {
  display: "inline-block",
  fontSize: 10,
  letterSpacing: "0.3em",
  fontWeight: 600,
  marginBottom: 10,
  opacity: 0.9,
  textTransform: "uppercase",
};

const editCardTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 26,
  fontWeight: 700,
  margin: "0 0 10px",
  letterSpacing: "-0.01em",
};

const editCardDesc = {
  fontSize: 14,
  lineHeight: 1.6,
  margin: "0 0 18px",
  opacity: 0.95,
};

const editCardArrow = {
  display: "inline-block",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.25em",
  paddingTop: 8,
  borderTop: "1px solid rgba(255,255,255,0.3)",
};

/* CATEGORY GRID */
const categoryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 20,
};

const categoryCard = {
  position: "relative",
  height: 280,
  overflow: "hidden",
  cursor: "pointer",
  background: theme.colors.card,
  borderRadius: 18,
};

const categoryImg = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.8s ease",
};

const categoryPlaceholder = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(135deg, #fde6e9, #fff)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 70,
};

const categoryOverlay = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7) 100%)",
};

const categoryContent = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: 22,
  color: "#fff",
};

const categoryTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 24,
  fontWeight: 600,
  margin: 0,
};

const categoryArrow = {
  display: "inline-block",
  marginTop: 6,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.25em",
};

/* BRANDS CTA */
const brandsSection = {
  padding: "80px 24px",
  background: "linear-gradient(135deg, #7d2a3c 0%, #c2687a 100%)",
  color: "#fff",
};

const brandsInner = {
  maxWidth: 800,
  margin: "0 auto",
  textAlign: "center",
};

const brandsContent = {};

const brandsTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(28px, 4vw, 40px)",
  fontWeight: 700,
  margin: "0 0 16px",
  lineHeight: 1.2,
  color: "#fff",
};

const brandsText = {
  fontSize: 16,
  lineHeight: 1.7,
  marginBottom: 28,
  opacity: 0.92,
};

const brandsBtn = {
  padding: "14px 32px",
  background: "transparent",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.5)",
  borderRadius: 0,
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  transition: "all 0.3s ease",
};