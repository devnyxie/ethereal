import React from "react";
import GithubCalendar from "./githubCalendar";
import { Button } from "../ui/button";
import { RiNextjsFill } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";

const contributions = [
  {
    name: "@vercel/next.js",
    url: "https://github.com/vercel/next.js",
    reactIcon: RiNextjsFill,
  },
  {
    name: "@mui/material-ui",
    url: "https://github.com/mui/material-ui",
    icon: "/logos/material-ui.svg",
  },
  {
    name: "@pterm/pterm",
    url: "https://github.com/pterm/pterm",
    icon: "/logos/pterm.png",
  },
];

function GitHeroSection() {
  return (
    <div className="w-full flex flex-col justify-center">
      <h2 className="mb-1">My Open Source Journey</h2>
      <div className="text-muted-foreground mb-2">
        Each green square represents a day of contribution, a step towards
        better software for everyone.
      </div>

      <div className="items-center overflow-x-auto mb-4 hidden md:flex">
        {contributions.map((contribution) => (
          <a target="_blank" href={contribution.url} key={contribution.name}>
            <Button
              key={contribution.name}
              size="sm"
              variant="outline"
              rel="noopener noreferrer"
              className="mr-2"
            >
              {contribution.reactIcon && (
                <contribution.reactIcon className="h-4 w-4 mr-2" />
              )}
              {contribution.icon && (
                <Image
                  src={contribution.icon}
                  alt={contribution.name}
                  width={16}
                  height={16}
                  className="mr-2"
                />
              )}
              {contribution.name}
            </Button>
          </a>
        ))}
      </div>
      <GithubCalendar />
    </div>
  );
}

export default GitHeroSection;
