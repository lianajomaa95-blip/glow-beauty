// src/utils/specialCollections.js
//
// Smart collection generators — dynamically curated from your product catalog.
// These collections auto-update as your inventory changes.

/* ============================================================
   💎 BEST SELLERS
   ============================================================
   Since we don't have real sales data on a demo site, we use a
   deterministic algorithm to "rank" products as bestsellers:
   - Mix of brands (40% LRP, 60% Avène alternating)
   - Across categories (variety > duplicates)
   - Stable order (same products always show in same position)
*/
export function getBestSellers(products, limit = 12) {
  if (!Array.isArray(products) || products.length === 0) return [];

  // Deterministic "bestseller" score based on product attributes
  const scored = products
    .filter((p) => p.available !== false)
    .map((p) => {
      // Hash the product name for a stable pseudo-random score
      const nameHash = (p.name || "").split("").reduce(
        (acc, char) => acc + char.charCodeAt(0),
        0
      );

      // Bonus for popular product types
      const typeBonus = {
        Cleanser: 8,
        Sunscreen: 9,
        Serum: 7,
        Moisturizer: 8,
        Treatment: 5,
      };

      const baseScore = nameHash % 10;
      const bonus = typeBonus[p.type] || 3;
      const priceBonus = p.price > 20 && p.price < 60 ? 3 : 0; // mid-range = popular

      return {
        ...p,
        bestSellerScore: baseScore + bonus + priceBonus,
      };
    });

  // Sort by score, take top N
  scored.sort((a, b) => b.bestSellerScore - a.bestSellerScore);

  // Ensure brand variety (don't show all of one brand)
  const result = [];
  const brandCounts = {};

  for (const product of scored) {
    const brand = product.brand || "Unknown";
    const currentCount = brandCounts[brand] || 0;

    // Limit to ~half per brand
    if (currentCount < Math.ceil(limit / 1.5)) {
      result.push(product);
      brandCounts[brand] = currentCount + 1;
    }

    if (result.length >= limit) break;
  }

  return result;
}

/* ============================================================
   💰 PRICE-BASED COLLECTIONS
   ============================================================ */

export function getUnder30(products) {
  if (!Array.isArray(products)) return [];
  return products
    .filter((p) => p.available !== false && Number(p.price) <= 30)
    .sort((a, b) => Number(a.price) - Number(b.price));
}

export function getPremium(products) {
  if (!Array.isArray(products)) return [];
  return products
    .filter((p) => p.available !== false && Number(p.price) >= 50)
    .sort((a, b) => Number(b.price) - Number(a.price));
}

export function getMidRange(products) {
  if (!Array.isArray(products)) return [];
  return products
    .filter(
      (p) =>
        p.available !== false &&
        Number(p.price) > 30 &&
        Number(p.price) < 50
    )
    .sort((a, b) => Number(a.price) - Number(b.price));
}

/* ============================================================
   🎁 SPECIAL COLLECTIONS METADATA
   ============================================================ */

export const SPECIAL_COLLECTIONS = [
  {
    handle: "best-sellers",
    name: "Best Sellers",
    eyebrow: "MOST LOVED",
    description: "Our community's favorite picks — tried, tested, and adored",
    icon: "💎",
    gradient: "linear-gradient(135deg, #7d2a3c 0%, #c2687a 100%)",
    getProducts: (products) => getBestSellers(products, 12),
  },
  {
    handle: "under-30",
    name: "Under $30",
    eyebrow: "EVERYDAY ESSENTIALS",
    description: "Affordable luxury — premium skincare without the premium price",
    icon: "💰",
    gradient: "linear-gradient(135deg, #2d5016 0%, #5a8c3a 100%)",
    getProducts: (products) => getUnder30(products),
  },
  {
    handle: "premium",
    name: "Premium Collection",
    eyebrow: "LUXURY EDIT",
    description: "Investment pieces for those who treat their skin like silk",
    icon: "✨",
    gradient: "linear-gradient(135deg, #4a2c2a 0%, #8b6f47 100%)",
    getProducts: (products) => getPremium(products),
  },
];

export function getSpecialCollectionByHandle(handle) {
  return SPECIAL_COLLECTIONS.find((c) => c.handle === handle);
}