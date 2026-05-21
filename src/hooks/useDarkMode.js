// src/hooks/useDarkMode.js
//
// Toggle dark / light mode. Stored in localStorage so it persists.

import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [isDark] = useState(() => {
    return localStorage.getItem("themeMode") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", isDark ? "dark" : "light");

    // Apply background to body so blank space is themed too
    document.body.style.background = isDark ? "#1a1419" : "#fff5f7";
    document.body.style.color = isDark ? "#f5f5f5" : "#1a1a1a";
    document.body.style.transition = "background 0.3s ease";
  }, [isDark]);

  // 💡 The theme object is loaded at startup from localStorage,
  // so switching requires a page reload to take full effect.
  // We do a soft reload here to apply the new theme everywhere.
  const toggle = () => {
    const next = !isDark;
    localStorage.setItem("themeMode", next ? "dark" : "light");
    window.location.reload();
  };

  return { isDark, toggle };
}