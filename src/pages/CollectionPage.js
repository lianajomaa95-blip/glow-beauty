import { useParams, useNavigate } from "react-router-dom";
import { useCollection } from "../hooks/useCollections";
import ProductCard from "../components/ProductCard";
import { ProductGridSkeleton } from "../components/Skeleton";
import Breadcrumbs from "../components/Breadcrumbs";
import { theme } from "../theme";

export default function CollectionPage({
  addToCart,
  wishlist,
  toggleWishlist,
}) {
  const { handle } = useParams();
  const navigate = useNavigate();

  const { collection, loading, error } = useCollection(handle);

  if (loading) {
    return (
      
      <div style={page}>
        <Breadcrumbs
  items={[
    { label: "Skincare", to: "/skincare" },
    { label: collection?.name || "Collection" },
  ]}
/>
        <div style={header}>
          <div
            style={{
              height: 32,
              width: 200,
              background:
                "linear-gradient(90deg, #f0f0f0 25%, #e5e5e5 50%, #f0f0f0 75%)",
              backgroundSize: "200% 100%",
              animation: "skeletonShimmer 1.4s infinite",
              borderRadius: 6,
              margin: "0 auto",
            }}
          />
          <div
            style={{
              height: 14,
              width: 280,
              background:
                "linear-gradient(90deg, #f0f0f0 25%, #e5e5e5 50%, #f0f0f0 75%)",
              backgroundSize: "200% 100%",
              animation: "skeletonShimmer 1.4s infinite",
              borderRadius: 6,
              margin: "12px auto 0",
            }}
          />
        </div>
        <ProductGridSkeleton count={6} />
      </div>
    );
  }

  if (error || !collection) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Collection not found</h2>
        <button
          onClick={() => navigate("/collections")}
          style={{
            marginTop: "10px",
            padding: "10px 16px",
            border: "none",
            background: theme.colors.primary,
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Back to Collections
        </button>
      </div>
    );
  }

  const products = collection.products || [];

  return (
    <div style={page}>
      <div style={header}>
        <h1 style={title}>{collection.name}</h1>
        <p style={sub}>{collection.subtitle}</p>
        <p style={countText}>
          {products.length}{" "}
          {products.length === 1 ? "product" : "products"}
        </p>
      </div>

      {products.length > 0 ? (
        <div style={grid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      ) : (
        <p style={{ color: "#777", textAlign: "center" }}>
          No products in this collection yet.
        </p>
      )}
    </div>
  );
}

const page = {
  padding: "40px 24px",
  background: "#fafafa",
  minHeight: "100vh",
};

const header = { textAlign: "center", marginBottom: "30px" };

const title = { fontSize: "32px", fontWeight: "700" };

const sub = { color: "#666", marginTop: "6px" };

const countText = {
  color: theme.colors.primary,
  marginTop: "8px",
  fontSize: "13px",
  fontWeight: 600,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "16px",
};