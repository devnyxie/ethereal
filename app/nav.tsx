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
    <nav className="p-2 border-b">
      <div className="container flex justify-between items-center">
        <Link href="/" className="text-xl font-light">
          devnyxie
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {links.map((link) => (
              <>
                <NavigationMenuItem>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      active={currentRoute === link.href}
                    >
                      {link.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Nav;
