import React from "react";

import {
  GitHubLogoIcon,
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
  ];
  return (
    <>
      <footer className="footer relative w-full h-[4.5rem] border-t mt-20">
        <div className="footer-shadow" />
        <div className="w-full h-full bg-background/70 backdrop-blur-[25px] transform-gpu z-40 flex items-center">
          {" "}
          <div className="container flex flex-col justify-center items-center text-sm space-y-2 z-50">
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
        </div>
      </footer>
    </>
    // <footer className={`p-4 mt-[200px] footer`}>
    //   <div className="container flex flex-col justify-center items-center text-sm space-y-2">
    //     <div className="flex flex-wrap items-center justify-center gap-4">
    //       {links.map((link) => {
    //         const Icon = link.icon;
    //         return (
    //           <Link
    //             key={link.name}
    //             href={link.href}
    //             className="flex items-center gap-1 opacity-65 hover:opacity-100 duration-150"
    //           >
    //             <Icon className="h-5 w-5" />
    //             <span>{link.name}</span>
    //           </Link>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </footer>
    // <div className="h-full w-full overflow-hidden">
    //   <div className="mx-auto mt-32 w-full"></div>
    //   <div className="relative -mt-32 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#369eff,transparent_100%)] before:opacity-100 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-[#7876c566] after:bg-background"></div>
    // </div>
  );
};

export default Footer;
