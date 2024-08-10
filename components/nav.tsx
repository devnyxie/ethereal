"use client";
import React from "react";
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
import icon from "@/public/shard.svg";
import Logo from "./logo";

const links = [
  {
    title: "Articles",
    href: "/articles",
  },
  {
    title: "About",
    href: "/about",
  },
];

const Nav: React.FC = () => {
  const currentPath = usePathname();
  const currentRoute = currentPath;
  console.log(currentRoute);
  return (
    <nav className="p-2">
      <div className="container flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          {/* <Image src={icon} alt="logo" width={25} height={25} /> */}
          <Logo />
          <span className="text-lg">Shard</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {links.map((link, index) => (
              <NavigationMenuItem key={index}>
                <Link href={link.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} duration-200`}
                    active={currentRoute === link.href}
                  >
                    {link.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
            <ThemeChanger />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Nav;
