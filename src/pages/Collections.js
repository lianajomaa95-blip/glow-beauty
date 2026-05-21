import { useNavigate } from "react-router-dom";
import { useCollections } from "../hooks/useCollections";
import { theme } from "../theme";

export default function Collections() {
  const navigate = useNavigate();

  // 🛍️ FETCH COLLECTIONS FROM SHOPIFY
  const { collections, loading, error } = useCollections();

  return (
    <div style={page}>
      {/* HEADER */}
      <div style={header}>
        <h1 style={title}>Collections</h1>
        <p style={sub}>
          Curated skincare routines designed for real skin needs
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div style={{ textAlign: "center", padding: 40, color: "#888" }}>
          ✨ Loading collections...
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div style={{ textAlign: "center", padding: 40, color: "#c33" }}>
          Couldn't load collections.
        </div>
      )}

      {/* EMPTY */}
      {!loading && !error && collections.length === 0 && (
        <div style={{ textAlign: "center", padding: 40, color: "#888" }}>
          No collections yet. Create some in your Shopify admin!
        </div>
      )}

      {/* GRID */}
      {!loading && collections.length > 0 && (
        <div style={grid}>
          {collections.map((col) => (
            <div
              key={col.id}
              style={card}
              onClick={() => navigate(`/collection/${col.handle}`)}
            >
              {/* IMAGE */}
              <div style={imageWrap}>
                {col.image ? (
                  <img src={col.image} alt={col.name} style={img} />
                ) : (
                  <div style={imagePlaceholder}>🧴</div>
                )}
              </div>

              {/* CONTENT */}
              <div style={content}>
                <h2 style={name}>{col.name}</h2>
                <p style={subtitle}>{col.subtitle || "Explore the collection"}</p>

                <button style={btn}>Explore Collection</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  padding: "40px 24px",
  background: theme.colors.bg,
  minHeight: "100vh",
};

const header = {
  textAlign: "center",
  marginBottom: "40px",
};

const title = {
  fontSize: "32px",
  fontWeight: "700",
};

const sub = {
  color: theme.colors.muted,
  marginTop: "8px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "20px",
};

const card = {
  background: "white",
  borderRadius: "18px",
  overflow: "hidden",
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  cursor: "pointer",
  transition: "0.3s ease",
};

const imageWrap = {
  height: "180px",
  overflow: "hidden",
};

const img = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "0.4s ease",
};

const imagePlaceholder = {
  width: "100%",
  height: "100%",
  background: "linear-gradient(135deg, #fde6e9, #fff)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 50,
};

const content = {
  padding: "16px",
};

const name = {
  fontSize: "18px",
  fontWeight: "700",
};

const subtitle = {
  fontSize: "13px",
  color: theme.colors.muted,
  marginTop: "6px",
};

const btn = {
  marginTop: "14px",
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  border: "none",
  background: theme.colors.primary,
  color: "white",
  cursor: "pointer",
};