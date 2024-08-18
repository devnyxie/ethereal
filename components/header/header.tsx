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
import { LuBook, LuHome, LuSquareCode, LuUser2 } from "react-icons/lu";

const links = [
  {
    title: "Home",
    href: "/",
    icon: LuHome,
  },
  {
    title: "Articles",
    href: "/articles",
    icon: LuBook,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: LuSquareCode,
  },
  {
    title: "About",
    href: "/about",
    icon: LuUser2,
  },
];

const Header: React.FC = () => {
  const currentPath = usePathname();
  const currentRoute = currentPath;

  const [drawerKey, setDrawerKey] = useState(0);

  useEffect(() => {
    setDrawerKey((prevKey) => prevKey + 1);
  }, [currentPath]);

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
            <NavigationMenu>
              <NavigationMenuList>
                {links.map((link, index) => {
                  if (link.href === "/") return;
                  return (
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
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="space-x-4 hidden w-[200px] md:flex justify-end">
            <ThemeSelector />
          </div>
          <div className="block md:hidden">
            <Drawer key={drawerKey} closeThreshold={0}>
              <DrawerTrigger asChild>
                <Button size="icon" variant="outline" className="rounded-full">
                  <HamburgerMenuIcon className="w-5 h-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="container bg-background max-h-[80dvh] no-scrollbar">
                <DrawerHeader>
                  <DrawerTitle>Tabs</DrawerTitle>
                  <DrawerDescription>Navigation Links</DrawerDescription>
                </DrawerHeader>
                <div className="py-4">
                  {links.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <Link href={link.href} key={index}>
                        <Button
                          className="w-full text-left flex justify-start items-center"
                          variant="ghost"
                        >
                          <Icon className="w-5 h-5 mr-2 opacity-50" />
                          {link.title}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
