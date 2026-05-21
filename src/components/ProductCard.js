import { useState, useRef } from "react";
import { theme } from "../theme";
import { flyToCart } from "../utils/flyToCart";
import { formatPrice } from "../utils/format";
import { getProductBadge } from "../utils/productBadges";

export default function ProductCard({
  product,
  onAdd,
  wishlist = [],
  toggleWishlist,
  onQuickView,
}) {
  const [hovered, setHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef(null);

  if (!product) return null;

  const isWishlisted = wishlist?.some((p) => p.id === product.id);
  const isAvailable =
    product.available === undefined ? true : product.available;

  const badge = getProductBadge(product);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...card,
        animation: "fadeInUp 0.4s ease both",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 20px 40px rgba(125,42,60,0.12)"
          : "0 4px 14px rgba(0,0,0,0.04)",
      }}
    >
      {/* IMAGE */}
      <div style={imageWrap}>
        {!imageLoaded && <div style={imagePlaceholder} />}

        <img
          ref={imgRef}
          src={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          style={{
            ...image,
            opacity: imageLoaded ? 1 : 0,
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
        />

        {/* Shine effect on hover */}
        {hovered && <div style={shineOverlay} />}

        {/* 💎 BADGE */}
        {badge && !product.available === false && (
          <div
            style={{
              ...badgeStyle,
              background: badge.bg,
              color: badge.color,
            }}
          >
            {badge.label}
          </div>
        )}

        {/* OUT OF STOCK BADGE (overrides product badge) */}
        {!isAvailable && (
          <div style={outOfStockBadge}>Out of Stock</div>
        )}

        {/* WISHLIST */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist?.(product);
          }}
          style={wishlistBtn}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>

        {/* QUICK VIEW */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView?.(product);
          }}
          style={{
            ...quickViewBtn,
            bottom: hovered ? "14px" : "-50px",
            opacity: hovered ? 1 : 0,
          }}
        >
          QUICK VIEW
        </button>
      </div>

      {/* CONTENT */}
      <div style={content}>
        <p style={brand}>{product.brand}</p>

        <h3 style={name}>{product.name}</h3>

        <p style={desc}>{product.description}</p>

        <div style={footer}>
          <strong style={price}>
            {formatPrice(product.price, product.currency || "USD")}
          </strong>

          <button
            disabled={!isAvailable}
            onClick={(e) => {
              e.stopPropagation();
              if (!isAvailable) return;
              onAdd?.(product);

              const cartIcon = document.querySelector("[data-cart-icon]");
              flyToCart(imgRef.current, cartIcon);
            }}
            style={{
              ...addBtn,
              background: isAvailable ? theme.colors.dark : "#cccccc",
              cursor: isAvailable ? "pointer" : "not-allowed",
            }}
          >
            {isAvailable ? "Add to Bag" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const card = {
  position: "relative",
  background: theme.colors.card,
  borderRadius: 4,
  overflow: "hidden",
  border: `1px solid ${theme.colors.border}`,
  cursor: "pointer",
  transition: "all 0.4s ease",
};

const imageWrap = {
  height: "280px",
  position: "relative",
  overflow: "hidden",
  background: "#fafafa",
};

const imagePlaceholder = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(90deg, #f5f5f5 25%, #ececec 50%, #f5f5f5 75%)",
  backgroundSize: "200% 100%",
  animation: "skeletonShimmer 1.4s infinite",
};

const image = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.6s ease, opacity 0.4s ease",
};

const shineOverlay = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
  backgroundSize: "200% 200%",
  animation: "shine 1.5s ease-out",
  pointerEvents: "none",
};

const badgeStyle = {
  position: "absolute",
  top: 14,
  left: 14,
  padding: "5px 12px",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.15em",
  zIndex: 2,
};

const outOfStockBadge = {
  position: "absolute",
  top: 14,
  left: 14,
  background: "#1a1a1a",
  color: "#fff",
  padding: "5px 12px",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.15em",
  zIndex: 3,
};

const wishlistBtn = {
  position: "absolute",
  top: 14,
  right: 14,
  width: "38px",
  height: "38px",
  borderRadius: "50%",
  border: "none",
  background: "white",
  cursor: "pointer",
  boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
  zIndex: 2,
  fontSize: 16,
};

const quickViewBtn = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  background: "rgba(255,255,255,0.95)",
  border: "none",
  padding: "10px 20px",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.2em",
  cursor: "pointer",
  transition: "0.3s ease",
  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  zIndex: 2,
  color: theme.colors.dark,
};

const content = {
  padding: "18px 16px",
};

const brand = {
  fontSize: 10,
  color: theme.colors.primary,
  textTransform: "uppercase",
  fontWeight: 700,
  letterSpacing: "0.2em",
  margin: 0,
};

const name = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 16,
  fontWeight: 600,
  color: theme.colors.dark,
  margin: "8px 0 0",
  minHeight: 42,
  lineHeight: 1.3,
  letterSpacing: "-0.01em",
};

const desc = {
  fontSize: 12,
  color: theme.colors.muted,
  marginTop: 8,
  minHeight: 36,
  lineHeight: 1.5,
  marginBottom: 0,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const footer = {
  marginTop: 16,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
};

const price = {
  fontSize: 17,
  fontWeight: 600,
  color: theme.colors.dark,
  fontFamily: "'Playfair Display', serif",
};

const addBtn = {
  color: "white",
  border: "none",
  padding: "10px 16px",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.15em",
  transition: "0.2s ease",
  textTransform: "uppercase",
};