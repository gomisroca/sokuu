"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative inline-flex items-center rounded-sm transition-all duration-300 ${
        isDark
          ? "shadow-lg shadow-slate-900/50"
          : "shadow-md shadow-slate-400/20"
      } h-9 w-16 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span
        className={`absolute inset-y-1 inset-x-1 w-7 rounded-sm transition-transform duration-300 ${
          isDark ? "translate-x-7 bg-slate-700" : "translate-x-0 bg-white"
        }`}
      />

      {/* Icons with smooth fade transition */}
      <div className="relative flex w-full items-center justify-between px-2">
        <Sun
          className={`h-4 w-4 transition-opacity duration-300 ${
            isDark ? "opacity-0" : "opacity-100"
          }`}
        />
        <Moon
          className={`h-4 w-4 transition-opacity duration-300 ${
            isDark ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </button>
  );
}
