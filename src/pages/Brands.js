import { useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { theme } from "../theme";

export default function Brands() {
  const navigate = useNavigate();
  const { products, loading } = useProducts();

  // Group products by brand
  const brands = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      if (!p.brand) return;
      if (!map[p.brand]) {
        map[p.brand] = { name: p.brand, count: 0, sample: p.image };
      }
      map[p.brand].count += 1;
    });
    return Object.values(map);
  }, [products]);

  const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={page}
    >
      <div style={header}>
        <h1 style={title}>Our Brands</h1>
        <p style={subtitle}>
          Trusted skincare brands recommended by dermatologists worldwide
        </p>
      </div>

      <div style={container}>
        {loading && (
          <div style={{ textAlign: "center", padding: 40, color: "#888" }}>
            Loading brands...
          </div>
        )}

        {!loading && brands.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: "#888" }}>
            No brands available yet.
          </div>
        )}

        {!loading && brands.length > 0 && (
          <div style={grid}>
            {brands.map((brand, i) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/brand/${slugify(brand.name)}`)}
                style={card}
              >
                <div style={imgBox}>
                  {brand.sample ? (
                    <img src={brand.sample} alt={brand.name} style={img} />
                  ) : (
                    <div style={placeholder}>🧴</div>
                  )}
                </div>
                <div style={content}>
                  <h2 style={brandName}>{brand.name}</h2>
                  <p style={count}>
                    {brand.count} {brand.count === 1 ? "product" : "products"}
                  </p>
                  <button style={btn}>Explore →</button>
                </div>
              </motion.div>
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
  padding: "50px 24px 30px",
  background: theme.colors.card,
  borderBottom: `1px solid ${theme.colors.border}`,
};

const title = {
  fontSize: 32,
  color: theme.colors.dark,
  margin: 0,
};

const subtitle = {
  color: theme.colors.muted,
  marginTop: 8,
};

const container = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "40px 24px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 20,
};

const card = {
  background: theme.colors.card,
  borderRadius: 20,
  overflow: "hidden",
  cursor: "pointer",
  boxShadow: theme.shadow.card,
  border: `1px solid ${theme.colors.border}`,
};

const imgBox = {
  height: 180,
  overflow: "hidden",
  background: "#fafafa",
};

const img = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const placeholder = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 50,
  background: "linear-gradient(135deg, #fde6e9, #fff)",
};

const content = {
  padding: 20,
};

const brandName = {
  fontSize: 22,
  fontWeight: 700,
  color: theme.colors.dark,
  margin: 0,
};

const count = {
  fontSize: 13,
  color: theme.colors.muted,
  marginTop: 4,
  marginBottom: 14,
};

const btn = {
  padding: "10px 16px",
  background: theme.colors.primary,
  color: "#fff",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 13,
};