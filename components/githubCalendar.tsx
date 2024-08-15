"use client";

import { useTheme } from "next-themes";
import React from "react";

type Theme = "dark" | "light";

function GithubCalendar() {
  const { resolvedTheme } = useTheme() as { resolvedTheme: Theme };
  return <></>;
}

export default GithubCalendar;
