import React from "react";
import ThemeChanger from "./themeChanger";

const Footer: React.FC = () => {
  return (
    <footer className="border-t p-2">
      <div className="container flex justify-end items-center">
        <ThemeChanger />
      </div>
    </footer>
  );
};

export default Footer;
