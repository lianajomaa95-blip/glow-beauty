// src/hooks/useCollections.js
//
// Two hooks:
//   - useCollections() → list all collections
//   - useCollection(handle) → fetch one collection by handle (includes products)

import { useEffect, useState } from "react";
import {
  fetchCollections,
  fetchCollectionByHandle,
} from "../shopify/collections";

export function useCollections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const data = await fetchCollections(20);
        if (!cancelled) {
          setCollections(data);
          setError(null);
        }
      } catch (err) {
        console.error("Failed to fetch collections:", err);
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { collections, loading, error };
}

export function useCollection(handle) {
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    if (!handle) return;

    (async () => {
      try {
        setLoading(true);
        const data = await fetchCollectionByHandle(handle);
        if (!cancelled) {
          setCollection(data);
          setError(null);
        }
      } catch (err) {
        console.error("Failed to fetch collection:", err);
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [handle]);

  return { collection, loading, error };
}