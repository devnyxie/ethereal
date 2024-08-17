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
import Image from "next/image";
import pfp from "@/public/pfp_demo.jpg";
import ThemeSelector from "@/components/theme/themeSelector";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

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

const Header: React.FC = () => {
  const currentPath = usePathname();
  const currentRoute = currentPath;

  return (
    <header
      className={`fixed top-0 z-50 w-[100vw] bg-background/70 backdrop-blur-[25px] transform-gpu border-b`}
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
            <span className="dancing-script text-3xl"> Timothee</span>
          </Link>
          <div className="hidden md:block">
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
          <div className="space-x-4 hidden w-[200px] md:flex justify-end">
            <ThemeSelector />
          </div>
          <div className="block md:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <Button size="icon" variant="outline">
                  <HamburgerMenuIcon className="w-5 h-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="container bg-background max-h-[80dvh] no-scrollbar">
                {/* <DrawerHeader>
                  <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                  <DrawerDescription>
                    This action cannot be undone.
                  </DrawerDescription>
                </DrawerHeader>

                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter> */}
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
