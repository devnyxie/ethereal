import React from "react";
import GithubCalendar from "./githubCalendar";

function GitHeroSection() {
  return (
    <div className="w-full flex flex-col justify-center">
      <div className="text-2xl md:text-3xl font-medium mb-4">
        My Open Source Journey
      </div>
      <div className="text-muted-foreground mb-8">
        Witness my commitment to open source. Each green square represents a day
        of contribution, a step towards better software for everyone.
      </div>
      <GithubCalendar />
    </div>
  );
}

export default GitHeroSection;
