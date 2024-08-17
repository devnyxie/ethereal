import { getAllPosts, PostData } from "@/lib/api";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { LuTags, LuFolder } from "react-icons/lu";
import ArticleListItem from "@/components/articles/ArticleListItem";

const ArticlesByYear = ({ articles }: { articles: PostData[] }) => {
  const groupedArticles = articles.reduce((acc, article) => {
    const year = new Date(article.date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(article);
    return acc;
  }, {} as Record<string, PostData[]>);

  return (
    <>
      {Object.entries(groupedArticles)
        .sort(([a], [b]) => parseInt(b) - parseInt(a))
        .map(([year, yearArticles]) => (
          <React.Fragment key={year}>
            <h2 className="opacity-25 mb-1 mt-7">{year}</h2>
            {yearArticles.map((article) => (
              <ArticleListItem key={article.slug} article={article} />
            ))}
          </React.Fragment>
        ))}
    </>
  );
};

function ArticlesPage() {
  const allArticles = getAllPosts();

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center">
        <h1>Articles</h1>
        <div className="flex space-x-2">
          <Link href="/articles/tags" passHref>
            <Button variant="outline" size="sm">
              <LuTags className="mr-2 h-4 w-4" />
              Tags
            </Button>
          </Link>
          <Link href="/articles/folders" passHref>
            <Button variant="outline" size="sm">
              <LuFolder className="mr-2 h-4 w-4" />
              Folders
            </Button>
          </Link>
        </div>
      </div>
      <ArticlesByYear articles={allArticles} />
    </div>
  );
}

export default ArticlesPage;
