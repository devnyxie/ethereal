"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import pfp from "@/public/pfp_demo.jpg";
import ThemeSelector from "@/components/theme/themeSelector";
import MobileMenu from "./mobile-menu";
import DesktopMenu from "./desktop-menu";

const Header: React.FC = () => {
  return (
    <header
      className={`fixed top-0 z-50 w-[100vw] bg-background/70 backdrop-blur-[10px] transform-gpu border-b`}
    >
      <div className="w-[100vw] py-4 noisy-div">
        <div className="container relative mx-auto h-full min-h-0 flex justify-between">
          <Link href="/" className="flex items-center space-x-2 w-[200px]">
            <Image
              src={pfp}
              alt="logo"
              width={40}
              height={40}
              priority={true}
              style={{
                aspectRatio: 1 / 1,
                objectFit: "cover",
                borderRadius: "30%",
              }}
            />
            {/* <span className="dancing-script text-3xl"> Timothee</span> */}
          </Link>
          <div className="hidden md:block">
            <DesktopMenu />
          </div>
          <div className="space-x-4 hidden w-[200px] md:flex justify-end">
            <ThemeSelector />
          </div>
          <div className="block md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
