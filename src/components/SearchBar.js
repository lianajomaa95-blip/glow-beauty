import { useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/products";

export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results =
    query.trim().length > 0
      ? products
          .map((p) => {
            const text = (p.name + p.brand + p.category).toLowerCase();
            const q = query.toLowerCase();

            let score = 0;

            // scoring system (smart ranking)
            if (text.includes(q)) score += 2;
            if (p.name.toLowerCase().includes(q)) score += 3;
            if (p.brand.toLowerCase().includes(q)) score += 2;
            if (p.category.toLowerCase().includes(q)) score += 1;

            return { ...p, score };
          })
          .filter((p) => p.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 6)
      : [];

  const handleSelect = (product) => {
    setQuery("");
    onClose?.();
    navigate(`/product/${product.id}`);
  };

  return (
    <div style={wrapper}>
      {/* INPUT */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search skincare, brands, products..."
        style={input}
      />

      {/* DROPDOWN */}
      {results.length > 0 && (
        <div style={dropdown}>
          {results.map((product) => (
            <div
              key={product.id}
              onClick={() => handleSelect(product)}
              style={item}
            >
              <img src={product.image} alt={product.name} style={img} />

              <div style={{ flex: 1 }}>
                <p style={name}>{product.name}</p>
                <p style={brand}>{product.brand}</p>
              </div>

              <span style={price}>${product.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const wrapper = {
  position: "relative",
  width: "100%",
};

const input = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #e5e5e5",
  outline: "none",
  fontSize: "14px",
  background: "#fff",
};

const dropdown = {
  position: "absolute",
  top: "48px",
  left: 0,
  right: 0,
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
  maxHeight: "300px",
  overflowY: "auto",
  zIndex: 999,
};

const item = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px",
  cursor: "pointer",
  borderBottom: "1px solid #f3f3f3",
};

const img = {
  width: "40px",
  height: "40px",
  objectFit: "cover",
  borderRadius: "8px",
};

const name = {
  fontSize: "13px",
  margin: 0,
  fontWeight: "600",
};

const brand = {
  fontSize: "11px",
  margin: 0,
  color: "#888",
};

const price = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#c2687a",
};