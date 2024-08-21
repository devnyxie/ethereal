import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as React from "react";
import pfp from "@/public/avatar.jpg";
import Image from "next/image";
import AnimatedBackground from "@/components/animated-bg/AnimatedBackground";
import LatestArticles from "@/components/articles/LatestArticles";
import Config from "@/content/config";
import GitHeroSection from "@/components/github/github_heroSection";

export const metadata = {
  title: Config.site.title + " | Home",
};

export default function Home() {
  const maxWidth = "md:max-w-[800px]";
  return (
    <>
      {/* Why 6.5rem? It's because the height of the navbar is 4.5rem and the padding top of the template is 2rem. */}
      <div
        className={`w-full relative flex flex-col items-center justify-center py-[5rem] lg:py-0 lg:h-dvh lg:mt-[-6.5rem]`}
      >
        <AnimatedBackground />
        <div className="flex justify-between items-center z-[1]">
          {" "}
          <div
            className={`w-full flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0 md:space-x-10 ${maxWidth}`}
          >
            <div>
              <div className={`text-2xl md:text-3xl`}>
                {"Hey! My name is "}
                <span className={`dancing-script text-4xl md:text-4xl`}>
                  {Config.user.name}
                </span>
              </div>
              <div className={`opacity-80`}>
                {"I'm a Passionate Full Stack"} <code>{"<Developer/>"}</code>
              </div>
            </div>
            <Image
              src={pfp}
              alt="logo"
              width={250}
              height={250}
              quality={100}
              fetchPriority="high"
              priority={true}
              className={`border rounded-full aspect-square`}
            />
          </div>
        </div>
        <div
          className={`absolute bottom-0 left-1/2 opacity-50 hidden lg:block`}
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <ChevronDownIcon className="down-arrow" height={25} width={25} />
        </div>
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
