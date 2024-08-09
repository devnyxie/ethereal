import { getAllPosts, PostData } from "@/lib/api";
import { shortDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const ArticleListItem = ({
  article,
  year,
}: {
  article: PostData;
  year: string;
}) => {
  return (
    <>
      {year && <h2 className="opacity-25 text-2xl font-normal pt-4">{year}</h2>}
      <div className="pb-1 text-lg flex items-center space-x-2 hover:opacity-100 opacity-75 transition-opacity duration-100">
        <Link
          href={`/articles/${article.slug}`}
          key={article.slug}
          className=""
        >
          {article.title}
        </Link>
        <div className="flex items-center space-x-2 opacity-50">
          <p className="text-sm ">{shortDate(article.date)}</p>
          <p>·</p>
          <p className="text-sm">{article.readTime}</p>
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
      <h1 className="text-3xl font-base">Articles</h1>
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
        return <ArticleListItem key={article.slug} article={article} year="" />;
      })}
    </div>
  );
}

export default page;
