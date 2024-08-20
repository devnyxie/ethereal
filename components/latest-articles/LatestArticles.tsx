import React from "react";
import { getAllPosts } from "@/lib/api";
import ArticleListItem from "../articles/ArticleListItem";

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
