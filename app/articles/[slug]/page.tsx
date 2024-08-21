import markdownToHtml from "@/lib/markdownToHtml";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import { longDate } from "@/lib/utils";
import { LuFolder, LuTags } from "react-icons/lu";
import BadgeLink from "@/components/badge/badgeLink";
import PostTags from "./page_tags";
import { Metadata, ResolvingMetadata } from "next";
import { baseUrl } from "@/app/sitemap";
import { PostData } from "@/lib/types";

export async function generateMetadata(
  { params, searchParams }: { params: PostData; searchParams: URLSearchParams },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  return {
    title: post.title,
    description: post.summary ? post.summary : "",
  };
}

export async function generateStaticParams() {
  let posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Article({ params }: { params: PostData }) {
  const { slug } = params;
  if (!slug) {
    notFound();
  }
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const content = await markdownToHtml(post.content);
  return (
    <article className="flex flex-col">
      <div className="mb-4">
        <h1>{post.title}</h1>
        <p className="opacity-65">{longDate(post.publishedAt)}</p>
        <PostTags tags={post.tags || []} />
        {post.folder && (
          <div className="flex items-center">
            <LuFolder className="h-4 w-4 mr-2 opacity-65" />
            <BadgeLink
              key={1}
              href={`/articles/folders/${post.folder}`}
              text={post.folder}
            />
          </div>
        )}
      </div>

      <div className="markdown" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
