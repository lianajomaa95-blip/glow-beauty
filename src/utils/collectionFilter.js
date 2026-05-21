export function filterByCollection(products, collectionName) {
  if (!Array.isArray(products)) return [];

  switch (collectionName) {
    case "Glow Essentials":
      return products.filter((p) =>
        p.concerns?.includes("Dryness") ||
        p.concerns?.includes("Hydration") ||
        p.type === "Moisturizer"
      );

    case "Acne Control":
      return products.filter((p) =>
        p.concerns?.includes("Acne") ||
        p.concerns?.includes("Blemishes") ||
        p.type === "Treatment"
      );

    case "Sensitive Skin":
      return products.filter((p) =>
        p.skinType?.includes("Sensitive") ||
        p.concerns?.includes("Redness")
      );

    case "Anti-Aging Ritual":
      return products.filter((p) =>
        p.concerns?.includes("Anti-aging") ||
        p.type === "Serum"
      );

    default:
      return products;
  }
}