// src/components/ScrollToTop.js
//
// Scrolls to top on every route change. Without this, React Router
// preserves scroll position which feels broken on a normal site.

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}