// src/hooks/useProducts.js
//
// React hook that fetches all products from Shopify.
// Returns { products, loading, error } so pages can show loaders / fallbacks.

import { useEffect, useState } from "react";
import { fetchProducts } from "../shopify/products";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(50);
        if (!cancelled) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        console.error("Failed to fetch products from Shopify:", err);
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
}