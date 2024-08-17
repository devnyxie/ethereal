"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ChevronUpIcon } from "@radix-ui/react-icons";

function ThemeChanger() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="px-2">
            Theme
            {isOpen ? (
              <ChevronUpIcon className="ml-0.5 h-4 w-4" />
            ) : (
              <ChevronDownIcon className="ml-0.5 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36 " side="top" align="end">
          <DropdownMenuCheckboxItem
            checked={theme === "system"}
            onCheckedChange={() => setTheme("system")}
          >
            System
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={theme === "light"}
            onCheckedChange={() => setTheme("light")}
          >
            Light
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={theme === "dark"}
            onCheckedChange={() => setTheme("dark")}
          >
            Dark
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ThemeChanger;
