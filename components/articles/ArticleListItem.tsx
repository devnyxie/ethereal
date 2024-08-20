import { PostData } from "@/lib/types";
import { shortDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { LuCalendar, LuClock } from "react-icons/lu";

const SplitterArticleListItem = () => (
  <div className="flex-1 px-3 hidden md:block">
    <div className="w-full border-b border-dashed"></div>
  </div>
);

const ArticleListItem = ({ article }: { article: PostData }) => (
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
          <span className="text-sm">{shortDate(article.publishedAt)}</span>
        </div>
        <div className="flex items-center opacity-75">
          <LuClock className="h-4 w-4 mr-1" />
          <span className="text-sm">{article.readTime}</span>
        </div>
      </div>
    </div>
  </div>
);

export default ArticleListItem;
