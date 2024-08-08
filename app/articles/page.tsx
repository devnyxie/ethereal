import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import React from "react";

function page() {
  const allArticles = getAllPosts();
  return (
    <div className="flex flex-col">
      {allArticles.map((article) => (
        <Link href={`/articles/${article.slug}`} key={article.slug}>
          {article.title}
        </Link>
      ))}
    </div>
  );
}

export default page;
