import React from "react";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import Config from "@/content/config";
import ThemeSelector from "@/components/theme/themeSelector";

export const social_links = Config.settings.footer.socialLinks.map((link) => {
  switch (link.platform) {
    case "GitHub":
      return {
        name: "GitHub",
        href: link.url,
        icon: GitHubLogoIcon,
      };
    case "LinkedIn":
      return {
        name: "LinkedIn",
        href: link.url,
        icon: LinkedInLogoIcon,
      };
    case "Twitter":
      return {
        name: "Twitter",
        href: link.url,
        icon: TwitterLogoIcon,
      };
    default:
      return {
        name: "GitHub",
        href: link.url,
        icon: GitHubLogoIcon,
      };
  }
});

const Footer: React.FC = () => {
  return (
    <>
      <footer className="footer relative w-full h-[4.5rem] border-t mt-20">
        <div className="footer-shadow" />
        <div className="w-full h-full bg-background/70 backdrop-blur-[10px] transform-gpu z-40 flex items-center">
          <div className="container flex justify-between items-center text-sm z-50">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {social_links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    className="flex items-center gap-1 opacity-65 hover:opacity-100 duration-150"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
            {Config.settings.footer.themeSwitcher ? (
              <>
                <div className="space-x-4 hidden w-[200px] md:flex justify-end">
                  <ThemeSelector />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
