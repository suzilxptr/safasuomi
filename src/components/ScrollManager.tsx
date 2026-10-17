import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Jumps to top on page changes and smooth-scrolls to #hash targets.
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    const pageChanged = previousPath.current !== null && previousPath.current !== pathname;
    previousPath.current = pathname;

    if (pageChanged) window.scrollTo({ top: 0, behavior: "instant" });

    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: "smooth" });
    } else if (!pageChanged) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash, key]);

  return null;
}
