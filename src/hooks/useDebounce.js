// src/hooks/useDebounce.js
//
// Delays a value update until the user stops changing it for `delay` ms.
// Used for search inputs so we don't filter on every keystroke.

import { useEffect, useState } from "react";

export default function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}