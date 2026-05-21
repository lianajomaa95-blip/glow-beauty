// src/pages/SpecialCollection.js

import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { ProductGridSkeleton } from "../components/Skeleton";
import Breadcrumbs from "../components/Breadcrumbs";
import SEO from "../components/SEO";
import useProducts from "../hooks/useProducts";
import { getSpecialCollectionByHandle } from "../utils/specialCollections";
import { theme } from "../theme";

export default function SpecialCollection({
  addToCart,
  wishlist,
  toggleWishlist,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();

  // Extract handle from URL path: "/best-sellers" → "best-sellers"
  const handle = location.pathname.replace("/", "");
  const collection = getSpecialCollectionByHandle(handle);

  // ⚠️ useMemo MUST come BEFORE any conditional return (React rules)
  const items = useMemo(() => {
    if (!collection || !products || products.length === 0) return [];
    return collection.getProducts(products);
  }, [products, collection]);

  // Now we can do conditional rendering AFTER all hooks have been called
  if (!collection) {
    return (
      <div style={page}>
        <div style={emptyBox}>
          <h2>Collection not found</h2>
          <button onClick={() => navigate("/shop")} style={resetBtn}>
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO title={collection.name} description={collection.description} />

      <div style={page}>
        {/* HERO HEADER */}
        <div
          style={{
            ...hero,
            background: collection.gradient,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={heroInner}
          >
            <div style={heroIcon}>{collection.icon}</div>
            <span style={heroEyebrow}>{collection.eyebrow}</span>
            <h1 style={heroTitle}>{collection.name}</h1>
            <p style={heroSubtitle}>{collection.description}</p>
          </motion.div>
        </div>

        <Breadcrumbs
          items={[
            { label: "Shop", to: "/shop" },
            { label: collection.name },
          ]}
        />

        {!loading && !error && (
          <div style={countWrap}>
            <p style={countText}>
              <strong>{items.length}</strong>{" "}
              {items.length === 1 ? "product" : "products"} in this collection
            </p>
          </div>
        )}

        <div style={gridWrap}>
          {loading && <ProductGridSkeleton count={8} />}

          {error && (
            <div style={errorBox}>
              <p>Couldn't load products. Please try again.</p>
            </div>
          )}

          {!loading && !error && items.length === 0 && (
            <div style={emptyBox}>
              <div style={{ fontSize: 50, marginBottom: 12 }}>📦</div>
              <h3 style={{ marginBottom: 8, color: theme.colors.dark }}>
                No products in this collection yet
              </h3>
              <button onClick={() => navigate("/shop")} style={resetBtn}>
                Browse All Products
              </button>
            </div>
          )}

          {!loading && !error && items.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={grid}
            >
              {items.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: Math.min(i * 0.04, 0.6),
                    duration: 0.5,
                  }}
                >
                  <ProductCard
                    product={product}
                    onAdd={addToCart}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

/* ============================================================
   🎨 STYLES
   ============================================================ */

const page = {
  background: theme.colors.bg,
  minHeight: "100vh",
};

const hero = {
  padding: "80px 24px 70px",
  color: "#fff",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
};

const heroInner = {
  position: "relative",
  zIndex: 1,
  maxWidth: 720,
  margin: "0 auto",
};

const heroIcon = {
  fontSize: 64,
  marginBottom: 16,
};

const heroEyebrow = {
  display: "inline-block",
  fontSize: 11,
  letterSpacing: "0.35em",
  fontWeight: 600,
  marginBottom: 14,
  opacity: 0.9,
  textTransform: "uppercase",
};

const heroTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(36px, 5.5vw, 60px)",
  fontWeight: 700,
  margin: 0,
  letterSpacing: "-0.02em",
  lineHeight: 1.1,
  color: "#fff",
};

const heroSubtitle = {
  fontSize: 16,
  marginTop: 16,
  lineHeight: 1.6,
  opacity: 0.95,
  maxWidth: 500,
  margin: "16px auto 0",
};

const countWrap = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "24px 24px 0",
  textAlign: "center",
};

const countText = {
  fontSize: 13,
  color: theme.colors.muted,
  margin: 0,
  textTransform: "uppercase",
  letterSpacing: "0.15em",
};

const gridWrap = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "30px 24px 60px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: 20,
};

const errorBox = {
  textAlign: "center",
  padding: 40,
  color: "#c33",
};

const emptyBox = {
  textAlign: "center",
  padding: "80px 20px",
  background: theme.colors.card,
  borderRadius: 16,
  maxWidth: 480,
  margin: "60px auto",
};

const resetBtn = {
  padding: "12px 24px",
  background: theme.colors.dark,
  color: "#fff",
  border: "none",
  borderRadius: 12,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};