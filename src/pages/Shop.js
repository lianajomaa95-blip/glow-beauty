// src/pages/Shop.js
//
// Full product grid with smart filter pills (All / Best Sellers / Under $30 / Premium)

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { ProductGridSkeleton } from "../components/Skeleton";
import SEO from "../components/SEO";
import useProducts from "../hooks/useProducts";
import {
  getBestSellers,
  getUnder30,
  getPremium,
} from "../utils/specialCollections";
import { theme } from "../theme";

const FILTERS = [
  { id: "all", label: "All Products", icon: "🛍️" },
  { id: "best-sellers", label: "Best Sellers", icon: "💎" },
  { id: "under-30", label: "Under $30", icon: "💰" },
  { id: "premium", label: "Premium", icon: "✨" },
];

export default function Shop({
  addToCart,
  wishlist,
  toggleWishlist,
}) {
  const [activeFilter, setActiveFilter] = useState("all");

  const { products, loading, error } = useProducts();

  const displayed = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) return [];

    switch (activeFilter) {
      case "best-sellers":
        return getBestSellers(products, 24);
      case "under-30":
        return getUnder30(products);
      case "premium":
        return getPremium(products);
      default:
        return products.filter((p) => p.available !== false);
    }
  }, [products, activeFilter]);

  return (
    <>
      <SEO
        title="Shop"
        description="Browse our full collection of luxury skincare from Avène, La Roche-Posay, and more."
      />

      <div style={page}>
        {/* HEADER */}
        <div style={header}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span style={eyebrow}>SHOP</span>
            <h1 style={title}>
              All <span style={italic}>Products</span>
            </h1>
            <p style={subtitle}>
              Discover our complete collection of luxury skincare
            </p>
          </motion.div>
        </div>

        {/* FILTER PILLS */}
        <div style={filtersWrap}>
          <div style={filtersInner}>
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  style={{
                    ...pill,
                    ...(isActive ? pillActive : {}),
                  }}
                >
                  <span style={pillIcon}>{filter.icon}</span>
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RESULTS COUNT */}
        {!loading && !error && (
          <div style={countWrap}>
            <p style={countText}>
              Showing <strong>{displayed.length}</strong>{" "}
              {displayed.length === 1 ? "product" : "products"}
              {activeFilter !== "all" && (
                <span style={countFilter}>
                  {" "}
                  in{" "}
                  <strong style={{ color: theme.colors.primary }}>
                    {FILTERS.find((f) => f.id === activeFilter)?.label}
                  </strong>
                </span>
              )}
            </p>
          </div>
        )}

        {/* PRODUCT GRID */}
        <div style={gridWrap}>
          {loading && <ProductGridSkeleton count={8} />}

          {error && (
            <div style={errorBox}>
              <p>Couldn't load products. Please try again.</p>
            </div>
          )}

          {!loading && !error && displayed.length === 0 && (
            <div style={emptyBox}>
              <div style={{ fontSize: 50, marginBottom: 12 }}>🔍</div>
              <h3 style={{ marginBottom: 8, color: theme.colors.dark }}>
                No products in this collection
              </h3>
              <p style={{ color: theme.colors.muted, marginBottom: 20 }}>
                Try another filter or browse all products.
              </p>
              <button
                onClick={() => setActiveFilter("all")}
                style={resetBtn}
              >
                Show All Products
              </button>
            </div>
          )}

          {!loading && !error && displayed.length > 0 && (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={grid}
            >
              {displayed.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.03, 0.5), duration: 0.4 }}
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

const header = {
  background: theme.colors.card,
  padding: "60px 24px 40px",
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

const title = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(36px, 5vw, 52px)",
  fontWeight: 700,
  color: theme.colors.dark,
  margin: 0,
  letterSpacing: "-0.02em",
};

const italic = { fontStyle: "italic", fontWeight: 400 };

const subtitle = {
  fontSize: 15,
  color: theme.colors.muted,
  marginTop: 14,
};

/* FILTERS */
const filtersWrap = {
  position: "sticky",
  top: 64,
  zIndex: 50,
  background: theme.colors.bg,
  borderBottom: `1px solid ${theme.colors.border}`,
  padding: "16px 0",
};

const filtersInner = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "0 20px",
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  justifyContent: "center",
};

const pill = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 20px",
  background: theme.colors.card,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: 999,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
  color: theme.colors.dark,
  transition: "all 0.25s ease",
  fontFamily: "inherit",
};

const pillActive = {
  background: theme.colors.dark,
  color: "#fff",
  borderColor: theme.colors.dark,
  transform: "translateY(-1px)",
  boxShadow: "0 4px 14px rgba(125,42,60,0.25)",
};

const pillIcon = {
  fontSize: 14,
};

/* COUNT */
const countWrap = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "16px 24px 0",
};

const countText = {
  fontSize: 13,
  color: theme.colors.muted,
  margin: 0,
};

const countFilter = {
  fontSize: 13,
};

/* GRID */
const gridWrap = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "20px 24px 60px",
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