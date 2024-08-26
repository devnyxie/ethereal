import ArticleListItem from "@/components/articles/ArticleListItem";
import BadgeLink from "@/components/badge/badgeLink";
import { getAllTags, getPostsByTag } from "@/lib/api";
import Link from "next/link";
import * as React from "react";

export default function TagPage({ params }: any) {
  const { tag } = params;
  const posts = getPostsByTag(tag);

  return (
    <>
      {" "}
      <div className="mb-8">
        <span className="text-xl font-base">Articles tagged with </span>
        <span className="text-xl font-medium underline">{`${tag}`}</span>
        <span>:</span>
      </div>
      <div className="w-full flex flex-wrap">
        {posts.map((post) => (
          <ArticleListItem key={post.slug} article={post} />
        ))}
      </div>
    </>
  );
}
