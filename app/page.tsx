"use client";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as React from "react";
import pfp from "@/public/pfp_demo.jpg";
import Image from "next/image";
import { TextEncrypted } from "@/components/textEncrypted";
import GitHubCalendar from "react-github-calendar";
import { useTheme } from "next-themes";

type Theme = "dark" | "light";

export default function Home() {
  const { resolvedTheme } = useTheme() as { resolvedTheme: Theme };

  return (
    <>
      {/* Why 7rem? It's because the height of the navbar is 4.5rem and the padding top of the template is 2.5rem (p-10). */}
      <div className="w-full relative flex items-center justify-center h-dvh lg:mt-[-7rem] ">
        <div
          className="w-[600px] h-[600px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
          style={{ backdropFilter: "blur(5px)" }}
        >
          {resolvedTheme === "dark" ? (
            <>
              {" "}
              <div className="absolute top-0 -left-4 -z-10 overflow-visible opacity-20">
                <div className="circle-1 -z-10 h-[400px] w-[700px] rounded-full bg-red-700 mix-blend-multiply blur-[128px] animate-blob" />
              </div>
              <div className="absolute top-0 -right-4 -z-10 overflow-visible opacity-20">
                <div className="circle-2 -z-10 h-[400px] w-[700px] rounded-full bg-green-700 mix-blend-multiply blur-[128px] animate-blob" />
              </div>
              <div className="absolute -bottom-8 left-20 -z-10 overflow-visible opacity-20">
                <div className="circle-3 -z-10 h-[600px] w-[500px] rounded-full bg-blue-700 mix-blend-multiply blur-[128px] animate-blob" />
              </div>
            </>
          ) : (
            <>
              <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 dark:opacity-30 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 dark:opacity-30 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 dark:opacity-30 animate-blob animation-delay-4000"></div>
            </>
          )}
        </div>
        <div className="w-[700px] flex justify-between items-center z-20">
          <div>
            <h1 className="text-3xl font-medium">{"Hi, I'm  Timothee 👋。"}</h1>
            <h1>
              {"A Passionate Full Stack"} <code>{"<Developer/>"}</code>
            </h1>
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
        <div
          className="absolute bottom-0 left-1/2 opacity-50"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <ChevronDownIcon className="down-arrow" height={25} width={25} />
        </div>
      </div>
      <div className="flex justify-center items-center h-[400px]"></div>
    </>
  );
}
