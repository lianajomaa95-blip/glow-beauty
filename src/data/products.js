// src/data/products.js

const products = [
  {
    id: 1,
    name: "Toleriane Hydrating Gentle Cleanser",
    brand: "La Roche-Posay",
    category: "Skincare",
    type: "Cleanser",
    price: 18,
    image: "https://images.unsplash.com/photo-1612810436541-336d4d6f2c86",

    skinType: ["sensitive", "dry"],
    concerns: ["redness", "dryness"],

    description:
      "Gentle cleanser for sensitive and dry skin. Soothes and protects the skin barrier.",

    ingredients: ["Glycerin", "Thermal Water"],
  },

  {
    id: 2,
    name: "Effaclar Duo+",
    brand: "La Roche-Posay",
    category: "Skincare",
    type: "Treatment",
    price: 24,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",

    skinType: ["oily"],
    concerns: ["acne", "blemishes"],

    description:
      "Anti-acne treatment that helps reduce breakouts and unclog pores.",

    ingredients: ["Niacinamide", "Salicylic Acid"],
  },

  {
    id: 3,
    name: "Cicalfate+ Restorative Cream",
    brand: "Avène",
    category: "Skincare",
    type: "Moisturizer",
    price: 22,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883",

    skinType: ["sensitive"],
    concerns: ["irritation", "barrier repair"],

    description:
      "Repairs and soothes irritated skin while strengthening the skin barrier.",

    ingredients: ["Avène Thermal Water", "Zinc"],
  },

  {
    id: 4,
    name: "Hydrance Aqua-Gel",
    brand: "Avène",
    category: "Skincare",
    type: "Moisturizer",
    price: 25,
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6",

    skinType: ["normal", "dry"],
    concerns: ["dehydration"],

    description:
      "Lightweight gel-cream that deeply hydrates the skin.",

    ingredients: ["Glycerin", "Avène Thermal Water"],
  },

  {
    id: 5,
    name: "Keracnyl Foaming Gel",
    brand: "Ducray",
    category: "Skincare",
    type: "Cleanser",
    price: 16,
    image: "https://images.unsplash.com/photo-1612810436541-336d4d6f2c86",

    skinType: ["oily"],
    concerns: ["acne", "oil control"],

    description:
      "Purifying cleanser for acne-prone and oily skin.",

    ingredients: ["Myrtacine", "Zinc"],
  },

  {
    id: 6,
    name: "Revitalift Hyaluronic Serum",
    brand: "L'Oréal",
    category: "Skincare",
    type: "Serum",
    price: 20,
    image: "https://images.unsplash.com/photo-1612810436541-336d4d6f2c86",

    skinType: ["all"],
    concerns: ["hydration", "aging"],

    description:
      "Hydrating serum with hyaluronic acid for plumper skin.",

    ingredients: ["Hyaluronic Acid"],
  },
];

export default products;