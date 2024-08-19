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
import links from "./links";
import { usePathname } from "next/navigation";

function DesktopMenu() {
  const currentPath = usePathname();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {links.map((link, index) => {
          if (link.href === "/") return;
          return (
            <NavigationMenuItem key={index}>
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} duration-200 bg-transparent`}
                  active={currentPath === link.href}
                >
                  {link.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default DesktopMenu;
