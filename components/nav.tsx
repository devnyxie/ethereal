"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import ThemeChanger from "../app/themeChanger";
import Image from "next/image";
import Logo from "./logo";
import pfp from "@/public/pfp_demo.jpg";
import ThemeSelector from "@/app/themeSelector";
const links = [
  {
    title: "Articles",
    href: "/articles",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "About",
    href: "/about",
  },
];

const Nav: React.FC = () => {
  const currentPath = usePathname();
  const currentRoute = currentPath;

  return (
    <header
      className={`fixed top-0 z-50 w-full bg-background/70 backdrop-blur-[25px] transform-gpu border-b`}
    >
      <div className="noisy-div-light w-full py-4">
        <div className="container relative mx-auto h-full min-h-0 px-2.5 lg:px-0 flex justify-between">
          <Link href="/" className="flex items-center justify-center">
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
          </Link>
          <div className="flex min-w-0 grow items-center justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                {links.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={`${navigationMenuTriggerStyle()} duration-200 bg-transparent`}
                        active={currentRoute === link.href}
                      >
                        {link.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <ThemeSelector />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
