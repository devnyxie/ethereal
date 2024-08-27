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
import { Button } from "../ui/button";

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
    // <>
    //   <div className="flex space-x-1">
    //     {links.map((link, index) => {
    //       if (link.href === "/") return;
    //       return (
    //         <div
    //           key={index}
    //           // className="opacity-80 hover:opacity-100 duration-150"
    //         >
    //           <Link href={link.href}>
    //             <Button variant="ghost"> {link.title}</Button>
    //           </Link>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </>
  );
}

export default DesktopMenu;
