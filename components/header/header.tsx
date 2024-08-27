import React from "react";
import ThemeSelector from "@/components/theme/themeSelector";
import MobileMenu from "./mobile-menu";
import DesktopMenu from "./desktop-menu";
import Brand from "./brand";
import Config from "@/content/config";

const Header: React.FC = () => {
  const isFixed = Config.settings.header.fixed;
  return (
    <>
      {isFixed ? (
        <header
          className={`fixed h-[4.5rem] top-0 z-50 w-[100vw] bg-background/70 backdrop-blur-[10px] transform-gpu border-b`}
        >
          <div
            className={`w-[100vw] h-full py-4 ${
              Config.settings.grain ? "grain" : ""
            }`}
          >
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
              <div className="flex items-center md:hidden">
                <MobileMenu />
              </div>
            </div>
          </div>
        </header>
      ) : (
        <header className={`h-[4.5rem] z-50 transform-gpu border-b`}>
          <div className="h-full py-4">
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
              <div className="flex items-center md:hidden">
                <MobileMenu />
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
