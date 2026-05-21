// src/shopify/collections.js
//
// Fetch collections (categories) from Shopify Storefront API.
// Each collection has products inside, so we transform them the same way
// we transform standalone products.

import { shopifyFetch } from "./client";

/* ============================================================
   GRAPHQL QUERIES
   ============================================================ */

const COLLECTIONS_QUERY = `
  query getCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

const COLLECTION_BY_HANDLE_QUERY = `
  query getCollectionByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      handle
      title
      description
      image {
        url
        altText
      }
      products(first: 50) {
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
  }
`;

/* ============================================================
   HELPERS
   ============================================================ */

function extractNumericId(gid) {
  if (!gid) return null;
  const parts = gid.split("/");
  return parts[parts.length - 1];
}

function transformProduct(node) {
  if (!node) return null;

  const images = node.images?.edges?.map((e) => e.node.url) || [];
  const firstVariant = node.variants?.edges?.[0]?.node;
  const tags = node.tags || [];

  return {
    id: extractNumericId(node.id),
    shopifyId: node.id,
    handle: node.handle,
    name: node.title,
    brand: node.vendor || "",
    type: node.productType || "",
    category: "Skincare",
    description: node.description || "",
    price: parseFloat(node.priceRange?.minVariantPrice?.amount || 0),
    currency: node.priceRange?.minVariantPrice?.currencyCode || "USD",
    image: images[0] || "",
    images: images.length > 0 ? images : [],
    tags,
    skinType: tags,
    concerns: tags,
    ingredients: [],
    available: node.availableForSale,
    variantId: firstVariant?.id || null,
  };
}

function transformCollection(node) {
  if (!node) return null;

  return {
    id: extractNumericId(node.id),
    shopifyId: node.id,
    handle: node.handle,
    name: node.title,
    subtitle: node.description || "",
    description: node.description || "",
    image: node.image?.url || "",
    // products array is only filled when fetching by handle
    products:
      node.products?.edges?.map((edge) => transformProduct(edge.node)) ||
      [],
  };
}

/* ============================================================
   PUBLIC API
   ============================================================ */

/**
 * Fetch all collections (the list, without products inside).
 */
export async function fetchCollections(first = 20) {
  const data = await shopifyFetch(COLLECTIONS_QUERY, { first });
  const edges = data?.collections?.edges || [];
  return edges.map((edge) => transformCollection(edge.node));
}

/**
 * Fetch a single collection by its handle, INCLUDING its products.
 */
export async function fetchCollectionByHandle(handle) {
  const data = await shopifyFetch(COLLECTION_BY_HANDLE_QUERY, { handle });
  return transformCollection(data?.collectionByHandle);
}