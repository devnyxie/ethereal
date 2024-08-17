import React from "react";
import { getAllPosts, PostData } from "@/lib/api";
import Link from "next/link";
import { shortDate } from "@/lib/utils";
import { LuCalendar, LuClock } from "react-icons/lu";
import { ArticleListItem } from "@/app/articles/page";

const LatestArticles: React.FC = () => {
  const allArticles = getAllPosts();
  const latestArticles = allArticles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="">
      <h1 className="mb-7">Latest Articles</h1>
      <ul>
        {latestArticles.map((article, index) => (
          <ArticleListItem key={index} article={article} />
        ))}
      </ul>
    </div>
  );
};

export default LatestArticles;
