import markdownToHtml from "@/lib/markdownToHtml";
import { getAllPosts, getPostBySlug, PostData } from "@/lib/api";
import { notFound } from "next/navigation";
import { longDate } from "@/lib/utils";

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

  return (
    <article className="">
      <div className="mb-4">
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        <p className="opacity-65">{longDate(post.date)}</p>
      </div>
      <div className="markdown" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
