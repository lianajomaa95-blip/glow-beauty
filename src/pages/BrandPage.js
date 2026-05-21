import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { ProductGridSkeleton } from "../components/Skeleton";
import Breadcrumbs from "../components/Breadcrumbs";
import useProducts from "../hooks/useProducts";
import { theme } from "../theme";

export default function BrandPage({ addToCart, wishlist, toggleWishlist }) {
  const { handle } = useParams();
  const navigate = useNavigate();

  const { products, loading } = useProducts();
  const [activeType, setActiveType] = useState("All");

  // Find the actual brand name by matching handle
  const brandName = useMemo(() => {
    const slug = (s) =>
      s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const match = products.find((p) => p.brand && slug(p.brand) === handle);
    return match?.brand || handle;
  }, [products, handle]);

  // Filter products by this brand
  const brandProducts = useMemo(
    () => products.filter((p) => {
      const slug = (s) =>
        s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      return p.brand && slug(p.brand) === handle;
    }),
    [products, handle]
  );

  // Get unique types from this brand
  const types = useMemo(() => {
    const unique = Array.from(
      new Set(brandProducts.map((p) => p.type).filter(Boolean))
    );
    return ["All", ...unique];
  }, [brandProducts]);

  // Apply type filter
  const filtered = useMemo(
    () =>
      activeType === "All"
        ? brandProducts
        : brandProducts.filter((p) => p.type === activeType),
    [brandProducts, activeType]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={page}
    >
      {/* HEADER */}
      <div style={header}>
        <Breadcrumbs
  items={[
    { label: "Brands", to: "/brands" },
    { label: brandName },
  ]}
/>
        <button onClick={() => navigate("/brands")} style={backBtn}>
          ← All Brands
        </button>
        <h1 style={title}>{brandName}</h1>
        <p style={subtitle}>
          {brandProducts.length}{" "}
          {brandProducts.length === 1 ? "product" : "products"}
        </p>
      </div>

      <div style={container}>
        {/* TYPE FILTERS */}
        {types.length > 1 && (
          <div style={pills}>
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                style={pill(activeType === t)}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {/* PRODUCTS */}
        {loading && <ProductGridSkeleton count={8} />}

        {!loading && filtered.length === 0 && (
          <div style={empty}>
            <div style={{ fontSize: 40 }}>🧴</div>
            <h3>No products in this category</h3>
            <p>Try selecting a different type.</p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
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
    </motion.div>
  );
}

/* ================= STYLES ================= */

const page = {
  background: theme.colors.bg,
  minHeight: "100vh",
};

const header = {
  textAlign: "center",
  padding: "40px 24px 30px",
  background: theme.colors.card,
  borderBottom: `1px solid ${theme.colors.border}`,
  position: "relative",
};

const backBtn = {
  position: "absolute",
  left: 20,
  top: 30,
  background: "transparent",
  border: "none",
  color: theme.colors.primary,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
};

const title = {
  fontSize: 32,
  color: theme.colors.dark,
  margin: 0,
};

const subtitle = {
  color: theme.colors.muted,
  marginTop: 6,
  fontSize: 14,
};

const container = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "30px 24px 60px",
};

const pills = {
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  marginBottom: 26,
};

const pill = (active) => ({
  padding: "8px 14px",
  borderRadius: 999,
  border: `1px solid ${theme.colors.border}`,
  background: active ? theme.colors.primary : theme.colors.card,
  color: active ? "#fff" : theme.colors.dark,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 500,
  transition: "0.2s ease",
});

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
  gap: 18,
};

const empty = {
  textAlign: "center",
  padding: "60px 20px",
  background: theme.colors.card,
  borderRadius: 16,
  color: theme.colors.muted,
};