// src/shopify/client.js
//
// Low-level client for the Shopify Storefront API (GraphQL).
// We use plain fetch — no extra dependency required.

const DOMAIN = process.env.REACT_APP_SHOPIFY_DOMAIN;
const TOKEN = process.env.REACT_APP_SHOPIFY_TOKEN;
const API_VERSION =
  process.env.REACT_APP_SHOPIFY_API_VERSION || "2025-01";

if (!DOMAIN || !TOKEN) {
  console.warn(
    "⚠️ Missing Shopify credentials. Check your .env file " +
      "(REACT_APP_SHOPIFY_DOMAIN, REACT_APP_SHOPIFY_TOKEN) and restart npm start."
  );
}

const STOREFRONT_URL = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`;

/**
 * Run a GraphQL query against the Shopify Storefront API.
 *
 * @param {string} query - GraphQL query string
 * @param {object} variables - Optional variables for the query
 * @returns {Promise<object>} the `data` field of the GraphQL response
 */
export async function shopifyFetch(query, variables = {}) {
  const response = await fetch(STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(
      `Shopify API error: ${response.status} ${response.statusText}`
    );
  }

  const json = await response.json();

  if (json.errors) {
    console.error("Shopify GraphQL errors:", json.errors);
    throw new Error(json.errors[0]?.message || "Shopify GraphQL error");
  }

  return json.data;
}