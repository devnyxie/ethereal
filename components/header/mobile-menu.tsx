"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import links from "./links";

function MobileMenu() {
  const currentPath = usePathname();
  const [drawerKey, setDrawerKey] = useState(0);
  useEffect(() => {
    setDrawerKey((prevKey) => prevKey + 1);
  }, [currentPath]);
  return (
    <div>
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
          <div className="pb-4 pt-2 sm:px-4">
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
  );
}

export default MobileMenu;
