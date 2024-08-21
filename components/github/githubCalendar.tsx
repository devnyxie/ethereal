"use client";

import { useTheme } from "next-themes";
import React from "react";
import GithubCalendar_inner from "./githubCalendar_inner";

type Theme = "dark" | "light";

function GithubCalendar() {
  const { resolvedTheme } = useTheme() as { resolvedTheme: Theme };
  const [data, setData] = React.useState([]);

  // React.useEffect(() => {
  //   fetch("https://github-contributions-api.jogruber.de/v4/devnyxie?y=last")
  //     .then((response) => response.json())
  //     .then((responseData) => setData(responseData.contributions));
  // }, []);

  return (
    <>
      <GithubCalendar_inner resolvedTheme={resolvedTheme} />
    </>
  );
}

export default GithubCalendar;
