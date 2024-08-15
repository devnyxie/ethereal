import React from "react";
import ThemeChanger from "../app/themeChanger";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import svg from "@/public/icons/github-light.svg";
import {
  GitHubLogoIcon,
  GlobeIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
const Footer: React.FC = () => {
  const links = [
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: TwitterLogoIcon,
    },
    {
      name: "GitHub",
      href: "https://github.com",
      icon: GitHubLogoIcon,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: LinkedInLogoIcon,
    },
    {
      name: "Website",
      href: "https://example.com",
      icon: GlobeIcon,
    },
  ];
  return (
    <footer className="p-4">
      <div className="container flex flex-col justify-center items-center text-sm space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-1 opacity-65 hover:opacity-100 duration-150"
              >
                <Icon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
