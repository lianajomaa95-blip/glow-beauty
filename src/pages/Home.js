import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import SEO from "../components/SEO";
import CinematicHero from "../components/CinematicHero";
import TrustBar from "../components/TrustBar";
import BrandSpotlight from "../components/BrandSpotlight";
import SectionDivider from "../components/SectionDivider";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import Newsletter from "../components/Newsletter";
import {
  ProductGridSkeleton,
  CollectionGridSkeleton,
} from "../components/Skeleton";

import useProducts from "../hooks/useProducts";
import { useCollections } from "../hooks/useCollections";
import { theme } from "../theme";

export default function Home({ addToCart, wishlist, toggleWishlist }) {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useProducts();
  const { collections, loading: collectionsLoading } = useCollections();

  const featured = Array.isArray(products) ? products.slice(0, 4) : [];

  return (
    <div style={{ background: theme.colors.bg, minHeight: "100vh" }}>
      {/* 🔍 SEO */}
      <SEO
        title=""
        description="Discover curated luxury skincare from Avène and La Roche-Posay. Dermatologist-approved formulas, personalized routines, and expert recommendations for every skin type."
      />

      <CinematicHero />
      <TrustBar />

      <section style={section}>
        <div style={sectionInner}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={sectionHeader}
          >
            <span style={eyebrow}>CURATED SELECTION</span>
            <h2 style={sectionTitle}>
              <span style={italic}>Featured</span> Products
            </h2>
            <p style={sectionSub}>
              Handpicked essentials loved by our community
            </p>
          </motion.div>

          {productsLoading && <ProductGridSkeleton count={4} />}

          {productsError && (
            <div style={errorBox}>Couldn't load products.</div>
          )}

          {!productsLoading && !productsError && featured.length > 0 && (
            <div style={productGrid}>
              {featured.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <ProductCard
                    product={product}
                    onAdd={addToCart}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                    onQuickView={setSelectedProduct}
                  />
                </motion.div>
              ))}
            </div>
          )}

          <div style={ctaCenter}>
            <button onClick={() => navigate("/shop")} style={viewAllBtn}>
              View All Products
            </button>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section style={storySection}>
        <div style={storyInner}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span style={{ ...eyebrow, color: "#fce5ec" }}>OUR PHILOSOPHY</span>
            <h2 style={storyTitle}>
              Skincare,{" "}
              <span style={italicLight}>reimagined</span> for real skin.
            </h2>
            <p style={storyText}>
              We believe luxury skincare shouldn't be a guessing game. Every
              product in our collection is selected by skincare obsessives,
              tested for results, and trusted by dermatologists worldwide.
            </p>
            <button onClick={() => navigate("/about")} style={storyBtn}>
              Discover Our Story →
            </button>
          </motion.div>
        </div>
      </section>

      <BrandSpotlight brand="La Roche-Posay" />

      <SectionDivider variant="dots" />

      <section style={section}>
        <div style={sectionInner}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={sectionHeader}
          >
            <span style={eyebrow}>EXPLORE</span>
            <h2 style={sectionTitle}>
              Shop by <span style={italic}>Category</span>
            </h2>
            <p style={sectionSub}>
              Find exactly what your skin is craving
            </p>
          </motion.div>

          {collectionsLoading && <CollectionGridSkeleton count={4} />}

          {!collectionsLoading && collections.length > 0 && (
            <div style={collectionsGrid}>
              {collections.slice(0, 6).map((col, i) => (
                <motion.div
                  key={col.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -6 }}
                  onClick={() => navigate(`/collection/${col.handle}`)}
                  style={collectionCard}
                >
                  {col.image ? (
                    <img
                      src={col.image}
                      alt={col.name}
                      style={collectionImg}
                    />
                  ) : (
                    <div style={collectionPlaceholder}>🧴</div>
                  )}
                  <div style={collectionOverlay} />
                  <div style={collectionContent}>
                    <h3 style={collectionTitle}>{col.name}</h3>
                    <span style={collectionArrow}>SHOP →</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <BrandSpotlight brand="Avène" />

      <Newsletter />

      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAdd={addToCart}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
        />
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const section = { padding: "80px 24px" };
const sectionInner = { maxWidth: 1200, margin: "0 auto" };
const sectionHeader = { textAlign: "center", marginBottom: 50 };

const eyebrow = {
  display: "inline-block",
  fontSize: 11,
  letterSpacing: "0.3em",
  fontWeight: 600,
  color: theme.colors.primary,
  marginBottom: 14,
  textTransform: "uppercase",
};

const sectionTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(28px, 4vw, 44px)",
  fontWeight: 700,
  color: theme.colors.dark,
  margin: 0,
  letterSpacing: "-0.02em",
  lineHeight: 1.2,
};

const italic = { fontStyle: "italic", fontWeight: 400 };

const sectionSub = {
  fontSize: 15,
  color: theme.colors.muted,
  marginTop: 14,
  maxWidth: 480,
  marginLeft: "auto",
  marginRight: "auto",
  lineHeight: 1.6,
};

const productGrid = {
  display: "grid",
  gap: 24,
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
};

const errorBox = { textAlign: "center", padding: 40, color: "#c33" };
const ctaCenter = { textAlign: "center", marginTop: 50 };

const viewAllBtn = {
  padding: "14px 36px",
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

const storySection = {
  padding: "100px 24px",
  background: "linear-gradient(135deg, #7d2a3c 0%, #c2687a 100%)",
  color: "#fff",
};

const storyInner = { maxWidth: 900, margin: "0 auto", textAlign: "center" };

const storyTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(28px, 4.5vw, 48px)",
  fontWeight: 700,
  margin: "0 0 24px",
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
  color: "#fff",
};

const italicLight = { fontStyle: "italic", fontWeight: 400, color: "#ffd4a3" };

const storyText = {
  fontSize: 17,
  lineHeight: 1.7,
  marginBottom: 32,
  opacity: 0.92,
  maxWidth: 640,
  marginLeft: "auto",
  marginRight: "auto",
  fontWeight: 300,
};

const storyBtn = {
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

const collectionsGrid = {
  display: "grid",
  gap: 20,
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
};

const collectionCard = {
  position: "relative",
  height: 320,
  overflow: "hidden",
  cursor: "pointer",
  background: theme.colors.card,
};

const collectionImg = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.8s ease",
};

const collectionPlaceholder = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(135deg, #fde6e9, #fff)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 80,
};

const collectionOverlay = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7) 100%)",
};

const collectionContent = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: 24,
  color: "#fff",
};

const collectionTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 26,
  fontWeight: 600,
  margin: 0,
  letterSpacing: "-0.01em",
};

const collectionArrow = {
  display: "inline-block",
  marginTop: 8,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.25em",
};