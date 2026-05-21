import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { ProductGridSkeleton } from "../components/Skeleton";
import useProducts from "../hooks/useProducts";
import useDebounce from "../hooks/useDebounce";
import { trackSearch } from "../utils/analytics";
import { theme } from "../theme";

export default function SearchPage({ addToCart, wishlist, toggleWishlist }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 300);

  const { products, loading } = useProducts();

  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery });
    } else {
      setSearchParams({});
    }
  }, [debouncedQuery, setSearchParams]);

  const results = useMemo(() => {
    const q = debouncedQuery.toLowerCase().trim();
    if (!q) return [];

    return products
      .map((p) => {
        let score = 0;
        const name = (p.name || "").toLowerCase();
        const brand = (p.brand || "").toLowerCase();
        const type = (p.type || "").toLowerCase();
        const desc = (p.description || "").toLowerCase();
        const tags = (p.tags || []).join(" ").toLowerCase();

        if (name === q) score += 10;
        if (name.startsWith(q)) score += 5;
        if (name.includes(q)) score += 4;
        if (brand.includes(q)) score += 3;
        if (type.includes(q)) score += 2;
        if (tags.includes(q)) score += 2;
        if (desc.includes(q)) score += 1;

        return { ...p, score };
      })
      .filter((p) => p.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [debouncedQuery, products]);

  // 📊 Track searches (only when debounced query changes and has 2+ chars)
  useEffect(() => {
    if (debouncedQuery && debouncedQuery.length >= 2) {
      trackSearch(debouncedQuery, results.length);
    }
  }, [debouncedQuery, results.length]);

  const popularSearches = [
    "Cleanser",
    "Sunscreen",
    "Serum",
    "Avène",
    "La Roche-Posay",
    "Acne",
    "Anti-aging",
    "Dry skin",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={page}
    >
      <div style={header}>
        <h1 style={title}>Search Products</h1>
        <p style={subtitle}>
          Find skincare products by name, brand, type, or concern
        </p>

        <div style={searchBox}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for cleanser, serum, sunscreen..."
            style={searchInput}
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery("")} style={clearBtn}>
              ✕
            </button>
          )}
        </div>
      </div>

      <div style={container}>
        {!query && (
          <div style={emptyState}>
            <div style={popularSection}>
              <h3 style={popularTitle}>Popular Searches</h3>
              <div style={pills}>
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    style={pill}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            <div style={tipsBox}>
              <h3 style={tipsTitle}>💡 Search Tips</h3>
              <ul style={tipsList}>
                <li>Try searching by product type: "cleanser", "serum"</li>
                <li>Or by brand: "Avène", "La Roche-Posay"</li>
                <li>Or by concern: "acne", "dry skin", "anti-aging"</li>
              </ul>
            </div>
          </div>
        )}

        {query && loading && <ProductGridSkeleton count={4} />}

        {query && !loading && (
          <>
            <div style={resultBar}>
              <span style={resultCount}>
                {results.length}{" "}
                {results.length === 1 ? "result" : "results"} for{" "}
                <strong>"{query}"</strong>
              </span>
            </div>

            {results.length === 0 ? (
              <div style={noResults}>
                <div style={{ fontSize: 50, marginBottom: 12 }}>🔍</div>
                <h3 style={{ marginBottom: 8 }}>No products found</h3>
                <p style={{ color: theme.colors.muted, marginBottom: 20 }}>
                  We couldn't find anything matching "{query}". Try a different
                  search term.
                </p>
                <button
                  onClick={() => navigate("/shop")}
                  style={browseAllBtn}
                >
                  Browse All Products
                </button>
              </div>
            ) : (
              <div style={grid}>
                {results.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAdd={addToCart}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

/* ================= STYLES ================= */

const page = {
  background: theme.colors.bg,
  minHeight: "100vh",
};

const header = {
  padding: "40px 24px 30px",
  background: theme.colors.card,
  borderBottom: `1px solid ${theme.colors.border}`,
  textAlign: "center",
};

const title = {
  fontSize: 32,
  fontWeight: 700,
  color: theme.colors.dark,
  margin: 0,
};

const subtitle = {
  fontSize: 14,
  color: theme.colors.muted,
  marginTop: 8,
  marginBottom: 24,
};

const searchBox = {
  position: "relative",
  maxWidth: 560,
  margin: "0 auto",
};

const searchInput = {
  width: "100%",
  padding: "16px 50px 16px 20px",
  borderRadius: 16,
  border: `2px solid ${theme.colors.border}`,
  background: theme.colors.inputBg,
  color: theme.colors.text,
  fontSize: 16,
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s ease",
};

const clearBtn = {
  position: "absolute",
  right: 18,
  top: "50%",
  transform: "translateY(-50%)",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: 18,
  color: theme.colors.muted,
};

const container = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "30px 24px 60px",
};

const emptyState = {
  display: "flex",
  flexDirection: "column",
  gap: 30,
  marginTop: 10,
};

const popularSection = {
  textAlign: "center",
};

const popularTitle = {
  fontSize: 16,
  fontWeight: 600,
  color: theme.colors.dark,
  marginBottom: 14,
  marginTop: 0,
};

const pills = {
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  justifyContent: "center",
};

const pill = {
  padding: "8px 16px",
  borderRadius: 999,
  border: `1px solid ${theme.colors.border}`,
  background: theme.colors.card,
  color: theme.colors.dark,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 500,
  transition: "all 0.2s ease",
};

const tipsBox = {
  background: theme.colors.card,
  padding: 20,
  borderRadius: 16,
  border: `1px solid ${theme.colors.border}`,
  maxWidth: 500,
  margin: "0 auto",
};

const tipsTitle = {
  fontSize: 14,
  fontWeight: 600,
  marginBottom: 10,
  marginTop: 0,
  color: theme.colors.dark,
};

const tipsList = {
  paddingLeft: 20,
  margin: 0,
  fontSize: 13,
  color: theme.colors.muted,
  lineHeight: 1.8,
};

const resultBar = {
  marginBottom: 20,
};

const resultCount = {
  fontSize: 14,
  color: theme.colors.muted,
};

const noResults = {
  textAlign: "center",
  padding: "60px 20px",
  background: theme.colors.card,
  borderRadius: 16,
  border: `1px solid ${theme.colors.border}`,
};

const browseAllBtn = {
  padding: "12px 24px",
  background: theme.colors.primary,
  color: "#fff",
  border: "none",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 14,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
  gap: 18,
};