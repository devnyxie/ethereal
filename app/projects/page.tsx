import * as React from "react";
import { Button } from "@/components/ui/button";
import Config from "@/content/config";
import Image from "next/image";
import { LuArrowDownNarrowWide, LuGithub } from "react-icons/lu";
import { LuArrowUpNarrowWide } from "react-icons/lu";
import { LuChevronRight } from "react-icons/lu";
import { LuHeart } from "react-icons/lu";
import { LuExternalLink } from "react-icons/lu";
import Link from "next/link";
import fs from "fs/promises";
import { getPlaiceholder } from "plaiceholder";
import path, { join } from "path";

export const metadata = {
  title: Config.site.title + " | Projects",
};

interface Project {
  title: string;
  description: string;
  state: "development" | "published" | "archived";
  image?: string;
  git_url?: string;
  preview_url?: string;
}

const stateColors = {
  development: "bg-yellow-300 dark:bg-yellow-600",
  published: "bg-green-300 dark:bg-green-600",
  archived: "bg-red-300 dark:bg-red-600",
};

const projects: Project[] = [
  {
    title: "aurora",
    description:
      "Aurora is a stunning website template that you can use for free. It features many advanced components and a beautiful design.",
    state: "development",
    image: "/projects/aurora.png",
  },
  {
    title: "katsuragi",
    description:
      "A Go toolkit offering utilities to efficiently extract favicons, backlinks, descriptions, and titles, with support for LRU caching.",
    state: "published",
    git_url: "https://github.com/devnyxie/katsuragi",
    image: "/projects/katsuragi.png",
  },
  {
    title: "nigiri",
    description:
      " The Nigiri Next.js Blog template allows you to create a personalized blog with ease. ",
    state: "published",
    git_url: "https://github.com/devnyxie/nigiri",
    image: "/projects/nigiri.png",
  },
  {
    title: "dev-link",
    description:
      "A Web Application designed to help programmers find teams for collaborative projects and learning opportunities.",
    state: "archived",
    git_url: "https://github.com/devnyxie/dev-link",
    image: "/projects/devlink.png",
  },
];
export default async function Projects() {
  return (
    <>
      <div className="mb-8">
        <h1 className="mb-1">Projects</h1>
        <p className="text-muted-foreground">Projects worth mentioning</p>
      </div>
      <div className="space-y-4 md:space-y-0 md:grid md:grid-rows-2 md:grid-cols-2 md:gap-4">
        {projects.map(async (project) => {
          let localBase64 = "";
          if (project.image) {
            const src = "public" + project.image;
            const buffer = await fs.readFile(join(process.cwd(), src));
            const { base64 } = await getPlaiceholder(buffer);
            localBase64 = base64;
          }
          return (
            <ProjectItem
              key={project.title}
              project={project}
              base64={localBase64}
            />
          );
        })}
      </div>
    </>
  );
}

function ProjectItem({
  project,
  base64,
}: {
  project: Project;
  base64: string;
}) {
  return (
    <>
      <div className=" h-[480px] group mx-auto dark:bg-accent/20 p-2 bg-white border overflow-hidden rounded-md dark:text-white text-black ">
        <figure className="w-full h-80 group-hover:h-72 transition-all duration-300 dark:bg-[#0a121a] bg-[#f0f5fa] p-2 rounded-md relative overflow-hidden">
          <div
            style={{
              background:
                "linear-gradient(123.9deg, #a343fc30 1.52%, rgba(0, 0, 0, 0) 68.91%)",
            }}
            className="absolute top-0 left-0 w-full h-full  group-hover:opacity-100 opacity-0  transition-all duration-300"
          ></div>
          {project.image && (
            <Image
              src={project.image}
              alt="shoes"
              width={600}
              height={600}
              placeholder="blur"
              blurDataURL={base64}
              className="absolute -bottom-1 group-hover:-bottom-5 right-0 h-64 w-[80%] group-hover:border-4 border-4 group-hover:border-[#76aaf82d] rounded-lg object-cover object-top group-hover:object-center transition-all duration-300"
            />
          )}
        </figure>
        <article className="  p-4 space-y-2">
          <div className="space-x-2 flex items-center">
            <h1 className="text-xl font-semibold capitalize">
              {project.title}
            </h1>
            <span
              className={`text-xs px-2 py-1 rounded-md ${
                stateColors[project.state]
              }`}
            >
              {project.state}
            </span>
          </div>
          <p className="text-base leading-[120%]">{project.description}</p>
          <div className="group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 pt-2 flex gap-1  transition-all duration-300 ">
            {project.git_url ? (
              <a href={project.git_url} target="_blank">
                <Button size="default" variant="outline">
                  <LuGithub className="mr-2 h-4 w-4" />
                  <span>Repo</span>
                </Button>
              </a>
            ) : (
              <Button size="default" variant="outline" disabled>
                <LuGithub className="mr-2 h-4 w-4" />
                <span>Private Repo</span>
              </Button>
            )}
          </div>
        </article>
      </div>
    </>
  );
}
