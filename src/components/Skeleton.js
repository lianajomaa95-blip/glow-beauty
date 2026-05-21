// src/components/Skeleton.js
//
// Reusable skeleton loaders — gray pulsing boxes shown while content loads.
// Way more professional than "Loading..." text.

import { theme } from "../theme";

/* ============================================================
   ONE PRODUCT CARD SKELETON
   ============================================================ */

export function ProductCardSkeleton() {
  return (
    <div style={card}>
      <div style={{ ...box, height: 240 }} />
      <div style={{ padding: 15 }}>
        <div style={{ ...box, width: "30%", height: 10, marginBottom: 10 }} />
        <div style={{ ...box, width: "80%", height: 16, marginBottom: 8 }} />
        <div style={{ ...box, width: "60%", height: 12, marginBottom: 14 }} />
        <div style={footer}>
          <div style={{ ...box, width: 50, height: 18 }} />
          <div style={{ ...box, width: 80, height: 32, borderRadius: 10 }} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   GRID OF PRODUCT SKELETONS
   ============================================================ */

export function ProductGridSkeleton({ count = 4 }) {
  return (
    <div style={grid}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

/* ============================================================
   COLLECTION CARD SKELETON
   ============================================================ */

export function CollectionCardSkeleton() {
  return (
    <div style={collectionCard}>
      <div style={{ ...box, height: 120, borderRadius: 0 }} />
      <div style={{ padding: 14 }}>
        <div style={{ ...box, width: "70%", height: 14, margin: "0 auto" }} />
      </div>
    </div>
  );
}

export function CollectionGridSkeleton({ count = 3 }) {
  return (
    <div style={collectionGrid}>
      {Array.from({ length: count }).map((_, i) => (
        <CollectionCardSkeleton key={i} />
      ))}
    </div>
  );
}

/* ============================================================
   STYLES
   ============================================================ */

const card = {
  background: theme.colors.card,
  borderRadius: theme.radius.card,
  overflow: "hidden",
  border: `1px solid ${theme.colors.border}`,
  boxShadow: theme.shadow.card,
};

const box = {
  background: "linear-gradient(90deg, #f0f0f0 25%, #e5e5e5 50%, #f0f0f0 75%)",
  backgroundSize: "200% 100%",
  animation: "skeletonShimmer 1.4s infinite",
  borderRadius: 6,
};

const footer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const grid = {
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
};

const collectionCard = {
  background: theme.colors.card,
  borderRadius: 20,
  overflow: "hidden",
  border: `1px solid ${theme.colors.border}`,
};

const collectionGrid = {
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
};

/* ============================================================
   INJECT GLOBAL KEYFRAMES (once)
   ============================================================ */

if (typeof document !== "undefined" && !document.getElementById("skeleton-keyframes")) {
  const style = document.createElement("style");
  style.id = "skeleton-keyframes";
  style.textContent = `
    @keyframes skeletonShimmer {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}