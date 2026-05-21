// src/utils/productBadges.js
//
// Determines which badge (if any) to show on a product card.
// Uses product attributes to assign badges in a deterministic way.

/**
 * Returns badge info for a product, or null if no badge applies.
 *
 * Logic:
 * - If price >= $50 → "LUXE"
 * - Otherwise use a stable hash from product ID to assign:
 *   - Some products → "NEW"
 *   - Some products → "BESTSELLER"
 *   - Some products → "EXCLUSIVE"
 *   - Most products → no badge
 */
export function getProductBadge(product) {
  if (!product) return null;

  // 💎 Premium products
  if (Number(product.price) >= 50) {
    return { label: "LUXE", color: "#7d2a3c", bg: "#fce5ec" };
  }

  // Use deterministic hash so the same product always gets the same badge
  const id = String(product.id || "");
  const hash = id
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);

  // About 25% of products get badges (random-but-stable)
  const mod = hash % 12;

  if (mod === 0) {
    return { label: "NEW", color: "#1d8a3f", bg: "#d7f5df" };
  }

  if (mod === 1 || mod === 2) {
    return { label: "BESTSELLER", color: "#a76a00", bg: "#fff3cd" };
  }

  if (mod === 3) {
    return { label: "EXCLUSIVE", color: "#7d2a3c", bg: "#fce5ec" };
  }

  return null;
}