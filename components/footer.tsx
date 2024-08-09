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
  return (
    <footer className="p-2">
      <div className="container flex flex-col justify-center items-center opacity-50 text-sm space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="#" prefetch={false}>
            <TwitterLogoIcon className="h-5 w-5" />
          </Link>
          <Link href="#" prefetch={false}>
            <GitHubLogoIcon className="h-5 w-5" />
          </Link>
          <Link href="#" prefetch={false}>
            <LinkedInLogoIcon className="h-5 w-5" />
          </Link>
          <Link href="#" prefetch={false}>
            <GlobeIcon className="h-5 w-5" />
          </Link>
        </div>
        <p>© 2024 Shard Template</p>
      </div>
    </footer>
  );
};

export default Footer;
