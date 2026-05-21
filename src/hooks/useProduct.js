// src/hooks/useProduct.js
//
// React hook that fetches ONE product.
// Since our URL uses /product/:id where :id is the numeric Shopify ID,
// we first try to find it in the already-fetched products list (faster),
// and only fall back to fetching by handle if that fails.

import { useEffect, useState } from "react";
import { fetchProducts } from "../shopify/products";

export default function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    if (!id) return;

    (async () => {
      try {
        setLoading(true);
        // For now we fetch all and find by id; small store, perfectly fine.
        // Later: switch to fetchProductByHandle when routes use the handle.
        const all = await fetchProducts(50);
        const found = all.find((p) => String(p.id) === String(id));
        if (!cancelled) {
          setProduct(found || null);
          setError(null);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { product, loading, error };
}