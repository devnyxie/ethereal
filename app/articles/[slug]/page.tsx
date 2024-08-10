import markdownToHtml from "@/lib/markdownToHtml";
import { getAllPosts, getPostBySlug, PostData } from "@/lib/api";
import { notFound } from "next/navigation";
import { longDate } from "@/lib/utils";
import { LuFolder, LuTags } from "react-icons/lu";
import Link from "next/link";
import BadgeLink from "@/components/badgeLink";
import { Button } from "@/components/ui/button";
import PostTags from "./page_tags";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  let posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Article({ params }: any) {
  const { slug } = params;
  if (!slug) {
    notFound();
  }
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const content = await markdownToHtml(post.content);

  console.log(post.tags);
  return (
    <article className="">
      <div className="mb-4">
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        <p className="opacity-65">{longDate(post.date)}</p>
        <PostTags tags={post.tags || []} />
        {post.folder && (
          <div className="flex items-center">
            <LuFolder className="h-4 w-4 mr-2 opacity-65" />
            <BadgeLink
              key={1}
              href={`/folders/${post.folder}`}
              text={post.folder}
            />
          </div>
        )}
      </div>
      <div className="markdown" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
