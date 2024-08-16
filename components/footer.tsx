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

    // <>
    //   <div className="pb-4 container overflow-hidden">
    //     <div className="mx-auto pt-12 w-full max-w-2xl relative z-10">
    //       <div className="relative h-full w-full bg-white">
    //         <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
    //       </div>
    //     </div>
    //     <div className="relative -mt-32 h-80 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#369eff,transparent_90%)] before:opacity-80 after:absolute  after:-left-1/2 after:bottom-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-b after:border-[#7876c566] after:bg-background">
    //       <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px] "></div>
    //     </div>
    //     {/* <article className="text-white  -mt-32 mb-4 w-2/3 mx-auto block text-center ">
    //       It is a modern and minimalist UI component library designed to
    //       simplify the process of building responsive and visually appealing web
    //       interfaces.
    //     </article> */}

    //     <div className="">
    //       {/* socials */}
    //       {/* <div className="flex w-full justify-center space-x-4">
    //         {links.map((link) => {
    //           const Icon = link.icon;
    //           return (
    //             <Link
    //               key={link.name}
    //               href={link.href}
    //               className="flex items-center gap-1 opacity-65 hover:opacity-100 duration-150"
    //             >
    //               <Icon className="h-10 w-10" />
    //             </Link>
    //           );
    //         })}
    //       </div> */}
    //     </div>
    //   </div>
    // </>
  );
};

export default Footer;
