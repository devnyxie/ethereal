import React from "react";
import Link from "next/link";
import Image from "next/image";
import pfp from "@/public/avatar.jpg";
import ThemeSelector from "@/components/theme/themeSelector";
import MobileMenu from "./mobile-menu";
import DesktopMenu from "./desktop-menu";
import Brand from "./brand";
import Config from "@/content/config";

const Header: React.FC = () => {
  return (
    <header
      className={`fixed h-[4.5rem] top-0 z-50 w-[100vw] bg-background/70 backdrop-blur-[10px] transform-gpu border-b`}
    >
      <div className="w-[100vw] py-4 noisy-div">
        <div className="container relative mx-auto h-full min-h-0 flex justify-between">
          <Brand />
          <div className="hidden md:flex items-center">
            <DesktopMenu />
          </div>

          {Config.settings.header.themeSwitcher ? (
            <>
              <div className="space-x-4 hidden w-[200px] md:flex justify-end">
                <ThemeSelector />
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="block md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
