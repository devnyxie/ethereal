import { getAllPosts, PostData } from "@/lib/api";
import { shortDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { LuTags, LuFolder, LuCalendar, LuClock } from "react-icons/lu";

const SplitterArticleListItem = () => (
  <div className="flex-1 px-3 hidden md:block">
    <div className="w-full border-b border-dashed"></div>
  </div>
);

export const ArticleListItem = ({ article }: { article: PostData }) => (
  <div className="transition-opacity mb-3">
    <div className="md:flex md:flex-wrap md:justify-between md:items-center">
      <Link
        href={`/articles/${article.slug}`}
        className="text-base md:text-lg font-medium opacity-75 hover:opacity-100 duration-150"
      >
        <p className="truncate overflow-hidden max-w-[100%] md:max-w-[500px] lg:max-w-[700px]">
          {article.title}
        </p>
      </Link>
      <SplitterArticleListItem />
      <div className="flex items-center opacity-50 space-x-3 mt-1 md:mt-0">
        <div className="flex items-center opacity-75">
          <LuCalendar className="h-4 w-4 mr-1" />
          <span className="text-sm">{shortDate(article.date)}</span>
        </div>
        <div className="flex items-center opacity-75">
          <LuClock className="h-4 w-4 mr-1" />
          <span className="text-sm">{article.readTime}</span>
        </div>
      </div>
    </div>
  </div>
);

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
