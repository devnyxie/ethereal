import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as React from "react";

import AnimatedBackground from "@/components/animated-bg/AnimatedBackground";
import LatestArticles from "@/components/articles/LatestArticles";
import Config from "@/content/config";
import GitHeroSection from "@/components/github/github_heroSection";
import HeroSection from "@/components/hero/heroSection";

export const metadata = {
  title: Config.site.title + " | Home",
};

export default function Home() {
  const maxWidth = "md:max-w-[800px]";
  return (
    <>
      {/* Why 6.5rem? It's because the height of the navbar is 4.5rem and the padding top of the template is 2rem. */}
      <div
        className={`w-full relative flex flex-col items-center justify-center`}
      >
        <HeroSection maxWidth={maxWidth} />
      </div>
      <div className={`py-10 md:py-14 block w-full mx-auto ${maxWidth}`}>
        <GitHeroSection />
      </div>
      <div className={`py-10 md:py-14 block w-full mx-auto ${maxWidth}`}>
        <LatestArticles />
      </div>
    </>
  );
}
