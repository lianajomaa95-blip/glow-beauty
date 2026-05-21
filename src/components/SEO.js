// src/components/SEO.js
//
// Dynamic SEO: changes the document title and meta description
// based on the current page. Helps SEO + makes browser tabs informative.

import { useEffect } from "react";

const DEFAULT_TITLE = "GlowSkin — Curated Luxury Skincare";
const DEFAULT_DESCRIPTION =
  "Discover curated luxury skincare from Avène and La Roche-Posay. Dermatologist-approved formulas, personalized routines, and expert recommendations for every skin type.";

export default function SEO({ title, description }) {
  useEffect(() => {
    // Update the document title
    if (title) {
      document.title = `${title} — GlowSkin`;
    } else {
      document.title = DEFAULT_TITLE;
    }

    // Update the meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description || DEFAULT_DESCRIPTION);
    }

    // Update Open Graph title (for shares)
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute(
        "content",
        title ? `${title} — GlowSkin` : DEFAULT_TITLE
      );
    }

    // Update Open Graph description
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute("content", description || DEFAULT_DESCRIPTION);
    }

    // Reset to default when component unmounts
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title, description]);

  return null;
}