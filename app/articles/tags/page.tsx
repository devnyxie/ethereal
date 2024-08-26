import BadgeLink from "@/components/badge/badgeLink";
import { getAllTags } from "@/lib/api";
import * as React from "react";

export default function Tags() {
  const tags = getAllTags();

  // Group tags by their first letter
  const groupedTags = tags.reduce((acc, tag) => {
    const firstLetter = tag[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(tag);
    return acc;
  }, {} as Record<string, string[]>);

  // Get sorted group keys
  const sortedGroupKeys = Object.keys(groupedTags).sort();

  return (
    <div>
      <h1 className="text-3xl font-medium mb-4 ">Tags</h1>
      <div className="divide-y">
        {" "}
        {sortedGroupKeys.map((letter, index) => (
          <div key={index} className="flex items-center p-1 gap-4">
            <h2 className="text-2xl w-6">{letter}</h2>
            <div className="gap-x-2 gap-y-1 flex items-center w-full h-full flex-wrap">
              {groupedTags[letter].sort().map((tag, index) => (
                <BadgeLink
                  text={tag}
                  href={`/articles/tags/` + tag}
                  key={index}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
