"use client";

import { useTheme } from "next-themes";
import React from "react";
import GithubCalendar_inner from "./githubCalendar_inner";

type Theme = "dark" | "light";

function GithubCalendar() {
  const { resolvedTheme } = useTheme() as { resolvedTheme: Theme };

  return (
    <>
      <GithubCalendar_inner resolvedTheme={resolvedTheme} />
    </>
  );
}

export default GithubCalendar;
