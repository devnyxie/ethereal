import React from "react";
import { getAllPosts } from "@/lib/api";
import ArticleListItem from "./ArticleListItem";

const LatestArticles: React.FC = () => {
  const allArticles = getAllPosts();
  const latestArticles = allArticles
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 5);

  return (
    <div className="">
      <div className="text-2xl md:text-3xl font-medium mb-4">
        Latest Articles
      </div>
      <ul>
        {latestArticles.map((article, index) => (
          <ArticleListItem key={index} article={article} />
        ))}
      </ul>
    </div>
  );
};

export default LatestArticles;
