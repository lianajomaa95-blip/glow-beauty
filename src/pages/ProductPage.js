import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import SEO from "../components/SEO";
import useProduct from "../hooks/useProduct";
import ProductReviews from "../components/ProductReviews";
import Breadcrumbs from "../components/Breadcrumbs";
import { formatPrice } from "../utils/format";
import { theme } from "../theme";

export default function ProductPage({
  addToCart,
  wishlist,
  toggleWishlist,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const { product, loading, error } = useProduct(id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (loading) {
    return (
      <div style={page}>
        <Breadcrumbs
  items={[
    { label: "Skincare", to: "/skincare" },
    { label: product.brand, to: `/brand/${product.brand?.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` },
    { label: product.name },
  ]}
/>
        <div style={container} className="product-grid">
          <div style={imageSection}>
            <div
              style={{
                ...mainImageBox,
                background:
                  "linear-gradient(90deg, #f0f0f0 25%, #e5e5e5 50%, #f0f0f0 75%)",
                backgroundSize: "200% 100%",
                animation: "skeletonShimmer 1.4s infinite",
              }}
            />
          </div>
          <div style={infoSection}>
            {[80, 220, 14, 14, 60, 50, 50].map((h, i) => (
              <div
                key={i}
                style={{
                  height: i < 3 ? h / 5 : 14,
                  width: i === 0 ? 80 : i === 1 ? "70%" : "100%",
                  background:
                    "linear-gradient(90deg, #f0f0f0 25%, #e5e5e5 50%, #f0f0f0 75%)",
                  backgroundSize: "200% 100%",
                  animation: "skeletonShimmer 1.4s infinite",
                  borderRadius: 6,
                  marginBottom: 14,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>⚠️ Couldn't load product</h2>
        <p>Please check your connection.</p>
        <button onClick={() => navigate("/shop")}>Back to Shop</button>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Product not found</h2>
        <button onClick={() => navigate("/shop")}>Back to Shop</button>
      </div>
    );
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const isWishlisted = wishlist?.some((p) => p.id === product.id);
  const isAvailable =
    product.available === undefined ? true : product.available;

  return (
    <div style={page}>
      {/* 🔍 DYNAMIC SEO PER PRODUCT */}
      <SEO
        title={`${product.name} | ${product.brand}`}
        description={
          product.description
            ? product.description.slice(0, 155)
            : `Shop ${product.name} from ${product.brand} at GlowSkin.`
        }
      />

      <div style={container} className="product-grid">
        <div style={imageSection} className="product-image-section">
          <div
            style={{
              ...mainImageBox,
              transform: zoom ? "scale(1.05)" : "scale(1)",
            }}
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
          >
            {!imageLoaded && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, #f0f0f0 25%, #e5e5e5 50%, #f0f0f0 75%)",
                  backgroundSize: "200% 100%",
                  animation: "skeletonShimmer 1.4s infinite",
                  borderRadius: 20,
                }}
              />
            )}
            <img
              src={images[selectedImage]}
              alt={product.name}
              onLoad={() => setImageLoaded(true)}
              style={{
                ...mainImage,
                opacity: imageLoaded ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
            />

            {!isAvailable && (
              <div style={outOfStockBadge}>Out of Stock</div>
            )}
          </div>

          {images.length > 1 && (
            <div style={thumbRow}>
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  onClick={() => {
                    setSelectedImage(i);
                    setImageLoaded(false);
                  }}
                  style={{
                    ...thumb,
                    border:
                      selectedImage === i
                        ? `2px solid ${theme.colors.primary}`
                        : "1px solid #eee",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div style={infoSection}>
          <p style={brand}>{product.brand}</p>
          <h1 style={title}>{product.name}</h1>
          <p style={desc}>{product.description}</p>
          <h2 style={price}>
            {formatPrice(product.price, product.currency || "USD")}
          </h2>

          <div style={tags}>
            {product.skinType?.map((t) => (
              <span key={t} style={tag}>
                {t}
              </span>
            ))}
          </div>

          <button
            disabled={!isAvailable}
            onClick={() => isAvailable && addToCart(product)}
            style={{
              ...primaryBtn,
              background: isAvailable ? theme.colors.primary : "#cccccc",
              cursor: isAvailable ? "pointer" : "not-allowed",
            }}
          >
            {isAvailable ? "Add to Cart" : "Currently Unavailable"}
          </button>

          <button
            onClick={() => toggleWishlist(product)}
            style={{
              ...secondaryBtn,
              background: isWishlisted ? theme.colors.primary : "transparent",
              color: isWishlisted ? "white" : theme.colors.dark,
            }}
          >
            {isWishlisted
              ? "❤️ Remove from Wishlist"
              : "🤍 Add to Wishlist"}
          </button>
        </div>
      </div>

      <div style={reviewsWrap}>
        <ProductReviews productId={product.id} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .product-image-section {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  background: theme.colors.bg,
  minHeight: "100vh",
  padding: "30px 16px 40px",
};

const container = {
  maxWidth: 1100,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 40,
};

const imageSection = { position: "sticky", top: 100 };

const mainImageBox = {
  width: "100%",
  height: 420,
  borderRadius: 20,
  overflow: "hidden",
  background: theme.colors.card,
  transition: "0.3s ease",
  position: "relative",
};

const mainImage = { width: "100%", height: "100%", objectFit: "cover" };

const outOfStockBadge = {
  position: "absolute",
  top: 16,
  left: 16,
  background: "#333",
  color: "#fff",
  padding: "6px 14px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
};

const thumbRow = { display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" };

const thumb = {
  width: 60,
  height: 60,
  objectFit: "cover",
  borderRadius: 10,
  cursor: "pointer",
};

const infoSection = {
  background: theme.colors.card,
  padding: 30,
  borderRadius: 20,
};

const brand = {
  color: theme.colors.primary,
  fontSize: 12,
  textTransform: "uppercase",
};

const title = { fontSize: 28, marginTop: 6, color: theme.colors.dark };

const desc = { marginTop: 10, color: theme.colors.muted, lineHeight: 1.6 };

const price = { marginTop: 18, fontSize: 22, color: theme.colors.dark };

const tags = { display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" };

const tag = {
  padding: "6px 10px",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: 20,
  fontSize: 12,
  color: theme.colors.text,
};

const primaryBtn = {
  marginTop: 20,
  width: "100%",
  padding: 14,
  color: "white",
  border: "none",
  borderRadius: 12,
};

const secondaryBtn = {
  marginTop: 10,
  width: "100%",
  padding: 14,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: 12,
  cursor: "pointer",
};

const reviewsWrap = { maxWidth: 1100, margin: "30px auto 0" };