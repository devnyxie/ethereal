import Config from "@/content/config";
import pfp from "@/public/avatar.jpg";
import Image from "next/image";
import React from "react";
import AnimatedBackground from "../animated-bg/AnimatedBackground";
import { ChevronDownIcon } from "@radix-ui/react-icons";

function HeroSection({ maxWidth }: { maxWidth: string }) {
  const fullScreenHero = true;
  const desc =
    "Hey! I'm an experienced Full Stack Developer passionate about learning and building open-source software that is not only functional but also beautiful.";
  return (
    <div
      className={`w-full flex justify-center items-center z-[1]  ${
        fullScreenHero ? "lg:py-0 lg:h-dvh lg:mt-[-6.5rem]" : ""
      }`}
    >
      <AnimatedBackground />

      <div
        className={`z-10 flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0 md:space-x-10 py-[5rem] ${maxWidth}`}
      >
        <div>
          <h1 className="mb-2">Timothee</h1>
          <p className="mb-2 text-muted-foreground">
            Software Engineer • Web Designer
          </p>
          <p className="">{desc}</p>
        </div>
        <Image
          src="/peep_hero.svg"
          alt="logo"
          width={300}
          height={300}
          quality={100}
          fetchPriority="high"
          priority={true}
          className="mirror svg-border"
        />
      </div>
      {fullScreenHero ? (
        <div
          className={`absolute bottom-0 left-1/2 opacity-50 hidden lg:block`}
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <ChevronDownIcon className="down-arrow" height={25} width={25} />
        </div>
      ) : null}
    </div>
  );
}

export default HeroSection;
