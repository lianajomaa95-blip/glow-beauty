import { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { ProductGridSkeleton } from "../components/Skeleton";
import useProducts from "../hooks/useProducts";
import useDebounce from "../hooks/useDebounce";
import { useCollections } from "../hooks/useCollections";
import SEO from "../components/SEO";
import { theme } from "../theme";


export default function Shop({ addToCart, wishlist, toggleWishlist }) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300); // ⏱ smooth typing

  const [activeFilters, setActiveFilters] = useState({
    brand: "All",
    type: "All",
  });

  const { products, loading, error } = useProducts();
  const { collections } = useCollections();

  const brands = useMemo(() => {
    const unique = Array.from(
      new Set(products.map((p) => p.brand).filter(Boolean))
    );
    return ["All", ...unique];
  }, [products]);

  const types = useMemo(() => {
    const unique = Array.from(
      new Set(products.map((p) => p.type).filter(Boolean))
    );
    return ["All", ...unique];
  }, [products]);

  const filtered = useMemo(() => {
    const q = debouncedSearch.toLowerCase().trim();

    return products.filter((p) => {
      const matchesSearch =
        !q ||
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.type?.toLowerCase().includes(q) ||
        (Array.isArray(p.concerns) &&
          p.concerns.join(" ").toLowerCase().includes(q));

      const matchesBrand =
        activeFilters.brand === "All" ||
        p.brand === activeFilters.brand;

      const matchesType =
        activeFilters.type === "All" ||
        p.type === activeFilters.type;

      return matchesSearch && matchesBrand && matchesType;
    });
  }, [debouncedSearch, activeFilters, products]);

  return (
    <div style={page}>
      <SEO title="Shop" description="Browse our full collection of luxury skincare products from Avène, La Roche-Posay, and more. Find your perfect routine." />
      {/* HEADER */}
      <div style={header}>
        <h1 style={title}>Discover Skincare ✨</h1>
        <p style={subtitle}>
          Curated luxury skincare for every skin type
        </p>
      </div>

      {/* SEARCH */}
      <div style={searchBox}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products, brands, concerns..."
          style={input}
        />
        {search && (
          <button onClick={() => setSearch("")} style={clearBtn}>
            ✕
          </button>
        )}
      </div>

      {/* COLLECTIONS QUICK ACCESS */}
      {collections.length > 0 && (
        <div style={group}>
          <span style={label}>Collections</span>
          <div style={pills}>
            {collections.map((col) => (
              <button
                key={col.id}
                onClick={() =>
                  (window.location.href = `/collection/${col.handle}`)
                }
                style={pill(false)}
              >
                {col.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FILTERS */}
      <div style={filtersRow}>
        <div style={group}>
          <span style={label}>Brand</span>
          <div style={pills}>
            {brands.map((b) => (
              <button
                key={b}
                onClick={() =>
                  setActiveFilters((f) => ({ ...f, brand: b }))
                }
                style={pill(activeFilters.brand === b)}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div style={group}>
          <span style={label}>Type</span>
          <div style={pills}>
            {types.map((t) => (
              <button
                key={t}
                onClick={() =>
                  setActiveFilters((f) => ({ ...f, type: t }))
                }
                style={pill(activeFilters.type === t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RESULT COUNT */}
      {!loading && !error && (
        <div style={resultCount}>
          {filtered.length}{" "}
          {filtered.length === 1 ? "product" : "products"} found
        </div>
      )}

      {/* 💀 SKELETON LOADERS */}
      {loading && <ProductGridSkeleton count={8} />}

      {error && (
        <div style={empty}>
          <div style={{ fontSize: "40px" }}>⚠️</div>
          <h3>Couldn't load products</h3>
          <p>Please check your connection and try again.</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div style={empty}>
          <div style={{ fontSize: "40px" }}>🧴</div>
          <h3>No products found</h3>
          <p>Try changing filters or search</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div style={grid}>
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  background: theme.colors.bg,
  minHeight: "100vh",
  padding: "28px",
};

const header = { marginBottom: "18px" };

const title = {
  fontSize: "28px",
  fontWeight: "700",
  color: theme.colors.dark,
};

const subtitle = {
  color: theme.colors.primary,
  fontSize: "14px",
  marginTop: "4px",
};

const searchBox = {
  marginBottom: "18px",
  position: "relative",
};

const input = {
  width: "100%",
  padding: "12px 40px 12px 16px",
  borderRadius: theme.radius.button,
  border: `1px solid ${theme.colors.border}`,
  outline: "none",
  background: theme.colors.card,
  boxShadow: theme.shadow.card,
  boxSizing: "border-box",
};

const clearBtn = {
  position: "absolute",
  right: 14,
  top: "50%",
  transform: "translateY(-50%)",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: 16,
  color: "#999",
};

const filtersRow = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  marginBottom: "24px",
};

const group = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  marginBottom: "14px",
};

const label = {
  fontSize: "12px",
  fontWeight: "600",
  color: theme.colors.dark,
};

const pills = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
};

const pill = (active) => ({
  padding: "8px 14px",
  borderRadius: theme.radius.button,
  border: `1px solid ${theme.colors.border}`,
  background: active ? theme.colors.primary : theme.colors.card,
  color: active ? "#fff" : theme.colors.dark,
  cursor: "pointer",
  fontSize: "13px",
  transition: "0.2s ease",
});

const resultCount = {
  fontSize: 12,
  color: "#888",
  marginBottom: 14,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
  gap: "18px",
};

const empty = {
  textAlign: "center",
  padding: "60px 20px",
  background: theme.colors.card,
  borderRadius: theme.radius.card,
  border: `1px solid ${theme.colors.border}`,
  boxShadow: theme.shadow.card,
};