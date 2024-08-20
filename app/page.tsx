import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as React from "react";
import pfp from "@/public/avatar.jpg";
import Image from "next/image";
import AnimatedBackground from "@/components/animated-bg/AnimatedBackground";
import LatestArticles from "@/components/latest-articles/LatestArticles";
import Config from "@/content/config";

export const metadata = {
  title: Config.site.title + " | Home",
};

export default function Home() {
  return (
    <>
      {/* Why 6.5rem? It's because the height of the navbar is 4.5rem and the padding top of the template is 2rem. */}
      <div className="w-full relative flex flex-col items-center justify-center py-[5rem] lg:py-0 lg:h-dvh lg:mt-[-6.5rem]">
        <AnimatedBackground />
        {/* <SimpleCard_V3 /> */}
        <div className="flex justify-between items-center z-[1]">
          <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0 md:space-x-10">
            <div>
              <div className="text-xl md:text-2xl">
                {"Hey! My name is"}
                <span className="dancing-script text-2xl md:text-4xl">
                  {" "}
                  Timothee
                </span>
              </div>
              <div className="opacity-80">
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
              style={{
                aspectRatio: 1 / 1,
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </div>
        </div>
        <div
          className="absolute bottom-0 left-1/2 opacity-50 hidden lg:block"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <ChevronDownIcon className="down-arrow" height={25} width={25} />
        </div>
      </div>
      <div className="py-10 lg:py-20 block w-full mx-auto md:max-w-[800px]">
        <LatestArticles />
      </div>
    </>
  );
}
