"use client;";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import React, { useState } from "react";

type Theme = "light" | "system" | "dark";

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
  };

  return (
    <div className="flex rounded-full border p-1 w-max" role="radiogroup">
      {(["light", "system", "dark"] as Theme[]).map((thememap) => (
        <Button
          size="sm"
          variant="ghost"
          key={thememap}
          aria-label={`Switch to ${thememap} theme`}
          className={`
            flex items-center justify-center p-2 transition-colors rounded-full
            ${theme === thememap ? "bg-accent dark:bg-accent/40" : ""}
          `}
          onClick={() => handleThemeChange(thememap)}
          role="radio"
          type="button"
        >
          {thememap === "light" && (
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          )}
          {thememap === "system" && (
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
          )}
          {thememap === "dark" && (
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          )}
        </Button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
