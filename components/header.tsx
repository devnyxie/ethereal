"use client";

import ThemeChanger from "@/app/themeChanger";
import React, { useState, useEffect } from "react";

const Header = () => {
  const [showBorder, setShowBorder] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
      setShowBorder(true);
    } else {
      setShowBorder(false);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60`}
    >
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <h1>My Website</h1>
        <ThemeChanger />
      </div>
    </header>
  );
};

export default Header;
