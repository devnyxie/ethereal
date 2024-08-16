import GithubCalendar from "@/components/githubCalendar";
import * as React from "react";

export default function About() {
  return (
    <div>
      <h1 className="mb-2">About</h1>
      <p>
        Enthusiastic Software Developer with a passion for open-source. I
        dedicate my free time in learning and contributing to well-known
        open-source projects like Next.js and Material UI.
      </p>
      <div className="mt-8 mb-8 flex justify-center">
        <GithubCalendar />
      </div>
    </div>
  );
}
