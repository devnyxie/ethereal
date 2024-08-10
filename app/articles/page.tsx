import { getAllPosts, PostData } from "@/lib/api";
import { shortDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { LuTags } from "react-icons/lu";
import { LuFolder } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import { LuClock } from "react-icons/lu";

const ArticleListItem = ({
  article,
  year,
}: {
  article: PostData;
  year: string;
}) => {
  return (
    <>
      {year && (
        <>
          <h2 className="opacity-25 text-2xl font-normal mb-1 mt-7">{year}</h2>
        </>
      )}
      <div className="transition-opacity  mb-3">
        <Link
          href={`/articles/${article.slug}`}
          key={article.slug}
          className="text-base md:text-lg font-medium opacity-75 hover:opacity-100 duration-150"
        >
          {article.title}
        </Link>
        <div className="flex items-center opacity-50 space-x-3">
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
    </>
  );
};

function page() {
  const allArticles = getAllPosts();
  let currentYear = "";

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-medium mb-4">Articles</h1>
        <div className="flex space-x-2">
          <Link
            href="/tags"
            passHref
            className="flex items-center space-x-1 text-sm"
          >
            <Button variant="outline" size="sm">
              <LuTags className="mr-2 h-4 w-4" />
              Tags
            </Button>
          </Link>
          <Link
            href="/folders"
            passHref
            className="flex items-center space-x-1 text-sm"
          >
            <Button variant="outline" size="sm">
              <LuFolder className="mr-2 h-4 w-4" />
              Folders
            </Button>
          </Link>
        </div>
      </div>
      <div>
        {allArticles.map((article) => {
          const articleYear = new Date(article.date).getFullYear().toString();
          if (currentYear !== articleYear) {
            currentYear = articleYear;
            return (
              <ArticleListItem
                key={article.slug}
                article={article}
                year={currentYear}
              />
            );
          }
          return (
            <ArticleListItem key={article.slug} article={article} year="" />
          );
        })}
      </div>
    </div>
  );
}

export default page;
