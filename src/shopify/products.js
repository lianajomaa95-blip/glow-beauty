// src/shopify/products.js
//
// Fetch products from Shopify and transform them into the shape the rest
// of the app already understands (same as the old src/data/products.js).

import { shopifyFetch } from "./client";

/* ============================================================
   GRAPHQL QUERIES
   ============================================================ */

const PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          vendor
          productType
          tags
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      description
      vendor
      productType
      tags
      availableForSale
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

/* ============================================================
   HELPERS
   ============================================================ */

/**
 * Extract the numeric ID from a Shopify GID.
 * "gid://shopify/Product/10349676921149" -> "10349676921149"
 */
function extractNumericId(gid) {
  if (!gid) return null;
  const parts = gid.split("/");
  return parts[parts.length - 1];
}

/**
 * Transform a raw Shopify product into the shape the rest of the app
 * already understands. Keep field names matching the old products.js.
 */
function transformProduct(node) {
  if (!node) return null;

  const images = node.images?.edges?.map((e) => e.node.url) || [];
  const firstVariant = node.variants?.edges?.[0]?.node;
  const tags = node.tags || [];

  return {
    // identity
    id: extractNumericId(node.id), // numeric — used in URLs
    shopifyId: node.id, // full gid — for cart/checkout later
    handle: node.handle,

    // basics
    name: node.title,
    brand: node.vendor || "",
    type: node.productType || "",
    category: "Skincare", // default — can later derive from collections/type
    description: node.description || "",

    // pricing
    price: parseFloat(node.priceRange?.minVariantPrice?.amount || 0),
    currency: node.priceRange?.minVariantPrice?.currencyCode || "USD",

    // media
    image: images[0] || "",
    images: images.length > 0 ? images : [],

    // tags (Shopify "tags" → we reuse for skinType + concerns until we split them)
    tags,
    skinType: tags,
    concerns: tags,

    // not in Shopify yet — keep empty so existing components don't crash
    ingredients: [],

    // stock + variant info (needed for cart/checkout)
    available: node.availableForSale,
    variantId: firstVariant?.id || null,
  };
}

/* ============================================================
   PUBLIC API
   ============================================================ */

/**
 * Fetch all products (up to `first`) from Shopify.
 */
export async function fetchProducts(first = 50) {
  const data = await shopifyFetch(PRODUCTS_QUERY, { first });
  const edges = data?.products?.edges || [];
  return edges.map((edge) => transformProduct(edge.node));
}

/**
 * Fetch a single product by its handle (URL-friendly slug).
 */
export async function fetchProductByHandle(handle) {
  const data = await shopifyFetch(PRODUCT_BY_HANDLE_QUERY, { handle });
  return transformProduct(data?.productByHandle);
}