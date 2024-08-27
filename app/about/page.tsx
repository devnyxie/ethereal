import GithubCalendar from "@/components/github/githubCalendar";
import Config from "@/content/config";
import Image from "next/image";
import * as React from "react";
import EducationTree from "./eduTree";
import WorkTree from "./workTree";

export const metadata = {
  title: Config.site.title + " | About",
  description:
    Config.settings.pages.find((page) => page.path === "/about")
      ?.meta_description || Config.site.description,
};

export default function About() {
  const technologies = {
    frontend: {
      frameworks: ["React", "Next.js", "Angular"],
      css: ["Tailwind CSS", "Bootstrap", "Material UI"],
    },
    backend: {
      languages: [
        { name: "Go", frameworks: ["Gin", "Echo"] },
        {
          name: "Python",
          frameworks: ["Flask"],
        },
        {
          name: "Node.js",
          frameworks: ["Express"],
        },
      ],
      databases: ["PostgreSQL", "MySQL", "MongoDB"],
    },
  };

  const education = [
    {
      name: "42Warsaw",
      location: "Warsaw, Poland",
      degree: "RNCP Level 7 - Computer Science",
      date: "2024 - 2028",
    },
    {
      name: "Epicode Bootcamp",
      degree: "MERN Full Stack Developer",
      date: "2022-2023",
    },
    {
      name: "2nd High School of Thessaloniki, Greece",
      degree: "Computer Science",
      date: "2019-2022",
    },
  ];

  return (
    <div>
      <Image
        src="/peep_about.svg"
        alt="avatar"
        width={300}
        height={300}
        quality={100}
        className="mx-auto rounded-full svg-border"
      />
      <div className="">
        <h1 className="mb-2">About</h1>
        <p>
          My name is Timothee and I am a Full Stack Software Developer with a
          passion for open-source. I dedicate my free time in learning, building
          projects and contributing to well-known open-source projects like
          Next.js and Material UI.
        </p>
      </div>

      <div>
        <h1 className="mt-12 mb-2">Education</h1>
        <EducationTree />
      </div>
      <div>
        <h1 className="mt-12 mb-2">Work</h1>
        <WorkTree />
      </div>
      <h1 className="mt-12 mb-2">Skills</h1>
      <p>
        Here are some of the technologies I have experience with. I am always
        looking to learn new technologies and improve my skills.
      </p>
      <div className="pl-4 mt-4">
        {" "}
        {/* Frontend */}
        <div className="mb-4">
          <h3 className="mb-1">Frontend</h3>
          <p>
            <span>Frameworks:</span>{" "}
            {technologies.frontend.frameworks.join(", ")}
          </p>
          <p>
            <span>CSS:</span> {technologies.frontend.css.join(", ")}
          </p>
        </div>
        {/* Backend */}
        <div className="mb-4">
          <h3 className="mb-1">Backend</h3>
          <p>
            <span>Languages:</span>{" "}
            {technologies.backend.languages
              .map((language) => {
                return `${language.name} (${language.frameworks.join(", ")})`;
              })
              .join(", ")}
          </p>
          <p>
            <span>Databases:</span> {technologies.backend.databases.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
