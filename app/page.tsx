import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as React from "react";
import pfp from "@/public/pfp_demo.jpg";
import Image from "next/image";
import AnimatedBackground from "@/components/animated-bg/AnimatedBackground";
import { cn } from "@/lib/utils";
import LatestArticles from "@/components/latest-articles/LatestArticles";

const CardBioBody = () => (
  <div className="flex justify-between items-center z-[1] p-10">
    <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-20 md:space-y-0 md:space-x-10">
      <div>
        <div className="text-xl md:text-2xl">
          {"Hey! My name is"}
          <span className="dancing-script text-2xl md:text-4xl"> Timothee</span>
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
);
const CardBio = () => {
  const Icon = ({ className, ...rest }: any) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={24}
        height={24}
        strokeWidth="1"
        stroke="currentColor"
        {...rest}
        className={cn("size-6 absolute", className)}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
      </svg>
    );
  };
  return (
    <div>
      <div className="border border-dashed border-zinc-400 dark:border-zinc-700 relative">
        <Icon className="-top-3 -left-3" />
        <Icon className="-top-3 -right-3" />
        <Icon className="-bottom-3 -left-3" />
        <Icon className="-bottom-3 -right-3" />
        <CardBioBody />
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      {/* Why 6.5rem? It's because the height of the navbar is 4.5rem and the padding top of the template is 2rem. */}
      <div className="w-full relative flex flex-col items-center justify-center h-dvh mt-[-6.5rem]">
        <AnimatedBackground />
        {/* <SimpleCard_V3 /> */}
        <div className="flex justify-between items-center z-[1] p-10">
          <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-20 md:space-y-0 md:space-x-10">
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
          className="absolute bottom-0 left-1/2 opacity-50"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <ChevronDownIcon className="down-arrow" height={25} width={25} />
        </div>
      </div>
      <div className="py-20 block w-full mx-auto md:max-w-[800px]">
        <LatestArticles />
      </div>
    </>
  );
}
