"use client";
import { ReactLenis } from "lenis/react";
import { useEffect, useState, useMemo } from "react";

function SmoothScrolling({ children }) {
  // Avoid hydration mismatches by only enabling Lenis on the client
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize options to keep a stable reference
  const lenisOptions = useMemo(
    () => ({
      lerp: 0.1,
      duration: 1.5,
      smoothTouch: false,
      smooth: true,
    }),
    []
  );

  // On the server and during the first client render, render children directly
  // After mount, wrap with ReactLenis which may mutate <html>/<body> attributes
  if (!mounted) return children;

  return (
    <ReactLenis root options={lenisOptions}>{children}</ReactLenis>
  );
}

export default SmoothScrolling;
