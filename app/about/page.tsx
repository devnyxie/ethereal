import GithubCalendar from "@/components/github/githubCalendar";
import * as React from "react";

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
  return (
    <div>
      <h1 className="mb-2">About</h1>
      <p>
        My name is Timothee and I am a Full Stack Software Developer with a
        passion for open-source. I dedicate my free time in learning, building
        projects and contributing to well-known open-source projects like
        Next.js and Material UI.
      </p>
      <h1 className="mt-8 mb-2">Passion</h1>
      <p>
        I can not find a better word to describe my love for what I do. I am
        passionate about creating software that is not only functional but also
        beautiful.
      </p>
      <div className="mt-8 mb-8 flex justify-center">
        <GithubCalendar />
      </div>
      <h1 className="mt-8 mb-2">Stack</h1>
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
