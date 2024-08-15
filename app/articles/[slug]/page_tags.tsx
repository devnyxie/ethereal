"use client";

import { useState } from "react";
import BadgeLink from "@/components/badgeLink";
import { LuTags } from "react-icons/lu";

interface PostTagsProps {
  tags: string[];
}

export default function PostTags({ tags }: PostTagsProps) {
  const [showAllTags, setShowAllTags] = useState(false);

  const toggleShowAllTags = () => {
    setShowAllTags(!showAllTags);
  };

  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex mt-1 mb-1 ">
      <LuTags className="h-4 w-4 opacity-65 shrink-0 mt-1.5 mr-2" />
      <div className="flex flex-wrap gap-1 items-center">
        {showAllTags || tags.length <= 3 ? (
          tags.map((tag, index) => (
            <BadgeLink text={tag} href={`/articles//tags/${tag}`} key={index} />
          ))
        ) : (
          <>
            {tags.slice(0, 3).map((tag, index) => (
              <BadgeLink
                text={tag}
                href={`/articles/tags/${tag}`}
                key={index}
              />
            ))}
            <span
              className="text-sm p-0 ml-2 opacity-65 hover:opacity-100 hover:underline cursor-pointer"
              onClick={toggleShowAllTags}
            >
              + {tags.length - 3} more
            </span>
          </>
        )}
      </div>
    </div>
  );
}
