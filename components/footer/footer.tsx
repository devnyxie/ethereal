import React from "react";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import Config from "@/content/config";
import ThemeSelector from "@/components/theme/themeSelector";
import { LuExternalLink } from "react-icons/lu";
import { getDomainLabel } from "@/lib/utils";

export const social_links = Config.settings.socialLinks.map((link) => {
  let name = link.name ? link.name : getDomainLabel(link.url);
  name = name.toLowerCase();
  switch (name) {
    case "github":
      return {
        name: name,
        href: link.url,
        icon: GitHubLogoIcon,
      };
    case "linkedin":
      return {
        name: name,
        href: link.url,
        icon: LinkedInLogoIcon,
      };
    case "twitter":
      return {
        name: name,
        href: link.url,
        icon: TwitterLogoIcon,
      };
    default:
      return {
        name: name,
        href: link.url,
        icon: LuExternalLink,
      };
  }
});

const Footer: React.FC = () => {
  const links = Config.settings.pages;
  return (
    <>
      {/* <footer className="relative w-full h-[4.5rem] border-t mt-20">
        {Config.settings.gradient ? (
          <div className="absolute inset-x-0 bottom-0 h-[170px] -z-10 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(ellipse_at_bottom,rgba(255,204,255,0.8)_0%,rgba(255,204,255,0.5)_30%,rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(ellipse_at_bottom,rgba(0,102,255,0.7)_0%,rgba(0,102,255,0.2)_30%,rgba(0,102,255,0)_70%)] blur-[128px]"></div>
          </div>
        ) : (
          <> </>
        )}
        <div
          className={`w-full h-full ${
            Config.settings.grain ? "" : "bg-background/70 backdrop-blur-[10px]"
          } transform-gpu z-40 flex items-center`}
        >
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
                    <span className="capitalize">{link.name}</span>
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
      </footer> */}
      <div className="relative w-full flex items-center py-4 border-t mt-20">
        <div
          className={`w-full h-full ${
            Config.settings.grain ? "" : "bg-background/70 backdrop-blur-[10px]"
          } transform-gpu z-40 flex items-center`}
        >
          <div className="container flex flex-col items-center md:justify-between text-sm z-50">
            {/* <div className="opacity-65">Aurora</div> */}
            {/* <h3 className="font-cursive">Aurora</h3> */}
            <p className="opacity-65 mb-2">
              Built with love using Next.js and Tailwind
            </p>
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
                    <span className="capitalize">{link.name}</span>
                  </Link>
                );
              })}
            </div>
            <div className="hidden">
              <a href="/sitemap.xml">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
