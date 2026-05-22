// src/components/SEO.js

import { useEffect } from "react";

const DEFAULT_TITLE = "Aura Store — Curated Luxury Skincare";
const DEFAULT_DESCRIPTION =
  "Discover curated luxury skincare from Avène and La Roche-Posay. Dermatologist-approved formulas, personalized routines, and expert recommendations for every skin type.";

export default function SEO({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = `${title} — Aura Store`;
    } else {
      document.title = DEFAULT_TITLE;
    }

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description || DEFAULT_DESCRIPTION);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute(
        "content",
        title ? `${title} — Aura Store` : DEFAULT_TITLE
      );
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute("content", description || DEFAULT_DESCRIPTION);
    }

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title, description]);

  return null;
}