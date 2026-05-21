import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../theme";

export default function QuickViewModal({
  product,
  onClose,
  onAdd,
  wishlist = [],
  toggleWishlist,
}) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleEsc);
    return () =>
      window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const isWishlisted = wishlist?.some(
    (p) => p.id === product?.id
  );

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          style={overlay}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            style={modal}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 22,
            }}
          >
            {/* CLOSE */}
            <button onClick={onClose} style={closeBtn}>
              ✕
            </button>

            {/* IMAGE */}
            <div style={imageBox}>
              <motion.img
                src={product.image}
                alt={product.name}
                style={image}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* CONTENT */}
            <div style={content}>
              <p style={brand}>{product.brand}</p>

              <h2 style={title}>{product.name}</h2>

              <p style={desc}>{product.description}</p>

              {/* TAGS */}
              <div style={tags}>
                {product.skinType?.map((t) => (
                  <span key={t} style={tag}>
                    {t}
                  </span>
                ))}
              </div>

              {/* PRICE */}
              <div style={price}>
                ${product.price}
              </div>

              {/* ACTIONS */}
              <button
                onClick={() => onAdd?.(product)}
                style={addBtn}
              >
                Add to Cart
              </button>

              <button
                onClick={() =>
                  toggleWishlist?.(product)
                }
                style={wishBtn(isWishlisted)}
              >
                {isWishlisted
                  ? "❤️ In Wishlist"
                  : "🤍 Add to Wishlist"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================= STYLES ================= */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
  backdropFilter: "blur(10px)",
};

const modal = {
  width: "860px",
  maxWidth: "92%",
  background: "#fff",
  borderRadius: "20px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  overflow: "hidden",
  boxShadow: "0 30px 90px rgba(0,0,0,0.35)",
  position: "relative",
};

const closeBtn = {
  position: "absolute",
  top: "12px",
  right: "14px",
  border: "none",
  background: "white",
  width: "38px",
  height: "38px",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "16px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
};

const imageBox = {
  background: "#fafafa",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "35px",
};

const image = {
  width: "100%",
  maxHeight: "380px",
  objectFit: "cover",
  borderRadius: "14px",
};

const content = {
  padding: "28px",
};

const brand = {
  fontSize: "12px",
  color: theme.colors.primary,
  textTransform: "uppercase",
  fontWeight: "600",
  letterSpacing: "1px",
};

const title = {
  fontSize: "24px",
  marginTop: "6px",
  color: theme.colors.dark,
};

const desc = {
  fontSize: "13px",
  color: theme.colors.muted,
  marginTop: "10px",
  lineHeight: "1.6",
};

const tags = {
  display: "flex",
  gap: "8px",
  marginTop: "14px",
  flexWrap: "wrap",
};

const tag = {
  fontSize: "11px",
  padding: "6px 10px",
  borderRadius: "999px",
  background: "#f4f4f4",
  color: "#333",
};

const price = {
  marginTop: "16px",
  fontSize: "20px",
  fontWeight: "700",
  color: theme.colors.dark,
};

const addBtn = {
  marginTop: "18px",
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: theme.colors.primary,
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
};

const wishBtn = (active) => ({
  marginTop: "10px",
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #eee",
  background: active ? "#ffe8ee" : "white",
  color: "#333",
  cursor: "pointer",
});