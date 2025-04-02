"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show the toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="focus:outline-none"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Image
        src={isDark ? "/images/icon-sun.svg" : "/images/icon-moon.svg"}
        alt={isDark ? "Sun icon" : "Moon icon"}
        width={26}
        height={26}
      />
    </button>
  );
}
